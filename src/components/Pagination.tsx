import Link from "next/link"

type PaginationProps = {
	currentPage: number
	lastPage: number
	makeHref: (page: number) => string
	className?: string
	siblingCount?: number // number of pages to show on each side of current
	boundaryCount?: number // number of pages to show at the start and end
}

function range(start: number, end: number): number[] {
	const length = end - start + 1
	return Array.from({ length }, (_, i) => start + i)
}

type Item = number | "dots"

function getPaginationItems(
	currentPage: number,
	totalPages: number,
	siblingCount: number,
	boundaryCount: number
): Item[] {
	const startPages = range(1, Math.min(boundaryCount, totalPages))
	const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages)

	const start = Math.max(
		Math.min(currentPage - siblingCount, totalPages - boundaryCount - siblingCount * 2 - 1),
		boundaryCount + 1
	)
	const end = Math.min(
		Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
		endPages.length ? endPages[0] - 1 : totalPages
	)

	const items: Item[] = []
	items.push(...startPages)

	if (start > boundaryCount + 1) items.push("dots")

	items.push(...range(start, end))

	if (end < (endPages.length ? endPages[0] : totalPages) - 1) items.push("dots")

	items.push(...endPages)
	return items
}

export function Pagination({
	currentPage,
	lastPage,
	makeHref,
	className,
	siblingCount = 1,
	boundaryCount = 1,
}: PaginationProps) {
	if (lastPage <= 1) return null

	const items = getPaginationItems(currentPage, lastPage, siblingCount, boundaryCount)

	const baseItemClasses =
		"inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-1.5 rounded-lg px-2.5 py-2 text-sm"

	const inactiveClasses = "text-zinc-800 hover:bg-zinc-100 dark:text-white dark:hover:bg-white/10"
	const activeClasses = "bg-zinc-200 text-zinc-900 dark:bg-zinc-600 dark:text-white"

	return (
		<nav aria-label="Pagination" className={className ? className : "flex flex-wrap items-center justify-center gap-x-1 gap-y-2"}>
			{/* Previous */}
			{currentPage > 1 ? (
				<Link prefetch={false} href={makeHref(currentPage - 1)} rel="prev" className={`${baseItemClasses} ${inactiveClasses}`}>
					<svg
						className="h-3.5 w-3.5 shrink-0"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="m15 18-6-6 6-6"></path>
					</svg>
					<span className="">Prev</span>
				</Link>
			) : (
				<span aria-disabled="true" className={`${baseItemClasses} disabled:opacity-50 text-zinc-500 dark:text-zinc-400`}>
					<svg
						className="h-3.5 w-3.5 shrink-0"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="m15 18-6-6 6-6"></path>
					</svg>
					<span className="">Prev</span>
				</span>
			)}

			{/* Page items */}
			<ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2" role="list">
				{items.map((item, idx) => {
					if (item === "dots") {
						return (
							<li key={`dots-${idx}`} className={`${baseItemClasses} text-zinc-500 dark:text-zinc-400`} aria-hidden>
								…
							</li>
						)
					}

					const isActive = item === currentPage
					return (
						<li key={item}>
							<Link
								prefetch={false}
								href={makeHref(item)}
								aria-current={isActive ? "page" : undefined}
								className={`${baseItemClasses} ${isActive ? activeClasses : inactiveClasses}`}
							>
								{item}
							</Link>
						</li>
					)
				})}
			</ul>

			{/* Next */}
			{currentPage < lastPage ? (
				<Link prefetch={false} href={makeHref(currentPage + 1)} rel="next" className={`${baseItemClasses} ${inactiveClasses}`}>
					<span className="">Next</span>
					<svg
						className="h-3.5 w-3.5 shrink-0"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="m9 18 6-6-6-6"></path>
					</svg>
				</Link>
			) : (
				<span aria-disabled="true" className={`${baseItemClasses} disabled:opacity-50 text-zinc-500 dark:text-zinc-400`}>
					<span className="text-zinc-400 dark">Next</span>
					<svg
						className="h-3.5 w-3.5 shrink-0"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="m9 18 6-6-6-6"></path>
					</svg>
				</span>
			)}
		</nav>
	)
}
