"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
	gsap,
	prefersReducedMotion,
	useGsapContext,
	useCountUp,
} from "@/lib/useGsap";
import { ABOUT_STATS } from "@/features/about/content/about-copy";

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
		<div className="flex flex-col items-center justify-center px-2 text-center sm:px-3 md:px-4">
			<div className="flex items-baseline justify-center gap-0.5 tabular-nums">
				<span
					ref={numRef}
					className="text-3xl font-bold text-white md:text-4xl lg:text-5xl"
				>
					0
				</span>
				{suffix ? (
					<span className="text-xl font-bold text-orange-500 md:text-2xl">
						{suffix}
					</span>
				) : null}
			</div>
			<p className="mt-1.5 max-w-52 text-[13px] leading-snug text-white/40">
				{label}
			</p>
		</div>
	);
}

export default function AboutStory() {
	const t = useTranslations("About.story");
	const section = useRef<HTMLElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
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
		<section ref={section} className="bg-[#0e0e0e] py-36 md:py-48">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="mx-auto w-full max-w-4xl">
					<div ref={textRef} className="text-center">
						<span className="mb-8 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500 md:mb-10">
							{t("label")}
						</span>
						<h2 className="text-balance text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-white">
							{t("titleLead")}
							<br />
							<span className="font-light italic text-orange-500">
								{t("titleAccent")}
							</span>
						</h2>
						<p className="mt-10 text-pretty text-sm leading-relaxed text-white/40 md:mt-12 md:text-base">
							{t("p1")}
						</p>
						<p className="mt-8 text-pretty text-sm leading-relaxed text-white/40 md:text-base">
							{t("p2")}
						</p>
						<p className="mt-8 text-pretty text-sm leading-relaxed text-white/40 md:text-base">
							{t("p3")}
						</p>
					</div>

					<div
						ref={statsRef}
						className="mt-24 grid grid-cols-2 gap-y-10 gap-x-4 md:mt-32 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-white/10"
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
			</div>
		</section>
	);
}
