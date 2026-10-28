"use client";

import { useTranslations } from "next-intl";
import { LuExternalLink } from "react-icons/lu";
import { PRESS_ARTICLES } from "../content/press-copy";

export function PressCoverage() {
	const t = useTranslations("Press");

	return (
		<section className="bg-[#050505] text-white py-16 md:py-24">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="mb-12">
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
						{t("coverage.label")}
					</p>
					<h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						{t("coverage.titleLead")} <span className="text-orange-500">{t("coverage.titleAccent")}</span>
					</h2>
					<p className="mt-2 text-sm text-white/60 max-w-xl">
						{t("coverage.description")}
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{PRESS_ARTICLES.map((article) => {
						const title = t.has(`articles.${article.id}.title`) ? t(`articles.${article.id}.title`) : article.title;
						const category = t.has(`articles.${article.id}.category`) ? t(`articles.${article.id}.category`) : article.category;
						const excerpt = t.has(`articles.${article.id}.excerpt`) ? t(`articles.${article.id}.excerpt`) : article.excerpt;

						return (
							<article
								key={article.id}
								className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0a0a] p-7 transition-all duration-300 hover:border-orange-500/40 hover:bg-[#121212]"
							>
								<div>
									<div className="flex items-center justify-between gap-2 mb-4">
										<span className="text-lg font-bold tracking-tight text-white group-hover:text-orange-500 transition-colors">
											{article.publication}
										</span>
										<span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] text-white/50">
											{article.date}
										</span>
									</div>

									<span className="inline-block rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange-400 mb-3">
										{category}
									</span>

									<h3 className="text-base font-bold tracking-tight text-white/90 leading-snug">
										{title}
									</h3>
									<p className="mt-3 text-xs leading-relaxed text-white/60">
										&ldquo;{excerpt}&rdquo;
									</p>
								</div>

								<div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-orange-500">
									<span>{t("coverage.readArticle")}</span>
									<LuExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
