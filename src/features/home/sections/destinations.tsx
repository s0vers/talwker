"use client";

import { useRef } from "react";
import { LuArrowRight } from "react-icons/lu";
import {
	gsap,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import { DESTINATIONS } from "@/features/home/content/destinations";
import { destinationToSlug } from "@/features/destinations/lib/destination-slug";
import { DESTINATIONS_SECTION } from "@/features/home/content/section-copy";
import { DestinationCard, SectionCta, SectionHeading } from "@/shared/ui";

export default function Destinations() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const section = sectionRef.current;
			const track = trackRef.current;
			const heading = headingRef.current;
			if (!section || !track) return;

			const totalScroll = () => {
				const scrollWidth = track.scrollWidth;
				const viewport = track.parentElement?.clientWidth ?? window.innerWidth;
				return Math.max(0, scrollWidth - viewport);
			};

			gsap.to(track, {
				x: () => -totalScroll(),
				ease: "none",
				scrollTrigger: {
					trigger: heading ?? section,
					start: "top top+=120",
					end: () => `+=${totalScroll()}`,
					pin: section,
					scrub: true,
					invalidateOnRefresh: true,
				},
			});
		},
		[],
	);

	return (
		<section
			ref={sectionRef}
			id="destinations"
			aria-labelledby="destinations-title"
			className="bg-[#070707] py-28 md:py-36"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div
					ref={headingRef}
					className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between"
				>
					<SectionHeading
						containerClassName="max-w-xl"
						label={DESTINATIONS_SECTION.label}
						labelId="destinations-label"
						title={DESTINATIONS_SECTION.title}
						titleId="destinations-title"
						description={DESTINATIONS_SECTION.description}
						descriptionId="destinations-description"
						labelClassName="mb-3"
						descriptionClassName="mt-4 text-white/55"
					/>
					<div className="hidden shrink-0 flex-col items-end text-right text-[11px] uppercase tracking-[0.22em] text-white/35 md:flex">
						<span className="text-white/55">0{DESTINATIONS.length}</span>
						<span className="mt-1 h-px w-10 bg-white/15" />
						<span className="mt-2">{DESTINATIONS_SECTION.countSuffix}</span>
					</div>
				</div>

				<div className="relative overflow-hidden">
					<div ref={trackRef} className="flex gap-6 md:gap-8">
						{DESTINATIONS.map((dest) => (
							<DestinationCard
								key={dest.id}
								destination={dest}
								fromLabel={DESTINATIONS_SECTION.fromLabel}
								exploreButtonLabel={DESTINATIONS_SECTION.exploreButtonLabel}
								href={`/destinations/${destinationToSlug(dest)}`}
							/>
						))}
					</div>
				</div>

				<div className="mt-12 text-center">
					<SectionCta
						href="/destinations"
						icon={<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
					>
						{DESTINATIONS_SECTION.viewAllCta}
					</SectionCta>
				</div>
			</div>
		</section>
	);
}

