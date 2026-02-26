"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/useGsap";
import { useCountUp } from "@/lib/useGsap";
import Image from "next/image";

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
	const numRef = useCountUp(value, 2.5);
	return (
		<div>
			<div className="flex items-baseline gap-1">
				<span ref={numRef} className="text-5xl font-bold text-neutral-900 md:text-6xl">
					0
				</span>
				<span className="text-3xl font-bold text-orange-500 md:text-4xl">{suffix}</span>
			</div>
			<p className="mt-2 text-sm text-neutral-500">{label}</p>
		</div>
	);
}

export default function About() {
	const sectionRef = useRef<HTMLElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.from(textRef.current!.children, {
				y: 60,
				opacity: 0,
				duration: 0.9,
				stagger: 0.12,
				ease: "power3.out",
				scrollTrigger: { trigger: textRef.current, start: "top 80%" },
			});

			gsap.from(imageRef.current, {
				x: 80,
				opacity: 0,
				duration: 1.2,
				ease: "power3.out",
				scrollTrigger: { trigger: imageRef.current, start: "top 80%" },
			});

			gsap.to(imageRef.current!.querySelector("img"), {
				yPercent: -10,
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
			id="about"
			ref={sectionRef}
			className="section-spacing section-padding overflow-hidden"
		>
			<div className="mx-auto max-w-[1400px]">
				<div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
					<div ref={textRef}>
						<div className="label-sm mb-4">About Talkwer</div>
						<h2 className="heading-lg text-neutral-900">
							We don&apos;t just plan trips.
							<br />
							We craft{" "}
							<span className="italic text-orange-500">memories</span>.
						</h2>
						<p className="body-lg mt-6 max-w-lg">
							Founded by a community of passionate wanderers, Talkwer
							connects curious souls with the world&apos;s most
							extraordinary places. Every itinerary is a story waiting to
							unfold.
						</p>

						<div className="mt-12 grid grid-cols-3 gap-8">
							<StatItem value={500} suffix="+" label="Destinations" />
							<StatItem value={12} suffix="yr" label="Experience" />
							<StatItem value={50} suffix="K" label="Happy Travelers" />
						</div>
					</div>

					<div ref={imageRef} className="relative">
						<div className="relative h-[500px] overflow-hidden rounded-3xl lg:h-[600px]">
							<Image
								src="/image.jpg"
								alt="Travel experience"
								fill
								className="object-cover"
							/>
						</div>
						<div className="absolute -bottom-6 -left-6 rounded-2xl bg-orange-500 p-6 text-white shadow-2xl shadow-orange-500/30 md:-bottom-8 md:-left-8">
							<p className="text-4xl font-bold">4.9</p>
							<p className="mt-1 text-sm text-white/80">
								Average rating
							</p>
							<p className="text-xs text-white/60">
								from 3,200+ reviews
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
