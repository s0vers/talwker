"use client";

import { useTranslations } from "next-intl";
import { CAREERS_PERKS } from "../content/careers-copy";

export function CareersPerks() {
	const t = useTranslations("Careers");

	return (
		<section className="bg-[#050505] text-white py-16 md:py-24 border-t border-white/6">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="mb-12">
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
						{t("perksLabel")}
					</p>
					<h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						{t("perksTitleLead")} <span className="text-orange-500">{t("perksTitleAccent")}</span>
					</h2>
					<p className="mt-2 text-sm text-white/60 max-w-xl">
						{t("perksDesc")}
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{CAREERS_PERKS.map((perk) => {
						const tag = t.has(`perks.${perk.id}.tag`) ? t(`perks.${perk.id}.tag`) : perk.tag;
						const title = t.has(`perks.${perk.id}.title`) ? t(`perks.${perk.id}.title`) : perk.title;
						const description = t.has(`perks.${perk.id}.desc`) ? t(`perks.${perk.id}.desc`) : perk.description;

						return (
							<div
								key={perk.id}
								className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 space-y-4 hover:border-white/20 transition-all"
							>
								<div className="flex items-center justify-between">
									<span className="rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-400">
										{tag}
									</span>
								</div>
								<h3 className="text-xl font-bold tracking-tight text-white">{title}</h3>
								<p className="text-sm text-white/60 leading-relaxed">{description}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
