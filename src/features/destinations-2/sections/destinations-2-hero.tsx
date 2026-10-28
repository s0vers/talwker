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
				className="pointer-events-none absolute top-0 -left-24 h-[140%] w-[55%] rotate-[-8deg] bg-[linear-gradient(135deg,rgba(249,115,22,0.07),transparent_55%)]"
				aria-hidden
			/>
			<div className="pad-x relative mx-auto max-w-[1600px] py-20 md:py-28 lg:py-32">
				<div className="max-w-4xl">
					<p className="text-[11px] font-semibold tracking-[0.25em] text-orange-500 uppercase">
						{t("rail")}
					</p>
					<p className="mt-4 text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase">
						{t("kicker")}
					</p>
					<h1
						id="destinations-2-hero-title"
						className="mt-6 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.08] font-medium tracking-tight md:text-6xl lg:text-7xl"
					>
						{t("title")}{" "}
						<span className="text-orange-500">{t("titleAccent")}</span>
					</h1>
					<p className="mt-8 max-w-xl text-sm leading-relaxed text-white/55 md:text-base md:leading-relaxed">
						{t("lede")}
					</p>
				</div>
			</div>
		</section>
	);
}
