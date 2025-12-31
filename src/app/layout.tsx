import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Inter, Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TwSizeIndicator } from "@/components/TwSizeIndicator";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/data/site.config";
import { getSeasonColors } from "@/lib/season";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  variable: "--font-atkinson",
  weight: ["400", "700"],
  display: "swap",
});

const argentCf = localFont({
  src: "./ArgentPixelCF-Regular.woff",
  variable: "--font-argent-cf",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { primary, secondary, tertiary } = getSeasonColors();
  const seasonalStyles = `:root { --color-cs-primary: ${primary}; --color-cs-secondary: ${secondary}; --color-cs-tertiary: ${tertiary}; }`;

  return (
    <html
      lang={siteConfig.lang}
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <style dangerouslySetInnerHTML={{ __html: seasonalStyles }} />
        {process.env.NODE_ENV === "production" && (
          <script
            defer
            src="https://analytics.picafe.me/script.js"
            data-website-id="4d93445d-1e7a-4ae5-ad21-31e821a4c747"
          ></script>
        )}
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} ${atkinson.variable} ${argentCf.variable} h-full w-full bg-zinc-200 bg-[url('/paper-light.jpg')] bg-repeat text-stone-950 mix-blend-multiply dark:bg-zinc-900 dark:bg-[url('/topography-dark.svg')] dark:text-white dark:mix-blend-normal`}
      >
        <ThemeProvider>
          <main className="mt-4 mb-10 grid gap-12 overflow-hidden px-5 antialiased sm:mx-auto sm:max-w-2xl sm:px-8 md:max-w-6xl md:overflow-visible lg:px-10">
            <Navbar />
            {children}
          </main>
          <Footer />
          <TwSizeIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
