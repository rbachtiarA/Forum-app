import prisma from "@/lib/prisma";
import { createServerSideClient } from "@/lib/supabase/server";
import { Post } from "@/utils/type/post";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;

  const supabase = await createServerSideClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (error) {
    console.error(error);
    throw new Error("Something is wrong");
  }

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
        post.votes.length >= 1 ? userVoteStatus(post.votes[0].voteScore) : null,
      totalComment: post._count.comment,
      totalVote: totalVote,
      updatedAt: post.updatedAt,
      comment: post.comment,
    };

    return Response.json({
      post: formattedPost,
    });
  } else {
    return Response.json({
      posts: [],
    });
  }
}
