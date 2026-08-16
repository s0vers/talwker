"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useAboutHeroGsap } from "./about-hero-gsap";

export default function AboutHero() {
	const t = useTranslations("About.hero");
	const section = useRef<HTMLElement>(null);
	const topLineRef = useRef<HTMLDivElement>(null);
	const headPre = useRef<HTMLDivElement>(null);
	const headAccent = useRef<HTMLDivElement>(null);
	const headPost = useRef<HTMLDivElement>(null);
	const headAccent2 = useRef<HTMLDivElement>(null);
	const stripRef = useRef<HTMLDivElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const scrollCue = useRef<HTMLDivElement>(null);

	useAboutHeroGsap({
		section,
		topLineRef,
		headPre,
		headAccent,
		headPost,
		headAccent2,
		stripRef,
		descRef,
		scrollCue,
	});

	return (
		<section
			ref={section}
			className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-[#050505]"
		>
			<div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

			<div className="relative z-10 pad-x py-32 md:py-40">
				<div className="mx-auto max-w-[1600px]">
					<div
						ref={topLineRef}
						className="mb-10 h-px w-full origin-left bg-white/10 md:mb-14"
					/>

					<div className="flex items-center gap-4 md:gap-6">
						<span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							{t("tagline")}
						</span>
						<span className="h-px flex-1 bg-white/10" />
					</div>

					<div className="mt-8 md:mt-12">
						<div className="overflow-hidden">
							<div
								ref={headPre}
								className="text-[clamp(2.5rem,9vw,8rem)] font-bold leading-[0.88] tracking-tighter text-white"
							>
								{t("headlinePre")}
							</div>
						</div>
						<div className="overflow-hidden">
							<div
								ref={headAccent}
								className="text-[clamp(2.5rem,9vw,8rem)] font-light italic leading-[0.88] tracking-tighter text-orange-500"
							>
								{t("headlineAccent")}
							</div>
						</div>
						<div className="mt-2 overflow-hidden md:mt-4">
							<div
								ref={headPost}
								className="text-[clamp(2.5rem,9vw,8rem)] font-bold leading-[0.88] tracking-tighter text-white"
							>
								{t("headlinePost")}
							</div>
						</div>
						<div className="overflow-hidden">
							<div
								ref={headAccent2}
								className="text-[clamp(2.5rem,9vw,8rem)] font-light italic leading-[0.88] tracking-tighter text-orange-500"
							>
								{t("headlineAccent2")}
							</div>
						</div>
					</div>

					<div
						ref={stripRef}
						className="relative my-12 h-[200px] overflow-hidden rounded-2xl md:my-16 md:h-[280px] lg:h-[340px]"
						style={{ clipPath: "inset(0 0% 0 0%)" }}
					>
						<Image
							src="/image.jpg"
							alt="Talkwer travel experience"
							fill
							sizes="100vw"
							className="object-cover"
							priority
							loading="eager"
						/>
						<div className="absolute inset-0 bg-linear-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />
					</div>

					<p
						ref={descRef}
						className="max-w-2xl text-sm leading-relaxed text-white/40 md:text-base"
					>
						{t("description")}
					</p>

					<div
						ref={scrollCue}
						className="mt-16 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/25"
					>
						<span className="h-10 w-px bg-white/15" />
						<span>{t("scrollCue")}</span>
					</div>
				</div>
			</div>
		</section>
	);
}
