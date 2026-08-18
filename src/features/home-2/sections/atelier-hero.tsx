"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { LuArrowDown, LuCompass, LuLayers } from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { ButtonWithIcon } from "@/shared/ui";
import { Link } from "@/i18n/navigation";

export function AtelierHero() {
	const t = useTranslations("Home2.hero");
	const sectionRef = useRef<HTMLElement>(null);
	const imgWrapRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const mastheadRef = useRef<HTMLDivElement>(null);
	const line1Ref = useRef<HTMLDivElement>(null);
	const line2Ref = useRef<HTMLDivElement>(null);
	const line3Ref = useRef<HTMLDivElement>(null);
	const subContentRef = useRef<HTMLDivElement>(null);
	const floatingCardRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;

			const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

			tl.from(imgWrapRef.current, {
				scale: 1.18,
				duration: 2.4,
				ease: "power2.out",
			})
				.from(
					overlayRef.current,
					{ opacity: 0.3, duration: 1.6, ease: "power2.out" },
					"<",
				)
				.from(
					mastheadRef.current,
					{ y: -24, opacity: 0, duration: 0.8 },
					"-=1.6",
				)
				.from(line1Ref.current, { y: "115%", duration: 1.1 }, "-=1.3")
				.from(line2Ref.current, { y: "115%", duration: 1.1 }, "-=1.0")
				.from(line3Ref.current, { y: "115%", duration: 1.1 }, "-=1.0")
				.from(
					floatingCardRef.current,
					{ x: 30, opacity: 0, scale: 0.95, duration: 1.0 },
					"-=0.8",
				);

			const subChildren = subContentRef.current?.children;
			if (subChildren?.length) {
				tl.from(
					subChildren,
					{
						y: 20,
						opacity: 0,
						duration: 0.7,
						stagger: 0.1,
						clearProps: "opacity,transform",
					},
					"-=0.6",
				);
			}

			// Scroll exit choreography
			gsap.to([line1Ref.current, line2Ref.current, line3Ref.current], {
				yPercent: -30,
				opacity: 0,
				ease: "none",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "25% top",
					end: "70% top",
					scrub: true,
				},
			});

			gsap.to(floatingCardRef.current, {
				yPercent: -20,
				opacity: 0.4,
				ease: "none",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "15% top",
					end: "60% top",
					scrub: true,
				},
			});
		},
		[],
	);

	const regionJumps = [
		{ label: t("regionPatagonia"), href: "#dossiers" },
		{ label: t("regionKyoto"), href: "#dossiers" },
		{ label: t("regionAmalfi"), href: "#dossiers" },
		{ label: t("regionIceland"), href: "#dossiers" },
	];

	return (
		<section
			ref={sectionRef}
			id="atelier-hero"
			aria-labelledby="atelier-hero-title"
			className="relative min-h-svh overflow-hidden bg-[#050505] pt-24 pb-12 flex flex-col justify-between"
		>
			{/* Photographic Backdrop Plate */}
			<div ref={imgWrapRef} className="absolute inset-0">
				<Image
					src="/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg"
					alt="High altitude glacial lagoon at twilight"
					fill
					sizes="100vw"
					className="object-cover object-center brightness-75"
					priority
					loading="eager"
				/>
				<div
					ref={overlayRef}
					className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/65 to-[#050505]/40 backdrop-blur-[1px]"
				/>
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.12),transparent_65%)]" />
			</div>

			{/* Top Masthead Telemetry */}
			<div className="relative z-10 w-full max-w-[1600px] mx-auto pad-x">
				<div
					ref={mastheadRef}
					className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 pt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/55"
				>
					<div className="flex items-center gap-3">
						<span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-0.5 text-[10px] font-semibold text-orange-400">
							<span className="relative flex h-1.5 w-1.5">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
								<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
							</span>
							{t("issueBadge")}
						</span>
						<span className="hidden sm:inline text-white/30">|</span>
						<span className="hidden sm:inline text-white/50">{t("tagline")}</span>
					</div>

					<div className="flex items-center gap-4 text-white/40">
						<span className="font-mono text-[10px] text-white/60">{t("telemetryChip")}</span>
					</div>
				</div>
			</div>

			{/* Center / Lower Hero Spread */}
			<div className="relative z-10 w-full max-w-[1600px] mx-auto pad-x my-auto py-8 lg:py-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
					{/* Left Typographic Masthead */}
					<div className="lg:col-span-8 space-y-4">
						<div className="overflow-hidden">
							<h1
								id="atelier-hero-title"
								ref={line1Ref}
								className="text-[clamp(2.15rem,7.2vw,6.5rem)] font-bold leading-[0.92] tracking-tighter text-white"
							>
								{t("titleLine1")}
							</h1>
						</div>
						<div className="overflow-hidden">
							<h1
								ref={line2Ref}
								className="text-[clamp(2.15rem,7.2vw,6.5rem)] font-bold leading-[0.92] tracking-tighter text-white"
							>
								{t("titleLine2")}
							</h1>
						</div>
						<div className="overflow-hidden">
							<h1
								ref={line3Ref}
								className="text-[clamp(2.15rem,7.2vw,6.5rem)] font-bold leading-[0.92] tracking-tighter"
							>
								<span className="text-white">{t("titleLine3")}</span>{" "}
								<span className="font-light italic text-orange-500 tracking-tight">
									{t("titleAccent")}
								</span>
							</h1>
						</div>

						<div ref={subContentRef} className="pt-6 space-y-6 max-w-2xl">
							<p className="text-sm md:text-base leading-relaxed text-white/70">
								{t("description")}
							</p>

							<div className="flex flex-wrap items-center gap-4">
								<ButtonWithIcon
									href="#dossiers"
									variant="orange"
									size="lg"
									className="shadow-lg shadow-orange-500/20 text-xs uppercase tracking-widest font-semibold"
								>
									{t("exploreDossiers")}
								</ButtonWithIcon>

								<Link
									href="#archetypes"
									className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors hover:border-orange-500/50 hover:bg-white/[0.08] hover:text-white"
								>
									<LuCompass className="h-4 w-4 text-orange-400" />
									{t("viewArchetypes")}
								</Link>
							</div>
						</div>
					</div>

					{/* Right Floating Perspective Plate */}
					<div className="lg:col-span-4 flex justify-start lg:justify-end">
						<div
							ref={floatingCardRef}
							className="relative w-full max-w-sm rounded-2xl border border-white/12 bg-[#0c0c0c]/85 p-3.5 shadow-2xl backdrop-blur-xl group transition-all duration-300 hover:border-orange-500/40"
						>
							<div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/50">
								<Image
									src="/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg"
									alt="Zen pagoda and mountain view at dawn"
									fill
									sizes="(max-width: 768px) 100vw, 380px"
									className="object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
								<div className="absolute top-2.5 left-2.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-white/80">
									FIG. 02 // KYOTO
								</div>
							</div>

							<div className="mt-3 flex items-center justify-between px-1 text-[11px] text-white/60">
								<div>
									<p className="font-semibold text-white">Kyoto Sanctuaries</p>
									<p className="text-[10px] font-mono text-white/40">35.0116° N // ELEV 420M</p>
								</div>
								<Link
									href="/destinations/kyoto"
									className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-orange-400 transition-colors group-hover:bg-orange-500 group-hover:text-white"
									aria-label="View Kyoto dossier"
								>
									<LuArrowDown className="h-3.5 w-3.5 -rotate-45" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Base Region Jump Chips */}
			<div className="relative z-10 w-full max-w-[1600px] mx-auto pad-x pt-4">
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-4">
					<div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white/40">
						<LuLayers className="h-3.5 w-3.5 text-orange-400" />
						<span>{t("jumpToRegions")}:</span>
					</div>

					<div className="flex flex-wrap items-center gap-2">
						{regionJumps.map((region) => (
							<a
								key={region.label}
								href={region.href}
								className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-[11px] font-medium tracking-wide text-white/60 transition-colors hover:border-orange-500/40 hover:bg-white/[0.08] hover:text-orange-400"
							>
								{region.label}
							</a>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
