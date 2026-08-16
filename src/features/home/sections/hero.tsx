"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { HERO_COPY } from "@/features/home/content/section-copy";
import { ButtonWithIcon } from "@/shared/ui";

export default function Hero() {
	const section = useRef<HTMLElement>(null);
	const imgWrap = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const line1 = useRef<HTMLDivElement>(null);
	const line2 = useRef<HTMLDivElement>(null);
	const line3 = useRef<HTMLDivElement>(null);
	const tagRef = useRef<HTMLDivElement>(null);
	const subRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		section,
		() => {
			if (prefersReducedMotion()) return;
			const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

			tl.from(imgWrap.current, { scale: 1.22, duration: 2.2, ease: "power2.out" })
				.from(
					overlayRef.current,
					{ opacity: 0.25, duration: 1.6, ease: "power2.out" },
					"<",
				)
				.from(tagRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=1.4")
				.from(line1.current, { y: "110%", duration: 1.2 }, "-=1.2")
				.from(line2.current, { y: "110%", duration: 1.2 }, "-=1.0")
				.from(line3.current, { y: "110%", duration: 1.2 }, "-=1.0");

			const subChildren = subRef.current?.children;
			if (subChildren?.length) {
				tl.from(subChildren, { y: 30, opacity: 0, duration: 0.8, stagger: 0.15 }, "-=0.6");
			}

			gsap.to([line1.current, line2.current, line3.current], {
				yPercent: -36,
				opacity: 0,
				ease: "none",
				scrollTrigger: {
					trigger: section.current,
					start: "22% top",
					end: "65% top",
					scrub: true,
				},
			});
		},
		[],
	);

	return (
		<section
			ref={section}
			className="relative h-svh min-h-[650px] overflow-hidden"
		>
			<div ref={imgWrap} className="absolute inset-0">
				<Image
					src="/image.jpg"
					alt="Travel"
					fill
					sizes="100vw"
					className="object-cover"
					priority
					loading="eager"
				/>
				<div
					ref={overlayRef}
					className="absolute inset-0 bg-linear-to-t from-[#050505] via-black/30 to-black/20"
				/>
			</div>

			<div className="relative z-10 flex h-full flex-col justify-end pad-x pb-10 pt-28 md:pb-14 md:pt-32">
				<div ref={tagRef} className="mb-6">
					<span className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50">
						{HERO_COPY.tagline}
					</span>
				</div>

				<div className="overflow-hidden">
					<h1 ref={line1} className="text-[clamp(2.15rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter text-white">
						{HERO_COPY.titleLines[0]}
					</h1>
				</div>
				<div className="overflow-hidden">
					<h1 ref={line2} className="text-[clamp(2.15rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter text-white">
						{HERO_COPY.titleLines[1]}
					</h1>
				</div>
				<div className="overflow-hidden">
					<h1 ref={line3} className="text-[clamp(2.15rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter">
						<span className="text-white">{HERO_COPY.titleLines[2]}</span>{" "}
						<span className="font-light italic text-orange-500">{HERO_COPY.titleAccent}</span>
					</h1>
				</div>

				<div ref={subRef} className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<p className="max-w-sm text-sm leading-relaxed text-white/40">
						{HERO_COPY.description}
					</p>
					<ButtonWithIcon
						href="#destinations"
						variant="orange"
						size="lg"
						className="self-start shadow-xl shadow-orange-500/20"
					>
						{HERO_COPY.exploreLabel}
					</ButtonWithIcon>
				</div>
			</div>
		</section>
	);
}

