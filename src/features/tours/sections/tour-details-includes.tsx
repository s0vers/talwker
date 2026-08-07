"use client";

import Link from "next/link";
import { useRef } from "react";
import { TOUR_DETAILS_INCLUDES } from "@/features/tours/content/tour-details-copy";
import {
	createStaggerReveal,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import type { Tour } from "@/shared/types/domain";

type TourDetailsIncludesProps = {
	tour: Tour;
};

export default function TourDetailsIncludes({ tour }: TourDetailsIncludesProps) {
	const sectionRef = useRef<HTMLElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const nodes = sectionRef.current?.querySelectorAll("[data-includes-item]");
			if (!nodes?.length) return;
			createStaggerReveal(nodes, sectionRef.current, {
				y: 28,
				duration: 0.7,
				stagger: 0.06,
				start: "top 84%",
			});
		},
		[tour.slug],
	);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="tour-details-includes-heading"
			className="bg-[#0a0a0a] text-white"
		>
			<div className="mx-auto max-w-[1600px] pad-x py-16 md:py-24">
				<div data-includes-item className="mb-10 md:mb-12">
					<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
						{TOUR_DETAILS_INCLUDES.label}
					</p>
					<h2
						id="tour-details-includes-heading"
						className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl"
					>
						{TOUR_DETAILS_INCLUDES.title}
					</h2>
				</div>

				<ul
					data-includes-item
					className="max-w-2xl divide-y divide-white/10 border-y border-white/10"
				>
					{tour.includes.map((item) => (
						<li
							key={item}
							className="py-4 text-sm leading-relaxed text-white/70 md:text-base"
						>
							{item}
						</li>
					))}
				</ul>

				<div data-includes-item className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
					<Link
						href={TOUR_DETAILS_INCLUDES.inquireHref}
						className="inline-flex items-center gap-2 border border-orange-500/80 bg-orange-500 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-orange-400"
					>
						{TOUR_DETAILS_INCLUDES.inquireLabel}
						<span aria-hidden>→</span>
					</Link>
					<a
						href={TOUR_DETAILS_INCLUDES.mailtoHref}
						className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-orange-400"
					>
						{TOUR_DETAILS_INCLUDES.mailtoLabel}
					</a>
				</div>
			</div>
		</section>
	);
}
