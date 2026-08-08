"use client";

import { PARTNERS_HERO } from "@/features/partners/content/partners-copy";

export default function PartnersHero() {
	return (
		<section className="relative overflow-hidden bg-[#050505] pt-28 pb-16 md:pt-36 md:pb-24">
			<div
				className="absolute inset-0 opacity-[0.025]"
				style={{
					backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
					backgroundSize: "50px 50px",
				}}
				aria-hidden
			/>
			<div className="relative z-10 pad-x">
				<div className="mx-auto max-w-[1600px]">
					<span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
						{PARTNERS_HERO.eyebrow}
					</span>
					<h1 className="mt-8 max-w-4xl text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.9] tracking-tighter text-white">
						{PARTNERS_HERO.title}
					</h1>
					<p className="mt-8 max-w-xl text-base leading-relaxed text-white/50 md:text-lg">
						{PARTNERS_HERO.description}
					</p>
				</div>
			</div>
		</section>
	);
}
