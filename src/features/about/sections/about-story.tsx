"use client";

import Image from "next/image";
import { useRef } from "react";
import {
	gsap,
	prefersReducedMotion,
	useGsapContext,
	useCountUp,
} from "@/lib/useGsap";
import {
	ABOUT_STORY_COPY,
	ABOUT_STATS,
} from "@/features/about/content/about-copy";

function StatItem({
	value,
	suffix,
	label,
}: {
	value: number;
	suffix: string;
	label: string;
}) {
	const numRef = useCountUp(value, 2);
	return (
		<div className="border-l border-white/10 pl-6">
			<div className="flex items-baseline gap-1">
				<span
					ref={numRef}
					className="text-3xl font-bold text-white md:text-4xl lg:text-5xl"
				>
					0
				</span>
				<span className="text-xl font-bold text-orange-500 md:text-2xl">
					{suffix}
				</span>
			</div>
			<p className="mt-1 text-[13px] text-white/30">{label}</p>
		</div>
	);
}

export default function AboutStory() {
	const section = useRef<HTMLElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const imgRef = useRef<HTMLDivElement>(null);
	const statsRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		section,
		() => {
			if (prefersReducedMotion()) return;

			if (textRef.current?.children.length) {
				gsap.from(textRef.current.children, {
					y: 70,
					opacity: 0,
					duration: 1,
					stagger: 0.12,
					ease: "power3.out",
					scrollTrigger: { trigger: textRef.current, start: "top 80%" },
				});
			}

			if (imgRef.current) {
				gsap.from(imgRef.current, {
					clipPath: "inset(0 100% 0 0)",
					duration: 1.6,
					ease: "power4.inOut",
					scrollTrigger: { trigger: imgRef.current, start: "top 75%" },
				});

				const img = imgRef.current.querySelector("img");
				if (img) {
					gsap.to(img, {
						yPercent: -15,
						ease: "none",
						scrollTrigger: {
							trigger: section.current,
							start: "top bottom",
							end: "bottom top",
							scrub: true,
						},
					});
				}
			}

			if (statsRef.current?.children.length) {
				gsap.from(statsRef.current.children, {
					y: 40,
					opacity: 0,
					duration: 0.9,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
				});
			}
		},
		[],
	);

	return (
		<section ref={section} className="bg-[#0e0e0e] py-32 md:py-44">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
					<div ref={textRef}>
						<span className="mb-5 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							{ABOUT_STORY_COPY.label}
						</span>
						<h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-white">
							{ABOUT_STORY_COPY.titleLead}
							<br />
							<span className="font-light italic text-orange-500">
								{ABOUT_STORY_COPY.titleAccent}
							</span>
						</h2>
						{ABOUT_STORY_COPY.paragraphs.map((p, i) => (
							<p
								key={i}
								className="mt-6 max-w-lg text-sm leading-relaxed text-white/40 md:text-base"
							>
								{p}
							</p>
						))}
					</div>

					<div
						ref={imgRef}
						className="relative overflow-hidden rounded-3xl"
						style={{ clipPath: "inset(0 0% 0 0)" }}
					>
						<div className="relative h-[500px] overflow-hidden lg:h-[700px]">
							<Image
								src="/image.jpg"
								alt={ABOUT_STORY_COPY.imageAlt}
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover"
								loading="lazy"
								fetchPriority="low"
							/>
						</div>
						<div className="absolute inset-0 bg-linear-to-t from-[#0e0e0e]/60 via-transparent to-transparent" />
					</div>
				</div>

				<div
					ref={statsRef}
					className="mt-20 grid grid-cols-2 gap-8 md:mt-28 md:grid-cols-4"
				>
					{ABOUT_STATS.map((stat) => (
						<StatItem
							key={stat.label}
							value={stat.value}
							suffix={stat.suffix}
							label={stat.label}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
