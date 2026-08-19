"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
	LuArrowLeft,
	LuArrowRight,
	LuStar,
} from "react-icons/lu";
import { DESTINATIONS } from "@/features/home/content/destinations";
import { destinationToSlug } from "@/features/destinations/lib/destination-slug";
import { ButtonWithIcon } from "@/shared/ui";
import { Link } from "@/i18n/navigation";

export function AtelierGallery() {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		containScroll: "trimSnaps",
		dragFree: false,
		loop: true,
	});

	const [canScrollPrev, setCanScrollPrev] = useState(true);
	const [canScrollNext, setCanScrollNext] = useState(true);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		const updateSelection = () => {
			setCanScrollPrev(emblaApi.canScrollPrev());
			setCanScrollNext(emblaApi.canScrollNext());
		};

		emblaApi.on("select", updateSelection);
		emblaApi.on("reInit", updateSelection);
		return () => {
			emblaApi.off("select", updateSelection);
			emblaApi.off("reInit", updateSelection);
		};
	}, [emblaApi]);

	return (
		<section
			id="curators-gallery"
			aria-labelledby="gallery-title"
			className="relative bg-[#070707] py-20 md:py-36 border-t border-white/10 overflow-hidden"
		>
			<div className="mx-auto max-w-[1600px] pad-x space-y-12">
				{/* Section Header with Embla Carousel Controls */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
					<div className="space-y-3">
						<span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							THE CURATORS&apos; COLLECTION
						</span>
						<h2
							id="gallery-title"
							className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
						>
							Featured Destinations
						</h2>
						<p className="max-w-xl text-sm sm:text-base text-white/60 leading-relaxed">
							Hand-selected global sanctuaries vetted for raw character, cultural resonance, and extraordinary natural beauty.
						</p>
					</div>

					{/* Left / Right Carousel Controls */}
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={scrollPrev}
							disabled={!canScrollPrev}
							className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
							aria-label="Previous destinations"
						>
							<LuArrowLeft className="h-5 w-5" />
						</button>
						<button
							type="button"
							onClick={scrollNext}
							disabled={!canScrollNext}
							className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
							aria-label="Next destinations"
						>
							<LuArrowRight className="h-5 w-5" />
						</button>
					</div>
				</div>

				{/* Embla Carousel Viewport */}
				<div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
					<div className="flex gap-6 -ml-3">
						{DESTINATIONS.map((dest) => {
							const slug = destinationToSlug(dest);
							return (
								<div
									key={dest.id}
									className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] pl-3 shrink-0 grow-0 basis-[300px] sm:basis-[360px] md:basis-[400px]"
								>
									<article className="h-full rounded-3xl border border-white/10 bg-[#0c0c0c] p-4 group transition-all duration-500 hover:border-orange-500/40 hover:bg-[#101010] flex flex-col justify-between select-none">
										{/* Image Stage */}
										<div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black pointer-events-none">
											<Image
												src={dest.image}
												alt={dest.name}
												fill
												sizes="400px"
												className="object-cover transition-transform duration-700 group-hover:scale-105"
												draggable={false}
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

											{/* Tag Badge */}
											{dest.tag && (
												<span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-orange-400 backdrop-blur-md">
													{dest.tag}
												</span>
											)}

											{/* Rating */}
											<div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-md">
												<LuStar className="h-3 w-3 fill-orange-400 text-orange-400" />
												<span>{dest.rating}</span>
											</div>

											{/* Duration */}
											<div className="absolute bottom-3 left-3 font-mono text-[11px] text-white/80 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
												{dest.duration}
											</div>
										</div>

										{/* Details */}
										<div className="pt-4 space-y-3">
											<div className="flex items-end justify-between">
												<div>
													<p className="text-xs font-mono uppercase tracking-wider text-white/40">
														{dest.country}
													</p>
													<h3 className="text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">
														{dest.name}
													</h3>
												</div>

												<div className="text-right font-mono">
													<p className="text-[10px] text-white/40 uppercase">FROM</p>
													<p className="text-base font-bold text-white">${dest.price.toLocaleString()}</p>
												</div>
											</div>

											<div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
												<Link
													href={`/destinations/${slug}`}
													className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors"
												>
													<span>View Destination</span>
													<LuArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
												</Link>
											</div>
										</div>
									</article>
								</div>
							);
						})}
					</div>
				</div>

				{/* Bottom Section CTA */}
				<div className="text-center pt-6">
					<ButtonWithIcon
						href="/destinations"
						variant="orange"
						size="lg"
						className="text-xs uppercase tracking-widest font-semibold shadow-xl shadow-orange-500/20"
					>
						Explore All Destinations
					</ButtonWithIcon>
				</div>
			</div>
		</section>
	);
}
