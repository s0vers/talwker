"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { ABOUT_HERO_COPY } from "@/features/about/content/about-copy";

export default function AboutHero() {
	const section = useRef<HTMLElement>(null);
	const imgWrap = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const tagRef = useRef<HTMLDivElement>(null);
	const line1 = useRef<HTMLDivElement>(null);
	const line2 = useRef<HTMLDivElement>(null);
	const line3 = useRef<HTMLDivElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const scrollCue = useRef<HTMLDivElement>(null);

	useGsapContext(
		section,
		() => {
			if (prefersReducedMotion()) return;

			const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

			tl.from(imgWrap.current, {
				scale: 1.25,
				duration: 2.4,
				ease: "power2.out",
			})
				.from(
					overlayRef.current,
					{ opacity: 0.2, duration: 1.6, ease: "power2.out" },
					"<",
				)
				.from(tagRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=1.4")
				.from(line1.current, { y: "120%", duration: 1.2 }, "-=1.1")
				.from(line2.current, { y: "120%", duration: 1.2 }, "-=1.0")
				.from(line3.current, { y: "120%", duration: 1.2 }, "-=1.0")
				.from(
					descRef.current,
					{ y: 40, opacity: 0, duration: 0.9 },
					"-=0.6",
				)
				.from(
					scrollCue.current,
					{ y: 20, opacity: 0, duration: 0.8 },
					"-=0.4",
				);

			gsap.to(
				[line1.current, line2.current, line3.current, descRef.current],
				{
					yPercent: -40,
					opacity: 0,
					ease: "none",
					scrollTrigger: {
						trigger: section.current,
						start: "20% top",
						end: "70% top",
						scrub: true,
					},
				},
			);

			gsap.to(imgWrap.current, {
				scale: 1.12,
				ease: "none",
				scrollTrigger: {
					trigger: section.current,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});
		},
		[],
	);

	return (
		<section
			ref={section}
			className="relative h-svh min-h-[700px] overflow-hidden"
		>
			<div ref={imgWrap} className="absolute inset-0">
				<Image
					src="/image.jpg"
					alt="Scenic travel landscape"
					fill
					sizes="100vw"
					className="object-cover"
					priority
				/>
				<div
					ref={overlayRef}
					className="absolute inset-0 bg-linear-to-t from-[#050505] via-black/50 to-black/30"
				/>
			</div>

			<div className="relative z-10 flex h-full flex-col justify-end pad-x pb-16 pt-28 md:pb-20 md:pt-32">
				<div ref={tagRef} className="mb-6">
					<span className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50">
						{ABOUT_HERO_COPY.tagline}
					</span>
				</div>

				{ABOUT_HERO_COPY.titleLines.map((line, i) => (
					<div key={i} className="overflow-hidden">
						<h1
							ref={i === 0 ? line1 : i === 1 ? line2 : line3}
							className="text-[clamp(2.15rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter text-white"
						>
							{line}
							{i === 2 && (
								<>
									{" "}
									<span className="font-light italic text-orange-500">
										{ABOUT_HERO_COPY.titleAccent}
									</span>
								</>
							)}
						</h1>
					</div>
				))}

				<p
					ref={descRef}
					className="mt-10 max-w-lg text-sm leading-relaxed text-white/40 md:text-base"
				>
					{ABOUT_HERO_COPY.description}
				</p>

				<div
					ref={scrollCue}
					className="mt-12 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/30"
				>
					<span className="h-10 w-px bg-white/20" />
					<span>Scroll to explore</span>
				</div>
			</div>
		</section>
	);
}
