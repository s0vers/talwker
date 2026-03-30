"use client";

import type { RefObject } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";

export type AboutHeroGsapRefs = {
	section: RefObject<HTMLElement | null>;
	topLineRef: RefObject<HTMLDivElement | null>;
	headPre: RefObject<HTMLDivElement | null>;
	headAccent: RefObject<HTMLDivElement | null>;
	headPost: RefObject<HTMLDivElement | null>;
	headAccent2: RefObject<HTMLDivElement | null>;
	stripRef: RefObject<HTMLDivElement | null>;
	descRef: RefObject<HTMLParagraphElement | null>;
	statsRef: RefObject<HTMLDivElement | null>;
	scrollCue: RefObject<HTMLDivElement | null>;
};

export function useAboutHeroGsap(refs: AboutHeroGsapRefs) {
	const {
		section,
		topLineRef,
		headPre,
		headAccent,
		headPost,
		headAccent2,
		stripRef,
		descRef,
		statsRef,
		scrollCue,
	} = refs;

	useGsapContext(
		section,
		() => {
			if (prefersReducedMotion()) return;

			const tl = gsap.timeline({
				defaults: { ease: "power4.out" },
				delay: 0.3,
			});

			tl.from(topLineRef.current, {
				scaleX: 0,
				duration: 1.2,
				ease: "power2.inOut",
			})
				.from(
					headPre.current,
					{ y: "110%", opacity: 0, duration: 1.1 },
					"-=0.7",
				)
				.from(
					headAccent.current,
					{ y: "110%", opacity: 0, duration: 1.1 },
					"-=0.85",
				)
				.from(
					headPost.current,
					{ y: "110%", opacity: 0, duration: 1.1 },
					"-=0.85",
				)
				.from(
					headAccent2.current,
					{ y: "110%", opacity: 0, duration: 1.1 },
					"-=0.85",
				)
				.from(
					stripRef.current,
					{
						clipPath: "inset(0 50% 0 50%)",
						opacity: 0,
						duration: 1.4,
						ease: "power4.inOut",
					},
					"-=0.6",
				)
				.from(
					descRef.current,
					{ y: 30, opacity: 0, duration: 0.9 },
					"-=0.5",
				);

			if (statsRef.current?.children.length) {
				tl.from(
					statsRef.current.children,
					{ y: 30, opacity: 0, stagger: 0.1, duration: 0.7 },
					"-=0.5",
				);
			}

			tl.from(
				scrollCue.current,
				{ y: 15, opacity: 0, duration: 0.6 },
				"-=0.3",
			);

			gsap.to(
				[
					headPre.current,
					headAccent.current,
					headPost.current,
					headAccent2.current,
				],
				{
					yPercent: -30,
					ease: "none",
					scrollTrigger: {
						trigger: section.current,
						start: "top top",
						end: "bottom top",
						scrub: true,
					},
				},
			);

			gsap.to(stripRef.current, {
				scale: 1.06,
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
}
