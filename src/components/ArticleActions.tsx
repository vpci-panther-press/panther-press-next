'use client'
import { useEffect, useMemo, useRef, useState } from "react"
import { Heart, Share } from "lucide-react"
import { cn } from "@/lib/cn"
import { updateLikes } from "@/app/actions"

export function ArticleActions({ postId, initialLikes, className }: { postId: number; initialLikes: number; className?: string }) {
	const [likes, setLikes] = useState(initialLikes ?? 0)
	const [liked, setLiked] = useState(false)
	const [copyState, setCopyState] = useState<"idle" | "copied">("idle")
	const [pending, setPending] = useState(false)
	const storageKey = useMemo(() => `post-${postId}-liked`, [postId])
	const cooldownRef = useRef<number | null>(null)

	useEffect(() => {
		const stored = localStorage.getItem(storageKey)
		setLiked(stored === "true")
	}, [storageKey, postId])

	useEffect(() => {
		return () => {
			if (cooldownRef.current) {
				window.clearTimeout(cooldownRef.current)
			}
		}
	}, [])

	async function toggleLike() {
		if (pending) return
		const action = liked ? "remove" : "add"
		const previousLikes = likes
		const previousLiked = liked
		
		// Optimistic
		setPending(true)
		setLiked(!liked)
		setLikes(prev => Math.max(0, prev + (action === "add" ? 1 : -1)))
		localStorage.setItem(storageKey, (!liked).toString())
		
		try {
			const nextLikes = await updateLikes(postId, action)
			setLikes(nextLikes)
		} catch (err) {
			console.error("Failed to update likes", err)
			// Rollback on error
			setLikes(previousLikes)
			setLiked(previousLiked)
			localStorage.setItem(storageKey, previousLiked.toString())
		}
		finally {
			cooldownRef.current = window.setTimeout(() => setPending(false), 200)
		}
	}

	async function handleShare() {
		try {
			await navigator.clipboard.writeText(window.location.href)
			setCopyState("copied")
			setTimeout(() => setCopyState("idle"), 2000)
		} catch (err) {
			console.error("Failed to copy link", err)
		}
	}

	return (
		<div className={cn("flex flex-row items-center rounded-lg border border-zinc-300 bg-zinc-200 px-3 py-2 align-middle dark:border-gray-700 dark:bg-[rgba(39,39,42,0.5)]", className)}>
			<button
				onClick={toggleLike}
				className={cn("flex w-1/2 flex-col items-center justify-center pr-3 transition-colors", liked && "text-cs-primary dark:text-cs-secondary")}
				aria-label="Like article"
			>
				<Heart className={cn("h-5 w-5", liked && "fill-current")} />
				<div>
					<span className="font-semibold">{likes}</span> <span>{likes === 1 ? "Like" : "Likes"}</span>
				</div>
			</button>
			<button
				onClick={handleShare}
				className="flex w-1/2 flex-col items-center justify-center border-l border-zinc-600 pl-3 transition-colors"
				aria-label="Share article"
			>
				<Share className="h-5 w-5" />
				<p>{copyState === "copied" ? "Link copied!" : "Share"}</p>
			</button>
		</div>
	)
}
