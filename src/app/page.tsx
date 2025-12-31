import { Hero } from "@/components/Hero";
import { AboutUsFeatures } from "@/components/AboutUsFeatures";
import { PageTitle } from "@/components/PageTitle";
import { ListPosts } from "@/components/ListPosts";
import { getPosts } from "@/lib";

const MAX_POSTS = 4;

export default async function Home() {
  const posts = await getPosts(MAX_POSTS);

  return (
    <>
      <Hero />
      <AboutUsFeatures />
      <div className="mb-10">
        <div className="mb-6">
          <PageTitle title="Recent Articles" />
        </div>
        <ListPosts FirstBig={false} posts={posts} />
      </div>
    </>
  );
}
