"use client";

import { useTranslations } from "next-intl";
import { LuCompass, LuHeadphones } from "react-icons/lu";
import { ButtonWithIcon } from "@/shared/ui";
import { Link } from "@/i18n/navigation";

export function AtelierCTA() {
	const t = useTranslations("Home2.cta");

	return (
		<section
			id="atelier-cta"
			aria-labelledby="atelier-cta-title"
			className="relative overflow-hidden bg-[#0a0a0a] py-24 md:py-36 border-t border-white/[0.08]"
		>
			{/* Ambient Warm Radial Lens Glow */}
			<div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.14),transparent_65%)]" />
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

			<div className="relative z-10 mx-auto max-w-4xl pad-x text-center space-y-8">
				{/* Badge */}
				<div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-orange-400">
					<LuCompass className="h-3.5 w-3.5" />
					<span>{t("badge")}</span>
				</div>

				{/* Headline */}
				<div className="space-y-4">
					<h2
						id="atelier-cta-title"
						className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]"
					>
						{t("title")}
					</h2>
					<p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
						{t("description")}
					</p>
				</div>

				{/* Actions */}
				<div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
					<ButtonWithIcon
						href="/contact"
						variant="orange"
						size="lg"
						className="shadow-xl shadow-orange-500/25 text-xs uppercase tracking-widest font-semibold"
					>
						{t("bookConsultation")}
					</ButtonWithIcon>

					<Link
						href="/destinations"
						className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
					>
						<span>{t("viewAllExpeditions")}</span>
					</Link>
				</div>

				{/* Concierge Hotline Note */}
				<div className="pt-8 border-t border-white/[0.06] flex items-center justify-center gap-2 text-xs font-mono text-white/40">
					<LuHeadphones className="h-3.5 w-3.5 text-orange-400/80" />
					<span>{t("conciergeNote")}</span>
				</div>
			</div>
		</section>
	);
}
