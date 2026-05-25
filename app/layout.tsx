import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnOS — Your Learning Dashboard",
  description: "Track your learning journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="animated-bg text-zinc-100 min-h-screen bg-zinc-950">
        {children}
      </body>
    </html>
  );
}