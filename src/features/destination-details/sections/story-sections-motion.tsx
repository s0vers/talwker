"use client";

import { useRef, type ReactNode } from "react";
import { useGsapContext, prefersReducedMotion } from "@/lib/useGsap";
import { gsap } from "@/lib/useGsap";

type Props = {
	children: ReactNode;
};

export function StorySectionsMotion({ children }: Props) {
	const scopeRef = useRef<HTMLDivElement | null>(null);

	useGsapContext(scopeRef, () => {
		const root = scopeRef.current;
		if (!root) return;

		const sections = gsap.utils.toArray<HTMLElement>("section", root);
		const lines = gsap.utils.toArray<HTMLElement>("[data-story-line]", root);
		const reveals = gsap.utils.toArray<HTMLElement>("[data-story-reveal]", root);
		const cards = gsap.utils.toArray<HTMLElement>("[data-story-card], [data-story-item]", root);

		lines.forEach((line) => {
			gsap.from(line, {
				y: 48,
				opacity: 0,
				duration: 0.8,
				ease: "power3.out",
				scrollTrigger: {
					trigger: line,
					start: "top 88%",
					toggleActions: "play none none none",
				},
			});
		});

		reveals.forEach((item) => {
			gsap.from(item, {
				opacity: 0,
				scale: 0.98,
				duration: 1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: item,
					start: "top 84%",
					toggleActions: "play none none none",
				},
			});
		});

		cards.forEach((item, index) => {
			gsap.from(item, {
				y: 30,
				opacity: 0,
				duration: 0.7,
				delay: index % 3 ? 0.05 : 0,
				ease: "power2.out",
				scrollTrigger: {
					trigger: item,
					start: "top 90%",
					toggleActions: "play none none none",
				},
			});
		});

		if (sections.length > 1 && !prefersReducedMotion()) {
			const firstSection = sections[0];
			if (firstSection) {
				gsap.fromTo(
					firstSection,
					{ scale: 1.04 },
					{
						scale: 1,
						ease: "none",
						scrollTrigger: {
							trigger: firstSection,
							start: "top top",
							end: "bottom top",
							scrub: true,
						},
					},
				);
			}

			sections.forEach((section) => {
				gsap.fromTo(
					section,
					{ clipPath: "inset(6% 0% 0% 0% round 24px)", opacity: 0.8 },
					{
						clipPath: "inset(0% 0% 0% 0% round 24px)",
						opacity: 1,
						ease: "none",
						scrollTrigger: {
							trigger: section,
							start: "top 78%",
							end: "top 35%",
							scrub: true,
						},
					},
				);
			});

			sections.forEach((section, index) => {
				if (index >= sections.length - 1) return;
				const next = sections[index + 1];
				if (!next) return;
				gsap.fromTo(
					next,
					{ opacity: 0.72, y: 70, scale: 0.985 },
					{
						opacity: 1,
						y: 0,
						scale: 1,
						ease: "none",
						scrollTrigger: {
							trigger: section,
							start: "bottom 72%",
							end: "bottom 30%",
							scrub: true,
						},
					},
				);
			});
		}
	}, []);

	return <div ref={scopeRef}>{children}</div>;
}
