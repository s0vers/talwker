"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { LuArrowLeft, LuMoveUpRight } from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import {
	getAuthMockupCopy,
	type AuthMockupMode
} from "@/features/auth-mockups/content/auth-mockup-copy";
import { ConceptSwitcher } from "@/features/auth-mockups/sections/concept-switcher";
import { MockupForm } from "@/features/auth-mockups/sections/mockup-form";

export function AtlasAuth({ mode }: { mode: AuthMockupMode }) {
	const t = useTranslations("Auth");
	const locale = useLocale();
	const copy = getAuthMockupCopy(locale, "atlas");
	return (
		<div className="grid min-h-[100svh] bg-[#050505] text-white lg:grid-cols-[minmax(0,1.12fr)_minmax(450px,0.88fr)]">
			<section className="relative hidden min-h-[100svh] overflow-hidden bg-[#0a0a0a] px-10 py-10 lg:flex lg:flex-col xl:px-16 xl:py-14">
				<svg
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.13]"
				>
					<defs>
						<pattern
							id="atlas-grid"
							width="54"
							height="54"
							patternUnits="userSpaceOnUse"
						>
							<path d="M54 0H0V54" fill="none" stroke="white" strokeWidth="1" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#atlas-grid)" />
				</svg>
				<div className="relative z-10 flex items-center justify-between">
					<Link
						href="/"
						className="text-2xl font-semibold tracking-[-0.075em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
					>
						talkwer<span className="text-orange-500">.</span>
					</Link>
					<span className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">
						WANDER / DISCOVER / SHARE
					</span>
				</div>
				<div className="relative z-10 mt-auto max-w-2xl pb-10">
					<p className="text-[11px] font-semibold tracking-[0.23em] text-orange-400 uppercase">
						{copy.eyebrow}
					</p>
					<h2 className="mt-5 max-w-2xl text-[clamp(3.25rem,5.4vw,6.5rem)] leading-[0.98] font-medium tracking-[-0.07em] text-balance">
						{copy.headline}
					</h2>
					<p className="mt-6 max-w-md text-base leading-7 text-white/60">
						{copy.intro}
					</p>
					<div className="relative mt-10 h-[225px] overflow-hidden border border-white/15 bg-[#111]">
						<div className="absolute inset-y-0 right-0 w-[52%]">
							<Image
								src="/patagonia-torres-del-paine.webp"
								alt=""
								fill
								sizes="(min-width: 1024px) 25vw, 0px"
								className="object-cover"
							/>
						</div>
						<div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
						<div className="relative z-10 flex h-full flex-col justify-between p-6">
							<span className="text-[10px] font-semibold tracking-[0.2em] text-orange-400 uppercase">
								FIELD NOTE / 001
							</span>
							<div>
								<svg
									aria-hidden="true"
									className="mb-4 h-9 w-32 text-orange-500"
									viewBox="0 0 128 36"
								>
									<path
										d="M4 29 C30 5 55 40 83 14 S111 4 124 8"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeDasharray="4 4"
									/>
									<circle cx="4" cy="29" r="4" fill="currentColor" />
									<circle cx="124" cy="8" r="4" fill="currentColor" />
								</svg>
								<p className="text-xs font-semibold tracking-[0.18em] text-white uppercase">
									{copy.location}
								</p>
								<p className="mt-1 text-xs text-white/60">{copy.aside}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-5 text-[11px] text-white/45">
					<span>THE TALKWER ARCHIVE</span>
					<LuMoveUpRight aria-hidden="true" className="size-4" />
				</div>
			</section>
			<div className="flex min-h-[100svh] flex-col border-white/[0.06] bg-[#050505] px-5 py-6 text-white sm:px-10 lg:border-l lg:px-12 lg:py-10 xl:px-16">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<Link
						href="/"
						className="text-xl font-semibold tracking-[-0.075em] lg:hidden"
					>
						talkwer<span className="text-orange-500">.</span>
					</Link>
					<ConceptSwitcher mode={mode} variant="atlas" />
				</div>
				<div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-12 sm:py-16">
					<p className="mb-4 text-[11px] font-semibold tracking-[0.23em] text-orange-400 uppercase">
						{copy.eyebrow}
					</p>
					<h1 className="text-[clamp(2.5rem,4vw,3.65rem)] leading-[1.04] font-semibold tracking-[-0.065em]">
						{mode === "login" ? t("loginTitle") : t("registerTitle")}
					</h1>
					<p className="mt-4 mb-9 text-sm leading-6 text-white/55">
						{copy.formIntro}
					</p>
					<MockupForm mode={mode} variant="atlas" />
				</div>
				<div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-5 text-[11px] text-white/45">
					<p>{t("demoDisclaimer")}</p>
					<Link
						href="/"
						className="inline-flex min-h-11 items-center gap-2 font-medium text-white hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
					>
						<LuArrowLeft aria-hidden="true" className="size-3.5" />
						{t("backToSite")}
					</Link>
				</div>
			</div>
		</div>
	);
}
