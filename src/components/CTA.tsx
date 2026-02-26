"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/useGsap";

export default function CTA() {
	const sectionRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const bgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.from(contentRef.current!.children, {
				y: 50,
				opacity: 0,
				duration: 0.9,
				stagger: 0.12,
				ease: "power3.out",
				scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
			});

			gsap.to(bgRef.current!.querySelector("img"), {
				yPercent: 15,
				ease: "none",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id="contact"
			ref={sectionRef}
			className="section-padding py-20 md:py-28"
		>
			<div className="mx-auto max-w-[1400px]">
				<div className="relative overflow-hidden rounded-3xl">
					<div
						ref={bgRef}
						className="absolute inset-0 -top-[15%] -bottom-[15%]"
					>
						<Image
							src="/image.jpg"
							alt="Travel CTA"
							fill
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-neutral-900/80" />
					</div>

					<div
						ref={contentRef}
						className="relative px-8 py-20 text-center md:px-20 md:py-28"
					>
						<div className="label-sm mb-4 text-orange-400">
							Ready for your next adventure?
						</div>
						<h2 className="heading-lg mx-auto max-w-3xl text-white">
							Let&apos;s plan something{" "}
							<span className="italic text-orange-400">extraordinary</span>
						</h2>
						<p className="mx-auto mt-6 max-w-xl text-base text-white/50">
							Tell us your dream destination and travel style. We&apos;ll
							handle the rest — from flights to unforgettable local
							experiences.
						</p>
						<div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
							<a
								href="#"
								className="rounded-full bg-orange-500 px-10 py-4 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/20"
							>
								Start Planning
							</a>
							<a
								href="#"
								className="rounded-full px-10 py-4 text-sm font-semibold text-white ring-1 ring-white/20 transition-all hover:bg-white/10"
							>
								Browse Tours
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
