import prisma from "@/lib/prisma";
import { createServerSideClient } from "@/lib/supabase/server";
import { Prisma } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

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

export async function GET(request: NextRequest) {
  try {
    const limit = 5;
    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get("c");
    const username = searchParams.get("u");
    let postsParameter: Prisma.PostWhereInput = {};
    let cursorParameter: Prisma.PostWhereInput = {};

    const supabase = await createServerSideClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (username)
      postsParameter = {
        user: {
          username,
        },
      };

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error) {
      throw new Error("Something wrong with cookies");
    }

    if (cursor)
      cursorParameter = {
        createdAt: {
          lt: new Date(Number(cursor)),
        },
      };

    const posts = await prisma.post.findMany({
      where: {
        ...postsParameter,
        ...cursorParameter,
      },
      take: limit,
      omit: {
        userId: true,
      },
      orderBy: {
        createdAt: "desc",
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

    const postIds = posts.map((p) => p.id);

    const votesCount = await prisma.vote.groupBy({
      by: ["postId", "voteScore"],
      where: {
        postId: { in: postIds },
      },
      _count: { _all: true },
    });

    const countVoteByPost: Record<
      number,
      { upvotes: number; downvotes: number }
    > = {};

    for (const v of votesCount) {
      if (!countVoteByPost[v.postId]) {
        countVoteByPost[v.postId] = { upvotes: 0, downvotes: 0 };
      }

      if (v.voteScore === 1) {
        countVoteByPost[v.postId].upvotes = v._count._all;
      }

      if (v.voteScore === -1) {
        countVoteByPost[v.postId].downvotes = v._count._all;
      }
    }

    if (posts.length == 0)
      return Response.json({
        posts: [],
        cursor: "",
      });

    const formattedPost = posts.map((post) => {
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
          post.votes.length >= 1
            ? userVoteStatus(post.votes[0].voteScore)
            : null,
        totalComment: post._count.comment,
        totalVote: countVoteByPost[post.id]
          ? countVoteByPost[post.id].upvotes -
            countVoteByPost[post.id].downvotes
          : 0,
      };
    });

    const lastCursor = new Date(
      formattedPost[formattedPost.length - 1].createdAt
    ).valueOf();
    return Response.json({
      posts: formattedPost,
      cursor: `${lastCursor}`,
    });
  } catch (err) {
    console.error(err);

    return Response.json({
      message: (err as Error).message,
    });
  }
}
