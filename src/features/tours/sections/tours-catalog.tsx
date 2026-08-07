"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { TOURS_CATALOG } from "@/features/tours/content/tours-page-copy";
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

function formatIndex(index: number): string {
	return String(index + 1).padStart(2, "0");
}

function formatPrice(price: number): string {
	return `$${price.toLocaleString("en-US")}`;
}

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
				y: 28,
				duration: 0.7,
				stagger: 0.06,
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
			<div className="mx-auto max-w-[1600px] pad-x py-14 md:py-20">
				<div className="mb-8 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
							{TOURS_CATALOG.heading}
						</p>
						<h2
							id="tours-catalog-heading"
							className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl"
						>
							{tours.length} departure{tours.length === 1 ? "" : "s"}
						</h2>
					</div>
					{showEmptyNote ? (
						<p className="max-w-md text-sm text-white/40 md:text-right">
							{TOURS_CATALOG.emptyFilterNote}
						</p>
					) : null}
				</div>

				<ul className="flex flex-col gap-3 md:gap-4">
					{tours.map((tour, index) => {
						const slug = getTourSlug(tour);
						const thumb = tour.panelImage ?? tour.image;
						const zebra = index % 2 === 1;

						return (
							<li key={tour.id}>
								<Link
									href={`/tours/${slug}`}
									data-tour-row
									aria-label={`${TOURS_CATALOG.openLabel}: ${tour.title}`}
									className={`group grid gap-5 rounded-2xl border border-white/10 p-4 transition-[border-color,background-color] duration-300 hover:border-white/25 hover:bg-white/[0.03] sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6 sm:p-5 md:grid-cols-[13rem_minmax(0,1fr)] ${
										zebra ? "bg-white/[0.02]" : "bg-transparent"
									}`}
								>
									<div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 sm:aspect-auto sm:h-full sm:min-h-[7.5rem]">
										<Image
											src={thumb}
											alt=""
											fill
											sizes="(max-width: 640px) 100vw, 208px"
											className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
										/>
									</div>

									<div className="flex min-w-0 flex-col justify-center">
										<div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
											<span className="font-mono text-[11px] tracking-[0.18em] text-orange-500/90">
												[{formatIndex(index)}]
											</span>
											<h3 className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-orange-400 md:text-2xl">
												{tour.title}
											</h3>
										</div>

										<p className="mt-2 text-sm text-white/45">{tour.destination}</p>

										<p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
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
												<span className="text-orange-400">{formatPrice(tour.price)}</span>
											</span>
											<span className="mx-2 text-white/20" aria-hidden>
												·
											</span>
											<span>
												{TOURS_CATALOG.ratingPrefix} {tour.rating.toFixed(1)}
											</span>
										</p>

										<p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 md:text-[15px]">
											{tour.summary}
										</p>

										<span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400 transition-colors group-hover:text-orange-300">
											{TOURS_CATALOG.openLabel}
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
