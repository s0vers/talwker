import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SiteFrame } from "@/features/home/sections/site-frame";
import NavbarServer from "@/features/home/sections/navbar-server";
import Footer from "@/features/home/sections/footer";
import {
	createBaseMetadata,
	getOrganizationJsonLd,
	getWebsiteJsonLd
} from "@/lib/seo";
import "../shell.css";

const skipToMainClassName =
	"sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-md focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-orange-500";

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }));
}

export const metadata: Metadata = createBaseMetadata();

export default async function LocaleLayout({
	children,
	params
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
		notFound();
	}
	setRequestLocale(locale);
	const messages = await getMessages({ locale });

	return (
		<html
			lang={locale}
			dir="ltr"
			data-scroll-behavior="smooth"
			suppressHydrationWarning
		>
			<head>
				<link
					rel="preload"
					href="/fonts/inter-latin-core.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
			</head>
			<body suppressHydrationWarning>
				<NextIntlClientProvider
					messages={{
						Common: messages.Common
					}}
					locale={locale}
				>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(getOrganizationJsonLd())
						}}
					/>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(getWebsiteJsonLd())
						}}
					/>
					<a href="#main-content" className={skipToMainClassName}>
						Skip to main content
					</a>
					<SiteFrame navbar={<NavbarServer />} footer={<Footer />}>
						{children}
					</SiteFrame>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
