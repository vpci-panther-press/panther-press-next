import { cn } from "@/lib/cn";
import { type Post } from "@/lib/directus";
import { PostCard } from "@/components/PostCard";

export async function ListPosts({
  posts,
  FirstBig = false,
}: {
  posts: Post[];
  FirstBig?: boolean;
}) {
  return (
    <section
      className={cn(
        `grid grid-cols-1 lg:grid-cols-2 gap-6 mt-3`,
        FirstBig && `lg:[&>*:first-child]:col-span-2`,
      )}
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
