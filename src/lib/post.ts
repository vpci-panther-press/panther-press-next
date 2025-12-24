import directus, { type Issue, type Post } from "@/lib/directus"
import { readItem, readItems } from "@directus/sdk"

export const getPosts = async (max?: number): Promise<Post[]> => {
	const posts = await directus.request(
		readItems("post", {
			fields: [
				"id",
				"title",
				"description",
				"slug",
				// @ts-expect-error directus sdk issue
				"authors.*",
				"issue",
				"heroImage",
				"alt",
				"photoCredits",
				"category",
				"tags",
				"readTime",
				"likes",
				{ issue: ["*"] },
			],
			filter: {
				draft: {
					_neq: true,
				},
			},
		})
	)

	return sortPostsByDate(posts, max)
}

export const sortPostsByDate = (posts: Post[], max?: number) => {
	return posts
		.sort((a, b) => {
			const aDate = toDate(a.issue.name)
			const bDate = toDate(b.issue.name)
			return bDate.getTime() - aDate.getTime()
		})
		.slice(0, max)
}

export const getPostsByIssue = async (issueId: number) => {
	const posts = await directus.request(
		readItems("post", {
			fields: [
				"id",
				"title",
				"description",
				"slug",
				// @ts-expect-error directus sdk issue
				"authors.*",
				"issue",
				"heroImage",
				"alt",
				"photoCredits",
				"category",
				"tags",
				"readTime",
				"likes",
				{ issue: ["*"] },
			],
			filter: {
				draft: {
					_neq: true,
				},
				issue: {
					id: {
						_eq: issueId,
					},
				},
			},
		})
	)

	return sortPostsByDate(posts)
}

export const getNonArchivedPosts = async (max?: number) => {
	const posts = await getPosts()
	const nonArchived: Post[] = []
	for (const post of posts) {
		const issue = await directus.request(readItem("issue", post.issue.id))
		if (!issue.archived) {
			nonArchived.push(post)
		}
	}
	return sortPostsByDate(nonArchived, max)
}

export const getNonArchivedPostsByCategory = async (category: string, max?: number) => {
	const posts = await getNonArchivedPosts()
	const filtered = posts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
	return max ? filtered.slice(0, max) : filtered
}

export const sortIssuesByDate = (issues: Issue[]) => {
	return issues.sort((a, b) => {
		const aDate = toDate(a.name)
		const bDate = toDate(b.name)
		return bDate.getTime() - aDate.getTime()
	})
}

export const getIssues = async () => {
	const issues = await directus.request(
		readItems("issue", {
			fields: ["id", "slug", "name", "description", "coverImage", "issuuLink", "archived"],
		})
	)

	return sortIssuesByDate(issues)
}

export const getIssueBySlug = async (slug: string) => {
	const [issue] = await directus.request(
		readItems("issue", {
			fields: ["id", "slug", "name", "description", "coverImage", "issuuLink", "archived"],
			filter: {
				slug: {
					_eq: slug,
				},
			},
			limit: 1,
		})
	)

	return issue ?? null
}

export const getPostBySlug = async (slug: string) => {
	const [post] = await directus.request(
		readItems("post", {
			fields: [
				"id",
				"title",
				"description",
				"slug",
				// @ts-expect-error directus sdk issue
				"authors.*",
				"issue",
				"heroImage",
				"alt",
				"photoCredits",
				"category",
				"tags",
				"content",
				"readTime",
				"likes",
				"date_created",
				{ issue: ["*"] },
			],
			filter: {
				draft: {
					_eq: false,
				},
				slug: {
					_eq: slug,
				},
			},
			limit: 1,
		})
	)

	return post ?? null
}

export const getDraftPostBySlug = async (slug: string) => {
	const [post] = await directus.request(
		readItems("post", {
			fields: [
				"id",
				"title",
				"description",
				"slug",
				// @ts-expect-error directus sdk issue
				"authors.*",
				"issue",
				"heroImage",
				"alt",
				"photoCredits",
				"category",
				"tags",
				"content",
				"readTime",
				"likes",
				"date_created",
				"draft",
				{ issue: ["*"] },
				
			],
			filter: {
				slug: {
					_eq: slug,
				},
			},
			limit: 1,
		})
	)
	
	return post ?? null
}

export const getPostsByAuthorId = async (authorId: number) => {
	const posts = await directus.request(
		readItems("post", {
			fields: [
				"id",
				"title",
				"description",
				"slug",
				// @ts-expect-error directus sdk issue
				"authors.*",
				"issue",
				"heroImage",
				"alt",
				"photoCredits",
				"category",
				"tags",
				"readTime",
				"likes",
				{ issue: ["*"] },
			],
			filter: {
				draft: {
					_neq: true,
				},
				authors: {
					// @ts-expect-error manual type defn issue
					author_id: {
						_in: [authorId],
					},
				},
			},
		})
	)

	return sortPostsByDate(posts)
}

export const toDate = (issue: string) => {
	const seasonToMonth: Record<string, number> = {
		spring: 2,
		summer: 5,
		autumn: 8,
		fall: 8,
		winter: 11,
	}
	const findSeason = /\b(spring|summer|autumn|fall|winter)\b/gi

	const findYear = issue.match(/\d{4}/)
	const year = findYear ? parseInt(findYear[0]) : new Date().getFullYear()

	const season = issue.split(" ")[0].toLowerCase()

	return findSeason.test(issue.toLowerCase())
		? new Date(year, seasonToMonth[season], 1)
		: new Date(`1 ${issue}`)
}

export const getTags = async () => {
	const posts = await getPosts()
	const tags = new Set(posts.map((post) => post.tags).flat())
	return Array.from(tags)
}

export const getPostByTag = async (tag: string) => {
	const posts = await getPosts()
	return posts.filter((post) => post.tags.includes(tag))
}
