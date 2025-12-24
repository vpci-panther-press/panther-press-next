'use client'

import { FormEvent, KeyboardEvent, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search as SearchIcon } from "lucide-react"

export function Search() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()
	const initial = searchParams.get("q") ?? ""
	const [query, setQuery] = useState(initial)

	useEffect(() => {
		setQuery(searchParams.get("q") ?? "")
	}, [searchParams])

	const performSearch = (q: string) => {
		q = q.trim()
		const params = new URLSearchParams()
		if (q) {
			params.set("q", q)
		}
		router.push(`/search?${params.toString()}`)
		if (!pathname.startsWith("/search")) {
			// no-op; push already navigates
		}
	}

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		performSearch(query)
	}

	
	return (
		<form onSubmit={onSubmit} className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-200 dark:hover:bg-zinc-800">
			<SearchIcon className="size-4 text-zinc-500" />
			<input
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search articles..."
				className="w-32 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 w-full sm:w-44 dark:text-zinc-50"
				aria-label="Search articles"
				onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
					if (e.key === 'Enter') {
						e.preventDefault()
						performSearch(query)
					}
				}}
			/>
			<button
				type="submit"
				className="rounded-md bg-cs-primary px-3 py-1 text-white transition hover:brightness-110 dark:bg-cs-secondary dark:text-black"
			>
				Go
			</button>
		</form>
	)
}
