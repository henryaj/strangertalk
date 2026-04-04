import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "~*~ StrangerTalk ~*~",
  description: "A 5-day scavenger hunt to talk to strangers. Based on research showing we're far too pessimistic about conversations with people we don't know.",
  openGraph: {
    title: "~*~ StrangerTalk ~*~",
    description: "A 5-day scavenger hunt to talk to strangers. Research shows conversations go better than you think.",
    type: "website",
    siteName: "StrangerTalk",
  },
  twitter: {
    card: "summary",
    title: "~*~ StrangerTalk ~*~",
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
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col font-sans">
        <div className="marquee-container bg-neon-pink text-black text-xs font-bold py-1">
          <div className="animate-marquee inline-block">
            ★ TALK TO STRANGERS ★ IT&apos;S NOT AS SCARY AS YOU THINK ★ 87% OF PEOPLE TALKED TO THE FIRST PERSON THEY APPROACHED ★ YOUR FEARS ARE EXAGGERATED ★ CONVERSATIONS GO BETTER THAN YOU PREDICT ★ TALK TO STRANGERS ★
          </div>
        </div>
        <main className="flex-1 px-4 py-8">{children}</main>
        <footer className="text-center text-xs text-neon-green py-4 opacity-60">
          ┌( ᐛ )┘ made with mass hysteria ┌( ᐛ )┘
        </footer>
      </body>
    </html>
  );
}
