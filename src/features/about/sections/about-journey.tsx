"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { ABOUT_JOURNEY } from "@/features/about/content/about-copy";

export default function AboutJourney() {
	const section = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const lineRef = useRef<HTMLDivElement>(null);
	const milestonesRef = useRef<HTMLDivElement>(null);

	useGsapContext(section, () => {
		if (prefersReducedMotion()) return;

		if (headingRef.current?.children.length) {
			gsap.from(headingRef.current.children, {
				y: 60,
				opacity: 0,
				duration: 1,
				stagger: 0.12,
				ease: "power3.out",
				scrollTrigger: { trigger: headingRef.current, start: "top 80%" }
			});
		}

		if (lineRef.current) {
			gsap.fromTo(
				lineRef.current,
				{ scaleY: 0 },
				{
					scaleY: 1,
					ease: "none",
					scrollTrigger: {
						trigger: milestonesRef.current,
						start: "top 70%",
						end: "bottom 30%",
						scrub: true
					}
				}
			);
		}

		const items =
			milestonesRef.current?.querySelectorAll<HTMLElement>("[data-milestone]");
		if (items?.length) {
			items.forEach((item, i) => {
				const isLeft = i % 2 === 0;
				gsap.from(item, {
					x: isLeft ? -80 : 80,
					opacity: 0,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: item,
						start: "top 82%",
						toggleActions: "play none none none"
					}
				});

				const dot = item.querySelector("[data-dot]");
				if (dot) {
					gsap.from(dot, {
						scale: 0,
						duration: 0.6,
						ease: "back.out(2)",
						scrollTrigger: {
							trigger: item,
							start: "top 80%",
							toggleActions: "play none none none"
						}
					});
				}
			});
		}
	}, []);

	return (
		<section ref={section} className="bg-[#0e0e0e] py-32 md:py-44">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div ref={headingRef} className="mb-20 text-center md:mb-28">
					<span className="mb-5 inline-block text-[11px] font-semibold tracking-[0.25em] text-orange-500 uppercase">
						Our Journey
					</span>
					<h2 className="text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.95] font-bold tracking-tighter text-white">
						Milestones that shaped us
						<span className="font-light text-orange-500 italic">.</span>
					</h2>
				</div>

				<div ref={milestonesRef} className="relative">
					<div
						ref={lineRef}
						className="absolute top-0 left-1/2 h-full w-px origin-top -translate-x-1/2 bg-orange-500/30"
					/>

					<div className="flex flex-col gap-20 md:gap-28">
						{ABOUT_JOURNEY.map((milestone, i) => {
							const isLeft = i % 2 === 0;
							return (
								<div
									key={milestone.year}
									data-milestone
									className={`relative flex flex-col items-center gap-6 md:flex-row ${
										isLeft ? "md:flex-row" : "md:flex-row-reverse"
									}`}
								>
									<div
										className={`flex-1 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}
									>
										<span className="text-[clamp(3rem,6vw,5rem)] leading-none font-black text-white/6">
											{milestone.year}
										</span>
										<h3 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">
											{milestone.title}
										</h3>
										<p className="mt-3 max-w-sm text-sm leading-relaxed text-white/40 md:text-base">
											{milestone.description}
										</p>
									</div>

									<div className="relative z-10 flex shrink-0 items-center justify-center">
										<div
											data-dot
											className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-orange-500 bg-[#0e0e0e]"
										>
											<div className="h-2 w-2 rounded-full bg-orange-500" />
										</div>
									</div>

									<div className="flex-1" />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
