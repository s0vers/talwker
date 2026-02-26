"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useCountUp } from "@/lib/useGsap";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
	const numRef = useCountUp(value, 2);
	return (
		<div className="border-l border-white/10 pl-6">
			<div className="flex items-baseline gap-1">
				<span ref={numRef} className="text-4xl font-bold text-white md:text-5xl">0</span>
				<span className="text-2xl font-bold text-orange-500">{suffix}</span>
			</div>
			<p className="mt-1 text-[13px] text-white/30">{label}</p>
		</div>
	);
}

export default function About() {
	const section = useRef<HTMLElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const imgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.from(textRef.current!.children, {
				y: 60,
				opacity: 0,
				duration: 1,
				stagger: 0.12,
				ease: "power3.out",
				scrollTrigger: { trigger: textRef.current, start: "top 80%" },
			});

			gsap.from(imgRef.current, {
				clipPath: "inset(0 100% 0 0)",
				duration: 1.4,
				ease: "power4.inOut",
				scrollTrigger: { trigger: imgRef.current, start: "top 75%" },
			});

			gsap.to(imgRef.current!.querySelector("img"), {
				yPercent: -12,
				ease: "none",
				scrollTrigger: {
					trigger: section.current,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
			});
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section id="about" ref={section} className="bg-[#0e0e0e] py-32 md:py-44">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
					<div ref={textRef}>
						<span className="mb-5 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							About Talkwer
						</span>
						<h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-white">
							We don&apos;t just plan trips.
							<br />
							We craft{" "}
							<span className="font-light italic text-orange-500">
								memories.
							</span>
						</h2>
						<p className="mt-8 max-w-md text-base leading-relaxed text-white/35">
							Founded by a community of passionate wanderers, Talkwer
							connects curious souls with the world&apos;s most
							extraordinary places. Every itinerary is a story waiting to
							unfold.
						</p>
						<div className="mt-14 grid grid-cols-3 gap-6">
							<Stat value={500} suffix="+" label="Destinations" />
							<Stat value={12} suffix="yr" label="Experience" />
							<Stat value={50} suffix="K" label="Travelers" />
						</div>
					</div>

					<div
						ref={imgRef}
						className="relative overflow-hidden rounded-3xl"
						style={{ clipPath: "inset(0 0% 0 0)" }}
					>
						<div className="relative h-[500px] overflow-hidden lg:h-[650px]">
							<Image
								src="/image.jpg"
								alt="Experience"
								fill
								className="object-cover"
							/>
						</div>
						<div className="absolute bottom-6 left-6 rounded-xl bg-[#0a0a0a]/80 p-5 backdrop-blur-xl">
							<p className="text-3xl font-bold text-white">4.9</p>
							<p className="text-[12px] text-white/40">
								Avg. rating · 3,200 reviews
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
