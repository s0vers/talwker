"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { STORY_DETAIL_COPY } from "@/features/stories/content/stories-page-copy";
import {
	createStaggerReveal,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import type { Destination, Story, Tour } from "@/shared/types/domain";

type StoryDetailsRelatedProps = {
	story: Story;
	destination?: Destination;
	destinationSlug?: string;
	tour?: Tour;
	tourSlug?: string;
};

export default function StoryDetailsRelated({
	story,
	destination,
	destinationSlug,
	tour,
	tourSlug,
}: StoryDetailsRelatedProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const hasDestination = Boolean(destination && destinationSlug);
	const hasTour = Boolean(tour && tourSlug);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const cards = sectionRef.current?.querySelectorAll("[data-st-related]");
			if (!cards?.length) return;
			createStaggerReveal(cards, sectionRef.current, {
				y: 28,
				duration: 0.7,
				stagger: 0.08,
				start: "top 86%",
			});
		},
		[story.slug],
	);

	if (!hasDestination && !hasTour) return null;

	return (
		<section
			ref={sectionRef}
			aria-labelledby="story-related-heading"
			className="border-b border-white/10 bg-[#070707] text-white"
		>
			<div className="mx-auto max-w-[1600px] pad-x py-16 md:py-24">
				<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
					{STORY_DETAIL_COPY.relatedLabel}
				</p>
				<h2
					id="story-related-heading"
					className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl"
				>
					Where the essay points next
				</h2>

				<ul className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
					{hasDestination && destination && destinationSlug ? (
						<li data-st-related>
							<Link
								href={`/destinations/${destinationSlug}`}
								className="group grid gap-5 border border-white/10 bg-[#0a0a0a] p-4 transition-colors hover:border-white/25 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-center sm:gap-6 sm:p-5"
							>
								<div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
									<Image
										src={destination.image}
										alt={`${destination.name}, ${destination.country}`}
										fill
										sizes="(max-width: 640px) 100vw, 280px"
										className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
									/>
								</div>
								<div>
									<p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
										Destination
									</p>
									<p className="mt-2 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-orange-400">
										{destination.name}
										<span className="text-white/40">, {destination.country}</span>
									</p>
									<span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400 transition-colors group-hover:text-orange-300">
										{STORY_DETAIL_COPY.relatedDestinationCta}
										<span aria-hidden>→</span>
									</span>
								</div>
							</Link>
						</li>
					) : null}

					{hasTour && tour && tourSlug ? (
						<li data-st-related>
							<Link
								href={`/tours/${tourSlug}`}
								className="group grid gap-5 border border-white/10 bg-[#0a0a0a] p-4 transition-colors hover:border-white/25 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-center sm:gap-6 sm:p-5"
							>
								<div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
									<Image
										src={tour.image}
										alt={tour.title}
										fill
										sizes="(max-width: 640px) 100vw, 280px"
										className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
									/>
								</div>
								<div>
									<p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
										Tour
									</p>
									<p className="mt-2 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-orange-400">
										{tour.title}
									</p>
									<p className="mt-2 text-sm text-white/45">{tour.destination}</p>
									<span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400 transition-colors group-hover:text-orange-300">
										{STORY_DETAIL_COPY.relatedTourCta}
										<span aria-hidden>→</span>
									</span>
								</div>
							</Link>
						</li>
					) : null}
				</ul>
			</div>
		</section>
	);
}
