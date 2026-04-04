"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/useGsap";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

function createBlurStaggerScroll(
	root: HTMLElement,
	selector: string,
	options: {
		y?: number;
		scale?: number;
		blur?: number;
		stagger?: number;
		duration?: number;
		start?: string;
	} = {},
) {
	const targets = gsap.utils.toArray<HTMLElement>(selector, root);
	if (!targets.length) return;

	const {
		y = 52,
		scale = 0.96,
		blur = 14,
		stagger = 0.12,
		duration = 0.95,
		start = "top 82%",
	} = options;

	gsap.from(targets, {
		y,
		scale,
		opacity: 0,
		filter: `blur(${blur}px)`,
		duration,
		stagger,
		ease: "power4.out",
		immediateRender: false,
		scrollTrigger: {
			trigger: root,
			start,
			toggleActions: "play none none none",
		},
	});
}

/** Hero entrance after loader — layered timeline with blur, 3D card, bar draw, word stagger */
export function useContactHeroEntrance(
	sectionRef: RefObject<HTMLElement | null>,
	runEntrance: boolean,
) {
	useLayoutEffect(() => {
		const root = sectionRef.current;
		if (typeof window === "undefined" || !root || !runEntrance) return;

		if (prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			const glow = root.querySelector("[data-contact-hero-glow]");
			const stripes = root.querySelector("[data-contact-hero-stripes]");
			const atMark = root.querySelector("[data-contact-hero-at]");
			const eyebrow = root.querySelector("[data-contact-hero-eyebrow]");
			const bar = root.querySelector("[data-contact-hero-bar]");
			const words = gsap.utils.toArray<HTMLElement>("[data-contact-hero-word]", root);
			const accentWrap = root.querySelector("[data-contact-hero-accent-wrap]");
			const accent = root.querySelector("[data-contact-hero-accent]");
			const desc = root.querySelector("[data-contact-hero-desc]");
			const card = root.querySelector("[data-contact-hero-card]");
			const stamp = root.querySelector("[data-contact-hero-stamp]");
			const metaTitle = root.querySelector("[data-contact-hero-meta-title]");
			const dlRows = gsap.utils.toArray<HTMLElement>("[data-contact-dl-row]", root);
			const barcode = root.querySelector("[data-contact-hero-barcode]");

			const tl = gsap.timeline({
				defaults: { ease: "expo.out" },
			});

			if (glow) {
				tl.fromTo(
					glow,
					{ opacity: 0, scale: 0.55 },
					{ opacity: 0.45, scale: 1, duration: 1.35 },
					0,
				);
			}

			if (stripes) {
				tl.fromTo(
					stripes,
					{ opacity: 0, x: -28 },
					{ opacity: 0.07, x: 0, duration: 1.1 },
					0.08,
				);
			}

			if (eyebrow) {
				tl.fromTo(
					eyebrow,
					{ y: 28, opacity: 0, filter: "blur(12px)" },
					{ y: 0, opacity: 1, filter: "blur(0px)", duration: 0.95 },
					0.18,
				);
			}

			if (bar) {
				tl.fromTo(
					bar,
					{ scaleY: 0 },
					{ scaleY: 1, duration: 1.05, ease: "power4.inOut" },
					0.28,
				);
			}

			if (words.length) {
				tl.fromTo(
					words,
					{
						y: 64,
						opacity: 0,
						rotateX: -38,
						filter: "blur(16px)",
					},
					{
						y: 0,
						opacity: 1,
						rotateX: 0,
						filter: "blur(0px)",
						duration: 1.05,
						stagger: 0.11,
						ease: "expo.out",
					},
					0.38,
				);
			}

			if (accentWrap) {
				tl.fromTo(
					accentWrap,
					{ clipPath: "inset(0 100% 0 0)" },
					{ clipPath: "inset(0 0% 0 0)", duration: 0.95, ease: "power3.inOut" },
					0.52,
				);
			}
			if (accent) {
				tl.fromTo(
					accent,
					{ y: 22, filter: "blur(12px)", opacity: 0.4 },
					{ y: 0, filter: "blur(0px)", opacity: 1, duration: 0.8, ease: "power3.out" },
					0.58,
				);
			}

			if (desc) {
				tl.fromTo(
					desc,
					{ y: 36, opacity: 0, filter: "blur(10px)" },
					{ y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
					0.62,
				);
			}

			if (card) {
				tl.fromTo(
					card,
					{
						y: 88,
						opacity: 0,
						rotateX: -22,
						rotateZ: -4,
						filter: "blur(18px)",
					},
					{
						y: 0,
						opacity: 1,
						rotateX: 0,
						rotateZ: 0.5,
						filter: "blur(0px)",
						duration: 1.25,
						ease: "power3.out",
					},
					0.32,
				);
			}

			if (stamp) {
				tl.fromTo(
					stamp,
					{ scale: 0, rotate: -28 },
					{ scale: 1, rotate: 0, duration: 0.75, ease: "elastic.out(1, 0.55)" },
					0.95,
				);
			}

			if (metaTitle) {
				tl.fromTo(
					metaTitle,
					{ opacity: 0, x: -12 },
					{ opacity: 1, x: 0, duration: 0.55 },
					0.88,
				);
			}

			if (dlRows.length) {
				tl.fromTo(
					dlRows,
					{ opacity: 0, x: -20, filter: "blur(6px)" },
					{
						opacity: 1,
						x: 0,
						filter: "blur(0px)",
						duration: 0.65,
						stagger: 0.1,
						ease: "power3.out",
					},
					0.92,
				);
			}

			if (barcode) {
				tl.fromTo(
					barcode,
					{ opacity: 0, scaleX: 0.2, transformOrigin: "right center" },
					{ opacity: 0.6, scaleX: 1, duration: 0.7, ease: "power2.out" },
					1.05,
				);
			}

			if (atMark) {
				tl.fromTo(
					atMark,
					{ opacity: 0, scale: 0.85, rotate: -8 },
					{ opacity: 0.04, scale: 1, rotate: 0, duration: 1.4, ease: "power2.out" },
					0.2,
				);
			}

			tl.eventCallback("onComplete", () => {
				if (stripes) {
					gsap.to(stripes, {
						x: "+=18",
						duration: 22,
						ease: "none",
						repeat: -1,
						yoyo: true,
					});
				}
				if (atMark) {
					gsap.to(atMark, {
						y: "+=10",
						duration: 4.2,
						ease: "sine.inOut",
						repeat: -1,
						yoyo: true,
					});
				}
			});
		}, root);

		return () => ctx.revert();
	}, [sectionRef, runEntrance]);
}

export function useContactFormScrollMotion(sectionRef: RefObject<HTMLElement | null>) {
	useEffect(() => {
		const root = sectionRef.current;
		if (typeof window === "undefined" || !root || prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			const panel = root.querySelector("[data-contact-form-panel]");
			const introEls = gsap.utils.toArray<HTMLElement>(
				"[data-contact-form-intro]",
				root,
			);
			const fieldGroups = gsap.utils.toArray<HTMLElement>(
				"[data-contact-form-field]",
				root,
			);

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: root,
					start: "top 78%",
					toggleActions: "play none none none",
				},
			});

			tl.fromTo(
				introEls,
				{ y: 40, opacity: 0, filter: "blur(12px)" },
				{
					y: 0,
					opacity: 1,
					filter: "blur(0px)",
					duration: 0.85,
					stagger: 0.1,
					ease: "power4.out",
				},
				0,
			);

			if (panel) {
				tl.fromTo(
					panel,
					{
						y: 72,
						opacity: 0,
						scale: 0.94,
						filter: "blur(20px)",
						rotateX: 6,
					},
					{
						y: 0,
						opacity: 1,
						scale: 1,
						filter: "blur(0px)",
						rotateX: 0,
						duration: 1.05,
						ease: "power3.out",
					},
					0.12,
				);
			}

			if (fieldGroups.length) {
				tl.fromTo(
					fieldGroups,
					{ y: 28, opacity: 0, filter: "blur(8px)" },
					{
						y: 0,
						opacity: 1,
						filter: "blur(0px)",
						duration: 0.7,
						stagger: 0.09,
						ease: "power3.out",
					},
					0.45,
				);
			}
		}, root);

		return () => ctx.revert();
	}, [sectionRef]);
}

export function useContactChannelsScrollMotion(sectionRef: RefObject<HTMLElement | null>) {
	useEffect(() => {
		const root = sectionRef.current;
		if (typeof window === "undefined" || !root || prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			createBlurStaggerScroll(root, "[data-contact-channel-reveal]", {
				y: 56,
				scale: 0.94,
				blur: 16,
				stagger: 0.14,
				duration: 1,
				start: "top 80%",
			});
		}, root);

		return () => ctx.revert();
	}, [sectionRef]);
}
