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

		const sections = gsap.utils.toArray<HTMLElement>("[data-story-scene]", root);
		const lines = gsap.utils.toArray<HTMLElement>("[data-story-line]", root);
		const reveals = gsap.utils.toArray<HTMLElement>("[data-story-reveal]", root);
		const cards = gsap.utils.toArray<HTMLElement>("[data-story-card], [data-story-item]", root);
		const media = gsap.utils.toArray<HTMLElement>("[data-story-media]", root);
		const motifLabel = root.querySelector<SVGTextElement>("[data-story-motif-label]");

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

		if (prefersReducedMotion()) return;

		media.forEach((asset, index) => {
			// Hero / atmosphere: keep static — pin + parallax here reads finicky against scroll.
			if (asset.closest('[data-story-scene="atmosphere"]')) return;
			gsap.fromTo(
				asset,
				{ yPercent: index % 2 === 0 ? -1.25 : 1.25, scale: 1.01 },
				{
					yPercent: index % 2 === 0 ? 1.25 : -1.25,
					scale: 1,
					ease: "none",
					scrollTrigger: {
						trigger: asset,
						start: "top bottom",
						end: "bottom top",
						scrub: 1.2,
					},
				},
			);
		});

		if (motifLabel) {
			gsap.fromTo(
				motifLabel,
				{ attr: { y: 1710 }, opacity: 0.2 },
				{
					attr: { y: 1660 },
					opacity: 0.5,
					ease: "none",
					scrollTrigger: {
						trigger: root,
						start: "top top",
						end: "bottom bottom",
						scrub: true,
					},
				},
			);
		}

		if (sections.length > 1) {
			sections.forEach((section) => {
				gsap.fromTo(
					section,
					{ clipPath: "inset(10% 0% 0% 0% round 28px)", opacity: 0.55, y: 110 },
					{
						clipPath: "inset(0% 0% 0% 0% round 24px)",
						opacity: 1,
						y: 0,
						ease: "none",
						scrollTrigger: {
							trigger: section,
							start: "top 92%",
							end: "top 50%",
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
					{ opacity: 0.32, y: 120, scale: 0.97 },
					{
						opacity: 1,
						y: 0,
						scale: 1,
						ease: "none",
						scrollTrigger: {
							trigger: section,
							start: "bottom 88%",
							end: "bottom 42%",
							scrub: true,
						},
					},
				);

				gsap.fromTo(
					section,
					{ opacity: 1, scale: 1 },
					{
						opacity: 0.72,
						scale: 0.992,
						ease: "none",
						scrollTrigger: {
							trigger: next,
							start: "top 90%",
							end: "top 50%",
							scrub: true,
						},
					},
				);
			});
		}
	}, []);

	return <div ref={scopeRef}>{children}</div>;
}
