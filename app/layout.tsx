import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";
import content from "@/content/site.json";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const syne = Syne({ variable: "--font-syne", subsets: ["latin"] });

const { title, description } = content.seo;

export const metadata: Metadata = {
  metadataBase: new URL("https://kseniiaizy.github.io"),
  title,
  description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title, description, type: "website", url: "/", images: [{ url: "/og-v2.png", width: 1731, height: 909, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-v2.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${syne.variable}`}>{children}</body>
    </html>
  );
}
