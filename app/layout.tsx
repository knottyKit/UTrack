import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import ConditionalBottomNav from "@/components/ConditionalBottomNav";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased dark`}>
      <body className="w-full overflow-auto h-screen pb-16">
        {children}
        <ConditionalBottomNav />
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
