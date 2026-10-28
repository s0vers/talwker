"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LuArrowLeft, LuArrowUpRight } from "react-icons/lu";
import { Link } from "@/i18n/navigation";

type AuthMode = "login" | "register";

export function AuthLayout({
	mode,
	children
}: {
	mode: AuthMode;
	children: ReactNode;
}) {
	const t = useTranslations("Auth");
	const isLogin = mode === "login";

	return (
		<div className="grid min-h-[100svh] bg-[#080808] text-white lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
			<section className="relative hidden min-h-[100svh] overflow-hidden border-r border-white/[0.06] lg:flex lg:flex-col lg:justify-between">
				<Image
					src={
						isLogin
							? "/iceland-aurora-waterfall.jpg"
							: "/bali-ubud-temple.webp"
					}
					alt={isLogin ? t("loginImageAlt") : t("registerImageAlt")}
					fill
					priority
					sizes="(min-width: 1024px) 50vw, 0px"
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-black/30" />
				<div className="relative z-10 flex items-center justify-between px-10 pt-10 xl:px-16 xl:pt-14">
					<Link
						href="/"
						className="text-2xl font-semibold tracking-[-0.075em] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
					>
						talkwer<span className="text-orange-500">.</span>
					</Link>
					<span className="text-[11px] font-medium tracking-[0.22em] text-white/75 uppercase">
						{t("magazineTag")}
					</span>
				</div>
				<div className="relative z-10 max-w-2xl px-10 pb-12 xl:px-16 xl:pb-16">
					<p className="mb-5 flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] text-orange-400 uppercase">
						<span className="h-px w-8 bg-orange-500" />
						{t("tagline")}
					</p>
					<p className="max-w-xl text-[clamp(2.2rem,3.8vw,4.4rem)] leading-[1.07] font-medium tracking-[-0.06em] text-balance">
						{t("quote")}
					</p>
					<div className="mt-10 flex items-center justify-between border-t border-white/25 pt-5 text-xs text-white/70">
						<span>
							{isLogin ? t("loginImageCaption") : t("registerImageCaption")}
						</span>
						<LuArrowUpRight aria-hidden="true" className="size-4" />
					</div>
				</div>
			</section>

			<div className="flex min-h-[100svh] flex-col px-5 py-6 sm:px-10 lg:px-12 lg:py-10 xl:px-20">
				<div className="flex items-center justify-between gap-4">
					<Link
						href="/"
						className="text-xl font-semibold tracking-[-0.075em] lg:hidden"
					>
						talkwer<span className="text-orange-500">.</span>
					</Link>
					<Link
						href="/"
						className="ml-auto inline-flex min-h-11 items-center gap-2 text-xs font-medium text-white/55 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
					>
						<LuArrowLeft aria-hidden="true" className="size-4" />
						{t("backToSite")}
					</Link>
				</div>

				<div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center py-12 sm:py-16">
					<div className="mb-9">
						<p className="text-[11px] font-semibold tracking-[0.22em] text-orange-500 uppercase">
							{isLogin ? t("loginEyebrow") : t("registerEyebrow")}
						</p>
						<h1 className="mt-4 text-[clamp(2.3rem,4vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.065em]">
							{isLogin ? t("loginTitle") : t("registerTitle")}
						</h1>
						<p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
							{isLogin ? t("loginDescription") : t("registerDescription")}
						</p>
					</div>
					{children}
				</div>

				<p className="text-center text-[11px] leading-5 text-white/35">
					{t("demoDisclaimer")}
				</p>
			</div>
		</div>
	);
}
