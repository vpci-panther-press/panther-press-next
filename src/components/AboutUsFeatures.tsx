import Image from "next/image"
import { Users, BookOpenCheck, Megaphone, Palette } from "lucide-react"
import { ZoomCard } from "@/components/ZoomCard"

export function AboutUsFeatures() {
	return (
		<div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
			<ZoomCard className="p-0 sm:py-10" containerClassName="bg-transparent">
				<div className="relative">
					<Image
						src="/assets/misc/IMG_7359.jpg"
						priority
						className="w-full rounded-xl object-cover"
						alt="Credits: Jasmine - Scenery of lake with pine trees in the background"
						width={1200}
						height={900}
					/>

					<p style={{ fontFamily: "ArgentCF" }} className="absolute bottom-20 left-20 hidden max-w-md text-3xl font-bold text-white sm:inline-block sm:text-4xl">
						The official student newspaper of Victoria Park Collegiate Institute.
					</p>
				</div>
			</ZoomCard> 

			<div className="mt-5 grid gap-8 lg:grid-cols-3 lg:gap-12">
				<div className="lg:col-span-1">
					<h2 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-200">
						The official student newspaper for Victoria Park CI
					</h2>
					<p className="mt-2 text-gray-500 md:mt-4">
						Victoria Park Collegiate Institute is a public high school in Toronto, Ontario, Canada. We are located in the Parkwoods neighbourhood, part of the Toronto District School Board.
					</p>
				</div>

				<div className="lg:col-span-2">
					<div className="grid gap-8 sm:grid-cols-2 md:gap-12">
						<IconBlock title="Life" icon={<Users className="h-6 w-6 shrink-0 text-blue-600 dark:text-blue-500" />}>Creative writing, poetry, and fictional short stories from our amazing writers.</IconBlock>
						<IconBlock title="News" icon={<BookOpenCheck className="mt-1 h-6 w-6 shrink-0 text-blue-600 dark:text-blue-500" />}>Stay up-to-date with the latest news and events in our school community!</IconBlock>
						<IconBlock title="Editorial" icon={<Megaphone className="mt-1 h-6 w-6 shrink-0 text-blue-600 dark:text-blue-500" />}>Opinion pieces on various topics, ranging from reviews to interviews.</IconBlock>
						<IconBlock title="Visual Arts" icon={<Palette className="mt-1 h-6 w-6 shrink-0 text-blue-600 dark:text-blue-500" />}>Artwork, photography, and digital media from our talented student artists. To be featured soon.</IconBlock>
					</div>
				</div>
			</div>
		</div>
	)
}

function IconBlock({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
	return (
		<div className="flex gap-x-5">
			{icon}
			<div className="grow">
				<h1 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h1>
				<p className="mt-1 text-gray-600 dark:text-gray-400">{children}</p>
			</div>
		</div>
	)
}
