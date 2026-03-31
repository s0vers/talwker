"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { ABOUT_VALUES } from "@/features/about/content/about-copy";

export default function AboutValues() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	useGsapContext(sectionRef, () => {
		if (prefersReducedMotion()) return;
		const section = sectionRef.current;
		const list = listRef.current;
		if (!section || !list) return;

		if (headingRef.current?.children.length) {
			gsap.from(headingRef.current.children, {
				y: 36,
				opacity: 0,
				duration: 0.85,
				stagger: 0.12,
				ease: "power3.out",
				scrollTrigger: { trigger: headingRef.current, start: "top 82%" }
			});
		}

		const cards = list.querySelectorAll<HTMLElement>("[data-value-card]");
		const cardsTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "top 84%",
				end: "bottom bottom",
				scrub: 0.65,
			},
		});

		cards.forEach((card, i) => {
			cardsTimeline.fromTo(
				card,
				{
					y: 80,
					opacity: 0,
					rotateZ: i % 2 === 0 ? -1.5 : 1.5,
					clipPath: "inset(0 0 100% 0 round 1.5rem)",
				},
				{
					y: 0,
					opacity: 1,
					rotateZ: 0,
					clipPath: "inset(0 0 0% 0 round 1.5rem)",
					duration: 0.85,
					ease: "power3.out",
				},
				i === 0 ? 0 : "<+=0.12",
			);

			const drift = i % 2 === 0 ? -9 : 9;
			gsap.to(card, {
				yPercent: drift,
				ease: "none",
				scrollTrigger: {
					trigger: card,
					start: "top bottom",
					end: "bottom top",
					scrub: 0.7,
				},
			});

		});

		const rail = section.querySelector<HTMLElement>("[data-values-rail]");
		if (!rail) return;
		gsap.fromTo(
			rail,
			{ scaleY: 0, transformOrigin: "top center" },
			{
				scaleY: 1,
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top 72%",
					end: "bottom bottom",
					scrub: true,
				},
			},
		);
	}, []);

	return (
		<section ref={sectionRef} className="bg-[#0a0a0a] py-28 md:py-36">
			<div className="mx-auto grid max-w-[1600px] gap-12 pad-x md:grid-cols-[minmax(240px,0.9fr)_minmax(0,1.25fr)] md:gap-10 lg:gap-16">
				<div className="md:sticky md:top-28 md:h-fit">
					<div ref={headingRef}>
						<span className="mb-5 inline-block text-[11px] font-semibold tracking-[0.25em] text-orange-500 uppercase">
							What We Stand For
						</span>
						<h2 className="text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.95] font-bold tracking-tighter text-white">
							Our Values
							<span className="font-light text-orange-500 italic">.</span>
						</h2>
						<p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55 md:text-base">
							Every principle guides how we design journeys and how we partner with people on the ground.
						</p>
					</div>
					<div className="mt-8 hidden items-center gap-4 md:flex">
						<div className="h-24 w-px overflow-hidden rounded-full bg-white/10">
							<div data-values-rail className="h-full w-full bg-orange-500/80" />
						</div>
						<p className="text-[11px] font-semibold tracking-[0.22em] text-white/40 uppercase">
							Values In Motion
						</p>
					</div>
				</div>

				<div
					ref={listRef}
					className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:gap-7"
				>
					{ABOUT_VALUES.map((val, index) => (
						<div
							key={val.id}
							data-value-card
							className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#101010] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-orange-500/30 md:p-9 ${
								index % 2 === 1 ? "sm:translate-y-6" : ""
							}`}
						>
							<div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-orange-500/5 blur-3xl transition-all duration-700 group-hover:bg-orange-500/10" />

							<span className="text-[clamp(3.4rem,7vw,6rem)] leading-none font-black text-white/4">
								{val.number}
							</span>

							<div className="relative mt-2">
								<h3 className="text-xl font-bold tracking-tight text-white md:text-[1.65rem]">
									{val.title}
								</h3>
								<p className="mt-3 text-sm leading-relaxed text-white/40 md:text-[15px]">
									{val.description}
								</p>
								<p className="mt-5 text-[12px] font-semibold text-orange-500 italic">
									{val.accent}
								</p>
							</div>

							<div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-500 transition-all duration-700 group-hover:w-full" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
