"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { LuArrowRight, LuCalendar, LuClock, LuFlame, LuUsers } from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { SectionCta, SectionHeading } from "@/shared/ui";
import { Link } from "@/i18n/navigation";
import { SEASONAL_DEPARTURES } from "@/features/home-2/content/atelier-copy";

export function AtelierDepartures() {
	const t = useTranslations("Home2.departures");
	const sectionRef = useRef<HTMLElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const cards = gridRef.current?.querySelectorAll(".departure-card");
			if (cards?.length) {
				gsap.fromTo(
					cards,
					{ y: 35, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.8,
						stagger: 0.12,
						ease: "power3.out",
						clearProps: "opacity,transform",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top 80%",
							toggleActions: "play none none none",
							once: true,
						},
					},
				);
			}
		},
		[],
	);

	return (
		<section
			ref={sectionRef}
			id="departures"
			aria-labelledby="departures-title"
			className="relative bg-[#070707] py-20 md:py-32 border-t border-white/[0.06]"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				{/* Section Header */}
				<div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
					<SectionHeading
						containerClassName="max-w-2xl"
						label={t("label")}
						labelId="departures-label"
						title={t("title")}
						titleId="departures-title"
						description={t("description")}
						descriptionId="departures-description"
						labelClassName="mb-3"
						descriptionClassName="mt-4 text-white/60"
					/>

					<div className="flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-mono font-semibold uppercase text-orange-400">
						<LuUsers className="h-3.5 w-3.5" />
						<span>MAX 6 EXPLORERS / DEPARTURE</span>
					</div>
				</div>

				{/* 3-Column Departures Cards */}
				<div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{SEASONAL_DEPARTURES.map((dep) => (
						<article
							key={dep.id}
							className="departure-card group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#0c0c0c] p-4 sm:p-5 transition-all duration-500 hover:border-orange-500/40 hover:bg-[#0f0f0f]"
						>
							<div className="space-y-4">
								{/* Image Stage */}
								<div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black/50">
									<Image
										src={dep.image}
										alt={t(dep.titleKey as Parameters<typeof t>[0])}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
										className="object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

									{/* Date Tag */}
									<div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/90 backdrop-blur-md">
										<LuCalendar className="h-3 w-3 text-orange-400" />
										<span>{dep.dateRange}</span>
									</div>

									{/* Spots Remaining Badge */}
									<div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-500/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-orange-300 backdrop-blur-md">
										<span className="relative flex h-1.5 w-1.5">
											<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
											<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
										</span>
										<span>{dep.spotsLeft} {t("spotsRemaining")}</span>
									</div>
								</div>

								{/* Details */}
								<div className="px-1 space-y-2">
									<div className="flex items-center justify-between text-xs font-mono text-white/45">
										<span className="inline-flex items-center gap-1">
											<LuClock className="h-3.5 w-3.5 text-orange-400/80" />
											{dep.durationDays} Days
										</span>
										<span className="inline-flex items-center gap-1">
											<LuFlame className="h-3.5 w-3.5 text-orange-400/80" />
											{dep.intensity}
										</span>
									</div>

									<h3 className="text-lg font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">
										{t(dep.titleKey as Parameters<typeof t>[0])}
									</h3>
									<p className="text-xs font-mono uppercase tracking-wider text-white/40">
										{t(dep.destinationKey as Parameters<typeof t>[0])}
									</p>
								</div>
							</div>

							{/* Price & Action */}
							<div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between px-1">
								<div>
									<p className="text-[10px] font-mono uppercase text-white/40">{t("startingFrom")}</p>
									<p className="text-base font-bold text-white font-mono">${dep.priceUSD.toLocaleString()}</p>
								</div>

								<Link
									href={`/booking?tour=${dep.tourSlug}`}
									className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/50 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orange-400 transition-all hover:bg-orange-500 hover:text-white"
								>
									<span>{t("reserveSpot")}</span>
									<LuArrowRight className="h-3.5 w-3.5" />
								</Link>
							</div>
						</article>
					))}
				</div>

				{/* Footer CTA */}
				<div className="mt-14 md:mt-20 text-center">
					<SectionCta
						href="/tours"
						icon={<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
					>
						Explore All Guided Tours
					</SectionCta>
				</div>
			</div>
		</section>
	);
}
