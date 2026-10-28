import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import RegisterPage from "@/features/auth/register-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Sign up",
		description:
			"Create a Talkwer account. Demo registration shell — no account is created or stored.",
		path: "/register",
		locale,
		keywords: ["talkwer register", "create account", "sign up"]
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Sign up", path: "/register" }
	]);

	return (
		<RouteMessages namespaces={["Auth"]}>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<Suspense fallback={<div className="min-h-[100svh] bg-[#050505]" />}>
					<RegisterPage />
				</Suspense>
			</>
		</RouteMessages>
	);
}
