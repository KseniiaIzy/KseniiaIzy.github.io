import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const syne = Syne({ variable: "--font-syne", subsets: ["latin"] });

const title = "Ksenia Isidorova — Applied AI Specialist";
const description = "Applied AI specialist delivering full-cycle AI R&D: research, custom development, integration, testing, technical documentation and support for companies, small teams and cultural initiatives.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kseniiaizy.github.io"),
  title,
  description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title, description, type: "website", url: "/", images: [{ url: "/og.png", width: 1792, height: 933, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${syne.variable}`}>{children}</body>
    </html>
  );
}
