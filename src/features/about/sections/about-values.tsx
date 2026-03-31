"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { ABOUT_VALUES } from "@/features/about/content/about-copy";
import { AboutValueCard } from "@/features/about/sections/about-value-card";

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
				start: "top 78%",
				toggleActions: "play none none reverse",
			},
		});

		cardsTimeline.fromTo(
			cards,
			{
				y: 52,
				opacity: 0,
				scale: 0.96,
				filter: "blur(10px)",
			},
			{
				y: 0,
				opacity: 1,
				scale: 1,
				filter: "blur(0px)",
				duration: 0.82,
				stagger: 0.12,
				ease: "power2.out",
				clearProps: "filter"
			}
		);

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
				}
			}
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
							Core Principles
						</p>
					</div>
				</div>

				<div
					ref={listRef}
					className="grid gap-6 sm:grid-cols-2 md:gap-7 lg:gap-8"
				>
					{ABOUT_VALUES.map((val, index) => (
						<AboutValueCard
							key={val.id}
							value={val}
							className={index % 2 === 1 ? "sm:translate-y-6" : undefined}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
