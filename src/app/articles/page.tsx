import { notFound } from "next/navigation"
import { ListCategories } from "@/components/ListCategories"
import { ListPosts } from "@/components/ListPosts"
import { PageTitle } from "@/components/PageTitle"
import { Pagination } from "@/components/Pagination"
import { siteConfig } from "@/data/site.config"
import { getNonArchivedPosts } from "@/lib"

const PAGE_SIZE = siteConfig.paginationSize

export default async function ArticlesIndex({
	searchParams,
}: {
	searchParams?: Promise<{ page?: string }>
}) {
	const params = await searchParams
	const pageNumber = Number(params?.page ?? "1")
	if (!Number.isInteger(pageNumber) || pageNumber < 1) {
		notFound()
	}

	const allPosts = await getNonArchivedPosts()
	const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE))
	if (pageNumber > totalPages) {
		notFound()
	}

	const start = (pageNumber - 1) * PAGE_SIZE
	const posts = allPosts.slice(start, start + PAGE_SIZE)

	return (
		<div className="mb-10 space-y-6">
			<PageTitle title="All Articles" />
			<ListCategories currentPath={`/articles?page=${pageNumber}`}/>
			<div>
				<div className="flex flex-row justify-between">
					<h2 className="text-start text-lg font-medium">Page {pageNumber}</h2>
					<h2 className="text-end text-lg font-medium tracking-wide">Latest Posts</h2>
				</div>
				<ListPosts FirstBig posts={posts} />
			</div>
			<Pagination
				currentPage={pageNumber}
				lastPage={totalPages}
				makeHref={(page) => `/articles?page=${page}`}
			/>
		</div>
	)
}
