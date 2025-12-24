import { cn } from "@/lib/cn"
import React from "react"

interface Props {
	containerClassName?: string
	className?: string
	children: React.ReactNode
}

export function ZoomCard({ containerClassName, className, children }: Props) {
	return (
		<section className={cn("mx-auto w-full relative overflow-hidden rounded-2xl bg-indigo-800", containerClassName)}>
			<div
				className="relative h-full overflow-hidden sm:mx-0 sm:rounded-2xl"
				style={{
					backgroundImage: "radial-gradient(88% 100% at top, rgba(255,255,255,0.5), rgba(255,255,255,0))",
					boxShadow:
						"0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
				}}
			>
				<div
					className={cn(
						"card-content relative h-full px-4 py-9 sm:px-9 transition duration-100 ease-out hover:scale-[1.03]",
						className,
					)}
				>
					<div
						className="pointer-events-none absolute inset-0 h-full w-full scale-[1.2] opacity-10"
						style={{
							maskImage: "radial-gradient(#fff,transparent,75%)",
							backgroundImage: "url(/noise.webp)",
							backgroundSize: "30%",
						}}
					/>
					{children}
				</div>
			</div>
		</section>
	)
}
