"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createStaggerReveal, prefersReducedMotion } from "@/lib/useGsap";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

/** Hero: short mount sequence, scoped to section ref */
export function useContactHeroMotion(sectionRef: RefObject<HTMLElement | null>) {
	useLayoutEffect(() => {
		const root = sectionRef.current;
		if (typeof window === "undefined" || !root || prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			const lines = gsap.utils.toArray<HTMLElement>("[data-contact-hero-line]", root);
			const card = root.querySelector("[data-contact-hero-card]");
			const glow = root.querySelector("[data-contact-hero-glow]");
			const atMark = root.querySelector("[data-contact-hero-at]");

			gsap.set(lines, { opacity: 0, y: 26 });
			if (card) gsap.set(card, { opacity: 0, x: 44, y: 18, rotate: 1.2 });
			if (glow) gsap.set(glow, { opacity: 0, scale: 0.92 });
			if (atMark) gsap.set(atMark, { opacity: 0, scale: 0.96 });

			const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
			if (glow) {
				tl.to(glow, { opacity: 0.4, scale: 1, duration: 1.1 }, 0);
			}
			tl.to(
				lines,
				{
					opacity: 1,
					y: 0,
					duration: 0.72,
					stagger: 0.09,
				},
				0.06,
			);
			if (card) {
				tl.to(
					card,
					{
						opacity: 1,
						x: 0,
						y: 0,
						rotate: 0.5,
						duration: 0.88,
						ease: "power3.out",
					},
					0.22,
				);
			}
			if (atMark) {
				tl.to(
					atMark,
					{
						opacity: 0.04,
						scale: 1,
						duration: 1.25,
						ease: "power2.out",
					},
					0.35,
				);
			}
		}, root);

		return () => ctx.revert();
	}, [sectionRef]);
}

/** Scroll-in stagger for a section root */
export function useContactScrollReveal(
	sectionRef: RefObject<HTMLElement | null>,
	selector: string,
) {
	useEffect(() => {
		const root = sectionRef.current;
		if (typeof window === "undefined" || !root || prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			const targets = gsap.utils.toArray<HTMLElement>(selector, root);
			if (!targets.length) return;
			createStaggerReveal(targets, root, {
				y: 26,
				stagger: 0.09,
				duration: 0.66,
				start: "top 86%",
				ease: "power3.out",
			});
		}, root);

		return () => ctx.revert();
	}, [sectionRef, selector]);
}
