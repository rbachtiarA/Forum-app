import Provider from "@/utils/provider/Provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
    icon: "/Kriibo-logo.svg",
    shortcut: "/Kriibo-logo.svg",
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
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-PDTT6PZV2H"
      ></Script>
      <Script
        id="gta"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PDTT6PZV2H');
            `,
        }}
      />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
