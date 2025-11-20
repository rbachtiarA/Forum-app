import { getPostById } from "@/lib/db/post";
import { createServerSideClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;

    const supabase = await createServerSideClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw new Error("Something wrong with supabase");
    }

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized token" },
        { status: 401 }
      );
    }

    if (!Number(postId)) {
      return NextResponse.json({ message: "Invalid post id" }, { status: 400 });
    }

    const post = await getPostById({ postId: Number(postId), userId: user.id });

    if (post) {
      return NextResponse.json(
        {
          post,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Post not found",
        },
        { status: 404 }
      );
    }
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
