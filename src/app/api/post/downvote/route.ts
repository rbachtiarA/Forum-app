import { postVotePost } from "@/lib/db/post";
import { createServerSideClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postId = Number(searchParams.get("postId"));

    const supabase = await createServerSideClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw new Error("Couldnt connect to supabase");
    }

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized token" },
        { status: 401 }
      );
    }
    if (!postId) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    await postVotePost({ postId, userId: user.id, vote: -1 });
    return NextResponse.json({ message: "success update vote" });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Internal server error, please wait or contact support" },
      {
        status: 500,
      }
    );
  }
}
