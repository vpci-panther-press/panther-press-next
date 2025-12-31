import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { cn, sluglify } from "@/lib";

export function ListCategories({
  activeCategory,
  currentPath,
}: {
  activeCategory?: string;
  currentPath?: string;
}) {
  // Consider "View All" active when path points to /articles (with optional ?page)
  const isAll = currentPath
    ? currentPath.startsWith("/articles") && !currentPath.includes("/category/")
    : !activeCategory;

  const baseClasses =
    "border-b-2 pb-2.5 font-medium text-zinc-600 transition-colors duration-150 ease-linear first-letter:uppercase hover:border-zinc-800 hover:text-zinc-800 dark:border-gray-600 dark:text-zinc-300 dark:hover:border-zinc-100 dark:hover:text-zinc-100";
  const activeClasses =
    "border-black text-black dark:border-white dark:text-white";

  return (
    <div className="flex flex-col">
      <div className="flex max-w-full min-w-full gap-5">
        <Link
          href="/articles?page=1"
          className={cn(baseClasses, isAll && activeClasses)}
        >
          View All
        </Link>
        {CATEGORIES.map((category) => {
          const slug = sluglify(category.toLowerCase());
          return (
            <Link
              key={category}
              href={`/articles/category/${slug}?page=1`}
              className={cn(
                baseClasses,
                activeCategory?.toLowerCase() === slug && activeClasses,
              )}
            >
              {category.trim()}
            </Link>
          );
        })}
      </div>
      <div className="relative bottom-0 -z-40 inline-block w-full border-b-2 dark:border-zinc-600" />
    </div>
  );
}
