"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { LuArrowLeft, LuArrowRight, LuStar } from "react-icons/lu";
import { DESTINATIONS } from "@/features/home/content/destinations";
import { destinationToSlug } from "@/features/destinations/lib/destination-slug";
import { ButtonWithIcon } from "@/shared/ui";
import { Link } from "@/i18n/navigation";

export function AtelierGallery() {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		containScroll: "trimSnaps",
		dragFree: false,
		loop: true
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
			className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-20 md:py-36"
		>
			<div className="pad-x mx-auto max-w-[1600px] space-y-12">
				{/* Section Header with Embla Carousel Controls */}
				<div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
					<div className="space-y-3">
						<span className="inline-block text-[11px] font-semibold tracking-[0.25em] text-orange-500 uppercase">
							THE CURATORS&apos; COLLECTION
						</span>
						<h2
							id="gallery-title"
							className="text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
						>
							Featured Destinations
						</h2>
						<p className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
							Hand-selected global sanctuaries vetted for raw character,
							cultural resonance, and extraordinary natural beauty.
						</p>
					</div>

					{/* Left / Right Carousel Controls */}
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={scrollPrev}
							disabled={!canScrollPrev}
							className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-[#050505] disabled:pointer-events-none disabled:opacity-30"
							aria-label="Previous destinations"
						>
							<LuArrowLeft className="h-5 w-5" />
						</button>
						<button
							type="button"
							onClick={scrollNext}
							disabled={!canScrollNext}
							className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-[#050505] disabled:pointer-events-none disabled:opacity-30"
							aria-label="Next destinations"
						>
							<LuArrowRight className="h-5 w-5" />
						</button>
					</div>
				</div>

				{/* Embla Carousel Viewport */}
				<div
					ref={emblaRef}
					className="cursor-grab overflow-hidden active:cursor-grabbing"
				>
					<div className="-ml-3 flex gap-6">
						{DESTINATIONS.map(dest => {
							const slug = destinationToSlug(dest);
							return (
								<div
									key={dest.id}
									className="min-w-[280px] shrink-0 grow-0 basis-[300px] pl-3 sm:min-w-[340px] sm:basis-[360px] md:min-w-[380px] md:basis-[400px]"
								>
									<article className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-[#0c0c0c] p-4 transition-all duration-500 select-none hover:border-orange-500/40 hover:bg-[#101010]">
										{/* Image Stage */}
										<div className="pointer-events-none relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black">
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
												<span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/70 px-3 py-1 font-mono text-[10px] tracking-wider text-orange-400 uppercase backdrop-blur-md">
													{dest.tag}
												</span>
											)}

											{/* Rating */}
											<div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-md">
												<LuStar className="h-3 w-3 fill-orange-400 text-orange-400" />
												<span>{dest.rating}</span>
											</div>

											{/* Duration */}
											<div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[11px] text-white/80 backdrop-blur-md">
												{dest.duration}
											</div>
										</div>

										{/* Details */}
										<div className="space-y-3 pt-4">
											<div className="flex items-end justify-between">
												<div>
													<p className="font-mono text-xs tracking-wider text-white/60 uppercase">
														{dest.country}
													</p>
													<h3 className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-orange-400">
														{dest.name}
													</h3>
												</div>

												<div className="text-right font-mono">
													<p className="text-[10px] text-white/60 uppercase">
														FROM
													</p>
													<p className="text-base font-bold text-white">
														${dest.price.toLocaleString()}
													</p>
												</div>
											</div>

											<div className="flex items-center justify-between border-t border-white/[0.08] pt-2">
												<Link
													href={`/destinations/${slug}`}
													className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-orange-400 uppercase transition-colors hover:text-orange-300"
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
				<div className="pt-6 text-center">
					<ButtonWithIcon
						href="/destinations"
						variant="orange"
						size="lg"
						className="text-xs font-semibold tracking-widest uppercase shadow-xl shadow-orange-500/20"
					>
						Explore All Destinations
					</ButtonWithIcon>
				</div>
			</div>
		</section>
	);
}
