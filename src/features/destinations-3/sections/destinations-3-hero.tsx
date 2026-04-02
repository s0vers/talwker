import { DESTINATIONS_3_PAGE_HERO } from "@/features/destinations-3/content/destinations-3-page-copy";

export function Destinations3Hero() {
	return (
		<section
			aria-labelledby="destinations-3-hero-title"
			className="relative overflow-hidden border-b border-orange-500/12 bg-[#040404] text-white"
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.04]"
				style={{
					backgroundImage: "linear-gradient(90deg, transparent 0%, transparent 49%, rgba(255,255,255,0.06) 50%, transparent 51%)",
					backgroundSize: "48px 100%",
				}}
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute -right-20 top-1/2 h-[120%] w-[45%] -translate-y-1/2 rotate-6 bg-[linear-gradient(200deg,rgba(249,115,22,0.06),transparent_60%)]"
				aria-hidden
			/>

			<div className="relative mx-auto max-w-[1600px] pad-x py-20 md:py-28 lg:py-32">
				<div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:items-end">
					<div>
						<p className="font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-orange-400/90">
							{DESTINATIONS_3_PAGE_HERO.rail}
						</p>
						<p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/45">{DESTINATIONS_3_PAGE_HERO.kicker}</p>
						<h1
							id="destinations-3-hero-title"
							className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.06] tracking-tight md:text-6xl lg:text-7xl"
						>
							{DESTINATIONS_3_PAGE_HERO.title}{" "}
							<span className="font-light text-orange-400/95">{DESTINATIONS_3_PAGE_HERO.titleAccent}</span>
						</h1>
						<p className="mt-8 max-w-xl text-base leading-relaxed text-white/58 md:text-lg">
							{DESTINATIONS_3_PAGE_HERO.lede}
						</p>
					</div>

					<div className="flex flex-col gap-4 rounded-sm border border-white/10 bg-black/50 p-6 font-mono text-[11px] uppercase tracking-[0.18em]">
						<div className="flex justify-between gap-6 border-b border-white/10 pb-4">
							<div>
								<p className="text-white/40">{DESTINATIONS_3_PAGE_HERO.statA.label}</p>
								<p className="mt-2 text-sm font-semibold tracking-tight text-white">{DESTINATIONS_3_PAGE_HERO.statA.value}</p>
							</div>
							<div className="text-right">
								<p className="text-white/40">{DESTINATIONS_3_PAGE_HERO.statB.label}</p>
								<p className="mt-2 text-sm font-semibold tracking-tight text-orange-300/95">
									{DESTINATIONS_3_PAGE_HERO.statB.value}
								</p>
							</div>
						</div>
						<p className="leading-relaxed text-white/45 normal-case tracking-normal">{DESTINATIONS_3_PAGE_HERO.footnote}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
