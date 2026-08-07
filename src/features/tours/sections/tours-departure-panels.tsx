"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { TOURS_DEPARTURE_PANELS } from "@/features/tours/content/tours-page-copy";
import { getTourSlug } from "@/features/tours/lib/tour-slug";
import { toursMatchDestinationFilter } from "@/features/tours/lib/tours-list-params";
import {
	createElementParallax,
	gsap,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import type { Tour } from "@/shared/types/domain";

type ToursDeparturePanelsProps = {
	tours: Tour[];
	destinationFilter?: string;
};

function formatIndex(index: number): string {
	return String(index + 1).padStart(2, "0");
}

function formatPrice(price: number): string {
	return `$${price.toLocaleString("en-US")}`;
}

export default function ToursDeparturePanels({
	tours,
	destinationFilter,
}: ToursDeparturePanelsProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const showEmptyNote =
		Boolean(destinationFilter) && !toursMatchDestinationFilter(tours, destinationFilter);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const root = sectionRef.current;
			if (!root) return;

			const panels = root.querySelectorAll<HTMLElement>("[data-tour-panel]");
			if (!panels.length) return;

			panels.forEach((panel) => {
				const copy = panel.querySelector("[data-tour-panel-copy]");
				const media = panel.querySelector("[data-tour-panel-image]");

				if (copy) {
					gsap.from(copy, {
						y: 44,
						opacity: 0,
						duration: 0.9,
						ease: "power3.out",
						immediateRender: false,
						scrollTrigger: {
							trigger: panel,
							start: "top 78%",
							toggleActions: "play none none none",
						},
					});
				}

				if (media) {
					createElementParallax(media, panel, {
						fromY: -6,
						toY: 6,
						fromScale: 1.06,
						toScale: 1.02,
					});
				}
			});
		},
		[tours, destinationFilter],
	);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="tours-departure-heading"
			className="bg-[#050505] text-white"
		>
			<h2 id="tours-departure-heading" className="sr-only">
				{TOURS_DEPARTURE_PANELS.heading}
			</h2>

			{showEmptyNote ? (
				<p className="mx-auto max-w-[1600px] border-b border-white/10 pad-x py-6 text-sm text-white/40">
					{TOURS_DEPARTURE_PANELS.emptyFilterNote}
				</p>
			) : null}

			<div>
				{tours.map((tour, index) => {
					const slug = getTourSlug(tour);
					const panelSrc = tour.panelImage ?? tour.image;

					return (
						<Link
							key={tour.id}
							href={`/tours/${slug}`}
							className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
							aria-label={`${tour.title}. ${TOURS_DEPARTURE_PANELS.openLabel}`}
						>
							<article
								data-tour-panel
								className="relative min-h-[70svh] overflow-hidden border-b border-white/10 md:min-h-[85svh]"
							>
								<div className="absolute inset-0">
									<Image
										src={panelSrc}
										alt=""
										fill
										priority={index === 0}
										sizes="100vw"
										data-tour-panel-image
										className="object-cover will-change-transform transition-opacity duration-700 ease-out group-hover:opacity-85"
									/>
									<div
										className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/55 to-black/25"
										aria-hidden
									/>
									<div
										className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/25"
										aria-hidden
									/>
								</div>

								<div
									data-tour-panel-copy
									className="relative mx-auto flex min-h-[70svh] max-w-[1600px] flex-col justify-end pad-x pb-12 md:min-h-[85svh] md:pb-16"
								>
									<span className="font-mono text-xs tracking-[0.2em] text-orange-500">
										[{formatIndex(index)}]
									</span>
									<h3 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold tracking-tight text-white transition-transform duration-700 ease-out group-hover:-translate-y-1">
										{tour.title}
									</h3>
									<p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">
										{tour.duration}
										<span className="mx-2 text-white/25" aria-hidden>
											·
										</span>
										{tour.groupSize}
										<span className="mx-2 text-white/25" aria-hidden>
											·
										</span>
										{TOURS_DEPARTURE_PANELS.fromPrefix} {formatPrice(tour.price)}
									</p>
									<p className="mt-2 text-sm text-white/45">{tour.destination}</p>
								</div>
							</article>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
