"use client";

import Image from "next/image";
import { useState } from "react";
import {
	LuBookmark,
	LuCamera,
	LuFeather,
	LuMaximize,
	LuQuote,
} from "react-icons/lu";
import { ButtonWithIcon } from "@/shared/ui";
import { cn } from "@/lib/utils";

export function AtelierSplitDispatch() {
	const [zoomState, setZoomState] = useState(false);

	return (
		<section
			id="split-dispatch"
			aria-labelledby="split-dispatch-title"
			className="relative bg-[#070707] py-20 md:py-36 border-t border-white/10 overflow-hidden"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
					{/* Left Sticky Architectural Stage */}
					<div className="lg:col-span-6 lg:sticky lg:top-28 space-y-4">
						<div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/12 bg-[#0c0c0c] p-3 shadow-2xl group">
							<div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
								<Image
									src="/unsplash-culture-ritual.jpg"
									alt="Contemplative evening field expedition"
									fill
									sizes="(max-width: 1024px) 100vw, 650px"
									className={cn(
										"object-cover transition-all duration-700",
										zoomState ? "scale-125 brightness-90" : "scale-100 group-hover:scale-105",
									)}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

								{/* Top Badge */}
								<div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/90 backdrop-blur-md">
									<LuCamera className="h-3 w-3 text-orange-400" />
									<span>LEICA M11 // 35MM SUMMILUX</span>
								</div>

								{/* Interactive Zoom Toggle */}
								<button
									type="button"
									onClick={() => setZoomState((prev) => !prev)}
									className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white/70 backdrop-blur-md transition-all hover:border-orange-500 hover:text-white"
									aria-label="Toggle optical zoom"
								>
									<LuMaximize className="h-3.5 w-3.5" />
								</button>

								{/* Bottom Metadata Stamp */}
								<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-white/70">
									<span>PATAGONIA ICE FIELD // 2026</span>
									<span className="text-orange-400">LAT 51.2532° S</span>
								</div>
							</div>
						</div>
					</div>

					{/* Right Editorial Monograph Narrative */}
					<div className="lg:col-span-6 space-y-8">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase text-orange-400">
								<LuFeather className="h-3.5 w-3.5" />
								<span>FIELD DISPATCH // VOL. 042</span>
							</div>

							<h2
								id="split-dispatch-title"
								className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]"
							>
								On Silence and the Art of Slow Traverse
							</h2>

							<p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
								NOTES FROM THE SOUTHERN PATAGONIAN ICE CAP
							</p>
						</div>

						{/* Dramatic Pull Quote */}
						<div className="relative rounded-2xl border-l-2 border-orange-500 bg-white/[0.02] p-6">
							<LuQuote className="absolute top-4 right-4 h-6 w-6 text-orange-500/20" />
							<p className="text-base sm:text-xl font-light italic leading-relaxed text-white/95">
								“We do not traverse remote horizons to escape the world, but to allow the stillness of the terrain to fill our consciousness with permanent things.”
							</p>
						</div>

						{/* Editorial Body Text */}
						<div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/70">
							<p>
								<span className="float-left mr-3 text-4xl font-serif font-bold text-orange-500 leading-none">A</span>
								t 2,800 meters above sea level, sound propagates with architectural clarity. The wind ceases to be an abstraction; it becomes a tactile physical presence against tent canvas, and the glacial blue beneath the moraine appears to absorb every trace of modern haste.
							</p>

							<p>
								In our Atelier expeditions, velocity is discarded by design. We allocate entire days to observing the shift of low-angle light across a single ridge, translating raw sensory immersion into enduring memory.
							</p>
						</div>

						{/* Field Note Annotation Box */}
						<div className="rounded-2xl border border-white/10 bg-[#090909] p-5 space-y-3 font-mono text-xs text-white/60">
							<div className="flex items-center justify-between text-orange-400 font-semibold">
								<span className="flex items-center gap-1.5">
									<LuBookmark className="h-3.5 w-3.5" />
									<span>FIELD LOG ENTRY #812</span>
								</span>
								<span>04:15 AM TWILIGHT</span>
							</div>
							<p className="text-white/80 italic">
								&ldquo;Barometric pressure holding steady at 1014 hPa. The southern ice sheet reflects the pre-dawn violet spectrum with astonishing intensity.&rdquo;
							</p>
						</div>

						{/* Author Signature & CTA */}
						<div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<div className="relative h-12 w-12 overflow-hidden rounded-full border border-orange-500/40">
									<Image
										src="/author.jpg"
										alt="Dr. Elena Rostova"
										fill
										sizes="48px"
										className="object-cover"
									/>
								</div>
								<div>
									<p className="text-sm font-semibold text-white">Dr. Elena Rostova</p>
									<p className="text-xs text-white/40">Lead Expedition Author & Naturalist</p>
								</div>
							</div>

							<ButtonWithIcon
								href="/stories"
								variant="orange"
								size="default"
								className="text-xs uppercase tracking-widest font-semibold"
							>
								Explore Field Archive
							</ButtonWithIcon>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
