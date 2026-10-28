"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { LuSearch, LuX } from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";

export type FaqHeroProps = {
	searchQuery: string;
	onSearchChange: (query: string) => void;
};

export function FaqHero({ searchQuery, onSearchChange }: FaqHeroProps) {
	const t = useTranslations("FAQ");
	const containerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useGsapContext(containerRef, () => {
		if (prefersReducedMotion()) return;
		const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

		if (contentRef.current) {
			tl.from(contentRef.current.children, {
				y: 28,
				opacity: 0,
				duration: 0.85,
				stagger: 0.1,
				clearProps: "all"
			});
		}
	}, []);

	return (
		<section
			ref={containerRef}
			aria-labelledby="faq-hero-title"
			className="relative overflow-hidden border-b border-white/6 bg-[#050505] pt-28 pb-16 text-white md:pt-36 md:pb-20"
		>
			<div className="pad-x relative z-10 mx-auto max-w-[1600px]">
				<div ref={contentRef} className="max-w-3xl space-y-6">
					<p className="text-[11px] font-semibold tracking-[0.2em] text-orange-400 uppercase">
						{t("hero.badge")}
					</p>

					<h1
						id="faq-hero-title"
						className="text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[0.93] font-bold tracking-tight text-white"
					>
						{t("hero.titleLead")}{" "}
						<span className="block font-light text-orange-500 italic sm:inline">
							{t("hero.titleAccent")}
						</span>
					</h1>

					<p className="max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
						{t("hero.description")}
					</p>

					{/* Search Input Bar */}
					<div className="max-w-2xl pt-2">
						<div className="group relative flex items-center">
							<LuSearch className="pointer-events-none absolute left-4 h-5 w-5 text-white/40 transition-colors group-focus-within:text-orange-400" />
							<input
								type="text"
								value={searchQuery}
								onChange={e => onSearchChange(e.target.value)}
								placeholder={t("hero.searchPlaceholder")}
								className="w-full rounded-2xl border border-white/15 bg-[#0a0a0a] py-4 pr-12 pl-12 text-sm text-white transition-colors placeholder:text-white/35 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
							/>
							{searchQuery ? (
								<button
									type="button"
									onClick={() => onSearchChange("")}
									aria-label="Clear search"
									className="absolute right-4 rounded-full p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
								>
									<LuX className="h-4 w-4" />
								</button>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
