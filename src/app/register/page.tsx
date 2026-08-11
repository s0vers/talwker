import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterPage from "@/features/auth/register-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Register",
	description:
		"Create a Talkwer account. Demo registration shell — no account is created or stored.",
	path: "/register",
	keywords: ["talkwer register", "create account", "sign up"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Register", path: "/register" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<Suspense fallback={<main className="min-h-[100svh] bg-[#050505]" />}>
				<RegisterPage />
			</Suspense>
		</>
	);
}
