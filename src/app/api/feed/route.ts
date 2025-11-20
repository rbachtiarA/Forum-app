import { getFeed } from "@/lib/db/feed";
import { createServerSideClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const limit = 5;
    const searchParams = request.nextUrl.searchParams;
    const options =
      (searchParams.get("opt") as "friend" | "recent" | "popular") ?? "recent";
    const cursor = searchParams.get("c");
    const username = searchParams.get("u");
    const supabase = await createServerSideClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!["friend", "recent", "popular"].includes(options)) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const posts = await getFeed({
      options,
      cursor,
      username,
      limit,
      userId: user?.id,
    });
    const lastCursor =
      posts.length !== 0
        ? `${new Date(posts[posts.length - 1].createdAt).valueOf()}`
        : null;
    return NextResponse.json({
      result: {
        posts,
        cursor: lastCursor,
      },
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
