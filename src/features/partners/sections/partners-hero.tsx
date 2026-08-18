"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { LuArrowDown } from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { PARTNERS_HERO } from "../content/partners-copy";

export function PartnersHero() {
	const t = useTranslations("Partners");
	const containerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		containerRef,
		() => {
			if (prefersReducedMotion() || !contentRef.current) return;
			gsap.from(contentRef.current.children, {
				y: 28,
				opacity: 0,
				duration: 0.85,
				stagger: 0.1,
				ease: "power2.out",
				clearProps: "all",
			});
		},
		[],
	);

	const scrollToForm = () => {
		const formEl = document.getElementById("partner-form");
		if (formEl) {
			formEl.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
			ref={containerRef}
			aria-labelledby="partners-hero-title"
			className="relative flex items-center bg-[#050505] text-white overflow-hidden border-b border-white/6"
		>
			{/* Clean Luminous Ambient Glow Overlay */}
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(249,115,22,0.12),transparent_65%)]"
				aria-hidden
			/>

			<div ref={contentRef} className="relative z-10 mx-auto max-w-[1600px] pad-x pt-28 pb-16 md:pt-36 md:pb-20 w-full space-y-8 text-center">
				{/* Top Eyebrow */}
				<div>
					<p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
						{t("hero.badge")} · {t("hero.deskLabel")}
					</p>
				</div>

				{/* Center Headline & Description */}
				<div className="max-w-4xl mx-auto space-y-6">
					<h1
						id="partners-hero-title"
						className="text-[clamp(2.75rem,6.5vw,5.5rem)] font-bold leading-[0.92] tracking-tight text-white"
					>
						{t("hero.titleLead")}{" "}
						<span className="font-light italic text-orange-500 block sm:inline">
							{t("hero.titleAccent")}
						</span>
					</h1>

					<p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
						{t("hero.description")}
					</p>

					<div className="pt-2 flex justify-center">
						<button
							type="button"
							onClick={scrollToForm}
							className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-9 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-500/30"
						>
							{t("hero.primaryAction")} <LuArrowDown className="h-4 w-4" />
						</button>
					</div>
				</div>

				{/* High-Contrast Partner Network Stats Strip */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-8 max-w-5xl mx-auto">
					{PARTNERS_HERO.stats.map((stat, idx) => (
						<div
							key={idx}
							className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 text-center shadow-xl hover:border-orange-500/40 transition-colors"
						>
							<p className="text-3xl sm:text-4xl font-extrabold text-orange-500">
								{stat.value}
							</p>
							<p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/70">
								{stat.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
