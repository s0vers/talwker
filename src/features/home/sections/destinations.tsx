"use client";

import Image from "next/image";
import { useRef } from "react";
import { LuStar, LuClock, LuArrowRight } from "react-icons/lu";
import {
	gsap,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import { DESTINATIONS } from "@/features/home/content/destinations";
import { DESTINATIONS_SECTION } from "@/features/home/content/section-copy";
import { SectionCta, SectionHeading } from "@/shared/ui";

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
							<div
								key={dest.id}
								data-destination-card
								className="relative isolate h-[460px] min-w-[80vw] cursor-pointer overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#050505] shadow-[0_20px_60px_rgba(0,0,0,0.9)] sm:min-w-[65vw] md:h-[500px] lg:min-w-[380px] xl:min-w-[400px]"
							>
								<div className="absolute inset-0 overflow-hidden rounded-[1.9rem]">
									<Image
										src={dest.image}
										alt={dest.name}
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 33vw"
										data-destination-image
										className="object-cover"
									/>
								</div>
								<div className="absolute inset-0 rounded-[1.9rem] bg-linear-to-t from-black/85 via-black/35 to-transparent" />

								{dest.tag && (
									<span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-md">
										{dest.tag}
									</span>
								)}

								<div className="absolute inset-x-5 bottom-5 flex flex-col gap-4">
									<div>
										<h3 className="text-[1.7rem] font-semibold tracking-tight text-white md:text-[1.9rem]">
											{dest.name}
										</h3>
										<p className="mt-1 text-sm text-white/70">{dest.country}</p>
									</div>

									<div className="flex items-center justify-between text-xs text-white/70">
										<div className="flex items-center gap-2">
											<LuClock className="h-4 w-4 text-orange-500" />
											<span>{dest.duration}</span>
										</div>
										<div className="flex items-center gap-1 rounded-full bg-black/55 px-3 py-1.5 text-[11px] backdrop-blur">
											<LuStar className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
											<span className="font-semibold text-white">
												{dest.rating}
											</span>
										</div>
									</div>

									<div className="flex items-center justify-between">
										<div className="text-xs text-white/70">
											<p className="uppercase tracking-[0.18em] text-white/40">
												{DESTINATIONS_SECTION.fromLabel}
											</p>
											<p className="mt-1 text-base font-semibold tracking-tight text-orange-500">
												${dest.price.toLocaleString()}
											</p>
										</div>
										<button
											type="button"
											aria-label={`${DESTINATIONS_SECTION.exploreButtonLabel} ${dest.name}`}
											className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#050505] shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
										>
											{DESTINATIONS_SECTION.exploreButtonLabel}
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="mt-12 text-center">
					<SectionCta icon={<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}>
						{DESTINATIONS_SECTION.viewAllCta}
					</SectionCta>
				</div>
			</div>
		</section>
	);
}

