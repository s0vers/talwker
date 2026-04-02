import { DESTINATIONS_3_PAGE_HERO } from "@/features/destinations-3/content/destinations-3-page-copy";

export function Destinations3Hero() {
	const h = DESTINATIONS_3_PAGE_HERO;

	return (
		<section
			aria-labelledby="destinations-3-hero-title"
			className="relative overflow-hidden border-b border-white/8 bg-[#020202] text-white"
		>
			<div
				className="pointer-events-none absolute right-0 top-0 h-[min(70vh,520px)] w-[min(55vw,480px)] translate-x-1/4 -translate-y-1/4 rounded-full bg-orange-500/[0.04] blur-3xl"
				aria-hidden
			/>

			<div className="relative mx-auto max-w-[1600px] pad-x py-16 md:py-24 lg:py-28">
				<p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-400/90">
					{h.rail}
					<span className="mx-2 text-white/25" aria-hidden>
						·
					</span>
					<span className="text-white/45">{h.kicker}</span>
				</p>

				<div className="pt-8 md:pt-10">
					<h1
						id="destinations-3-hero-title"
						className="max-w-[19ch] text-[clamp(2.25rem,6.5vw,4.75rem)] font-semibold leading-[0.98] tracking-tight md:max-w-[24ch] lg:max-w-none lg:text-[clamp(3.25rem,5.8vw,5.5rem)]"
					>
						<span className="block text-white">{h.title}</span>
						<span className="mt-1 block text-orange-400/95 lg:mt-2">{h.titleAccent}</span>
					</h1>
					<p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:mt-10 md:text-lg">
						{h.lede}
					</p>
				</div>
			</div>
		</section>
	);
}
