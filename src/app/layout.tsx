import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
	createBaseMetadata,
	getOrganizationJsonLd,
	getWebsiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
				{children}
			</body>
		</html>
	);
}
