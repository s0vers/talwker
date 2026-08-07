"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { TOURS_CATALOG } from "@/features/tours/content/tours-page-copy";
import { formatTourPrice } from "@/features/tours/lib/format-tour-price";
import { getTourSlug } from "@/features/tours/lib/tour-slug";
import { toursMatchDestinationFilter } from "@/features/tours/lib/tours-list-params";
import {
	createStaggerReveal,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import type { Tour } from "@/shared/types/domain";

type ToursCatalogProps = {
	tours: Tour[];
	destinationFilter?: string;
};

export default function ToursCatalog({
	tours,
	destinationFilter,
}: ToursCatalogProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const showEmptyNote =
		Boolean(destinationFilter) &&
		!toursMatchDestinationFilter(tours, destinationFilter);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const rows = sectionRef.current?.querySelectorAll("[data-tour-row]");
			if (!rows?.length) return;
			createStaggerReveal(rows, sectionRef.current, {
				y: 22,
				duration: 0.65,
				stagger: 0.05,
				start: "top 88%",
			});
		},
		[tours, destinationFilter],
	);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="tours-catalog-heading"
			className="border-t border-white/10 bg-[#050505] text-white"
		>
			<div className="mx-auto max-w-[1600px] pad-x py-12 md:py-16">
				<div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
							{TOURS_CATALOG.heading}
						</p>
						<h2
							id="tours-catalog-heading"
							className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl"
						>
							{tours.length} route{tours.length === 1 ? "" : "s"}
						</h2>
					</div>
					{showEmptyNote ? (
						<p className="max-w-md text-sm text-white/40 md:text-right">
							{TOURS_CATALOG.emptyFilterNote}
						</p>
					) : null}
				</div>

				<ul className="flex flex-col gap-3 md:gap-3.5">
					{tours.map((tour) => {
						const slug = getTourSlug(tour);
						const thumb = tour.panelImage ?? tour.image;

						return (
							<li key={tour.id}>
								<Link
									href={`/tours/${slug}`}
									data-tour-row
									aria-label={`${TOURS_CATALOG.openLabel}: ${tour.title}`}
									className="group grid gap-4 rounded-2xl border border-orange-500/15 bg-[#0a0a0a] p-4 transition-[border-color,background-color] duration-300 hover:border-orange-500/35 hover:bg-orange-500/3 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6 sm:p-5 md:grid-cols-[9rem_minmax(0,1fr)_auto]"
								>
									<div className="relative aspect-4/3 overflow-hidden rounded-xl border border-white/10 sm:aspect-5/4 sm:h-[4.75rem] sm:w-full">
										<Image
											src={thumb}
											alt=""
											fill
											sizes="(max-width: 640px) 100vw, 144px"
											className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
										/>
									</div>

									<div className="min-w-0">
										<h3 className="text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-orange-400 md:text-xl">
											{tour.title}
										</h3>
										<p className="mt-1 text-sm text-white/40">{tour.destination}</p>
										<p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">
											<span>{tour.duration}</span>
											<span className="mx-2 text-white/20" aria-hidden>
												·
											</span>
											<span>{tour.groupSize}</span>
											<span className="mx-2 text-white/20" aria-hidden>
												·
											</span>
											<span>
												{TOURS_CATALOG.fromPrefix}{" "}
												<span className="text-orange-400">
													{formatTourPrice(tour.price)}
												</span>
											</span>
										</p>
										<p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/50 line-clamp-2">
											{tour.summary}
										</p>
									</div>

									<span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-400 transition-colors group-hover:text-orange-300 sm:justify-self-end">
										{TOURS_CATALOG.openLabel}
										<span aria-hidden>→</span>
									</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
