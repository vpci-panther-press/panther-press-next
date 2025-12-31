import { notFound } from "next/navigation";
import Image from "next/image";
import { readItems } from "@directus/sdk";
import { ListPosts } from "@/components/ListPosts";
import directus, { directusAssetsUrl } from "@/lib/directus";
import { getPostsByAuthorId } from "@/lib";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ author: string }>;
}) {
  const resolvedParams = await params;
  const [author] = await directus.request(
    readItems("author", {
      fields: ["*"],
      filter: { slug: { _eq: resolvedParams.author } },
      limit: 1,
    }),
  );

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthorId(author.id);

  return (
    <div className="space-y-6">
      <div className="mb-8 flex flex-col items-center md:flex-row">
        <div className="relative mb-4 size-48 shrink-0 overflow-hidden rounded-full bg-gray-200 md:mr-4 md:mb-0">
          <Image
            src={
              author.photo
                ? `${directusAssetsUrl + author.photo}?width=400`
                : "/author/default.jpg"
            }
            alt={`${author.name} profile`}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col items-center justify-center md:items-start">
          {author.alumni && (
            <p className="my-2 inline-block rounded-full bg-black px-2 py-1 text-white dark:bg-white dark:text-black">
              Alumni
            </p>
          )}
          <h1 className="mb-4 text-4xl font-bold">{author.name}</h1>
          <p className={`text-lg md:text-xl ${author.bio ? "opacity-70" : ""}`}>
            {author.bio || "No biography found"}
          </p>
        </div>
      </div>
      <ListPosts posts={posts} />
    </div>
  );
}
