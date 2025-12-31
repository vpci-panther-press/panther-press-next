import Link from "next/link";
import { sluglify } from "@/lib/sluglify";

export function Tag({ tag, category }: { tag: string; category: boolean }) {
  const normalized = category ? sluglify(tag.toLowerCase()) : tag;
  const text = category
    ? tag.substring(0, 1).toUpperCase() + tag.substring(1)
    : `#${tag}`;
  const href = category
    ? `/articles/category/${normalized}?page=1`
    : `/tags/${normalized}/`;
  return (
    <Link href={href} aria-label={tag}>
      <span className="w-fit px-2 py-1 text-base font-semibold text-slate-800 underline sm:no-underline sm:hover:underline md:px-3 md:py-1.5 dark:text-slate-50">
        {text}
      </span>
    </Link>
  );
}
