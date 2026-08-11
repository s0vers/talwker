import type { Metadata } from "next";
import { Suspense } from "react";
import LoginPage from "@/features/auth/login-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Sign in",
	description:
		"Sign in to Talkwer. Demo account shell — no credentials are stored or verified.",
	path: "/login",
	keywords: ["talkwer login", "sign in", "account"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Sign in", path: "/login" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<Suspense fallback={<main className="min-h-[100svh] bg-[#050505]" />}>
				<LoginPage />
			</Suspense>
		</>
	);
}
