import { CAREERS_PERKS } from "../content/careers-copy";

export function CareersPerks() {
	return (
		<section className="bg-[#050505] text-white py-16 md:py-24 border-t border-white/6">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="mb-12">
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
						Life at Talkwer
					</p>
					<h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Perks & Benefits
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{CAREERS_PERKS.map((perk) => (
						<div
							key={perk.id}
							className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 space-y-4 hover:border-white/20 transition-all"
						>
							<div className="flex items-center justify-between">
								<span className="rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-400">
									{perk.tag}
								</span>
							</div>
							<h3 className="text-xl font-bold tracking-tight text-white">{perk.title}</h3>
							<p className="text-sm text-white/60 leading-relaxed">{perk.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
