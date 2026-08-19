"use client";

import Image from "next/image";
import { useState } from "react";
import {
	LuCamera,
	LuCompass,
	LuEye,
	LuFilm,
	LuMaximize2,
	LuMountain,
	LuX,
} from "react-icons/lu";
import { DARKROOM_PLATES, type DarkroomPlate } from "@/features/home-2/content/atelier-copy";
import { ButtonWithIcon } from "@/shared/ui";
import { Link } from "@/i18n/navigation";

export function AtelierDarkroom() {
	const [inspectingPlate, setInspectingPlate] = useState<DarkroomPlate | null>(null);

	return (
		<section
			id="darkroom"
			aria-labelledby="darkroom-title"
			className="relative bg-[#050505] py-20 md:py-36 border-t border-white/10 overflow-hidden"
		>
			<div className="mx-auto max-w-[1600px] pad-x space-y-12">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
					<div className="space-y-3">
						<div className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase text-orange-400">
							<LuFilm className="h-3.5 w-3.5" />
							<span>ANALOG CONTACT SHEET // 35MM ARCHIVE</span>
						</div>
						<h2
							id="darkroom-title"
							className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
						>
							The Curatorial Darkroom
						</h2>
						<p className="max-w-xl text-sm sm:text-base text-white/60 leading-relaxed">
							Original photographic negatives and exposure monographs captured by resident field naturalists on mechanical film emulsions.
						</p>
					</div>

					<div className="font-mono text-xs text-white/40 uppercase tracking-widest flex items-center gap-2">
						<span className="h-2 w-2 rounded-full bg-orange-500" />
						<span>PROCESSED IN PITCH BLACK // 400 ISO</span>
					</div>
				</div>

				{/* 35mm Filmstrip Contact Sheet Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{DARKROOM_PLATES.map((plate) => (
						<article
							key={plate.id}
							className="group relative flex flex-col rounded-3xl border border-white/12 bg-[#090909] p-4 sm:p-6 shadow-2xl transition-all duration-500 hover:border-orange-500/50 hover:bg-[#0c0c0c]"
						>
							{/* Top 35mm Sprocket Strip Header */}
							<div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 font-mono text-[10px] text-white/40">
								<div className="flex items-center gap-3">
									<span className="font-bold text-orange-400">{plate.frameNumber}</span>
									<span>•</span>
									<span>{plate.filmStock}</span>
								</div>
								<div className="flex items-center gap-2">
									<span>{plate.year}</span>
									<span>•</span>
									<span className="text-white/60">{plate.iso} ISO</span>
								</div>
							</div>

							{/* Photographic Negative Frame */}
							<div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black border border-white/10 group/img">
								<Image
									src={plate.image}
									alt={plate.title}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
									className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:contrast-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

								{/* Shutter / Exposure Hologram Tag */}
								<div className="absolute top-3 left-3 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-1 font-mono text-[10px] text-white/80 backdrop-blur-md">
									<LuCamera className="h-3 w-3 text-orange-400" />
									<span>{plate.focalLength} · {plate.aperture} · {plate.shutterSpeed}</span>
								</div>

								{/* Lightbox Inspect Trigger */}
								<button
									type="button"
									onClick={() => setInspectingPlate(plate)}
									className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white/70 backdrop-blur-md transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white"
									aria-label={`Inspect ${plate.title} in darkroom lightbox`}
								>
									<LuMaximize2 className="h-3.5 w-3.5" />
								</button>

								{/* Coordinates Watermark */}
								<div className="absolute bottom-3 left-3 flex items-center gap-1.5 font-mono text-[11px] text-white/75 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
									<LuCompass className="h-3.5 w-3.5 text-orange-400" />
									<span>{plate.coordinates}</span>
								</div>
							</div>

							{/* Monograph Details */}
							<div className="pt-5 space-y-3 flex-1 flex flex-col justify-between">
								<div className="space-y-1.5">
									<div className="flex items-center gap-2 text-xs font-mono text-white/45">
										<LuMountain className="h-3.5 w-3.5 text-orange-400" />
										<span>{plate.location}</span>
										<span>•</span>
										<span>{plate.elevation}</span>
									</div>
									<h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">
										{plate.title}
									</h3>
									<p className="text-sm leading-relaxed text-white/65 pt-1">
										{plate.excerpt}
									</p>
								</div>

								{/* Card Bottom Actions */}
								<div className="pt-4 border-t border-white/10 flex items-center justify-between">
									<button
										type="button"
										onClick={() => setInspectingPlate(plate)}
										className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors"
									>
										<LuEye className="h-3.5 w-3.5 text-orange-400" />
										<span>EXAMINE NEGATIVE</span>
									</button>

									<Link
										href={`/destinations/${plate.slug}`}
										className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors"
									>
										<span>View Destination</span>
										<span>→</span>
									</Link>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>

			{/* Lightbox Modal for Darkroom Negative Inspection */}
			{inspectingPlate && (
				<div
					role="dialog"
					aria-modal="true"
					aria-label="Darkroom Lightbox Inspection"
					className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-xl"
					onClick={() => setInspectingPlate(null)}
				>
					<div
						className="relative max-w-4xl w-full rounded-3xl border border-white/20 bg-[#090909] p-6 sm:p-8 shadow-2xl space-y-6"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
							<div className="flex items-center gap-2 text-orange-400">
								<LuFilm className="h-4 w-4" />
								<span>LIGHTBOX // {inspectingPlate.frameNumber}</span>
							</div>
							<button
								type="button"
								onClick={() => setInspectingPlate(null)}
								className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
								aria-label="Close Lightbox"
							>
								<LuX className="h-5 w-5" />
							</button>
						</div>

						{/* Modal High-Res Viewport */}
						<div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black border border-white/10">
							<Image
								src={inspectingPlate.image}
								alt={inspectingPlate.title}
								fill
								sizes="1000px"
								className="object-cover"
							/>
						</div>

						{/* Modal Exposure Breakdown */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs border-y border-white/10 py-4">
							<div>
								<p className="text-white/40 uppercase">EMULSION</p>
								<p className="font-semibold text-white">{inspectingPlate.filmStock}</p>
							</div>
							<div>
								<p className="text-white/40 uppercase">OPTICS</p>
								<p className="font-semibold text-orange-400">{inspectingPlate.focalLength} · {inspectingPlate.aperture}</p>
							</div>
							<div>
								<p className="text-white/40 uppercase">EXPOSURE</p>
								<p className="font-semibold text-white">{inspectingPlate.shutterSpeed} · {inspectingPlate.iso} ISO</p>
							</div>
							<div>
								<p className="text-white/40 uppercase">COORDINATES</p>
								<p className="font-semibold text-white">{inspectingPlate.coordinates}</p>
							</div>
						</div>

						<div className="flex items-center justify-between pt-2">
							<div>
								<h3 className="text-xl font-bold text-white">{inspectingPlate.title}</h3>
								<p className="text-xs text-white/50">{inspectingPlate.location} {"//"} ELEV {inspectingPlate.elevation}</p>
							</div>

							<ButtonWithIcon
								href={`/destinations/${inspectingPlate.slug}`}
								variant="orange"
								size="default"
								className="text-xs uppercase tracking-widest font-semibold"
							>
								Explore Destination
							</ButtonWithIcon>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
