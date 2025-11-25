import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "ChatPT Atlas",
  description:
    "Explore the evolving landscape of AI-powered conversational tools, prompt kits, and agent frameworks."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-atlas-sand/40 text-atlas-blue antialiased font-sans">
        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-16 pt-10 sm:px-8 md:px-10">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(30,_133,_127,_0.12),_transparent_55%)]" />
          {children}
          <footer className="mt-auto flex flex-col gap-2 border-t border-atlas-blue/10 pt-6 text-sm text-atlas-blue/70 sm:flex-row sm:items-center sm:justify-between">
            <p>ChatPT Atlas · Mapping the conversational AI ecosystem</p>
            <p>
              Crafted with curiosity · Data refreshed manually ·{" "}
              <a href="mailto:hello@chatptatlas.ai">Contact</a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
