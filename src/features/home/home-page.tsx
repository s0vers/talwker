import type { Locale } from "@/i18n/routing";
import type { Tour } from "@/shared/types/domain";
import type { TourCardProps } from "@/shared/ui";
import type { DestinationSummary } from "./lib/destination-summary";
import type { HomeClientCopy } from "./lib/home-client-copy";
import type {
	AboutCopy,
	CtaCopy,
	FooterCopy,
	HeroCopy
} from "./lib/home-static-copy";
import type { NavbarCopy } from "./sections/navbar-copy";
import About from "./sections/about";
import { CtaView } from "./sections/cta-view";
import Destinations from "./sections/destinations-explorer";
import FeaturedTours from "./sections/featured-tours";
import { FooterView } from "./sections/footer-view";
import Hero from "./sections/hero";
import { HomeHead } from "./sections/home-head";
import Marquee from "./sections/marquee";
import Navbar from "./sections/navbar";
import Newsletter from "./sections/newsletter";
import { SiteFrame } from "./sections/site-frame";
import Testimonials from "./sections/testimonials";

export type HomePageProps = {
	locale: Locale;
	copy: HomeClientCopy & {
		hero: HeroCopy;
		about: AboutCopy;
		cta: CtaCopy;
		navbar: NavbarCopy;
		footer: FooterCopy;
	};
	catalog: DestinationSummary[];
	featuredDestinations: DestinationSummary[];
	tours: Array<TourCardProps["tour"] & Pick<Tour, "id" | "slug" | "styles">>;
};

export default function HomePage({
	locale,
	copy,
	catalog,
	featuredDestinations,
	tours
}: HomePageProps) {
	return (
		<>
			<HomeHead locale={locale} />
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-70 focus:rounded-md focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
			>
				Skip to main content
			</a>
			<SiteFrame
				navbar={<Navbar copy={copy.navbar} />}
				footer={<FooterView copy={copy.footer} />}
			>
				<Hero copy={copy.hero} />
				<Marquee />
				<Destinations
					catalog={catalog}
					featured={featuredDestinations}
					copy={copy.destinations}
				/>
				<About copy={copy.about} />
				<FeaturedTours tours={tours} copy={copy.tours} />
				<Testimonials copy={copy.testimonials} />
				<Newsletter copy={copy.newsletter} />
				<CtaView copy={copy.cta} />
			</SiteFrame>
		</>
	);
}
