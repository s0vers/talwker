"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/useGsap";

const WORDS = [
	"Bali",
	"Santorini",
	"Kyoto",
	"Patagonia",
	"Maldives",
	"Amalfi",
	"Iceland",
	"Morocco",
	"Peru",
	"Norway",
];

export default function Marquee() {
	const track = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!track.current) return;
		const ctx = gsap.context(() => {
			const el = track.current!;
			const w = el.scrollWidth / 2;
			gsap.to(el, {
				x: -w,
				duration: 30,
				ease: "none",
				repeat: -1,
			});
		});
		return () => ctx.revert();
	}, []);

	const items = [...WORDS, ...WORDS];

	return (
		<div className="overflow-hidden border-y border-white/[0.06] bg-[#0a0a0a] py-6">
			<div ref={track} className="flex w-max items-center gap-8">
				{items.map((w, i) => (
					<div key={i} className="flex items-center gap-8">
						<span className="whitespace-nowrap text-[clamp(1.2rem,3vw,2rem)] font-light tracking-tight text-white/20">
							{w}
						</span>
						<span className="h-1.5 w-1.5 rounded-full bg-orange-500/60" />
					</div>
				))}
			</div>
		</div>
	);
}
