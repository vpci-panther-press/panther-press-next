import Link from "next/link"
import { Logo } from "./Logo"

export function Footer() {
	const year = new Date().getFullYear()
	return (
		<footer className="border-t-2 border-zinc-200 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-950">
			<div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pt-16">
				<div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
					<div className="col-span-full lg:col-span-1">
						<Link className="flex-none text-2xl font-semibold text-slate-950 dark:text-white" href="/" aria-label="Brand">
							<div className="flex flex-row items-center gap-x-2">
								<Logo width={2} />
								Panther Press
							</div>
						</Link>
					</div>

					<div className="col-span-1">
						<h1 className="font-semibold text-gray-800 dark:text-gray-100">Articles</h1>
						<div className="mt-3 grid space-y-3">
							<p>
								<Link className="inline-flex gap-x-2 text-slate-700 hover:text-slate-500 dark:text-gray-400 dark:hover:text-gray-200" href="/articles/1">
									All Articles
								</Link>
							</p>
							<p>
								<Link className="inline-flex gap-x-2 text-slate-700 hover:text-slate-500 dark:text-gray-400 dark:hover:text-gray-200" href="/articles/category/life?page=1">
									Life Board
								</Link>
							</p>
							<p>
								<Link className="inline-flex gap-x-2 text-slate-700 hover:text-slate-500 dark:text-gray-400 dark:hover:text-gray-200" href="/articles/category/news?page=1">
									News Board
								</Link>
							</p>
							<p>
								<Link className="inline-flex gap-x-2 text-slate-700 hover:text-slate-500 dark:text-gray-400 dark:hover:text-gray-200" href="/articles/category/editorial?page=1">
									Editorials
								</Link>
							</p>
						</div>
					</div>

					<div className="col-span-1">
						<h1 className="font-semibold text-gray-800 dark:text-gray-100">Press</h1>
						<div className="mt-3 grid space-y-3">
							<p>
								<Link className="inline-flex gap-x-2 text-slate-700 hover:text-slate-500 dark:text-gray-400 dark:hover:text-gray-200" href="/about-us">
									About Us
								</Link>
							</p>
							<p>
								<Link className="inline-flex gap-x-2 text-slate-700 hover:text-slate-500 dark:text-gray-400 dark:hover:text-gray-200" href="/issues">
									Issues
								</Link>
							</p>
							<p>
								<Link className="inline-flex gap-x-2 text-slate-700 hover:text-slate-500 dark:text-gray-400 dark:hover:text-gray-200" href="/tags">
									Tags
								</Link>
							</p>
						</div>
					</div>
				</div>

				<div className="mt-5 grid gap-y-2 sm:mt-12 sm:flex sm:items-center sm:justify-between sm:gap-y-0">
					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-600 dark:text-slate-200">© {year} VPCI Panther Press. All Rights Reserved.</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
