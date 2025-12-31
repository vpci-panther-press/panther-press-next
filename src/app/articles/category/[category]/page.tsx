import { notFound } from "next/navigation";
import { ListCategories } from "@/components/ListCategories";
import { ListPosts } from "@/components/ListPosts";
import { PageTitle } from "@/components/PageTitle";
import { Pagination } from "@/components/Pagination";
import { CATEGORIES } from "@/data/categories";
import { siteConfig } from "@/data/site.config";
import { getNonArchivedPostsByCategory } from "@/lib";
import { sluglify } from "@/lib/sluglify";

const PAGE_SIZE = siteConfig.paginationSize;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const pageNumber = Number(resolvedSearchParams?.page ?? "1");
  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const matchedCategory = CATEGORIES.find(
    (cat) => sluglify(cat.toLowerCase()) === category,
  );
  if (!matchedCategory) {
    notFound();
  }

  const normalized = matchedCategory.toLowerCase();
  const allPosts = await getNonArchivedPostsByCategory(normalized);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
  if (pageNumber > totalPages) {
    notFound();
  }

  const start = (pageNumber - 1) * PAGE_SIZE;
  const posts = allPosts.slice(start, start + PAGE_SIZE);

  return (
    <div className="mb-10 space-y-6">
      <PageTitle title={matchedCategory} />
      <ListCategories activeCategory={matchedCategory} />
      <div>
        <div className="flex flex-row justify-between">
          <h2 className="text-start text-lg font-medium">Page {pageNumber}</h2>
          <h2 className="text-end text-lg font-medium tracking-wide capitalize">
            {matchedCategory}
          </h2>
        </div>
        <ListPosts FirstBig posts={posts} />
      </div>
      <Pagination
        currentPage={pageNumber}
        lastPage={totalPages}
        makeHref={(page) =>
          `/articles/category/${sluglify(normalized)}?page=${page}`
        }
      />
    </div>
  );
}
