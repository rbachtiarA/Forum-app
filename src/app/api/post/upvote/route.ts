import prisma from "@/lib/prisma";
import { createServerSideClient } from "@/lib/supabase/server";
import { type NextRequest } from "next/server";

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

    const isVoted = await prisma.vote.findUnique({
      where: {
        postId_userId: {
          postId: Number(postId),
          userId: user.user.id,
        },
      },
    });

    if (isVoted) {
      if (isVoted.voteScore === -1) {
        await prisma.vote.update({
          where: {
            postId_userId: {
              postId: isVoted.postId,
              userId: isVoted.userId,
            },
          },
          data: {
            voteScore: 1,
          },
        });
      } else {
        await prisma.vote.delete({
          where: {
            postId_userId: {
              postId: isVoted.postId,
              userId: isVoted.userId,
            },
          },
        });
      }
    } else {
      await prisma.vote.create({
        data: {
          postId: Number(postId),
          userId: user.user.id,
          voteScore: 1,
        },
      });
    }

    return Response.json({ message: "success update vote" });
  } catch {
    return new Response("Internal Server Error", {
      status: 500,
    }).json();
  }
}
