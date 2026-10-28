"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
	LuMail,
	LuDownload,
	LuNewspaper,
	LuShieldCheck,
	LuArrowRight
} from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { PRESS_HERO } from "../content/press-copy";

export function PressHero() {
	const t = useTranslations("Press");
	const containerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useGsapContext(containerRef, () => {
		if (prefersReducedMotion() || !contentRef.current) return;
		gsap.from(contentRef.current.children, {
			y: 28,
			opacity: 0,
			duration: 0.85,
			stagger: 0.1,
			ease: "power2.out",
			clearProps: "all"
		});
	}, []);

	return (
		<section
			ref={containerRef}
			aria-labelledby="press-hero-title"
			className="relative flex min-h-[55vh] items-center overflow-hidden border-b border-white/6 bg-[#050505] text-white"
		>
			<div
				ref={contentRef}
				className="pad-x relative z-10 mx-auto w-full max-w-[1600px] space-y-8 pt-28 pb-16 md:pt-36 md:pb-20"
			>
				{/* Top Masthead Meta Strip */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
					<p className="text-[11px] font-semibold tracking-[0.2em] text-orange-400 uppercase">
						{t("hero.deskLabel")}
					</p>

					<div className="flex items-center gap-4 text-xs text-white/50">
						<span>DESK: STOCKHOLM & TOKYO</span>
						<span>·</span>
						<span className="font-semibold text-orange-400">
							● 24/7 PRESS INQUIRIES
						</span>
					</div>
				</div>

				{/* Headline & Description */}
				<div className="max-w-4xl space-y-5">
					<h1
						id="press-hero-title"
						className="text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.92] font-bold tracking-tight text-white"
					>
						{t("hero.titleLead")}{" "}
						<span className="block font-light text-orange-500 italic sm:inline">
							{t("hero.titleAccent")}
						</span>
					</h1>

					<p className="max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
						{t("hero.description")}
					</p>
				</div>

				{/* Newsroom 3-Column Fast-Access Bar */}
				<div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
					<div className="space-y-2 rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 transition-colors hover:border-orange-500/40">
						<div className="flex items-center justify-between text-orange-500">
							<LuMail className="h-5 w-5" />
							<span className="text-[10px] font-semibold tracking-wider text-orange-400 uppercase">
								&lt; 4h SLA
							</span>
						</div>
						<p className="text-xs font-semibold tracking-wider text-white/40 uppercase">
							Direct Press Line
						</p>
						<a
							href={`mailto:${PRESS_HERO.pressEmail}`}
							className="block text-sm font-bold text-white transition-colors hover:text-orange-400"
						>
							{PRESS_HERO.pressEmail}
						</a>
					</div>

					<div className="space-y-2 rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 transition-colors hover:border-orange-500/40">
						<div className="flex items-center justify-between text-orange-500">
							<LuDownload className="h-5 w-5" />
							<span className="text-[10px] font-semibold tracking-wider text-white/40 uppercase">
								2026 KIT
							</span>
						</div>
						<p className="text-xs font-semibold tracking-wider text-white/40 uppercase">
							Media Asset Vault
						</p>
						<a
							href="#press-kits"
							className="inline-flex items-center gap-1.5 text-sm font-bold text-white transition-colors hover:text-orange-400"
						>
							Download Assets <LuArrowRight className="h-3.5 w-3.5" />
						</a>
					</div>

					<div className="space-y-2 rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 transition-colors hover:border-orange-500/40">
						<div className="flex items-center justify-between text-orange-500">
							<LuNewspaper className="h-5 w-5" />
							<LuShieldCheck className="h-4 w-4 text-orange-500" />
						</div>
						<p className="text-xs font-semibold tracking-wider text-white/40 uppercase">
							Featured Mentions
						</p>
						<p className="text-sm font-bold text-white">
							Vogue · NYT · Wallpaper*
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
