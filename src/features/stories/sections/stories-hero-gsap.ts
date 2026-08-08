"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { useGsapContext } from "@/lib/useGsap";

export type StoriesHeroGsapRefs = {
	section: RefObject<HTMLElement | null>;
	kickerRef: RefObject<HTMLParagraphElement | null>;
	ruleRef: RefObject<HTMLSpanElement | null>;
	title1Ref: RefObject<HTMLDivElement | null>;
	title2Ref: RefObject<HTMLDivElement | null>;
	descRef: RefObject<HTMLParagraphElement | null>;
	glowRef: RefObject<HTMLDivElement | null>;
};

/** Entrance after InitialLoader — line draw, title rise, desc fade. */
export function useStoriesHeroEntrance(
	refs: StoriesHeroGsapRefs,
	runEntrance: boolean,
) {
	const {
		section,
		kickerRef,
		ruleRef,
		title1Ref,
		title2Ref,
		descRef,
		glowRef,
	} = refs;

	useGsapContext(
		section,
		() => {
			if (!runEntrance) return;

			const tl = gsap.timeline({
				defaults: { ease: "power3.out" },
				delay: 0.08,
			});

			if (glowRef.current) {
				tl.fromTo(
					glowRef.current,
					{ opacity: 0 },
					{ opacity: 1, duration: 1.1, ease: "sine.out" },
					0,
				);
			}

			tl.from(
				kickerRef.current,
				{ opacity: 0, y: 14, duration: 0.65 },
				0.06,
			)
				.from(
					ruleRef.current,
					{
						scaleX: 0,
						opacity: 0,
						duration: 0.85,
						transformOrigin: "left center",
						ease: "power2.inOut",
					},
					0.12,
				)
				.from(
					title1Ref.current,
					{ y: "110%", opacity: 0, duration: 1.05, ease: "power4.out" },
					0.2,
				)
				.from(
					title2Ref.current,
					{ y: "110%", opacity: 0, duration: 1.05, ease: "power4.out" },
					0.32,
				)
				.from(
					descRef.current,
					{ opacity: 0, y: 22, duration: 0.9, ease: "sine.out" },
					0.48,
				);
		},
		[runEntrance],
	);
}
