"use server";
import { createPost } from "@/lib/db/post";
import prisma from "@/lib/prisma";
import { createServerSideClient } from "@/lib/supabase/server";
import { type PostSchema } from "@/utils/schemas/CreatePostSchema";
import { Post } from "@/utils/type/post";

export async function createPostAction({ content, title }: PostSchema) {
  try {
    const supabase = await createServerSideClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw "invalid user";

    await createPost({
      userId: user.id,
      content,
      title,
    });
  } catch {
    console.log("Internal Server Error");
  }
}

function userVoteStatus(voteNumber: number | null) {
  switch (voteNumber) {
    case 1:
      return "upvoted";

    case -1:
      return "downvoted";

    default:
      return null;
  }
}

export async function getPostById(postId: string, userId: string | undefined) {
  try {
    if (!Number(postId)) {
      throw new Error("Invalid post");
    }

    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
      include: {
        comment: {
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
        user: true,
        _count: {
          select: {
            comment: true,
          },
        },
        ...(userId
          ? {
              votes: {
                where: {
                  userId: userId,
                },
                select: {
                  voteScore: true,
                },
              },
            }
          : {}),
      },
    });

    const voteCount = await prisma.vote.groupBy({
      by: ["voteScore"],
      where: { postId: Number(postId) },
      _count: { _all: true },
    });

    let totalVote = 0;
    for (const v of voteCount) {
      if (v.voteScore === 1) {
        totalVote += v._count._all;
      }

      if (v.voteScore === -1) {
        totalVote -= v._count._all;
      }
    }

    if (post) {
      const formattedPost: Post<Date> = {
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
          post.votes && post.votes.length >= 1
            ? userVoteStatus(post.votes[0].voteScore)
            : null,
        totalComment: post._count.comment,
        totalVote: totalVote,
        updatedAt: post.updatedAt,
        comment: post.comment,
      };

      return formattedPost;
    }
  } catch {}
}
