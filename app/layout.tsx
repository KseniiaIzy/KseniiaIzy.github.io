import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const syne = Syne({ variable: "--font-syne", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const title = "Ksenia Isidorova — AI Specialist & Technical Artist";
  const description = "Portfolio of Ksenia Isidorova, an AI specialist and technical artist building generative models, creative workflows, and production-ready AI systems.";

  return {
    metadataBase,
    title,
    description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title, description, type: "website", images: [{ url: new URL("/og.png", metadataBase).toString(), width: 1792, height: 933, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og.png", metadataBase).toString()] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${syne.variable}`}>{children}</body>
    </html>
  );
}
