import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib";
import { directusAssetsUrl, type Post } from "@/lib/directus";

export function ListRelatedPosts({ posts }: { posts: Post[] }) {
  if (!posts.length)
    return (
      <span className="text-gray-500">There are no related posts yet. 😢</span>
    );
  return (
    <section
      className={cn(
        `grid lg:grid-cols-3 lg:grid-rows-1 grid-cols-1 grid-rows-3 gap-8`,
      )}
    >
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/articles/${post.slug}/`}
          className="group flex h-full flex-col rounded-xl border border-gray-200 p-5 transition-all duration-300 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
        >
          <div className="aspect-w-16 aspect-h-11">
            <Image
              src={`${directusAssetsUrl + post.heroImage}?width=500`}
              width={600}
              height={200}
              className="h-40 w-full rounded-xl object-cover"
              alt={post.alt}
            />
          </div>
          <div className="my-6">
            <div className="mb-3">
              <p className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                {post.category.substring(0, 1).toUpperCase() +
                  post.category.substring(1)}
              </p>
            </div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white">
              {post.title}
            </h1>
            <p className="mt-5 text-gray-600 dark:text-gray-400">
              {post.description}
            </p>
          </div>
          <div className="mt-auto flex items-center gap-x-3">
            <div>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {post.readTime}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
