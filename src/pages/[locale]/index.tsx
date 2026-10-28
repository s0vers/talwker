import type { GetStaticPaths, GetStaticProps } from "next";
import HomePage, { type HomePageProps } from "@/features/home/home-page";
import { getStaticHomeProps } from "@/features/home/lib/get-static-home-props";
import { routing, type Locale } from "@/i18n/routing";

function isLocale(value: unknown): value is Locale {
	return (
		typeof value === "string" &&
		routing.locales.some(locale => locale === value)
	);
}

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: routing.locales.map(locale => ({ params: { locale } })),
	fallback: false
});

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
	params
}) => {
	const locale = params?.locale;
	if (!isLocale(locale)) return { notFound: true };
	return { props: await getStaticHomeProps(locale) };
};

export default HomePage;
