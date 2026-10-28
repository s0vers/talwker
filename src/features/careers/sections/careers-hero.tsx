"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
	LuBriefcase,
	LuGlobe,
	LuHeart,
	LuArrowDown,
	LuSparkles
} from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { CAREERS_HERO } from "../content/careers-copy";

export function CareersHero() {
	const t = useTranslations("Careers");
	const containerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const manifestoRef = useRef<HTMLDivElement>(null);

	useGsapContext(containerRef, () => {
		if (prefersReducedMotion()) return;
		const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

		if (contentRef.current) {
			tl.from(contentRef.current.children, {
				y: 30,
				opacity: 0,
				duration: 0.85,
				stagger: 0.1,
				clearProps: "all"
			});
		}

		if (manifestoRef.current) {
			tl.from(
				manifestoRef.current,
				{
					y: 35,
					opacity: 0,
					duration: 0.95,
					clearProps: "all"
				},
				"-=0.5"
			);
		}
	}, []);

	const scrollToRoles = () => {
		const rolesEl = document.getElementById("open-positions");
		if (rolesEl) {
			rolesEl.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
			ref={containerRef}
			aria-labelledby="careers-hero-title"
			className="relative flex min-h-[60vh] items-center overflow-hidden border-b border-white/6 bg-[#050505] text-white"
		>
			<div className="pad-x relative z-10 mx-auto w-full max-w-[1600px] pt-28 pb-16 md:pt-36 md:pb-20">
				<div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
					{/* Left Column: Editorial Headline & Copy */}
					<div ref={contentRef} className="space-y-6 lg:col-span-7">
						<p className="text-[11px] font-semibold tracking-[0.2em] text-orange-400 uppercase">
							{t("hero.badge")}
						</p>

						<h1
							id="careers-hero-title"
							className="text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[0.93] font-bold tracking-tight text-white"
						>
							{t("hero.titleLead")}{" "}
							<span className="block font-light text-orange-500 italic sm:inline">
								{t("hero.titleAccent")}
							</span>
						</h1>

						<p className="max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
							{t("hero.description")}
						</p>

						<div className="flex flex-wrap items-center gap-4 pt-2">
							<button
								type="button"
								onClick={scrollToRoles}
								className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-xs font-semibold tracking-widest text-white uppercase transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/20"
							>
								{t("applyNow")} <LuArrowDown className="h-4 w-4" />
							</button>
						</div>
					</div>

					{/* Right Column: Studio Manifesto Card */}
					<div className="relative lg:col-span-5">
						<div
							ref={manifestoRef}
							className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0a0a0a] p-6 sm:p-8"
						>
							<div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
								<span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-orange-500 uppercase">
									<LuBriefcase className="h-3.5 w-3.5" /> Talkwer Culture
									Manifesto
								</span>
								<span className="text-[10px] text-white/40">EST. 2026</span>
							</div>

							<div className="space-y-4 text-xs text-white/75">
								<div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/5 p-3">
									<LuGlobe className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
									<div>
										<p className="font-semibold text-white">
											100% Asynchronous & Remote
										</p>
										<p className="text-[11px] text-white/50">
											Work from anywhere across 28 countries.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/5 p-3">
									<LuSparkles className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
									<div>
										<p className="font-semibold text-white">
											$3,500/yr Field Travel Grant
										</p>
										<p className="text-[11px] text-white/50">
											Annual budget to experience Talkwer tours firsthand.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/5 p-3">
									<LuHeart className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
									<div>
										<p className="font-semibold text-white">
											Unlimited Field Leave
										</p>
										<p className="text-[11px] text-white/50">
											Rest and recharge whenever you need unhurried time.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Culture Metrics Strip */}
				<div className="mt-14 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
					{CAREERS_HERO.metrics.map((metric, idx) => (
						<div
							key={idx}
							className="group rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 text-center transition-all duration-300 hover:border-orange-500/40 hover:bg-[#0e0e0e] sm:text-left"
						>
							<p className="origin-left text-3xl font-extrabold text-orange-500 transition-transform group-hover:scale-105 sm:text-4xl">
								{metric.value}
							</p>
							<p className="mt-2 text-xs font-semibold tracking-wider text-white/60 uppercase">
								{metric.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
