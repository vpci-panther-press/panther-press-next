"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Instagram, Link as LinkIcon, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/cn";
import { Search } from "./Search";
import { Logo } from "./Logo";

const SOCIALNETWORKS = [
  {
    name: "Instagram",
    url: "https://instagram.com/vp.pantherpress",
    icon: Instagram,
  },
  {
    name: "Linktree",
    url: "https://linktr.ee/pantherpress",
    icon: LinkIcon,
  },
];

function HeaderLink({
  href,
  children,
  className,
  target,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      className={cn(
        "text-lg font-semibold text-zinc-800 transition hover:text-zinc-950 dark:text-zinc-100 dark:hover:text-white whitespace-nowrap",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggle = () => setOpen((prev) => !prev);
  const navId = "mobile-nav";
  return (
    <header className="z-50 w-full rounded-lg bg-zinc-200/90 py-4 font-manrope backdrop-blur sm:flex-nowrap sm:justify-start md:bg-transparent dark:bg-zinc-900/80 md:dark:bg-transparent">
      <nav
        className="mx-auto w-full max-w-[85rem] px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link
            className="flex-none text-2xl font-semibold text-zinc-900 dark:text-white"
            href="/"
          >
            <span className="flex flex-row items-center gap-x-2">
              <Logo width={2} /> Panther Press
            </span>
          </Link>
          <div className="flex flex-row items-center gap-2 sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md border bg-white p-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              onClick={toggle}
              aria-label="Toggle navigation"
              aria-expanded={open}
              aria-controls={navId}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <div
          id={navId}
          className={cn(
            "ml-auto grow basis-full flex-col overflow-hidden transition-all duration-200 sm:flex sm:flex-row",
            open ? "flex" : "hidden",
          )}
        >
          <div className="mt-4 sm:ml-auto ml-4 flex flex-col gap-5 text-lg font-semibold sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:pl-5">
            <HeaderLink href="/articles?page=1">Articles</HeaderLink>
            <HeaderLink href="/issues/">Issues</HeaderLink>
            <HeaderLink href="/about-us/">About Us</HeaderLink>
            <div className="flex flex-row gap-2 align-middle sm:ml-2 basis-full">
              {SOCIALNETWORKS.map((network) => {
                const Icon = network.icon;
                return (
                  <HeaderLink
                    key={network.name}
                    className="my-auto"
                    href={network.url}
                    target="_blank"
                    aria-label={network.name}
                  >
                    <Icon className="size-5" />
                  </HeaderLink>
                );
              })}
              <ThemeToggle />
              {isLargeScreen && (
                <Suspense fallback={<div className="w-32 sm:w-44" />}>
                  <Search />
                </Suspense>
              )}
            </div>
            {!isLargeScreen && (
              <Suspense fallback={<div className="w-32" />}>
                <Search />
              </Suspense>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
