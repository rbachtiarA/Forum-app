import { type Prisma } from "@prisma/client";
import prisma from "../prisma";

type FeedPostsType = Prisma.PostGetPayload<{
  include: {
    user: {
      select: {
        username: true;
        name: true;
        picture: true;
      };
    };
    _count: {
      select: {
        comment: true;
      };
    };
    votes: {
      select: {
        voteScore: true;
      };
    };
  };
  omit: {
    userId: true;
  };
}>[];

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

function toFormmatedFeeds(posts: FeedPostsType) {
  return posts.map((post) => {
    return {
      id: post.id,
      user: {
        username: post.user.username,
        name: post.user.name,
        picture: post.user.picture,
      },
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      isVoted:
        post.votes && post.votes.length >= 1
          ? userVoteStatus(post.votes[0].voteScore)
          : null,
      totalComment: post._count.comment,
      totalVote: post.voteScores,
    };
  });
}

export async function getFeed({
  userId,
  options,
  cursor,
  username,
  limit,
}: {
  userId?: string;
  options: "friend" | "recent" | "popular";
  username: string | null;
  cursor: string | null;
  limit: number;
}) {
  const filter: Prisma.PostWhereInput = {
    ...(username ? { user: { username } } : {}),
    ...(cursor ? { createdAt: { lt: new Date(Number(cursor)) } } : {}),
  };

  const posts = await prisma.post.findMany({
    where: {
      ...filter,
    },
    take: limit,
    omit: {
      userId: true,
    },
    orderBy:
      options === "popular"
        ? [{ trendScores: "desc" }, { createdAt: "desc" }]
        : { createdAt: "desc" },
    include: {
      user: {
        select: {
          username: true,
          name: true,
          picture: true,
        },
      },
      _count: {
        select: {
          comment: true,
        },
      },
      ...(userId
        ? {
            votes: {
              where: {
                userId,
              },
              select: {
                voteScore: true,
              },
            },
          }
        : {}),
    },
  });

  return toFormmatedFeeds(posts);
}
