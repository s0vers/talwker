import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BasicLayout from "@/components/BasicLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voyager Travel — Discover Your Next Adventure",
  description:
    "Crafting unforgettable travel experiences. Explore breathtaking destinations, curated tours, and exclusive deals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <BasicLayout>{children}</BasicLayout>
      </body>
    </html>
  );
}
