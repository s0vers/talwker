"use client";

import Image from "next/image";
import Link from "next/link";
import { LuClock, LuUsers, LuArrowRight } from "react-icons/lu";
import { EXPERIENCES_CATALOG, EXPERIENCE_CATEGORIES, type ExperienceCategory, type ExperienceItem } from "../content/experiences-page-copy";
import { cn } from "@/lib/utils";

export type ExperiencesThemesProps = {
	activeCategory: ExperienceCategory;
	onCategoryChange: (category: ExperienceCategory) => void;
	onSelectExperience: (experience: ExperienceItem) => void;
};

export function ExperiencesThemes({ activeCategory, onCategoryChange, onSelectExperience }: ExperiencesThemesProps) {
	const filteredCatalog =
		activeCategory === "all"
			? EXPERIENCES_CATALOG
			: EXPERIENCES_CATALOG.filter((item) => item.category === activeCategory);

	return (
		<section className="bg-[#050505] text-white py-16 md:py-24">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
					<div>
						<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
							Explore Collection
						</p>
						<h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-white">
							Signature Experiences ({filteredCatalog.length})
						</h2>
					</div>
					<p className="max-w-md text-sm text-white/50 md:text-right">
						Click any experience to open the interactive itinerary overview or route directly to full tour details.
					</p>
				</div>

				{/* Integrated Category Filter Bar */}
				<div className="mb-12 pb-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
						Select Experience Format
					</p>

					<div className="flex flex-wrap gap-2">
						{EXPERIENCE_CATEGORIES.map((cat) => {
							const isActive = activeCategory === cat.id;
							return (
								<button
									key={cat.id}
									type="button"
									onClick={() => onCategoryChange(cat.id)}
									className={cn(
										"rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300",
										isActive
											? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
											: "border border-white/10 bg-[#0a0a0a] text-white/60 hover:border-white/25 hover:text-white",
									)}
								>
									{cat.label}
								</button>
							);
						})}
					</div>
				</div>

				{filteredCatalog.length === 0 ? (
					<div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-12 text-center">
						<p className="text-white/60">No experiences found in this category.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{filteredCatalog.map((item) => {
							const tourHref = item.tourSlug ? `/tours/${item.tourSlug}` : "/tours";
							return (
								<article
									key={item.id}
									className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/5"
								>
									{/* Photo Banner */}
									<div className="relative aspect-4/3 w-full overflow-hidden bg-white/5">
										<Image
											src={item.image}
											alt={item.imageAlt}
											fill
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
											className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent opacity-90" />
										
										{/* Category Badge */}
										<div className="absolute top-4 left-4">
											<span className="rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-400">
												{item.categoryLabel}
											</span>
										</div>

										{/* Price Tag */}
										<div className="absolute top-4 right-4">
											<span className="rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold text-white shadow-md">
												{item.price}
											</span>
										</div>
									</div>

									{/* Content */}
									<div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
										<div>
											{/* Meta bar */}
											<div className="flex items-center gap-4 text-xs text-white/50 mb-3">
												<span className="flex items-center gap-1">
													<LuClock className="h-3.5 w-3.5 text-orange-500" />
													{item.duration}
												</span>
												<span className="flex items-center gap-1">
													<LuUsers className="h-3.5 w-3.5 text-orange-500" />
													{item.groupSize}
												</span>
											</div>

											<h3 className="text-xl font-bold tracking-tight text-white group-hover:text-orange-500 transition-colors">
												{item.title}
											</h3>
											<p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-2">
												{item.description}
											</p>
										</div>

										{/* Interactive Actions */}
										<div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
											<button
												type="button"
												onClick={() => onSelectExperience(item)}
												className="text-xs font-semibold uppercase tracking-wider text-orange-500 hover:text-orange-400 transition-colors"
											>
												Quick Preview
											</button>
											<Link
												href={tourHref}
												className="inline-flex items-center gap-1 text-xs font-semibold text-white/70 hover:text-white transition-colors"
											>
												View Package <LuArrowRight className="h-3.5 w-3.5 text-orange-500 transition-transform group-hover:translate-x-1" />
											</Link>
										</div>
									</div>
								</article>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
}
