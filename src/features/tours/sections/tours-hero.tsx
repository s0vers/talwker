"use client";

import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { TOURS_PAGE_HERO } from "@/features/tours/content/tours-page-copy";
import { getTourSlug } from "@/features/tours/lib/tour-slug";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import type { Tour } from "@/shared/types/domain";

type ToursHeroProps = {
	tours: Tour[];
	destinationFilter?: string;
};

export default function ToursHero({ tours, destinationFilter }: ToursHeroProps) {
	const sectionRef = useRef<HTMLElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const nodes = sectionRef.current?.querySelectorAll("[data-hero-item]");
			if (!nodes?.length) return;
			gsap.from(nodes, {
				y: 28,
				opacity: 0,
				duration: 0.85,
				stagger: 0.06,
				ease: "power3.out",
			});
		},
		[destinationFilter, tours],
	);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="tours-page-title"
			className="relative overflow-hidden bg-[#050505] text-white"
		>
			{/* Ambient — itinerary ruler, not destinations compass grid */}
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_0%_0%,rgba(249,115,22,0.11),transparent_50%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.04]"
				style={{
					backgroundImage:
						"repeating-linear-gradient(-28deg, transparent, transparent 52px, rgba(255,255,255,0.55) 52px, rgba(255,255,255,0.55) 53px)",
				}}
				aria-hidden
			/>

			<div className="relative z-10 mx-auto max-w-[1600px] pad-x pb-10 pt-28 md:pb-14 md:pt-36">
				{/* Day ruler — unique to tours */}
				<div
					data-hero-item
					className="mb-10 flex items-center gap-0 border-b border-white/10 pb-4 md:mb-14"
					aria-hidden
				>
					<span className="mr-4 shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-orange-500/80">
						{TOURS_PAGE_HERO.kicker}
					</span>
					<div className="flex min-w-0 flex-1 items-end justify-between gap-1">
						{TOURS_PAGE_HERO.dayMarks.map((mark, i) => (
							<span
								key={mark}
								className="flex flex-1 flex-col items-center gap-2"
							>
								<span
									className={`h-2 w-px ${i === 0 ? "bg-orange-500/70" : "bg-white/20"}`}
								/>
								<span
									className={`font-mono text-[9px] tracking-[0.12em] ${
										i === 0 ? "text-orange-500/90" : "text-white/25"
									}`}
								>
									{mark}
								</span>
							</span>
						))}
						<span className="hidden flex-1 flex-col items-center gap-2 sm:flex">
							<span className="h-2 w-px bg-white/15" />
							<span className="font-mono text-[9px] tracking-[0.12em] text-white/20">
								…
							</span>
						</span>
					</div>
				</div>

				<div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
					<div className="lg:col-span-6">
						<div className="flex gap-5 md:gap-7">
							<div
								className="mt-1 hidden h-[min(10rem,24vh)] w-1.5 shrink-0 overflow-hidden rounded-full sm:block"
								aria-hidden
							>
								<div
									data-hero-item
									className="h-full w-full origin-top rounded-full bg-linear-to-b from-orange-500 via-orange-500/40 to-transparent"
								/>
							</div>
							<div className="min-w-0">
								<h1
									id="tours-page-title"
									className="m-0 text-[clamp(2.75rem,9vw,5.75rem)] font-bold leading-[0.9] tracking-tighter"
								>
									<span data-hero-item className="block text-white">
										{TOURS_PAGE_HERO.titleLine1}
									</span>
									<span
										data-hero-item
										className="mt-1 block font-light italic text-orange-500"
									>
										{TOURS_PAGE_HERO.titleAccent}
									</span>
								</h1>
								<p
									data-hero-item
									className="mt-8 max-w-md border-l border-white/10 pl-5 text-sm leading-relaxed text-white/55 md:mt-10 md:text-base"
								>
									{TOURS_PAGE_HERO.description}
								</p>
								{destinationFilter ? (
									<p
										data-hero-item
										className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45"
									>
										<span className="text-white/30">
											{TOURS_PAGE_HERO.filterLabel}
										</span>{" "}
										<span className="text-white/80">{destinationFilter}</span>
									</p>
								) : null}
							</div>
						</div>
					</div>

					<div className="lg:col-span-6" data-hero-item>
						<p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/30">
							{TOURS_PAGE_HERO.boardHint}
						</p>
						<div
							className="mt-4 flex items-baseline justify-between gap-4 border-b border-orange-500/30 pb-3"
						>
							<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
								{TOURS_PAGE_HERO.boardEyebrow}
							</p>
							<p className="font-mono text-[11px] tabular-nums tracking-[0.14em] text-white/40">
								{String(tours.length).padStart(2, "0")}{" "}
								{TOURS_PAGE_HERO.boardMeta}
							</p>
						</div>

						<ul className="divide-y divide-white/8">
							{tours.map((tour, index) => (
								<li key={tour.id}>
									<Link
										href={`/tours/${getTourSlug(tour)}`}
										className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-3 py-3.5 transition-colors md:grid-cols-[2.75rem_1fr_auto_1.25rem] md:gap-4"
									>
										<span className="font-mono text-[11px] tabular-nums tracking-[0.14em] text-orange-500/75">
											{String(index + 1).padStart(2, "0")}
										</span>
										<span className="min-w-0 truncate text-[14px] font-medium tracking-wide text-white/65 transition-colors group-hover:text-white md:text-[15px]">
											{tour.title}
										</span>
										<span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-white/30 group-hover:text-white/50">
											{tour.itinerary.length} {TOURS_PAGE_HERO.daysSuffix}
										</span>
										<span
											className="hidden text-orange-500/0 transition-colors group-hover:text-orange-500 md:block"
											aria-hidden
										>
											→
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div
					data-hero-item
					className="mt-12 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/25 md:mt-16"
				>
					<span
						className="h-10 w-px bg-linear-to-b from-orange-500/45 to-transparent"
						aria-hidden
					/>
					<span>{TOURS_PAGE_HERO.scrollCue}</span>
				</div>
			</div>
		</section>
	);
}
