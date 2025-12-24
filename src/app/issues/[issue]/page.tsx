import { notFound } from "next/navigation"
import { ListPosts } from "@/components/ListPosts"
import { PageTitle } from "@/components/PageTitle"
import { getIssueBySlug, getPostsByIssue } from "@/lib"


export default async function IssuePage({ params }: {
	params: Promise<{
		issue: string
	}>
}) {
	const { issue } = await params
	const issueData = await getIssueBySlug(issue)

	if (!issueData) {
		notFound()
	}

	const posts = await getPostsByIssue(issueData.id)
	const title = issueData.archived ? `${issueData.name} (Archived)` : issueData.name

	return (
		<div className="mb-10">
			<div className="mb-6">
				<PageTitle title={title} />
			</div>
			<ListPosts posts={posts} FirstBig />
		</div>
	)
}
