// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import ConditionalBottomNav from "@/components/ConditionalBottomNav";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Taguru",
  description: "Track your Utang",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={` antialiased`} suppressHydrationWarning>
      <body className="w-full overflow-auto h-screen pb-16">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ConditionalBottomNav />
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
