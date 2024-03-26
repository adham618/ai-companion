import { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";

import { cn } from "@/lib/utils";

import { siteConfig } from "@/config/site";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  keywords: [
    "AI",
    "OpenAI",
    "ChatGPT",
    "Next.js",
    "Tailwind CSS",
    "AI Companion",
    "AI Companion - Chat with AI",
    "Chat with AI",
    "AI Companion - OpenAI ChatGPT",
    "AI Companion - OpenAI - ChatGPT - Next.js",
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    // images: [
    //   {
    //     url: siteConfig.ogImage,
    //     width: 1200,
    //     height: 630,
    //     alt: siteConfig.name,
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    // images: [siteConfig.ogImage],
    creator: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: `/favicon/site.webmanifest`,
  other: {
    icon: "/favicon/favicon-32x32.png",
    "mask-icon": "/favicon/safari-pinned-tab.svg",
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/favicon/mstile-150x150.png",
    "msapplication-config": "/favicon/browserconfig.xml",
  },
  // verification: {
  //   google: "1234567890",
  //   yandex: "1234567890",
  // },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={cn("min-h-screen bg-[#F0F5F8]", inter.className)}>
        {children}
      </body>
    </html>
  );
}
