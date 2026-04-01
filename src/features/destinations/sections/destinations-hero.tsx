"use client";

import { useRef } from "react";
import { DESTINATIONS_PAGE_HERO } from "@/features/destinations/content/destinations-page-copy";
import { useDestinationsHeroEntrance } from "./destinations-hero-gsap";

export default function DestinationsHero() {
	const sectionRef = useRef<HTMLElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const railRef = useRef<HTMLDivElement>(null);
	const kickerLineRef = useRef<HTMLSpanElement>(null);
	const kickerRef = useRef<HTMLParagraphElement>(null);
	const title1Ref = useRef<HTMLSpanElement>(null);
	const title2Ref = useRef<HTMLSpanElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const scrollCueRef = useRef<HTMLDivElement>(null);
	const passRef = useRef<HTMLDivElement>(null);
	const coordsRef = useRef<HTMLUListElement>(null);

	useDestinationsHeroEntrance({
		section: sectionRef,
		svgRef,
		railRef,
		kickerLineRef,
		kickerRef,
		title1Ref,
		title2Ref,
		descRef,
		scrollCueRef,
		passRef,
		coordsRef,
	});

	return (
		<section
			ref={sectionRef}
			aria-labelledby="destinations-hero-title"
			className="relative min-h-[min(92vh,880px)] overflow-hidden bg-[#050505] text-white"
		>
			{/* Ambient — orange only at low opacity; second glow neutral (no extra brand hue) */}
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_70%_-10%,rgba(249,115,22,0.09),transparent_55%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(255,255,255,0.04),transparent_60%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.04]"
				style={{
					backgroundImage:
						"linear-gradient(to right, rgba(255,255,255,0.9) 1px, transparent 1px)",
					backgroundSize: "72px 100%",
				}}
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.025]"
				style={{
					backgroundImage:
						"linear-gradient(to bottom, rgba(255,255,255,0.85) 1px, transparent 1px)",
					backgroundSize: "100% 56px",
				}}
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.025]"
				style={{
					backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
					backgroundSize: "50px 50px",
				}}
				aria-hidden
			/>

			<svg
				ref={svgRef}
				className="pointer-events-none absolute -right-[12%] top-1/2 hidden h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-y-1/2 text-white/10 lg:block"
				viewBox="0 0 200 200"
				aria-hidden
			>
				<circle
					cx="100"
					cy="100"
					r="78"
					fill="none"
					stroke="currentColor"
					strokeWidth="0.35"
					strokeDasharray="4 6"
					className="origin-center motion-reduce:animate-none motion-safe:animate-[spin_120s_linear_infinite]"
				/>
				<circle
					cx="100"
					cy="100"
					r="62"
					fill="none"
					stroke="currentColor"
					strokeWidth="0.25"
					opacity="0.5"
				/>
				<line
					x1="100"
					y1="22"
					x2="100"
					y2="32"
					stroke="rgb(249 115 22)"
					strokeWidth="0.6"
					opacity="0.5"
				/>
				<line
					x1="178"
					y1="100"
					x2="168"
					y2="100"
					stroke="rgb(249 115 22)"
					strokeWidth="0.6"
					opacity="0.35"
				/>
			</svg>

			<div className="relative z-10 mx-auto max-w-[1600px] pad-x pb-20 pt-28 md:pb-24 md:pt-36">
				<div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-10">
					<div className="relative lg:col-span-7">
						<div
							ref={railRef}
							className="absolute -left-2 top-0 hidden h-full max-h-[320px] text-[10px] font-medium uppercase tracking-[0.35em] text-white/35 md:block"
							style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
							aria-hidden
						>
							{DESTINATIONS_PAGE_HERO.verticalRail}
						</div>

						<div className="md:pl-10">
							<p
								ref={kickerRef}
								className="mb-8 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500"
							>
								<span
									ref={kickerLineRef}
									className="inline-block h-px w-8 origin-left bg-orange-500/50"
									aria-hidden
								/>
								{DESTINATIONS_PAGE_HERO.kicker}
							</p>

							<h1
								id="destinations-hero-title"
								className="m-0 max-w-[18ch] text-left font-normal text-[clamp(2.75rem,8.5vw,5.75rem)] leading-[0.92] tracking-tight"
							>
								<span ref={title1Ref} className="block font-semibold text-white">
									{DESTINATIONS_PAGE_HERO.titleLine1}
								</span>
								<span
									ref={title2Ref}
									className="mt-1 block font-light italic text-orange-500"
								>
									{DESTINATIONS_PAGE_HERO.titleAccent}
								</span>
							</h1>

							<p
								ref={descRef}
								className="mt-10 max-w-md text-sm leading-relaxed text-white/55 md:text-base md:leading-relaxed"
							>
								{DESTINATIONS_PAGE_HERO.description}
							</p>

							<div
								ref={scrollCueRef}
								className="mt-14 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/25"
							>
								<span
									className="h-12 w-px bg-linear-to-b from-orange-500/50 to-transparent"
									aria-hidden
								/>
								<span>{DESTINATIONS_PAGE_HERO.scrollCue}</span>
							</div>
						</div>
					</div>

					<div className="lg:col-span-5">
						<div
							ref={passRef}
							className="relative border border-dashed border-white/10 bg-[#0a0a0a]/90 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md md:p-8"
						>
							<div
								className="absolute -right-px -top-px h-8 w-8 border-r border-t border-orange-500/40"
								aria-hidden
							/>
							<div
								className="absolute -bottom-px -left-px h-8 w-8 border-b border-l border-orange-500/35"
								aria-hidden
							/>

							<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
								{DESTINATIONS_PAGE_HERO.passEyebrow}
							</p>
							<p className="mt-4 text-[clamp(1.1rem,3.5vw,1.35rem)] font-semibold uppercase tracking-[0.12em] text-white/90">
								{DESTINATIONS_PAGE_HERO.passTitle}
							</p>
							<p className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
								{DESTINATIONS_PAGE_HERO.passMeta}
							</p>

							<ul
								ref={coordsRef}
								className="mt-8 space-y-4 border-t border-white/6 pt-8"
							>
								{DESTINATIONS_PAGE_HERO.coordinates.map((row) => (
									<li
										key={row.place}
										className="flex items-baseline justify-between gap-4 text-[11px] text-white/50"
									>
										<span className="tracking-[0.14em] text-white/65">{row.line}</span>
										<span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-500">
											{row.place}
										</span>
									</li>
								))}
							</ul>

							<p className="mt-8 border-t border-dashed border-white/8 pt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
								{DESTINATIONS_PAGE_HERO.passFooter}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
