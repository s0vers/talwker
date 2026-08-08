import { ExternalLink } from "lucide-react";
import { PRESS_ARTICLES } from "../content/press-copy";

export function PressCoverage() {
	return (
		<section className="bg-[#050505] text-white py-16 md:py-24">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="mb-12">
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
						In The News
					</p>
					<h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Featured Media Coverage
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{PRESS_ARTICLES.map((article) => (
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
									{article.category}
								</span>

								<h3 className="text-base font-bold tracking-tight text-white/90 leading-snug">
									{article.title}
								</h3>
								<p className="mt-3 text-xs leading-relaxed text-white/60">
									&ldquo;{article.excerpt}&rdquo;
								</p>
							</div>

							<div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-orange-500">
								<span>{article.linkText}</span>
								<ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
