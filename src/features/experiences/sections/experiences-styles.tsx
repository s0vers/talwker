"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { EXPERIENCE_STYLES } from "../content/experience-styles";

export function ExperiencesStyles() {
	const t = useTranslations("Experiences.styles");
	return (
		<section className="bg-[#050505] text-white py-16 md:py-24 border-t border-white/6">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="mb-12">
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
						{t("eyebrow")}
					</p>
					<h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{t("title")}</h2>
				</div>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{EXPERIENCE_STYLES.map((style) => (
						<Link
							key={style.id}
							href={style.href}
							className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 transition-all duration-300 hover:border-orange-500/40 hover:bg-[#121212]"
						>
							<div>
								<h3 className="text-xl font-semibold tracking-tight text-white group-hover:text-orange-500 transition-colors">
									{style.title}
								</h3>
								<p className="mt-3 text-sm text-white/60 leading-relaxed">
									{style.description}
								</p>
							</div>
							<span className="mt-8 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-orange-500">
								{t("explore")} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
							</span>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
