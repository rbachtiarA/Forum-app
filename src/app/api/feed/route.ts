import prisma from "@/lib/prisma";
import { createServerSideClient } from "@/lib/supabase/server";
import { Prisma } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

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
        post.votes.length >= 1 ? userVoteStatus(post.votes[0].voteScore) : null,
      totalComment: post._count.comment,
      totalVote: post.voteScores,
    };
  });
}

export async function GET(request: NextRequest) {
  try {
    const limit = 5;
    const searchParams = request.nextUrl.searchParams;
    const options =
      (searchParams.get("opt") as "friend" | "recent" | "popular") ?? "popular";
    const cursor = searchParams.get("c");
    const username = searchParams.get("u");
    const supabase = await createServerSideClient();

    const filter: Prisma.PostWhereInput = {
      ...(username ? { user: { username } } : {}),
      ...(cursor ? { createdAt: { lt: new Date(Number(cursor)) } } : {}),
    };

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!["friend", "recent", "popular"].includes(options)) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const posts = await prisma.post.findMany({
      where: {
        ...filter,
      },
      take: limit,
      omit: {
        userId: true,
      },
      orderBy: {
        ...(options === "recent" ? { createdAt: "desc" } : {}),
        ...(options === "popular" ? { trendScores: "desc" } : {}),
      },
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
        votes: {
          where: {
            userId: user.id,
          },
          select: {
            voteScore: true,
          },
        },
      },
    });

    if (posts.length == 0)
      return NextResponse.json({
        posts: [],
        cursor: "",
      });

    const formattedPost = toFormmatedFeeds(posts);

    const lastCursor = new Date(
      formattedPost[formattedPost.length - 1].createdAt
    ).valueOf();
    return NextResponse.json({
      posts: formattedPost,
      cursor: `${lastCursor}`,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
