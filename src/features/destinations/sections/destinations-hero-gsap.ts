"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { useGsapContext } from "@/lib/useGsap";

export type DestinationsHeroEntranceRefs = {
	section: RefObject<HTMLElement | null>;
	svgRef: RefObject<SVGSVGElement | null>;
	railRef: RefObject<HTMLDivElement | null>;
	kickerLineRef: RefObject<HTMLSpanElement | null>;
	kickerRef: RefObject<HTMLParagraphElement | null>;
	title1Ref: RefObject<HTMLSpanElement | null>;
	title2Ref: RefObject<HTMLSpanElement | null>;
	descRef: RefObject<HTMLParagraphElement | null>;
	scrollCueRef: RefObject<HTMLDivElement | null>;
	passRef: RefObject<HTMLDivElement | null>;
	coordsRef: RefObject<HTMLUListElement | null>;
};

export function useDestinationsHeroEntrance(refs: DestinationsHeroEntranceRefs) {
	const {
		section,
		svgRef,
		railRef,
		kickerLineRef,
		kickerRef,
		title1Ref,
		title2Ref,
		descRef,
		scrollCueRef,
		passRef,
		coordsRef,
	} = refs;

	useGsapContext(
		section,
		() => {
			const tl = gsap.timeline({
				defaults: { ease: "power2.out" },
				delay: 0.12,
			});

			tl.from(
				svgRef.current,
				{
					opacity: 0,
					scale: 0.94,
					rotate: -3,
					duration: 1.3,
					transformOrigin: "50% 50%",
					ease: "power3.out",
				},
				0,
			)
				.from(
					railRef.current,
					{ opacity: 0, x: -16, duration: 0.9 },
					0.05,
				)
				.from(
					kickerLineRef.current,
					{
						scaleX: 0,
						opacity: 0,
						duration: 0.58,
						transformOrigin: "left center",
						ease: "power2.inOut",
					},
					0.15,
				)
				.from(kickerRef.current, { opacity: 0, x: -12, duration: 0.65 }, 0.18)
				.from(
					title1Ref.current,
					{ opacity: 0, x: -32, duration: 0.82, ease: "power3.out" },
					0.24,
				)
				.from(
					title2Ref.current,
					{ opacity: 0, x: 32, duration: 0.82, ease: "power3.out" },
					0.3,
				)
				.from(
					descRef.current,
					{
						opacity: 0,
						scale: 0.985,
						duration: 0.88,
						transformOrigin: "left center",
						ease: "sine.out",
					},
					0.42,
				)
				.from(scrollCueRef.current, { opacity: 0, duration: 0.65 }, 0.48)
				.from(
					passRef.current,
					{ opacity: 0, x: 40, duration: 0.95, ease: "power3.out" },
					0.2,
				);

			const items = coordsRef.current?.querySelectorAll("li");
			if (items?.length) {
				tl.from(
					items,
					{
						opacity: 0,
						x: 12,
						duration: 0.48,
						stagger: { each: 0.08, from: "start" },
					},
					0.52,
				);
			}
		},
		[],
	);
}
