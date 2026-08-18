"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LuFeather, LuQuote, LuSparkles } from "react-icons/lu";
import { MANIFESTO_QUOTES } from "@/features/home-2/content/atelier-copy";
import { SectionHeading } from "@/shared/ui";
import { cn } from "@/lib/utils";

export function AtelierManifesto() {
	const t = useTranslations("Home2.manifesto");
	const [activeIdx, setActiveIdx] = useState(0);

	return (
		<section
			id="manifesto"
			aria-labelledby="manifesto-title"
			className="relative bg-[#050505] py-20 md:py-36 border-t border-white/[0.06] overflow-hidden"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
					{/* Left Brand Philosophy Column */}
					<div className="lg:col-span-5 space-y-6">
						<SectionHeading
							containerClassName="max-w-xl"
							label={t("label")}
							labelId="manifesto-label"
							title={t("title")}
							titleId="manifesto-title"
							labelClassName="mb-3"
						/>

						<p className="text-sm sm:text-base leading-relaxed text-white/70">
							We believe travel is not an accumulation of passport stamps, but a deliberate practice of sensory observation. Every Talkwer departure is curated as a living monograph.
						</p>

						{/* Archival Seal Badge */}
						<div className="pt-4 flex items-center gap-4">
							<div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-400">
								<LuFeather className="h-6 w-6" />
							</div>
							<div className="font-mono text-xs text-white/50">
								<p className="font-semibold text-white tracking-widest">{t("sealBrand")}</p>
								<p className="text-[10px] text-white/35">NOCTURNAL EXPEDITION GUILD</p>
							</div>
						</div>
					</div>

					{/* Right Interactive Quote Plates */}
					<div className="lg:col-span-7 space-y-6">
						{/* Quote Display Chamber */}
						<div className="relative rounded-3xl border border-white/10 bg-[#0c0c0c] p-6 sm:p-10 shadow-2xl">
							<LuQuote className="absolute top-6 right-6 h-10 w-10 text-orange-500/15" />

							<div className="min-h-[140px] flex flex-col justify-between">
								<p className="text-lg sm:text-2xl font-light italic leading-relaxed text-white/95 transition-opacity duration-300">
									“{t(MANIFESTO_QUOTES[activeIdx].quoteKey as Parameters<typeof t>[0])}”
								</p>

								<div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
									<div>
										<p className="text-sm font-semibold text-white">
											{MANIFESTO_QUOTES[activeIdx].authorName}
										</p>
										<p className="font-mono text-xs text-orange-400/90">
											{t(MANIFESTO_QUOTES[activeIdx].roleKey as Parameters<typeof t>[0])}
										</p>
									</div>

									<span className="font-mono text-xs text-white/30">
										{MANIFESTO_QUOTES[activeIdx].year}
									</span>
								</div>
							</div>
						</div>

						{/* Quote Selector Switcher */}
						<div className="flex items-center gap-3">
							{MANIFESTO_QUOTES.map((quote, idx) => (
								<button
									key={quote.id}
									type="button"
									onClick={() => setActiveIdx(idx)}
									className={cn(
										"flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono transition-all duration-300 border outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
										activeIdx === idx
											? "border-orange-500 bg-orange-500/20 text-orange-300"
											: "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white",
									)}
								>
									<LuSparkles className="h-3 w-3" />
									<span>0{idx + 1}</span>
									<span className="hidden sm:inline">• {quote.authorName.split(" ")[0]}</span>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
