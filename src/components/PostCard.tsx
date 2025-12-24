import Image from "next/image"
import Link from "next/link"
import { readItem } from "@directus/sdk"
import directus, { directusAssetsUrl, type Post, type Author } from "@/lib/directus"

export async function PostCard({ post }: { post: Post }) {
	const authorData: Author = await directus.request(
		readItem("author", post.authors[0].author_id as string | number),
	)

	return (
		<Link
			href={`/articles/${post.slug}/`}
			className="group/card mx-auto min-w-full sm:max-w-[32rem] lg:first:w-full lg:first:max-w-none"
		>
			<div
				className="relative flex h-96 w-full cursor-pointer flex-col justify-between overflow-hidden rounded-md bg-cover bg-center p-4 shadow-xl sm:min-w-[32rem] lg:first:w-full"
				style={{ backgroundImage: `url('${directusAssetsUrl + post.heroImage}')` }}
			>
				<div className="absolute inset-0 h-full w-full bg-black opacity-[0.55] transition duration-300 group-hover/card:opacity-60" />
				<div className="z-10 flex flex-row">
					<div className="flex flex-row items-center space-x-4">
						<Image
							height={100}
							width={100}
							alt={`${authorData.name}'s Profile`}
							src={authorData.photo ? `${directusAssetsUrl + authorData.photo}?width=150` : "/author/default.jpg"}
							className="size-10 rounded-full border-2 object-cover"
						/>
						<div className="flex flex-col">
							<p className="relative z-10 text-base font-normal text-gray-50">{authorData.name}</p>
							<p className="text-sm text-gray-400">{post.readTime}</p>
						</div>
					</div>
					<div className="ml-auto h-full items-center justify-center">
						<p className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:bg-slate-900 dark:text-slate-100">
							{post.category.substring(0, 1).toUpperCase() + post.category.substring(1)}
						</p>
					</div>
				</div>
				<div className="text content">
					<h1 className="relative z-10 text-xl font-bold text-gray-50 md:text-2xl">{post.title}</h1>
					<p className="relative z-10 my-4 text-sm font-normal text-gray-50">{post.description}</p>
				</div>
			</div>
		</Link>
	)
}
