"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { LuArrowRight, LuCamera, LuCompass, LuMountain } from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { SectionCta, SectionHeading } from "@/shared/ui";
import { Link } from "@/i18n/navigation";
import { DOSSIER_PLATES } from "@/features/home-2/content/atelier-copy";

export function AtelierDossiers() {
	const t = useTranslations("Home2.dossiers");
	const sectionRef = useRef<HTMLElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const cards = gridRef.current?.querySelectorAll(".dossier-card");
			if (cards?.length) {
				gsap.fromTo(
					cards,
					{ y: 40, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.8,
						stagger: 0.14,
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
			id="dossiers"
			aria-labelledby="dossiers-title"
			className="relative bg-[#050505] py-20 md:py-32"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				{/* Section Header */}
				<div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
					<SectionHeading
						containerClassName="max-w-2xl"
						label={t("label")}
						labelId="dossiers-label"
						title={t("title")}
						titleId="dossiers-title"
						description={t("description")}
						descriptionId="dossiers-description"
						labelClassName="mb-3"
						descriptionClassName="mt-4 text-white/60"
					/>

					<div className="hidden md:flex items-center gap-2 font-mono text-xs text-white/40 uppercase tracking-widest">
						<span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
						<span>4 ARCHIVAL MONOGRAPHS INDEXED</span>
					</div>
				</div>

				{/* 2x2 Dossier Plates Grid */}
				<div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
					{DOSSIER_PLATES.map((plate) => (
						<article
							key={plate.id}
							className="dossier-card group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#0c0c0c] p-5 sm:p-7 transition-all duration-500 hover:border-orange-500/40 hover:bg-[#0f0f0f]"
						>
							<div className="space-y-4">
								{/* Header Metadata Bar */}
								<div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5 text-[11px] font-mono text-white/50">
									<div className="flex items-center gap-2">
										<span className="font-semibold text-orange-400">{plate.figureNumber}</span>
										<span className="text-white/20">•</span>
										<span className="text-white/70">{t(plate.tagKey as Parameters<typeof t>[0])}</span>
									</div>
									<span className="text-[10px] text-white/40">{t(plate.seasonKey as Parameters<typeof t>[0])}</span>
								</div>

								{/* Plate Visual */}
								<div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black/40">
									<Image
										src={plate.image}
										alt={t(plate.titleKey as Parameters<typeof t>[0])}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
										className="object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

									{/* Coordinate Watermark Badge */}
									<div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/70 px-3 py-1 font-mono text-[10px] text-white/80 backdrop-blur-md">
										<LuCompass className="h-3 w-3 text-orange-400" />
										<span>{plate.coordinates}</span>
									</div>
								</div>

								{/* Content Details */}
								<div className="pt-2 space-y-2">
									<div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/45">
										<span className="inline-flex items-center gap-1">
											<LuMountain className="h-3.5 w-3.5 text-orange-400/80" />
											{plate.elevation}
										</span>
										<span className="text-white/20">•</span>
										<span className="inline-flex items-center gap-1">
											<LuCamera className="h-3.5 w-3.5 text-orange-400/80" />
											{plate.focalLength}
										</span>
									</div>

									<h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">
										{t(plate.titleKey as Parameters<typeof t>[0])}
									</h3>
									<p className="text-xs uppercase tracking-[0.18em] text-white/40 font-semibold">
										{t(plate.regionKey as Parameters<typeof t>[0])}
									</p>
									<p className="text-sm leading-relaxed text-white/65 pt-1">
										{t(plate.excerptKey as Parameters<typeof t>[0])}
									</p>
								</div>
							</div>

							{/* Card Footer Action */}
							<div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
								<span className="font-mono text-[11px] text-white/35">ARCHIVE EXPEDITION</span>
								<Link
									href={`/destinations/${plate.destinationSlug}`}
									className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-orange-400 transition-colors hover:text-orange-300 group/link"
								>
									<span>{t("viewDossier")}</span>
									<LuArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
								</Link>
							</div>
						</article>
					))}
				</div>

				{/* Footer CTA */}
				<div className="mt-14 md:mt-20 text-center">
					<SectionCta
						href="/destinations"
						icon={<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
					>
						Explore All Destinations
					</SectionCta>
				</div>
			</div>
		</section>
	);
}
