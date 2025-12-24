import { redirect } from "next/navigation"
import { PageTitle } from "@/components/PageTitle"
import { ListPosts } from "@/components/ListPosts"
import Fuse from "fuse.js"
import { getPosts } from "@/lib"

export const dynamic = "force-dynamic"

const fuseOptions = {
	keys: [
		{ name: "title", weight: 0.8 },
		{ name: "description", weight: 0.15 },
		{ name: "content", weight: 0.05 },
	],
	threshold: 0.4,
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
	const params = await searchParams
	const query = (params.q ?? "").trim()
	if (!query) {
		redirect("/")
	}

	const results = await getPosts()

	const fuse = new Fuse(results, fuseOptions);
	const filteredResults = fuse.search(query).map((result) => result.item);

	return (
		<div className="mb-10 space-y-6">
			<PageTitle title={`Search: ${query}`} />
			{filteredResults.length ? <ListPosts posts={filteredResults} /> : <p className="text-md text-zinc-500">No results found.</p>}
		</div>
	)
}
