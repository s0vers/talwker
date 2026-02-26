"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/useGsap";

const PLACES = [
	{ name: "Bali", sub: "Indonesia", tag: "Popular", price: "1,299" },
	{ name: "Santorini", sub: "Greece", tag: "Trending", price: "1,899" },
	{ name: "Kyoto", sub: "Japan", tag: "Cultural", price: "1,599" },
	{ name: "Patagonia", sub: "Chile", tag: "Adventure", price: "2,499" },
	{ name: "Maldives", sub: "Indian Ocean", tag: "Luxury", price: "3,199" },
];

export default function Destinations() {
	const section = useRef<HTMLElement>(null);
	const headRef = useRef<HTMLDivElement>(null);
	const scrollWrap = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.from(headRef.current!.children, {
				y: 60,
				opacity: 0,
				duration: 1,
				stagger: 0.1,
				ease: "power3.out",
				scrollTrigger: { trigger: headRef.current, start: "top 85%" },
			});

			const wrap = scrollWrap.current!;
			const totalScroll = wrap.scrollWidth - wrap.clientWidth;

			gsap.to(wrap, {
				x: -totalScroll,
				ease: "none",
				scrollTrigger: {
					trigger: section.current,
					start: "top 10%",
					end: () => `+=${totalScroll}`,
					scrub: 1,
					pin: true,
					anticipatePin: 1,
				},
			});
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section id="destinations" ref={section} className="overflow-hidden bg-[#0a0a0a] py-24 md:py-32">
			<div ref={headRef} className="pad-x mb-16">
				<span className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
					Featured Destinations
				</span>
				<h2 className="max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tighter text-white">
					Places that leave you{" "}
					<span className="font-light italic text-orange-500">speechless</span>
				</h2>
			</div>

			<div ref={scrollWrap} className="flex gap-6 pad-x">
				{PLACES.map((p, i) => (
					<div
						key={p.name}
						className="group relative w-[340px] shrink-0 cursor-pointer overflow-hidden rounded-2xl md:w-[420px]"
					>
						<div className="relative h-[500px] overflow-hidden md:h-[560px]">
							<Image
								src="/image.jpg"
								alt={p.name}
								fill
								className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
						</div>

						<div className="absolute inset-x-0 bottom-0 p-7">
							<span className="mb-3 inline-block rounded-full border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
								{p.tag}
							</span>
							<h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
								{p.name}
							</h3>
							<div className="mt-2 flex items-center justify-between">
								<p className="text-sm text-white/40">{p.sub}</p>
								<p className="text-lg font-semibold text-orange-400">
									${p.price}
								</p>
							</div>

							<div className="mt-5 h-[1px] w-0 bg-orange-500 transition-all duration-700 group-hover:w-full" />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
