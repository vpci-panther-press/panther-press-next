import Link from "next/link";

export default function PhotographyPage() {
  return (
    <main
      id="content"
      role="main"
      className="h-screen px-4 py-10 text-center sm:px-6 lg:px-8"
    >
      <h1 className="block text-2xl font-bold sm:text-4xl dark:text-white">
        Coming Soon
      </h1>
      <p className="mt-3 text-lg text-stone-600 dark:text-gray-300">
        This page is still under development, please check back later!
      </p>
      <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 sm:w-auto dark:focus:ring-1 dark:focus:ring-gray-600 dark:focus:outline-hidden"
        >
          <svg
            className="h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          Back to Home
        </Link>
      </div>
    </main>
  );
}
