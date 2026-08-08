import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SKIP_TO_MAIN_LABEL } from "@/features/home/content/section-copy";
import { Footer, Navbar } from "@/features/home/sections";
import { SiteCookieConsent } from "@/shared/ui";
import {
	createBaseMetadata,
	getOrganizationJsonLd,
	getWebsiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const skipToMainClassName =
	"sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-md focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-orange-500";

export const metadata: Metadata = createBaseMetadata();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-scroll-behavior="smooth">
			<body className={inter.className}>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(getOrganizationJsonLd()),
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebsiteJsonLd()) }}
				/>
				<a href="#main-content" className={skipToMainClassName}>
					{SKIP_TO_MAIN_LABEL}
				</a>
				<Navbar />
				<main id="main-content" className="relative bg-[#050505] text-white">
					{children}
				</main>
				<Footer />
				<SiteCookieConsent />
			</body>
		</html>
	);
}

