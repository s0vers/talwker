"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { RegisterForm } from "@/features/auth/sections";
import { CheckCircle2, Compass, ShieldCheck, Star } from "lucide-react";

export default function RegisterPage() {
	const t = useTranslations("Auth");

	return (
		<main className="min-h-[100svh] bg-[#050505] text-white flex items-center justify-center">
			<div className="pad-x mx-auto w-full max-w-[1280px] py-12 md:py-20">
				<div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
					
					{/* Left Editorial Visual Column */}
					<div className="relative hidden lg:block lg:col-span-6">
						<div className="relative h-[660px] w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0a0a]">
							<Image
								src="/images/tours/bali.jpg"
								alt="Talkwer Travel Member Portal"
								fill
								sizes="50vw"
								className="object-cover transition-transform duration-1000 hover:scale-105"
								priority
							/>
							{/* Gradient Overlays */}
							<div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/40 to-transparent" />
							<div className="absolute inset-0 bg-linear-to-r from-[#050505]/30 via-transparent to-transparent" />

							{/* Top Brand Tag */}
							<div className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
								<Compass className="size-3.5 text-orange-500" />
								<span>{t("magazineTag")}</span>
							</div>

							{/* Bottom Editorial Quote & Perks */}
							<div className="absolute bottom-0 left-0 right-0 p-8 z-10 grid gap-4">
								<div>
									<p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
										{t("tagline")}
									</p>
									<h2 className="mt-2 text-2xl font-bold tracking-tight text-white leading-snug">
										{t("quote")}
									</h2>
								</div>

								<div className="grid gap-2.5 pt-2 text-xs text-white/80 border-t border-white/10">
									<div className="flex items-center gap-2.5">
										<CheckCircle2 className="size-4 shrink-0 text-orange-500" />
										<span>{t("perk1")}</span>
									</div>
									<div className="flex items-center gap-2.5">
										<CheckCircle2 className="size-4 shrink-0 text-orange-500" />
										<span>{t("perk2")}</span>
									</div>
									<div className="flex items-center gap-2.5">
										<CheckCircle2 className="size-4 shrink-0 text-orange-500" />
										<span>{t("perk3")}</span>
									</div>
								</div>

								{/* Featured Experience Badge */}
								<div className="mt-2 flex items-center justify-between rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-xs backdrop-blur-md">
									<div className="flex items-center gap-2">
										<ShieldCheck className="size-4 text-emerald-400" />
										<span className="font-semibold text-white">{t("communityBadge")}</span>
									</div>
									<div className="flex items-center gap-1 font-medium text-amber-400">
										<Star className="size-3.5 fill-amber-400" />
										<span>{t("communityRating")}</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Form Column */}
					<div className="lg:col-span-6">
						<div className="mx-auto max-w-[480px] lg:mx-0 lg:max-w-none">
							<p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
								{t("registerEyebrow")}
							</p>
							<h1 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tighter text-white">
								{t("registerTitle")}
							</h1>
							<p className="mt-2 text-sm leading-relaxed text-white/70 md:text-base">
								{t("registerDescription")}
							</p>

							<div className="mt-8">
								<RegisterForm />
							</div>
						</div>
					</div>

				</div>
			</div>
		</main>
	);
}
