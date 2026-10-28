"use client";

import { LuArrowDown } from "react-icons/lu";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { DESTINATIONS_PAGE_HERO } from "@/features/destinations/content/destinations-page-copy";
import { useDestinationsHeroEntrance } from "./destinations-hero-gsap";

export default function DestinationsHero() {
	const t = useTranslations("Destinations.hero");
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
		coordsRef
	});

	return (
		<section
			ref={sectionRef}
			aria-labelledby="destinations-hero-title"
			className="relative overflow-hidden bg-[#050505] text-white lg:min-h-[min(92vh,880px)]"
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
					backgroundSize: "72px 100%"
				}}
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.025]"
				style={{
					backgroundImage:
						"linear-gradient(to bottom, rgba(255,255,255,0.85) 1px, transparent 1px)",
					backgroundSize: "100% 56px"
				}}
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.025]"
				style={{
					backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
					backgroundSize: "50px 50px"
				}}
				aria-hidden
			/>

			<svg
				ref={svgRef}
				className="pointer-events-none absolute top-1/2 -right-[12%] hidden h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-y-1/2 text-white/10 lg:block"
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
					className="origin-center motion-safe:animate-[spin_120s_linear_infinite] motion-reduce:animate-none"
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

			<div className="pad-x relative z-10 mx-auto max-w-[1600px] pt-28 pb-10 md:pt-36 md:pb-24">
				<div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-10">
					<div className="relative lg:col-span-7">
						<div
							ref={railRef}
							className="absolute top-0 -left-2 hidden h-full max-h-[320px] text-[10px] font-medium tracking-[0.35em] text-white/35 uppercase md:block"
							style={{
								writingMode: "vertical-rl",
								transform: "rotate(180deg)"
							}}
							aria-hidden
						>
							{t("verticalRail")}
						</div>

						<div className="md:pl-10">
							<p
								ref={kickerRef}
								className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.25em] text-orange-500 uppercase md:mb-8"
							>
								<span
									ref={kickerLineRef}
									className="inline-block h-px w-8 origin-left bg-orange-500/50"
									aria-hidden
								/>
								{t("kicker")}
							</p>

							<h1
								id="destinations-hero-title"
								className="m-0 max-w-[18ch] text-left text-[clamp(2.75rem,8.5vw,5.75rem)] leading-[0.92] font-normal tracking-tight"
							>
								<span
									ref={title1Ref}
									className="block font-semibold text-white"
								>
									{t("titleLine1")}
								</span>
								<span
									ref={title2Ref}
									className="mt-1 block font-light text-orange-500 italic"
								>
									{t("titleAccent")}
								</span>
							</h1>

							<p
								ref={descRef}
								className="mt-6 max-w-md text-sm leading-relaxed text-white/55 md:mt-10 md:text-base md:leading-relaxed"
							>
								{t("description")}
							</p>

							<div ref={scrollCueRef} className="mt-6 md:mt-14">
								<a
									href="#destinations-search"
									className="inline-flex min-h-11 items-center gap-3 rounded-full border border-white/20 px-5 py-2 text-[11px] font-medium tracking-[0.15em] text-white/80 uppercase transition-colors hover:border-orange-500 hover:text-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
								>
									{t("scrollCue")}
									<LuArrowDown className="h-4 w-4" aria-hidden="true" />
								</a>
							</div>
						</div>
					</div>

					<div className="hidden lg:col-span-5 lg:block">
						<div
							ref={passRef}
							className="relative border border-dashed border-white/10 bg-[#0a0a0a]/90 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md md:p-8"
						>
							<div
								className="absolute -top-px -right-px h-8 w-8 border-t border-r border-orange-500/40"
								aria-hidden
							/>
							<div
								className="absolute -bottom-px -left-px h-8 w-8 border-b border-l border-orange-500/35"
								aria-hidden
							/>

							<p className="text-[11px] font-semibold tracking-[0.22em] text-orange-500 uppercase">
								{t("passEyebrow")}
							</p>
							<p className="mt-4 text-[clamp(1.1rem,3.5vw,1.35rem)] font-semibold tracking-[0.12em] text-white/90 uppercase">
								{t("passTitle")}
							</p>
							<p className="mt-2 text-[10px] font-medium tracking-[0.18em] text-white/35 uppercase">
								{t("passMeta")}
							</p>

							<ul
								ref={coordsRef}
								className="mt-8 space-y-4 border-t border-white/6 pt-8"
							>
								{DESTINATIONS_PAGE_HERO.coordinates.map(row => (
									<li
										key={row.place}
										className="flex items-baseline justify-between gap-4 text-[11px] text-white/50"
									>
										<span className="tracking-[0.14em] text-white/65">
											{row.line}
										</span>
										<span className="shrink-0 text-[10px] font-semibold tracking-[0.2em] text-orange-500 uppercase">
											{row.place}
										</span>
									</li>
								))}
							</ul>

							<p className="mt-8 border-t border-dashed border-white/8 pt-6 text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase">
								{t("passFooter")}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
