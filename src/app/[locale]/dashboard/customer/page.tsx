import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import CustomerDashboardPage from "@/features/dashboard/customer-dashboard-page";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Customer dashboard",
		description:
			"A UI preview of a Talkwer booking, itinerary, and travel rules.",
		path: "/dashboard/customer",
		locale
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	return (
		<RouteMessages namespaces={[]}>
			<CustomerDashboardPage locale={locale} />
		</RouteMessages>
	);
}
