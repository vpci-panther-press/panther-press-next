import Link from "next/link"
import { readItems } from "@directus/sdk"
import { AuthorCard } from "@/components/AuthorCard"
import { PageTitle } from "@/components/PageTitle"
import Contact from "@/components/aceternity/contact"
import { Timeline } from "@/components/aceternity/Timeline"
import directus from "@/lib/directus"

const timelineData = [
	{ title: "Started the Journey", content: "Began with a small team of student writers." },
	{ title: "Launched Panther Press", content: "Published our first newsletter." },
	{ title: "Expanded Reach", content: "Gained recognition in the school community." },
]

export default async function AboutPage() {
	const authors = await directus.request(
		readItems("author", {
			fields: ["*"],
			filter: {
				_and: [{ role: { _eq: "Author" } }, { alumni: { _eq: false } }],
			},
		}),
	)
	const execs = await directus.request(
		readItems("author", {
			fields: ["*"],
			filter: {
				_or: [{ role: { _eq: "Co-President" } }, { role: { _eq: "Board Manager" } }],
			},
		}),
	)

	return (
		<div className="mb-12 space-y-10">
			<section className="relative overflow-hidden rounded-xl bg-linear-to-r from-cs-tertiary to-cs-primary text-white">
				<div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
					<div className="mb-6 flex justify-center">
						<PageTitle title="About Us" />
					</div>
					<p className="mt-4 text-center text-xl font-light md:text-2xl">
						Discover the story behind VP Panther Press, a student-led initiative bringing school news to life.
					</p>
					<div className="mt-6 text-center">
						<a
							href="#content"
							className="inline-block rounded-lg bg-white px-6 py-3 text-lg font-semibold text-cs-primary shadow-md transition-all duration-200 ease-in-out hover:bg-cs-secondary hover:text-white"
						>
							Learn More
						</a>
					</div>
				</div>
			</section>

			<div id="content" className="mt-4 flex justify-center md:mt-6">
				<div className="max-w-xl rounded-lg bg-gray-100 px-6 py-4 text-center shadow-md dark:bg-gray-800">
					<p className="text-lg font-semibold text-gray-700 md:text-xl dark:text-gray-300">
						&quot;VP Panther Press aims to spread school news and is run for students and by students.&quot;
					</p>
				</div>
			</div>

			<Timeline data={timelineData} />

			<section className="space-y-4 text-center">
				<h2 className="text-2xl font-bold">Our Exec Team!</h2>
				<div className="flex flex-wrap justify-center gap-4">
					{execs.map((author) => (
						<AuthorCard key={author.id} author={author} />
					))}
				</div>
			</section>

			<section className="space-y-4 text-center">
				<h2 className="text-2xl font-bold">Our Authors!</h2>
				<div className="flex flex-wrap justify-center gap-4">
					{authors.map((author) => (
						<AuthorCard key={author.id} author={author} />
					))}
				</div>
			</section>

			<Contact />

			<div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
				<Link
					href="/"
					className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 sm:w-auto dark:focus:ring-1 dark:focus:ring-gray-600 dark:focus:outline-hidden"
				>
					<svg className="h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="m15 18-6-6 6-6"></path>
					</svg>
					Back to Home
				</Link>
			</div>
		</div>
	)
}
