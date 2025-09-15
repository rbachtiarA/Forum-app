import prisma from "@/lib/prisma";
import { createServerSideClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const body = await request.json();
    const { content } = body;

    const supabase = await createServerSideClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error("Couldnt connect to supabase");
    }

    if (!Number(postId)) {
      throw new Error("Invalid post");
    }

    const comment = await prisma.comment.create({
      data: {
        postId: Number(postId),
        profileId: user.user.id,
        content: content,
      },
      include: {
        user: {
          select: {
            username: true,
            name: true,
            picture: true,
          },
        },
      },
      omit: {
        profileId: true,
      },
    });

    return Response.json({
      message: "success create comment",
      result: comment,
    });
  } catch {
    return new Response("Internal Server Error", {
      status: 500,
    }).json();
  }
}
