import Image from "next/image";
import HoverBorderGradient from "@/components/aceternity/HoverBorderGrad";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-2 md:items-center md:gap-8 xl:gap-20">
        <div>
          <h1 className="mt-4 block font-manrope text-4xl font-[750] text-gray-800 md:text-5xl lg:text-6xl dark:text-gray-200">
            Victoria Park <br />
            <span className="bg-linear-to-tl from-cs-primary to-cs-secondary bg-clip-text text-transparent">
              Panther Press
            </span>
          </h1>
          <p className="mt-7 text-lg text-gray-800 dark:text-gray-400">
            Welcome to the Panther Press, Victoria Park Collegiate
            Institute&apos;s student-run newspaper. We are a group of students
            who are passionate about writing and journalism.
          </p>

          <div className="mt-7 grid w-full gap-3 sm:inline-flex">
            <Link href="/articles?page=1">
              <HoverBorderGradient
                containerClassName="rounded-lg min-w-full md:min-w-none"
                as="button"
                className="inline-flex w-full items-center justify-center gap-x-3 bg-zinc-200 px-4 py-3 text-center text-sm font-medium transition-all duration-600 ease-in-out hover:bg-zinc-300 md:w-auto dark:bg-zinc-950 dark:hover:bg-zinc-900"
              >
                <span>Read Articles</span>
                <ArrowRight className="size-4" />
              </HoverBorderGradient>
            </Link>
            <Link
              className="group relative inline-flex w-full items-center justify-center gap-x-3 rounded-lg border border-gray-300 bg-zinc-200 px-4 py-3 text-center text-sm font-medium shadow-xs transition hover:border-gray-400 hover:bg-zinc-300 md:w-auto dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:shadow-zinc-700/[.7] dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
              href="/issues/"
            >
              Read Issue
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="relative ms-4 hidden sm:inline-block">
          <Image
            src="/assets/misc/IMG_5245_3.jpg"
            alt="Credits: Jasmine - Close up shot of white flowers on a tree in a cloudy white background."
            width={512}
            height={300}
            className="h-full min-w-full object-cover"
            priority
          />
          <div className="absolute inset-0 -z-10 -ms-4 me-4 mt-4 -mb-4 h-full w-full rounded-md bg-linear-to-tr from-gray-200 via-white/0 to-white/0 lg:-ms-6 lg:me-6 lg:mt-6 lg:-mb-6 dark:from-slate-800 dark:via-slate-900/0 dark:to-slate-900/0" />
        </div>
      </div>
    </div>
  );
}
