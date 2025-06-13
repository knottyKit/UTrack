import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // add weights you need
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
    <html lang="en" className={`${poppins.variable}  antialiased`}>
      <body className="w-full overflow-auto h-screen">
        {children} <Analytics /> <Toaster />
      </body>
    </html>
  );
}
