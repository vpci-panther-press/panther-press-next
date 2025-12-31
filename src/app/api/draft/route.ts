import { draftMode } from "next/headers";
import directus from "@/lib/directus";
import { readItem } from "@directus/sdk";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const id = searchParams.get("id");
  const draft = await draftMode();

  if (secret !== process.env.DRAFT_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  if (!id) {
    return new Response("Missing id", { status: 401 });
  }

  const post = await directus.request(readItem("post", id));

  if (!post) {
    return new Response("Invalid URL", { status: 401 });
  }

  draft.enable();

  return new Response(null, {
    status: 307,
    headers: {
      Location: `/articles/${post.slug}`,
    },
  });
}
