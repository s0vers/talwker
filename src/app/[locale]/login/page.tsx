import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import LoginPage from "@/features/auth/login-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Sign in",
		description:
			"Sign in to Talkwer. Demo account shell — no credentials are stored or verified.",
		path: "/login",
		locale,
		keywords: ["talkwer login", "sign in", "account"]
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Sign in", path: "/login" }
	]);

	return (
		<RouteMessages namespaces={["Auth"]}>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<Suspense fallback={<div className="min-h-[100svh] bg-[#050505]" />}>
					<LoginPage />
				</Suspense>
			</>
		</RouteMessages>
	);
}
