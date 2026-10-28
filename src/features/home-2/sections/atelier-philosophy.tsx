"use client";

import { useCountUp } from "@/lib/useGsap";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
	const numRef = useCountUp(value, 2);
	return (
		<div className="border-l border-white/10 pl-6 space-y-1">
			<div className="flex items-baseline gap-1">
				<span ref={numRef} className="text-4xl sm:text-5xl font-bold text-white">0</span>
				<span className="text-2xl font-bold text-orange-500">{suffix}</span>
			</div>
			<p className="text-xs sm:text-sm text-white/50">{label}</p>
		</div>
	);
}

export function AtelierPhilosophy() {

	return (
		<section
			id="travel-philosophy"
			aria-labelledby="philosophy-title"
			className="relative bg-[#070707] py-24 md:py-40 border-t border-white/10 overflow-hidden"
		>
			<div className="mx-auto max-w-[1600px] pad-x space-y-16">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
					{/* Left Quote & Manifesto */}
					<div className="lg:col-span-7 space-y-6">
						<span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							OUR TRAVEL PHILOSOPHY
						</span>

						<h2
							id="philosophy-title"
							className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
						>
							Travel should be an art of deliberate contemplation.
						</h2>

						<p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl font-light">
							We believe the most enduring journeys are not about rushing through a checklist of famous sights, but allowing the quiet texture of a place to leave an indelible impression on your soul.
						</p>
					</div>

					{/* Right Statistics Pillar */}
					<div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-8 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0c0c0c]">
						<Stat value={500} suffix="+" label="Curated Destinations Worldwide" />
						<Stat value={15} suffix="" label="Years of Independent Field Work" />
						<Stat value={50} suffix="k+" label="Conscious Travelers Inspired" />
					</div>
				</div>
			</div>
		</section>
	);
}
