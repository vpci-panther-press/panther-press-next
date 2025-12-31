"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = (theme ?? resolvedTheme ?? "light") as "light" | "dark";
  const isDark = current === "dark";

  if (!mounted) {
    return (
      <button
        aria-label="Theme Switcher"
        className="relative flex mx-2 items-center justify-center"
      >
        <Sun className="size-5 opacity-0" />
      </button>
    );
  }

  return (
    <button
      aria-label="Theme Switcher"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex mx-2 items-center justify-center"
    >
      <span
        className={`absolute transition-opacity duration-200 ${!isDark ? "opacity-100" : "opacity-0"}`}
      >
        <Sun className="size-5" />
      </span>
      <span
        className={`absolute transition-opacity duration-200 ${isDark ? "opacity-100" : "opacity-0"}`}
      >
        <Moon className="size-5" />
      </span>
    </button>
  );
}
