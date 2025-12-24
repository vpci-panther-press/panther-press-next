import Link from "next/link"
import { readItem } from "@directus/sdk"
import directus, { directusAssetsUrl, type Post_Author } from "@/lib/directus"

export async function AuthorProfile({ authors, imageCredit }: { authors: Post_Author[]; imageCredit: string }) {
	const data = await Promise.all(
		authors.map((author) => directus.request(readItem("author", author.author_id as string | number))),
	)

	return (
		<div className="grid grid-cols-2 border-y border-gray-200 py-4 md:grid-cols-1 md:grid-rows-1">
			{data.map((author) => (
				<Link key={author.id} href={`/author/${author.slug}`}>
					<div className="group my-auto flex flex-col items-center">
						<div
							style={{
								backgroundImage: `url('${author.photo ? `${directusAssetsUrl + author.photo}?width=150` : "/author/default.jpg"}')`,
							}}
							className="my-2 block size-16 shrink-0 rounded-full bg-cover bg-center"
						/>
						<div className="group block text-center">
							<h5 className="text-sm font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200 dark:group-hover:text-gray-400">
								{author.name}
							</h5>
							<div className="mt-1">
								<p className="text-sm text-gray-500">
									{author?.bio ? `${author.bio.split(" ").slice(0, 10).join(" ")}...` : ""}
								</p>
							</div>
						</div>
					</div>
				</Link>
			))}
			<div className="my-auto text-center md:my-3">
				<p className="text-sm text-gray-500 dark:text-gray-400">
					Photo by <span className="text-gray-600 dark:text-gray-300">{imageCredit}</span>
				</p>
			</div>
		</div>
	)
}
