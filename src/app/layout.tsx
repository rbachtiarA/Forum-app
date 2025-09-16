import Provider from "@/utils/provider/Provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kriibo - Social Media",
  description:
    "A social media platform for everyone, share your thoughts and ideas, and discuss with others",
  icons: {
    icon: "/kriibo-logo.svg",
    shortcut: "/kriibo-logo.svg",
  },
  openGraph: {
    title: "Kriibo - Social Media",
    description:
      "A social media platform for everyone, share your thoughts and ideas, and discuss with others",
    url: "https://kriibo.vercel.app",
    siteName: "Kriibo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
