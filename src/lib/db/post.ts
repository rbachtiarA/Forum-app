import { NextResponse } from "next/server";
import prisma from "../prisma";
import { Post, Prisma } from "@prisma/client";

async function updatePostTrendScores(
  tx: Prisma.TransactionClient,
  data: { post: Post; commentCount: number; scoreValue: number }
) {
  const diffHours = Math.ceil(
    (Date.now() - new Date(data.post.createdAt).getTime()) / (24 * 3600 * 1000)
  );

  const trendScore =
    ((data.post.voteScores + data.scoreValue + data.commentCount * 3 + 1) *
      1000) /
    Math.pow(diffHours + 2, 1.5);
  await tx.post.update({
    where: {
      id: data.post.id,
    },
    data: {
      voteScores: { increment: data.scoreValue },
      trendScores: trendScore,
    },
  });
}

function userVoteStatus(
  voteNumber: number | null
): "upvoted" | "downvoted" | null {
  switch (voteNumber) {
    case 1:
      return "upvoted";

    case -1:
      return "downvoted";

    default:
      return null;
  }
}

export async function getPostById({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        comment: {
          where: {
            parentId: null,
          },
          omit: {
            postId: true,
            profileId: true,
          },
          include: {
            other_Comment: {
              omit: {
                postId: true,
                profileId: true,
              },
              include: {
                other_Comment: {
                  omit: {
                    postId: true,
                    profileId: true,
                  },
                  include: {
                    user: {
                      select: {
                        username: true,
                        picture: true,
                        name: true,
                      },
                    },
                  },
                },
                user: {
                  select: {
                    username: true,
                    picture: true,
                    name: true,
                  },
                },
              },
            },
            user: {
              select: {
                username: true,
                picture: true,
                name: true,
              },
            },
          },
        },
        user: true,
        _count: {
          select: {
            comment: true,
          },
        },
        votes: {
          where: {
            userId: userId,
          },
          select: {
            voteScore: true,
          },
        },
      },
    });
    if (post) {
      return {
        id: post?.id,
        user: {
          username: post.user.username,
          name: post.user.name ?? "default name",
          picture: post.user.picture ?? "",
        },
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        isVoted:
          post.votes.length >= 1
            ? userVoteStatus(post.votes[0].voteScore)
            : null,
        totalComment: post._count.comment,
        totalVote: post.voteScores,
        updatedAt: post.updatedAt,
        comment: post.comment,
      };
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function createPost({
  userId,
  content,
  title,
}: {
  userId: string;
  content: string;
  title: string;
}) {
  try {
    await prisma.post.create({
      data: {
        content,
        title,
        userId,
      },
    });
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function postVotePost({
  postId,
  userId,
  vote,
}: {
  postId: number;
  userId: string;
  vote: 1 | -1;
}) {
  let scoreValue = vote;
  await prisma.$transaction(async (tx) => {
    const isVoted = await tx.vote.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    const post = await tx.post.findUnique({
      where: { id: postId },
    });

    const commentCount = await tx.comment.count({
      where: {
        postId,
      },
    });

    if (!post) {
      throw NextResponse.json({ error: "Could find post" }, { status: 404 });
    }
    if (isVoted) {
      // if user already voted the content
      // is current value is same or different ?
      if (isVoted.voteScore !== vote) {
        // if current value is different change value, then update vote and change total score
        await tx.vote.update({
          where: {
            postId_userId: {
              postId,
              userId,
            },
          },
          data: {
            voteScore: vote,
          },
        });
        scoreValue = scoreValue - isVoted.voteScore;
      } else {
        // if current value same as change value, then make it neutral/delete it
        await tx.vote.delete({
          where: {
            postId_userId: {
              postId,
              userId,
            },
          },
        });
        scoreValue *= -1;
      }
    } else {
      // if user never voted, then create user status voted to upvoted and increase 1 point
      await tx.vote.create({
        data: {
          postId: postId,
          userId: userId,
          voteScore: vote,
        },
      });
    }
    await updatePostTrendScores(tx, { commentCount, post, scoreValue });
  });
}
