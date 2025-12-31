import Image from "next/image";
import Link from "next/link";
import { directusAssetsUrl } from "@/lib/directus";

export function IssuesCard({
  title,
  description,
  img,
  url,
  issuuLink,
  archived,
}: {
  title: string;
  description: string;
  img: string;
  url: string;
  issuuLink: string;
  archived: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-zinc-200 shadow-xs sm:flex dark:border-gray-700 dark:bg-[rgba(39,39,42,0.5)] dark:shadow-slate-700/[.7]">
      <div className="relative w-full shrink-0 rounded-t-xl sm:max-w-[15rem] sm:rounded-s-xl md:max-w-xs md:rounded-se-none">
        <Image
          src={directusAssetsUrl + img}
          alt={`Cover of the ${title} issue`}
          width={1200}
          height={900}
          className="h-full min-w-full object-cover"
          priority
        />
        {archived && (
          <p className="absolute bottom-3 left-3 rounded-md bg-slate-100 px-2 py-1.5 text-xs font-bold text-slate-800 sm:inline-block dark:bg-slate-900 dark:text-slate-100">
            Archived
          </p>
        )}
      </div>
      <div className="flex w-full flex-col">
        <div className="flex h-full flex-col p-4 sm:p-7">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {title}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        <div className="m-4 flex flex-col gap-2">
          <Link
            href={url}
            className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-cs-primary px-4 py-3 text-sm font-semibold text-white disabled:pointer-events-none disabled:opacity-50 dark:bg-cs-secondary dark:text-black dark:focus:ring-1 dark:focus:ring-gray-600 dark:focus:outline-hidden"
          >
            <p className="mr-auto">Read Articles</p>
            <ArrowRightIcon />
          </Link>

          <a
            href={issuuLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-cs-secondary px-4 py-3 text-sm font-semibold text-black disabled:pointer-events-none disabled:opacity-50 dark:bg-cs-primary dark:text-white dark:focus:ring-1 dark:focus:ring-gray-600 dark:focus:outline-hidden"
          >
            <p className="mr-auto">Read on Issuu</p>
            <ExternalLinkIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6"></path>
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" x2="21" y1="14" y2="3"></line>
    </svg>
  );
}
