"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
	LuCheckCircle2,
	LuClock,
	LuCompass,
	LuFlame,
	LuPackage,
} from "react-icons/lu";
import { EXPEDITION_ARCHETYPES } from "@/features/home-2/content/archetypes";
import { SectionHeading, ButtonWithIcon } from "@/shared/ui";
import { cn } from "@/lib/utils";

export function AtelierArchetypes() {
	const t = useTranslations("Home2.archetypes");
	const [activeId, setActiveId] = useState<string>(EXPEDITION_ARCHETYPES[0].id);

	const activeArchetype =
		EXPEDITION_ARCHETYPES.find((a) => a.id === activeId) ?? EXPEDITION_ARCHETYPES[0];

	return (
		<section
			id="archetypes"
			aria-labelledby="archetypes-title"
			className="relative bg-[#080808] py-20 md:py-32 border-t border-white/[0.06]"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				{/* Header */}
				<div className="mb-10 md:mb-14">
					<SectionHeading
						containerClassName="max-w-2xl"
						label={t("label")}
						labelId="archetypes-label"
						title={t("title")}
						titleId="archetypes-title"
						description={t("description")}
						descriptionId="archetypes-description"
						labelClassName="mb-3"
						descriptionClassName="mt-4 text-white/60"
					/>
				</div>

				{/* 4-Tab Bar */}
				<div
					role="tablist"
					aria-label={t("title")}
					className="flex max-w-full items-center gap-2 overflow-x-auto pb-4 scrollbar-none"
				>
					{EXPEDITION_ARCHETYPES.map((arch) => {
						const isSelected = arch.id === activeId;
						return (
							<button
								key={arch.id}
								role="tab"
								id={`tab-${arch.id}`}
								aria-selected={isSelected}
								aria-controls={`panel-${arch.id}`}
								onClick={() => setActiveId(arch.id)}
								className={cn(
									"flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 border outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
									isSelected
										? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/25"
										: "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/20 hover:bg-white/[0.08] hover:text-white",
								)}
							>
								<span
									className={cn(
										"h-1.5 w-1.5 rounded-full",
										isSelected ? "bg-white" : "bg-orange-500/80",
									)}
								/>
								<span>{t(arch.titleKey as Parameters<typeof t>[0])}</span>
							</button>
						);
					})}
				</div>

				{/* Tab Panel */}
				<div
					role="tabpanel"
					id={`panel-${activeArchetype.id}`}
					aria-labelledby={`tab-${activeArchetype.id}`}
					className="mt-6 rounded-3xl border border-white/[0.08] bg-[#0c0c0c] p-6 sm:p-8 lg:p-10 transition-all duration-500"
				>
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
						{/* Left Photographic Preview Plate */}
						<div className="lg:col-span-6 space-y-4">
							<div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/60 border border-white/10 group">
								<Image
									src={activeArchetype.image}
									alt={t(activeArchetype.titleKey as Parameters<typeof t>[0])}
									fill
									sizes="(max-width: 1024px) 100vw, 650px"
									className="object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

								{/* Top Badge */}
								<div className="absolute top-3.5 left-3.5 flex items-center gap-2">
									<span className="rounded-full border border-white/20 bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-orange-400 backdrop-blur-md">
										{t(activeArchetype.optimalSeasonKey as Parameters<typeof t>[0])}
									</span>
								</div>

								{/* Bottom Coordinates Chip */}
								<div className="absolute bottom-3.5 left-3.5 flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3.5 py-1 font-mono text-[11px] text-white/85 backdrop-blur-md">
									<LuCompass className="h-3.5 w-3.5 text-orange-400" />
									<span>{activeArchetype.coordinates}</span>
									<span className="text-white/30">•</span>
									<span className="text-white/60">{activeArchetype.elevation}</span>
								</div>
							</div>
						</div>

						{/* Right Specification Details */}
						<div className="lg:col-span-6 space-y-6">
							<div className="space-y-2">
								<p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">
									{t(activeArchetype.taglineKey as Parameters<typeof t>[0])}
								</p>
								<h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
									{t(activeArchetype.titleKey as Parameters<typeof t>[0])}
								</h3>
								<p className="text-sm sm:text-base leading-relaxed text-white/70 pt-1">
									{t(activeArchetype.descriptionKey as Parameters<typeof t>[0])}
								</p>
							</div>

							{/* Metrics Row */}
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
								<div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
									<div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-white/40 mb-1">
										<LuFlame className="h-3 w-3 text-orange-400" />
										<span>{t("intensityLabel")}</span>
									</div>
									<p className="text-xs font-semibold text-white">
										{activeArchetype.intensity}
									</p>
								</div>

								<div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
									<div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-white/40 mb-1">
										<LuClock className="h-3 w-3 text-orange-400" />
										<span>{t("durationLabel")}</span>
									</div>
									<p className="text-xs font-semibold text-white">
										{activeArchetype.durationDays} Days / Traverse
									</p>
								</div>

								<div className="col-span-2 sm:col-span-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
									<div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-white/40 mb-1">
										<LuPackage className="h-3 w-3 text-orange-400" />
										<span>{t("gearLabel")}</span>
									</div>
									<p className="text-xs font-semibold text-white">
										Field Kit Included
									</p>
								</div>
							</div>

							{/* Gear Essentials Chips */}
							<div className="space-y-2">
								<p className="text-[11px] font-mono uppercase tracking-wider text-white/45">
									{t("gearLabel")}:
								</p>
								<div className="flex flex-wrap gap-2">
									{activeArchetype.gearKeys.map((gKey) => (
										<span
											key={gKey}
											className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/80"
										>
											<span className="h-1 w-1 rounded-full bg-orange-400" />
											{t(gKey as Parameters<typeof t>[0])}
										</span>
									))}
								</div>
							</div>

							{/* Highlights Checklist */}
							<div className="space-y-2 pt-1">
								{activeArchetype.highlights.map((h, i) => (
									<div key={i} className="flex items-start gap-2 text-xs text-white/70">
										<LuCheckCircle2 className="h-3.5 w-3.5 text-orange-400 shrink-0 mt-0.5" />
										<span>{h}</span>
									</div>
								))}
							</div>

							{/* CTA Action */}
							<div className="pt-4 flex items-center gap-4">
								<ButtonWithIcon
									href={activeArchetype.href}
									variant="orange"
									size="default"
									className="text-xs uppercase tracking-widest font-semibold"
								>
									{t("exploreRoute")}
								</ButtonWithIcon>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
