import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import AuthMockupsPage from "@/features/auth-mockups/auth-mockups-page";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Sign in — Postcard concept",
		description: "Talkwer sign-in design mockup.",
		path: "/login-3",
		canonicalPath: "/login",
		locale,
		index: false,
		follow: false
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	return (
		<RouteMessages namespaces={["Auth"]}>
			<Suspense fallback={<div className="min-h-[100svh] bg-[#071013]" />}>
				<AuthMockupsPage mode="login" variant="postcard" />
			</Suspense>
		</RouteMessages>
	);
}
