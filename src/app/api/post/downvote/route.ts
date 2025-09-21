import { updatePostScores } from "@/lib/db/post";
import prisma from "@/lib/prisma";
import { createServerSideClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get("postId");

    const supabase = await createServerSideClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error("Couldnt connect to supabase");
    }

    if (!Number(postId)) {
      throw new Error("Invalid post");
    }

    await prisma.$transaction(async (tx) => {
      const isVoted = await tx.vote.findUnique({
        where: {
          postId_userId: {
            postId: Number(postId),
            userId: user.user.id,
          },
        },
      });

      const post = await tx.post.findUnique({
        where: { id: Number(postId) },
      });

      const commentCount = await tx.comment.count({
        where: {
          postId: Number(postId),
        },
      });

      if (!post) {
        return NextResponse.json({ error: "Could find post" }, { status: 404 });
      }
      if (isVoted) {
        // if user already voted the content
        let scoreValue: number;
        if (isVoted.voteScore === 1) {
          // if upvoted, then change voted status to downvoted(-1) and decrese 2 point
          scoreValue = -2;
          await tx.vote.update({
            where: {
              postId_userId: {
                postId: isVoted.postId,
                userId: isVoted.userId,
              },
            },
            data: {
              voteScore: -1,
            },
          });
        } else {
          // if downvoted already, then remove user voted and increase 1 point
          scoreValue = 1;
          await tx.vote.delete({
            where: {
              postId_userId: {
                postId: isVoted.postId,
                userId: isVoted.userId,
              },
            },
          });
        }

        await updatePostScores(tx, { commentCount, post, scoreValue });
      } else {
        // if user never voted, then create user status voted to downvote and decrease 1 point
        await tx.vote.create({
          data: {
            postId: Number(postId),
            userId: user.user.id,
            voteScore: -1,
          },
        });

        await updatePostScores(tx, { commentCount, post, scoreValue: -1 });
      }
    });

    return Response.json({ message: "success update vote" });
  } catch (err) {
    console.log(err);

    return new Response("Internal Server Error", {
      status: 500,
    }).json();
  }
}
