import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import sanitizeHtml from "sanitize-html"
import { AuthorProfile } from "@/components/AuthorProfile"
import { ListRelatedPosts } from "@/components/ListRelatedPosts"
import { Tag } from "@/components/Tag"
import { ArticleActions } from "@/components/ArticleActions"
import  { directusAssetsUrl, type Author, type Post_Author } from "@/lib/directus"
import { getDraftPostBySlug, getPostBySlug, getPosts } from "@/lib"
import { draftMode } from 'next/headers';


export default async function ArticleRoute({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	return renderArticlePage(slug)
}

async function renderArticlePage(slug: string) {
	const { isEnabled } = await draftMode();

	let post;
	if (isEnabled) {
		post = await getDraftPostBySlug(slug);
	} else {
		post = await getPostBySlug(slug);
	}
	if (!post) {
		notFound()
	}
	const relatedPosts = await getRelatedPosts(post.slug)
	const sanitized = sanitizeHtml(post.content)


	return (
		<article className="min-w-full sm:max-w-none md:max-w-none md:py-4">
			{isEnabled && post.draft &&
				<div className="bg-red-50 border-s-4 border-red-500 p-4 dark:bg-red-800/30 my-3" role="alert" aria-labelledby="hs-bordered-red-style-label">
					<div className="flex">
						
						<div className="ms-3">
							<h3 id="hs-bordered-red-style-label" className="text-gray-800 font-semibold dark:text-white">
								Draft Mode Enabled
							</h3>
							<p className="text-sm text-gray-700 dark:text-neutral-400">
								Draft mode is currently enabled. You are viewing a draft version of this article. Only you can see this.
							</p>
						</div>
					</div>
				</div>
			}
			<header className="mb-3 flex flex-col items-center justify-center gap-6">
				<div className="flex w-full flex-col gap-2 text-center font-semibold">
					<Link href={`/issues/${post.issue.slug}`} className="text-cs-primary underline sm:no-underline sm:hover:underline dark:text-cs-secondary">
						{post.issue.name}
					</Link>
					<h1 className="text-center text-5xl font-semibold text-balance md:mb-2.5 md:text-6xl">{post.title}</h1>
					<p>{post.description}</p>
					<div className="mt-4 flex flex-col flex-wrap items-center justify-center text-base sm:flex-row">
						<div className="border-gray-300 sm:border-r sm:pr-2 dark:border-gray-700">{post.category ? <Tag tag={post.category} category /> : null}</div>
						<div className="flex flex-row items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-tags mr-1 ml-2 size-7 opacity-80 sm:ml-4"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M3 8v4.172a2 2 0 0 0 .586 1.414l5.71 5.71a2.41 2.41 0 0 0 3.408 0l3.592 -3.592a2.41 2.41 0 0 0 0 -3.408l-5.71 -5.71a2 2 0 0 0 -1.414 -.586h-4.172a2 2 0 0 0 -2 2z"></path>
								<path d="M18 19l1.592 -1.592a4.82 4.82 0 0 0 0 -6.816l-4.592 -4.592"></path>
								<path d="M7 10h-.01"></path>
							</svg>
							<div className="mr-2 flex flex-wrap gap-1">
								{post.tags.map((tag) => (
									<Tag key={tag} tag={tag} category={false} />
								))}
							</div>
						</div>
						<div className="flex flex-row items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-clock size-6 opacity-80"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
								<path d="M12 7v5l3 3"></path>
							</svg>
							<span>{post.readTime}</span>
						</div>
					</div>
				</div>
			</header>
				<Image
					src={`${directusAssetsUrl + post.heroImage}`}
					width={1000}
					height={500}
					quality={90}
					loading="eager"
					className="my-8 max-h-[300px] w-full rounded-md object-cover md:max-h-[500px]"
					alt={post.alt || post.title}
				/>
			
			<hr />

			<div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[80%_auto]">
				<div className="md:max-w-prose lg:max-w-full">
					<div
						id="content"
						className="prose prose-lg mb-12 min-w-full font-atkinson md:prose-xl dark:prose-invert"
						dangerouslySetInnerHTML={{ __html: sanitized }}
					/>
					<footer>
						<div className="mb-10 flex w-full flex-col items-center justify-center gap-10 md:hidden">
							<ArticleActions postId={post.id} initialLikes={post.likes ?? 0} className="w-full" />
							<AuthorProfile authors={post.authors as Post_Author[]} imageCredit={post.photoCredits} />
						</div>

						<h2 className="mb-6 text-lg font-bold dark:text-white">Related Posts</h2>
						<ListRelatedPosts posts={relatedPosts} />
					</footer>
				</div>

				<aside className="hidden flex-col gap-8 md:flex">
					<AuthorProfile authors={post.authors as Post_Author[]} imageCredit={post.photoCredits} />
					<ArticleActions postId={post.id} initialLikes={post.likes ?? 0} />
				</aside>
			</div>
		</article >
	)
}

async function getRelatedPosts(slug: string) {
	const posts = await getPosts()
	const current = posts.find((p) => p.slug === slug)
	if (!current) return []

	const getAuthorId = (author: Post_Author) => {
		if (!author.author_id) return null
		return typeof author.author_id === "object" ? (author.author_id as Author).id : Number(author.author_id)
	}

	const MAX_POSTS = 3
	const related = await Promise.all(
		posts
			.filter((p) => p.slug !== current.slug)
			.map(async (p) => {
				const currentAuthorIds = current.authors.map(getAuthorId).filter(Boolean)
				const compareAuthorIds = p.authors.map(getAuthorId).filter(Boolean)

				const isRelated =
					p.tags.some((t) => current.tags.includes(t)) ||
					(current.issue.name === p.issue.name && current.category === p.category) ||
					currentAuthorIds.some((id) => compareAuthorIds.includes(id))

				return isRelated ? p : null
			})
	)

	return related.filter((p): p is NonNullable<(typeof related)[number]> => Boolean(p)).slice(0, MAX_POSTS)
}
