"use client";

import Link from "next/link";
import { useRef } from "react";
import { TOURS_DOSSIER_LIST } from "@/features/tours/content/tours-page-copy";
import { getTourSlug } from "@/features/tours/lib/tour-slug";
import { toursMatchDestinationFilter } from "@/features/tours/lib/tours-list-params";
import {
	createStaggerReveal,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import type { Tour } from "@/shared/types/domain";

type ToursDossierListProps = {
	tours: Tour[];
	destinationFilter?: string;
};

function formatIndex(index: number): string {
	return String(index + 1).padStart(2, "0");
}

function formatPrice(price: number): string {
	return `$${price.toLocaleString("en-US")}`;
}

export default function ToursDossierList({
	tours,
	destinationFilter,
}: ToursDossierListProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const showEmptyNote =
		Boolean(destinationFilter) && !toursMatchDestinationFilter(tours, destinationFilter);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const rows = sectionRef.current?.querySelectorAll("[data-tour-row]");
			if (!rows?.length) return;
			createStaggerReveal(rows, sectionRef.current, {
				y: 36,
				duration: 0.75,
				stagger: 0.08,
				start: "top 84%",
			});
		},
		[tours, destinationFilter],
	);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="tours-dossier-heading"
			className="border-t border-white/10 bg-[#0a0a0a] text-white"
		>
			<div className="mx-auto max-w-[1600px] pad-x py-16 md:py-24">
				<div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
							{TOURS_DOSSIER_LIST.label}
						</p>
						<h2
							id="tours-dossier-heading"
							className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl"
						>
							{tours.length} departure{tours.length === 1 ? "" : "s"} on file
						</h2>
					</div>
					{showEmptyNote ? (
						<p className="max-w-md text-sm text-white/40 md:text-right">
							{TOURS_DOSSIER_LIST.emptyFilterNote}
						</p>
					) : null}
				</div>

				<ul className="divide-y divide-white/10 border-y border-white/10">
					{tours.map((tour, index) => {
						const slug = getTourSlug(tour);
						return (
							<li key={tour.id}>
								<Link
									href={`/tours/${slug}`}
									data-tour-row
									className="group grid gap-4 py-8 transition-colors hover:bg-white/[0.02] md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:gap-8 md:py-10"
								>
									<span className="font-mono text-xs tracking-[0.18em] text-orange-500/90 md:pt-1">
										[{formatIndex(index)}]
									</span>

									<div className="min-w-0">
										<div className="flex flex-col gap-3 lg:flex-row lg:items-baseline lg:justify-between lg:gap-8">
											<h3 className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-orange-400 md:text-2xl">
												{tour.title}
											</h3>
											<p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
												<span>{tour.duration}</span>
												<span className="mx-2 text-white/20" aria-hidden>
													|
												</span>
												<span>{tour.groupSize}</span>
												<span className="mx-2 text-white/20" aria-hidden>
													|
												</span>
												<span>
													{TOURS_DOSSIER_LIST.fromPrefix} {formatPrice(tour.price)}
												</span>
											</p>
										</div>

										<p className="mt-3 text-sm text-white/45">
											{tour.destination}
											<span className="mx-2 text-white/20" aria-hidden>
												·
											</span>
											<span>
												{TOURS_DOSSIER_LIST.ratingPrefix} {tour.rating.toFixed(1)}
											</span>
										</p>

										<p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/55 md:text-base">
											{tour.summary}
										</p>

										<span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400 transition-colors group-hover:text-orange-300">
											{TOURS_DOSSIER_LIST.viewItinerary}
											<span aria-hidden>→</span>
										</span>
									</div>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
