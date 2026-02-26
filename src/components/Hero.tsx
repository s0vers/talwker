"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/useGsap";

export default function Hero() {
	const section = useRef<HTMLElement>(null);
	const imgWrap = useRef<HTMLDivElement>(null);
	const line1 = useRef<HTMLDivElement>(null);
	const line2 = useRef<HTMLDivElement>(null);
	const line3 = useRef<HTMLDivElement>(null);
	const tagRef = useRef<HTMLDivElement>(null);
	const subRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

			tl.from(imgWrap.current, { scale: 1.4, duration: 2.2, ease: "power2.out" })
				.from(tagRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=1.4")
				.from(line1.current, { y: "110%", duration: 1.2 }, "-=1.2")
				.from(line2.current, { y: "110%", duration: 1.2 }, "-=1.0")
				.from(line3.current, { y: "110%", duration: 1.2 }, "-=1.0")
				.from(subRef.current!.children, { y: 30, opacity: 0, duration: 0.8, stagger: 0.15 }, "-=0.6");

			gsap.to(imgWrap.current, {
				yPercent: 25,
				scale: 1.05,
				ease: "none",
				scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: true },
			});

			gsap.to([line1.current, line2.current, line3.current], {
				yPercent: -50,
				opacity: 0,
				ease: "none",
				scrollTrigger: { trigger: section.current, start: "20% top", end: "70% top", scrub: true },
			});
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={section} className="relative h-[110vh] overflow-hidden">
			<div ref={imgWrap} className="absolute inset-0 -top-[20%] -bottom-[20%]">
				<Image src="/image.jpg" alt="Travel" fill className="object-cover" priority />
				<div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/20" />
			</div>

			<div className="relative z-10 flex h-full flex-col justify-end pad-x pb-16 md:pb-24">
				<div ref={tagRef} className="mb-6">
					<span className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50">
						Wander · Discover · Share
					</span>
				</div>

				<div className="overflow-hidden">
					<h1 ref={line1} className="text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter text-white">
						Travel is the
					</h1>
				</div>
				<div className="overflow-hidden">
					<h1 ref={line2} className="text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter text-white">
						only thing you
					</h1>
				</div>
				<div className="overflow-hidden">
					<h1 ref={line3} className="text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter">
						<span className="text-white">buy that makes</span>{" "}
						<span className="font-light italic text-orange-500">you richer.</span>
					</h1>
				</div>

				<div ref={subRef} className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<p className="max-w-sm text-sm leading-relaxed text-white/40">
						Curated journeys to the world&apos;s most extraordinary corners.
						Every trip a story. Every story worth sharing.
					</p>
					<a
						href="#destinations"
						className="group inline-flex items-center gap-4 self-start"
					>
						<span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white transition-transform duration-500 group-hover:scale-110">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
						</span>
						<span className="text-[13px] font-medium uppercase tracking-[0.15em] text-white/50 transition-colors duration-300 group-hover:text-white">
							Explore
						</span>
					</a>
				</div>
			</div>
		</section>
	);
}
