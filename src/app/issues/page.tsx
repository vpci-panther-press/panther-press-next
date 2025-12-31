import { IssuesCard } from "@/components/IssuesCard";
import { PageTitle } from "@/components/PageTitle";
import { getIssues } from "@/lib";

export default async function IssuesPage() {
  const issues = await getIssues();

  return (
    <div className="mb-10">
      <div className="mb-6">
        <PageTitle title="Issues" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {issues.map((issue) => (
          <IssuesCard
            key={issue.id}
            title={issue.name}
            description={issue.description}
            img={issue.coverImage}
            url={`/issues/${issue.slug}`}
            issuuLink={issue.issuuLink}
            archived={issue.archived}
          />
        ))}
      </div>
    </div>
  );
}
