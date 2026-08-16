"use client";

import { useTranslations } from "next-intl";

export function Destinations2Hero() {
	const t = useTranslations("Destinations2.hero");

	return (
		<section
			aria-labelledby="destinations-2-hero-title"
			className="relative overflow-hidden border-b border-orange-500/15 bg-[#030303] text-white"
		>
			<div
				className="pointer-events-none absolute -left-24 top-0 h-[140%] w-[55%] rotate-[-8deg] bg-[linear-gradient(135deg,rgba(249,115,22,0.07),transparent_55%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-orange-500/5 blur-3xl"
				aria-hidden
			/>

			<div className="relative mx-auto max-w-[1600px] pad-x py-20 md:py-28 lg:py-32">
				<div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
					<div>
						<p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							{t("rail")}
						</p>
						<p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
							{t("kicker")}
						</p>
						<h1
							id="destinations-2-hero-title"
							className="mt-6 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.08] tracking-tight md:text-6xl lg:text-7xl"
						>
							{t("title")}{" "}
							<span className="text-orange-500">{t("titleAccent")}</span>
						</h1>
						<p className="mt-8 max-w-xl text-sm leading-relaxed text-white/55 md:text-base md:leading-relaxed">
							{t("lede")}
						</p>
					</div>

					<div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
						<div className="flex justify-between gap-6 border-b border-white/10 pb-4">
							<div>
								<p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
									{t("statALabel")}
								</p>
								<p className="mt-1 text-xl font-semibold text-white">{t("statAValue")}</p>
							</div>
							<div className="text-right">
								<p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
									{t("statBLabel")}
								</p>
								<p className="mt-1 text-xl font-semibold text-orange-500">{t("statBValue")}</p>
							</div>
						</div>
						<p className="text-xs leading-relaxed text-white/45">{t("footnote")}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
