"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { MARQUEE_WORDS } from "@/features/home/content/section-copy";

export default function Marquee() {
	const track = useRef<HTMLDivElement>(null);

	useGsapContext(
		track,
		() => {
			if (prefersReducedMotion() || !track.current) return;
			const el = track.current!;
			const w = el.scrollWidth / 2;
			gsap.to(el, {
				x: -w,
				duration: 30,
				ease: "none",
				repeat: -1,
			});
		},
		[],
	);

	const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

	return (
		<div className="overflow-hidden border-y border-white/6 bg-[#0a0a0a] py-6">
			<div ref={track} className="flex w-max items-center gap-8">
				{items.map((w, i) => (
					<div key={i} className="flex items-center gap-8">
						<span className="whitespace-nowrap text-[clamp(1.2rem,3vw,2rem)] font-light tracking-tight text-white/60">
							{w}
						</span>
						<span className="h-1.5 w-1.5 rounded-full bg-orange-500/60" />
					</div>
				))}
			</div>
		</div>
	);
}

