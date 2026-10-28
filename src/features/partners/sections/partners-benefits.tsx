"use client";

import { useTranslations } from "next-intl";
import { PARTNER_BENEFITS } from "../content/partners-copy";

export function PartnersBenefits() {
	const t = useTranslations("Partners");

	return (
		<section className="bg-[#050505] text-white py-16 md:py-24 border-t border-white/6">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="mb-12">
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
						{t("benefits.label")}
					</p>
					<h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						{t("benefits.titleLead")} <span className="text-orange-500">{t("benefits.titleAccent")}</span>
					</h2>
					<p className="mt-2 text-sm text-white/60 max-w-xl">
						{t("benefits.description")}
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{PARTNER_BENEFITS.map((benefit) => {
						const tag = t.has(`benefitsItems.${benefit.id}.tag`) ? t(`benefitsItems.${benefit.id}.tag`) : benefit.tag;
						const title = t.has(`benefitsItems.${benefit.id}.title`) ? t(`benefitsItems.${benefit.id}.title`) : benefit.title;
						const description = t.has(`benefitsItems.${benefit.id}.description`) ? t(`benefitsItems.${benefit.id}.description`) : benefit.description;

						return (
							<div
								key={benefit.id}
								className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-7 space-y-3 hover:border-white/20 transition-all"
							>
								<span className="rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-400">
									{tag}
								</span>
								<h3 className="text-lg font-bold tracking-tight text-white">{title}</h3>
								<p className="text-xs text-white/60 leading-relaxed">{description}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
