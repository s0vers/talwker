"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
	const t = useTranslations("Footer");

	const exploreLinks = [
		{ label: t("destinations"), href: "/destinations" },
		{ label: t("tours"), href: "/tours" },
		{ label: t("stories"), href: "/stories" },
		{ label: t("experiences"), href: "/experiences" },
	];

	const companyLinks = [
		{ label: t("about"), href: "/about" },
		{ label: t("careers"), href: "/careers" },
		{ label: t("press"), href: "/press" },
		{ label: t("partners"), href: "/partners" },
	];

	const supportLinks = [
		{ label: t("faq"), href: "/faq" },
		{ label: t("bookingPolicy"), href: "/booking-policy" },
		{ label: t("cancellation"), href: "/cancellation" },
		{ label: t("contact"), href: "/contact" },
	];

	const legalLinks = [
		{ label: t("privacy"), href: "/privacy" },
		{ label: t("terms"), href: "/terms" },
		{ label: t("cookies"), href: "/cookies" },
	];

	const columns = [
		{ title: t("explore"), links: exploreLinks },
		{ title: t("company"), links: companyLinks },
		{ title: t("support"), links: supportLinks },
	];

	return (
		<footer className="border-t border-white/6 bg-[#0a0a0a]">
			<div className="mx-auto max-w-[1600px] pad-x py-16 md:py-20">
				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
					<div className="lg:col-span-2">
						<Link href="/">
							<span className="text-xl font-bold tracking-tight text-white">
								talkwer<span className="text-orange-500">.</span>
							</span>
						</Link>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
							{t("blurb")}
						</p>
					</div>

					{columns.map((col) => (
						<div key={col.title}>
							<h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
								{col.title}
							</h3>
							<ul aria-label={`${col.title} links`} className="mt-5 space-y-3">
								{col.links.map((item) => (
									<li key={item.href}>
										<Link
											href={item.href}
											className="text-sm text-white/55 transition-colors hover:text-white/80"
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-8 md:flex-row">
					<p className="text-[12px] text-white/60">
						&copy; {new Date().getFullYear()} {t("copyrightRest")}
					</p>
					<div className="flex gap-6 text-[12px] text-white/60">
						{legalLinks.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="hover:text-white/80 transition-colors"
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
