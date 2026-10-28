import { createTranslator } from "next-intl";
import source from "../../../../dictionary/en.json";
import type { Locale } from "@/i18n/routing";
import { resolveTimeZone } from "@/i18n/regional";
import { DESTINATIONS } from "../content/destinations";
import { getFeaturedDestinations } from "../content/featured-destinations";
import { TOURS } from "../content/tours";
import type { HomePageProps } from "../home-page";
import type { DestinationSummary } from "./destination-summary";

const dictionaries = {
	en: () => import("../../../../dictionary/en.json"),
	es: () => import("../../../../dictionary/es.json"),
	ja: () => import("../../../../dictionary/ja.json")
};

function toSummary({
	id,
	name,
	country,
	image,
	price,
	rating,
	duration,
	tag
}: DestinationSummary): DestinationSummary {
	return {
		id,
		name,
		country,
		image,
		price,
		rating,
		duration,
		...(tag === undefined ? {} : { tag })
	};
}

export async function getStaticHomeProps(
	locale: Locale
): Promise<HomePageProps> {
	const messages: typeof source = (await dictionaries[locale]()).default;
	const t = createTranslator({
		locale,
		messages,
		timeZone: resolveTimeZone(locale),
		onError(error) {
			throw error;
		}
	});
	function copy<Shape extends Record<string, string>>(
		namespace: string,
		shape: Shape
	): Record<keyof Shape, string> {
		// The English shape supplies every output key; translation errors fail the build.
		return Object.fromEntries(
			Object.keys(shape).map(key => [
				key,
				// Each caller pairs a dictionary namespace with its own English shape.
				t(`${namespace}.${key}` as Parameters<typeof t>[0])
			])
		) as Record<keyof Shape, string>;
	}
	return {
		locale,
		copy: {
			hero: copy("Home.hero", source.Home.hero),
			about: copy("Home.about", source.Home.about),
			cta: copy("Home.cta", source.Home.cta),
			navbar: copy("Navbar", source.Navbar),
			footer: copy("Footer", source.Footer),
			destinations: copy("Home.destinations", source.Home.destinations),
			tours: copy("Home.tours", source.Home.tours),
			testimonials: copy("Home.testimonials", source.Home.testimonials),
			newsletter: copy("Home.newsletter", source.Home.newsletter)
		},
		catalog: DESTINATIONS.map(toSummary),
		featuredDestinations: getFeaturedDestinations().map(toSummary),
		tours: TOURS.map(
			({
				id,
				slug,
				image,
				title,
				originalPrice,
				price,
				destination,
				rating,
				reviews,
				highlights,
				duration,
				groupSize,
				styles
			}) => ({
				id,
				slug,
				image,
				title,
				price,
				destination,
				rating,
				reviews,
				highlights,
				duration,
				groupSize,
				styles,
				...(originalPrice === undefined ? {} : { originalPrice })
			})
		)
	};
}
