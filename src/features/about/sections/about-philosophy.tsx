"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { ABOUT_PHILOSOPHY } from "@/features/about/content/about-copy";

export default function AboutPhilosophy() {
	const section = useRef<HTMLElement>(null);
	const wordsRef = useRef<HTMLDivElement>(null);
	const lineRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		section,
		() => {
			if (prefersReducedMotion()) return;

			const words =
				wordsRef.current?.querySelectorAll<HTMLSpanElement>("[data-word]");
			if (!words?.length) return;

			gsap.set(words, { opacity: 0.12 });

			gsap.to(words, {
				opacity: 1,
				stagger: 0.06,
				ease: "none",
				scrollTrigger: {
					trigger: wordsRef.current,
					start: "top 75%",
					end: "center 55%",
					scrub: true,
				},
			});

			if (lineRef.current) {
				gsap.fromTo(
					lineRef.current,
					{ scaleX: 0 },
					{
						scaleX: 1,
						ease: "none",
						scrollTrigger: {
							trigger: section.current,
							start: "top 70%",
							end: "bottom 50%",
							scrub: true,
						},
					},
				);
			}
		},
		[],
	);

	const words = ABOUT_PHILOSOPHY.line.split(" ");

	return (
		<section ref={section} className="relative bg-[#070707] py-40 md:py-56">
			<div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

			<div className="relative mx-auto max-w-[1600px] pad-x">
				<div className="mx-auto max-w-5xl text-center">
					<span className="mb-10 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
						{ABOUT_PHILOSOPHY.label}
					</span>
					<div
						ref={wordsRef}
						className="text-[clamp(1.6rem,4.5vw,4rem)] font-bold leading-[1.15] tracking-tight text-white"
					>
						{words.map((word, i) => (
							<span key={i} data-word className="inline-block mr-[0.3em]">
								{word}
							</span>
						))}
					</div>
					<div
						ref={lineRef}
						className="mx-auto mt-12 h-px w-40 origin-left bg-orange-500"
					/>
				</div>
			</div>
		</section>
	);
}
