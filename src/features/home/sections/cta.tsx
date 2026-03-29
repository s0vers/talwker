"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { CTA_COPY } from "@/features/home/content/section-copy";

export default function CTA() {
	const section = useRef<HTMLElement>(null);
	const headRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		section,
		() => {
			if (prefersReducedMotion() || !headRef.current) return;
			gsap.from(headRef.current.children, {
				y: 60,
				opacity: 0,
				duration: 1,
				stagger: 0.12,
				ease: "power3.out",
				scrollTrigger: { trigger: headRef.current, start: "top 80%" },
			});
		},
		[],
	);

	return (
		<section
			id="contact"
			ref={section}
			aria-labelledby="contact-title"
			className="relative bg-[#0a0a0a] py-32 md:py-44"
		>
			<div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

			<div ref={headRef} className="relative mx-auto max-w-[1600px] pad-x text-center">
				<span className="mb-6 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
					{CTA_COPY.label}
				</span>
				<h2
					id="contact-title"
					className="mx-auto max-w-4xl text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.9] tracking-tighter text-white"
				>
					{CTA_COPY.titleLead}{" "}
					<span className="font-light italic text-orange-500">
						{CTA_COPY.titleAccent}
					</span>
				</h2>
				<p className="mx-auto mt-8 max-w-lg text-base text-white/30">
					{CTA_COPY.description}
				</p>
				<div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
					<button
						type="button"
						className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-10 py-4 text-[13px] font-semibold uppercase tracking-widest text-white transition-all duration-500 hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-500/25"
					>
						{CTA_COPY.primaryAction}
						<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
					</button>
					<button
						type="button"
						className="rounded-full border border-white/10 px-10 py-4 text-[13px] font-semibold uppercase tracking-widest text-white/40 transition-all duration-300 hover:border-white/30 hover:text-white"
					>
						{CTA_COPY.secondaryAction}
					</button>
				</div>
			</div>
		</section>
	);
}

