// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import ConditionalBottomNav from "@/components/ConditionalBottomNav";
import { ThemeProvider } from "next-themes";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UTrack",
  description: "Track your Utang",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="w-full overflow-auto h-screen pb-16">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ConditionalBottomNav />
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
