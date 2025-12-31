import { notFound } from "next/navigation";
import { ListPosts } from "@/components/ListPosts";
import { PageTitle } from "@/components/PageTitle";
import { getPostByTag } from "@/lib";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const resolvedParams = await params;
  const posts = await getPostByTag(resolvedParams.tag);
  if (!posts.length) {
    notFound();
  }

  return (
    <div className="mb-10 space-y-6">
      <PageTitle title={resolvedParams.tag} />
      <ListPosts posts={posts} />
    </div>
  );
}
