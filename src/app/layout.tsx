import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/MobileBookingCTA";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Talkwer | Discover Your Next Adventure",
  description:
    "Experience the world with Talkwer. Discover curated travel experiences, exclusive deals, and unforgettable adventures to destinations worldwide.",
  keywords: [
    "travel",
    "vacation",
    "adventure",
    "tours",
    "trips",
    "holidays",
    "destinations",
  ],
  openGraph: {
    title: "Talkwer | Discover Your Next Adventure",
    description:
      "Experience the world with Talkwer. Discover curated travel experiences, exclusive deals, and unforgettable adventures.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
