import { CheckCircle2 } from "lucide-react";
import { PARTNER_TIERS } from "../content/partners-copy";

export function PartnersTiers() {
	return (
		<section className="bg-[#050505] text-white py-16 md:py-24">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="mb-12">
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
						Categories & Criteria
					</p>
					<h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Partnership Tiers
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{PARTNER_TIERS.map((tier) => (
						<div
							key={tier.id}
							className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 transition-all duration-300 hover:border-orange-500/40 hover:bg-[#121212]"
						>
							<div>
								<div className="flex items-center justify-between mb-4">
									<span className="rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-400">
										{tier.badge}
									</span>
									<span className="text-xs text-white/40">{tier.category}</span>
								</div>

								<h3 className="text-xl font-bold tracking-tight text-white group-hover:text-orange-500 transition-colors">
									{tier.title}
								</h3>
								<p className="mt-3 text-sm text-white/60 leading-relaxed">
									{tier.description}
								</p>

								<div className="mt-6 pt-6 border-t border-white/10 space-y-2.5">
									<p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Key Qualification Criteria</p>
									<ul className="space-y-2 text-xs text-white/70">
										{tier.criteria.map((item, idx) => (
											<li key={idx} className="flex items-start gap-2">
												<CheckCircle2 className="h-3.5 w-3.5 text-orange-500 shrink-0 mt-0.5" />
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
