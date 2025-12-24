import Link from "next/link"
import { PageTitle } from "@/components/PageTitle"
import { getTags } from "@/lib"

export default async function TagsPage() {
	const tags = await getTags()
	const sorted = tags.sort((a, b) => a.localeCompare(b))

	return (
		<div className="mb-10 space-y-6">
			<PageTitle title="Tags" />
			<div className="flex flex-wrap justify-center gap-4">
				{sorted.map((tag) => (
					<Link
						key={tag}
						href={`/tags/${tag}`}
						className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100"
					>
						#{tag}
					</Link>
				))}
			</div>
		</div>
	)
}
