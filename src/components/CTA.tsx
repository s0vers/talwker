"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/useGsap";

export default function CTA() {
	const section = useRef<HTMLElement>(null);
	const headRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.from(headRef.current!.children, {
				y: 60,
				opacity: 0,
				duration: 1,
				stagger: 0.12,
				ease: "power3.out",
				scrollTrigger: { trigger: headRef.current, start: "top 80%" },
			});
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id="contact"
			ref={section}
			className="relative bg-[#0a0a0a] py-32 md:py-44"
		>
			<div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

			<div ref={headRef} className="relative mx-auto max-w-[1600px] pad-x text-center">
				<span className="mb-6 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
					Ready?
				</span>
				<h2 className="mx-auto max-w-4xl text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.9] tracking-tighter text-white">
					Let&apos;s plan something{" "}
					<span className="font-light italic text-orange-500">extraordinary</span>
				</h2>
				<p className="mx-auto mt-8 max-w-lg text-base text-white/30">
					Tell us your dream destination and travel style. We&apos;ll craft an
					itinerary you&apos;ll never forget.
				</p>
				<div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
					<a
						href="#"
						className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-10 py-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition-all duration-500 hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-500/25"
					>
						Start Planning
						<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
					</a>
					<a
						href="#"
						className="rounded-full border border-white/10 px-10 py-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-white/40 transition-all duration-300 hover:border-white/30 hover:text-white"
					>
						Browse Tours
					</a>
				</div>
			</div>
		</section>
	);
}
