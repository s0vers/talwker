"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { ABOUT_VALUES } from "@/features/about/content/about-copy";

export default function AboutValues() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const section = sectionRef.current;
			const track = trackRef.current;
			if (!section || !track) return;

			if (headingRef.current?.children.length) {
				gsap.from(headingRef.current.children, {
					y: 50,
					opacity: 0,
					duration: 0.9,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
				});
			}

			const totalScroll = () => {
				const scrollWidth = track.scrollWidth;
				const viewport =
					track.parentElement?.clientWidth ?? window.innerWidth;
				return Math.max(0, scrollWidth - viewport);
			};

			gsap.to(track, {
				x: () => -totalScroll(),
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top top+=100",
					end: () => `+=${totalScroll()}`,
					pin: section,
					scrub: 0.8,
					invalidateOnRefresh: true,
				},
			});

			const cards =
				track.querySelectorAll<HTMLElement>("[data-value-card]");
			cards.forEach((card, i) => {
				gsap.from(card, {
					rotationY: -12,
					opacity: 0,
					scale: 0.92,
					duration: 0.8,
					delay: i * 0.05,
					ease: "power3.out",
					scrollTrigger: {
						trigger: card,
						containerAnimation: gsap.getById?.("values-scrub") ?? undefined,
						start: "left 80%",
						toggleActions: "play none none none",
					},
				});
			});
		},
		[],
	);

	return (
		<section
			ref={sectionRef}
			className="bg-[#0a0a0a] py-28 md:py-36"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div ref={headingRef} className="mb-14 md:mb-20">
					<span className="mb-5 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
						What We Stand For
					</span>
					<h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-white">
						Our Values
						<span className="font-light italic text-orange-500">.</span>
					</h2>
				</div>

				<div className="relative overflow-hidden">
					<div ref={trackRef} className="flex gap-6 md:gap-8" style={{ perspective: "1200px" }}>
						{ABOUT_VALUES.map((val) => (
							<div
								key={val.id}
								data-value-card
								className="group relative min-w-[85vw] overflow-hidden rounded-3xl border border-white/10 bg-[#101010] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-orange-500/30 sm:min-w-[60vw] md:min-w-[45vw] md:p-12 lg:min-w-[500px]"
								style={{ transformStyle: "preserve-3d" }}
							>
								<div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-orange-500/5 blur-3xl transition-all duration-700 group-hover:bg-orange-500/10" />

								<span className="text-[clamp(4rem,8vw,7rem)] font-black leading-none text-white/[0.04]">
									{val.number}
								</span>

								<div className="relative mt-2">
									<h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
										{val.title}
									</h3>
									<p className="mt-4 text-sm leading-relaxed text-white/40 md:text-base">
										{val.description}
									</p>
									<p className="mt-6 text-[13px] font-semibold italic text-orange-500">
										{val.accent}
									</p>
								</div>

								<div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-500 transition-all duration-700 group-hover:w-full" />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
