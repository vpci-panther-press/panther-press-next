import Link from "next/link";
import { directusAssetsUrl, type Author } from "@/lib/directus";
import { cn } from "@/lib/cn";

export function AuthorCard({
  author,
  className,
}: {
  author: Author;
  className?: string;
}) {
  const image = author.photo
    ? `${directusAssetsUrl + author.photo}?width=400`
    : "/author/default.jpg";
  return (
    <Link
      href={`/author/${author.slug}`}
      className={cn(
        "group relative flex h-40 w-40 flex-col justify-end overflow-hidden rounded-2xl bg-black text-white shadow-lg transition-transform duration-300 hover:-translate-y-1",
        className,
      )}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
      <div className="relative z-10 p-3 text-left">
        <p className="text-xs font-semibold uppercase tracking-wide text-cs-secondary">
          {author.board?.join(" & ")}
        </p>
        <h3 className="text-lg font-bold leading-tight">{author.name}</h3>
        <p className="text-sm text-gray-200">{author.role}</p>
        {author.alumni && (
          <span className="mt-1 inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
            Alumni
          </span>
        )}
      </div>
    </Link>
  );
}
