"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { LuArrowLeft, LuArrowUpRight } from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import {
	getAuthMockupCopy,
	type AuthMockupMode
} from "@/features/auth-mockups/content/auth-mockup-copy";
import { ConceptSwitcher } from "@/features/auth-mockups/sections/concept-switcher";
import { MockupForm } from "@/features/auth-mockups/sections/mockup-form";

export function PostcardAuth({ mode }: { mode: AuthMockupMode }) {
	const t = useTranslations("Auth");
	const locale = useLocale();
	const copy = getAuthMockupCopy(locale, "postcard");
	return (
		<div className="relative min-h-[100svh] overflow-hidden bg-[#071013] text-white">
			<Image
				src={
					mode === "login"
						? "/tromso-aurora-fjord.webp"
						: "/norway-fjord-village.webp"
				}
				alt=""
				fill
				priority
				sizes="100vw"
				className="object-cover"
			/>
			<div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-black/65" />
			<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30" />
			<div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-5 py-6 sm:px-10 lg:px-16 lg:py-10 xl:px-24">
				<header className="flex flex-wrap items-center justify-between gap-2 lg:gap-4">
					<Link
						href="/"
						className="text-xl font-semibold tracking-[-0.075em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:text-2xl"
					>
						talkwer<span className="text-orange-500">.</span>
					</Link>
					<ConceptSwitcher mode={mode} variant="postcard" />
				</header>
				<div className="grid flex-1 items-center gap-5 py-5 lg:grid-cols-[minmax(0,1fr)_minmax(420px,480px)] lg:gap-20 lg:py-12">
					<div className="max-w-2xl lg:pb-16">
						<p className="text-[11px] font-semibold tracking-[0.25em] text-orange-400 uppercase">
							{copy.eyebrow}
						</p>
						<h2 className="mt-3 text-[2.55rem] leading-[0.97] font-medium tracking-[-0.075em] text-balance lg:mt-5 lg:text-[clamp(3.2rem,6vw,7rem)]">
							{copy.headline}
						</h2>
						<p className="mt-4 max-w-md text-sm leading-6 text-white/75 lg:mt-6 lg:text-base lg:leading-7">
							{copy.intro}
						</p>
					</div>
					<section className="border border-white/15 bg-[#090b0c]/95 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.25)] sm:p-9 lg:p-10">
						<div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4 lg:mb-8 lg:pb-5">
							<span className="text-[11px] font-semibold tracking-[0.2em] text-orange-400 uppercase">
								TALKWER / ACCESS
							</span>
							<LuArrowUpRight
								aria-hidden="true"
								className="size-4 text-white/45"
							/>
						</div>
						<h1 className="text-[clamp(2.25rem,3.6vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.06em]">
							{mode === "login" ? t("loginTitle") : t("registerTitle")}
						</h1>
						<p className="mt-3 mb-6 text-sm leading-6 text-white/55 lg:mb-8">
							{copy.formIntro}
						</p>
						<MockupForm mode={mode} variant="postcard" />
					</section>
				</div>
				<footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/25 pt-5 text-[11px] text-white/70">
					<span>
						{copy.location} <span className="mx-2 text-orange-400">/</span>{" "}
						{copy.aside}
					</span>
					<Link
						href="/"
						className="inline-flex min-h-11 items-center gap-2 font-medium text-white hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					>
						<LuArrowLeft aria-hidden="true" className="size-3.5" />
						{t("backToSite")}
					</Link>
				</footer>
				<p className="mt-2 text-[11px] leading-5 text-white/60">
					{t("demoDisclaimer")}
				</p>
			</div>
		</div>
	);
}
