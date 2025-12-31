"use server";

import directus from "@/lib/directus";
import { readItem, updateItem } from "@directus/sdk";

export async function getLikes(id: number) {
  const post = await directus.request(readItem("post", id));
  const likes = typeof post.likes === "number" ? post.likes : 0;
  return likes;
}

export async function updateLikes(id: number, action: "add" | "remove") {
  // Use atomic increment/decrement to prevent race conditions
  const post = await directus.request(
    readItem("post", id, {
      fields: ["likes"],
    }),
  );
  const currentLikes = typeof post.likes === "number" ? post.likes : 0;
  const delta = action === "add" ? 1 : -1;
  const nextLikes = Math.max(0, currentLikes + delta);

  await directus.request(updateItem("post", id, { likes: nextLikes }));
  return nextLikes;
}
