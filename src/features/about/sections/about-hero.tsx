"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { ABOUT_HERO_COPY } from "@/features/about/content/about-copy";

export default function AboutHero() {
	const section = useRef<HTMLElement>(null);
	const topLineRef = useRef<HTMLDivElement>(null);
	const headPre = useRef<HTMLDivElement>(null);
	const headAccent = useRef<HTMLDivElement>(null);
	const headPost = useRef<HTMLDivElement>(null);
	const headAccent2 = useRef<HTMLDivElement>(null);
	const stripRef = useRef<HTMLDivElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const statsRef = useRef<HTMLDivElement>(null);
	const scrollCue = useRef<HTMLDivElement>(null);

	useGsapContext(
		section,
		() => {
			if (prefersReducedMotion()) return;

			const tl = gsap.timeline({
				defaults: { ease: "power4.out" },
				delay: 0.3,
			});

			tl.from(topLineRef.current, {
				scaleX: 0,
				duration: 1.2,
				ease: "power2.inOut",
			})
				.from(
					headPre.current,
					{ y: "110%", opacity: 0, duration: 1.1 },
					"-=0.7",
				)
				.from(
					headAccent.current,
					{ y: "110%", opacity: 0, duration: 1.1 },
					"-=0.85",
				)
				.from(
					headPost.current,
					{ y: "110%", opacity: 0, duration: 1.1 },
					"-=0.85",
				)
				.from(
					headAccent2.current,
					{ y: "110%", opacity: 0, duration: 1.1 },
					"-=0.85",
				)
				.from(
					stripRef.current,
					{
						clipPath: "inset(0 50% 0 50%)",
						opacity: 0,
						duration: 1.4,
						ease: "power4.inOut",
					},
					"-=0.6",
				)
				.from(
					descRef.current,
					{ y: 30, opacity: 0, duration: 0.9 },
					"-=0.5",
				);

			if (statsRef.current?.children.length) {
				tl.from(
					statsRef.current.children,
					{ y: 30, opacity: 0, stagger: 0.1, duration: 0.7 },
					"-=0.5",
				);
			}

			tl.from(
				scrollCue.current,
				{ y: 15, opacity: 0, duration: 0.6 },
				"-=0.3",
			);

			gsap.to(
				[
					headPre.current,
					headAccent.current,
					headPost.current,
					headAccent2.current,
				],
				{
					yPercent: -30,
					ease: "none",
					scrollTrigger: {
						trigger: section.current,
						start: "top top",
						end: "bottom top",
						scrub: true,
					},
				},
			);

			gsap.to(stripRef.current, {
				scale: 1.06,
				ease: "none",
				scrollTrigger: {
					trigger: section.current,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});
		},
		[],
	);

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
							{ABOUT_HERO_COPY.tagline}
						</span>
						<span className="h-px flex-1 bg-white/10" />
					</div>

					<div className="mt-8 md:mt-12">
						<div className="overflow-hidden">
							<div
								ref={headPre}
								className="text-[clamp(2.5rem,9vw,8rem)] font-bold leading-[0.88] tracking-tighter text-white"
							>
								{ABOUT_HERO_COPY.headlinePre}
							</div>
						</div>
						<div className="overflow-hidden">
							<div
								ref={headAccent}
								className="text-[clamp(2.5rem,9vw,8rem)] font-light italic leading-[0.88] tracking-tighter text-orange-500"
							>
								{ABOUT_HERO_COPY.headlineAccent}
							</div>
						</div>
						<div className="mt-2 overflow-hidden md:mt-4">
							<div
								ref={headPost}
								className="text-[clamp(2.5rem,9vw,8rem)] font-bold leading-[0.88] tracking-tighter text-white"
							>
								{ABOUT_HERO_COPY.headlinePost}
							</div>
						</div>
						<div className="overflow-hidden">
							<div
								ref={headAccent2}
								className="text-[clamp(2.5rem,9vw,8rem)] font-light italic leading-[0.88] tracking-tighter text-orange-500"
							>
								{ABOUT_HERO_COPY.headlineAccent2}
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
						/>
						<div className="absolute inset-0 bg-linear-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />
					</div>

					<div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
						<p
							ref={descRef}
							className="max-w-lg text-sm leading-relaxed text-white/40 md:text-base"
						>
							{ABOUT_HERO_COPY.description}
						</p>

						<div ref={statsRef} className="flex gap-10 md:gap-14">
							<div className="border-l border-white/10 pl-5">
								<p className="text-2xl font-bold text-white md:text-3xl">
									{ABOUT_HERO_COPY.stat1.value}
								</p>
								<p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/30">
									{ABOUT_HERO_COPY.stat1.label}
								</p>
							</div>
							<div className="border-l border-white/10 pl-5">
								<p className="text-2xl font-bold text-white md:text-3xl">
									{ABOUT_HERO_COPY.stat2.value}
								</p>
								<p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/30">
									{ABOUT_HERO_COPY.stat2.label}
								</p>
							</div>
						</div>
					</div>

					<div
						ref={scrollCue}
						className="mt-16 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/25"
					>
						<span className="h-10 w-px bg-white/15" />
						<span>Scroll to explore</span>
					</div>
				</div>
			</div>
		</section>
	);
}
