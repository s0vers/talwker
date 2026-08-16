"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useRef, type ReactNode } from "react";
import { STORY_DETAIL_COPY } from "@/features/stories/content/stories-page-copy";
import {
	createStaggerReveal,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import type { Destination, Tour } from "@/shared/types/domain";

type StoryDetailsRelatedProps = {
	destination?: Destination;
	destinationSlug?: string;
	tour?: Tour;
	tourSlug?: string;
};

type RelatedCardProps = {
	href: string;
	image: string;
	imageAlt: string;
	kind: string;
	title: ReactNode;
	subtitle?: string;
	cta: string;
};

function RelatedCard({
	href,
	image,
	imageAlt,
	kind,
	title,
	subtitle,
	cta,
}: RelatedCardProps) {
	return (
		<li data-st-related>
			<Link
				href={href}
				className="group grid gap-5 border border-white/10 bg-[#0a0a0a] p-4 transition-colors hover:border-white/25 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-center sm:gap-6 sm:p-5"
			>
				<div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
					<Image
						src={image}
						alt={imageAlt}
						fill
						sizes="(max-width: 640px) 100vw, 280px"
						className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
					/>
				</div>
				<div>
					<p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
						{kind}
					</p>
					<p className="mt-2 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-orange-400">
						{title}
					</p>
					{subtitle ? (
						<p className="mt-2 text-sm text-white/45">{subtitle}</p>
					) : null}
					<span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400 transition-colors group-hover:text-orange-300">
						{cta}
						<span aria-hidden>→</span>
					</span>
				</div>
			</Link>
		</li>
	);
}

export default function StoryDetailsRelated({
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
		[destinationSlug, tourSlug],
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
					{STORY_DETAIL_COPY.relatedHeading}
				</h2>

				<ul className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
					{hasDestination && destination && destinationSlug ? (
						<RelatedCard
							href={`/destinations/${destinationSlug}`}
							image={destination.image}
							imageAlt={`${destination.name}, ${destination.country}`}
							kind={STORY_DETAIL_COPY.destinationKind}
							title={
								<>
									{destination.name}
									<span className="text-white/40">, {destination.country}</span>
								</>
							}
							cta={STORY_DETAIL_COPY.relatedDestinationCta}
						/>
					) : null}

					{hasTour && tour && tourSlug ? (
						<RelatedCard
							href={`/tours/${tourSlug}`}
							image={tour.image}
							imageAlt={tour.title}
							kind={STORY_DETAIL_COPY.tourKind}
							title={tour.title}
							subtitle={tour.destination}
							cta={STORY_DETAIL_COPY.relatedTourCta}
						/>
					) : null}
				</ul>
			</div>
		</section>
	);
}
