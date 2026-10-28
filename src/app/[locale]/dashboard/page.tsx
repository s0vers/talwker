import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import DashboardPage from "@/features/dashboard/dashboard-page";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Admin dashboard",
		description:
			"A UI preview of the Talkwer admin workspace for meetings, itineraries, and website content.",
		path: "/dashboard",
		locale
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	return (
		<RouteMessages namespaces={[]}>
			<DashboardPage locale={locale} />
		</RouteMessages>
	);
}
