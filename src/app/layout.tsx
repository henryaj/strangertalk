import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StrangerTalk",
  description: "A 5-day scavenger hunt to talk to strangers. Based on research showing we're far too pessimistic about conversations with people we don't know.",
  openGraph: {
    title: "StrangerTalk",
    description: "A 5-day scavenger hunt to talk to strangers. Research shows conversations go better than you think.",
    type: "website",
    siteName: "StrangerTalk",
  },
  twitter: {
    card: "summary",
    title: "StrangerTalk",
    description: "A 5-day scavenger hunt to talk to strangers. Research shows conversations go better than you think.",
  },
  metadataBase: new URL("https://strangertalk.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans">
        <main className="flex-1 px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
