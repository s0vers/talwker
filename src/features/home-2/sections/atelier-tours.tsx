"use client";

import Image from "next/image";
import {
	LuArrowRight,
	LuCheck,
	LuClock,
	LuStar,
	LuUsers,
} from "react-icons/lu";
import { TOURS } from "@/features/home/content/tours";
import { Link } from "@/i18n/navigation";
import { ButtonWithIcon } from "@/shared/ui";

export function AtelierTours() {
	const featuredTours = TOURS.slice(0, 3);

	return (
		<section
			id="signature-tours"
			aria-labelledby="tours-title"
			className="relative bg-[#050505] py-20 md:py-36 border-t border-white/10 overflow-hidden"
		>
			<div className="mx-auto max-w-[1600px] pad-x space-y-12">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
					<div className="space-y-3">
						<span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							SIGNATURE EXPEDITIONS
						</span>
						<h2
							id="tours-title"
							className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
						>
							Small-Group Guided Journeys
						</h2>
						<p className="max-w-xl text-sm sm:text-base text-white/60 leading-relaxed">
							Carefully paced itineraries led by seasoned local guides, with small groups that protect the intimacy of every encounter.
						</p>
					</div>

					<div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 font-mono text-xs text-white/70">
						<LuUsers className="h-4 w-4 text-orange-400" />
						<span>STRICTLY LIMITED CAPACITY</span>
					</div>
				</div>

				{/* 3 Tour Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{featuredTours.map((tour) => (
						<article
							key={tour.id}
							className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#090909] p-5 transition-all duration-500 hover:border-orange-500/40 hover:bg-[#0c0c0c] hover:-translate-y-1 shadow-2xl"
						>
							<div className="space-y-4">
								{/* Photographic Stage */}
								<div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black">
									<Image
										src={tour.image}
										alt={tour.title}
										fill
										sizes="(max-width: 1024px) 100vw, 450px"
										className="object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

									{/* Rating Pill */}
									<div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-md">
										<LuStar className="h-3 w-3 fill-orange-400 text-orange-400" />
										<span>{tour.rating}</span>
									</div>

									{/* Duration Pill */}
									<div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/70 px-3 py-1 font-mono text-[10px] text-white/80 backdrop-blur-md">
										<LuClock className="h-3 w-3 text-orange-400" />
										<span>{tour.duration}</span>
									</div>
								</div>

								{/* Tour Content */}
								<div className="space-y-2">
									<p className="text-xs font-mono uppercase tracking-wider text-white/40">
										{tour.destination}
									</p>
									<h3 className="text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">
										{tour.title}
									</h3>
									<p className="text-xs sm:text-sm text-white/65 leading-relaxed line-clamp-2">
										{tour.summary}
									</p>
								</div>

								{/* Highlights List */}
								<div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
									{tour.highlights.map((highlight, idx) => (
										<div key={idx} className="flex items-center gap-2 text-xs text-white/70">
											<LuCheck className="h-3.5 w-3.5 text-orange-400 shrink-0" />
											<span>{highlight}</span>
										</div>
									))}
								</div>
							</div>

							{/* Price & Action */}
							<div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
								<div>
									<p className="text-[10px] font-mono uppercase text-white/40">FROM</p>
									<p className="text-lg font-bold font-mono text-white">${tour.price.toLocaleString()}</p>
								</div>

								<ButtonWithIcon
									href={`/tours/${tour.slug}`}
									variant="orange"
									size="default"
									className="text-xs uppercase tracking-widest font-semibold"
								>
									View Tour
								</ButtonWithIcon>
							</div>
						</article>
					))}
				</div>

				{/* Section Footer Link */}
				<div className="text-center pt-4">
					<Link
						href="/tours"
						className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-400 hover:text-orange-300 transition-colors"
					>
						<span>Explore All Tours</span>
						<LuArrowRight className="h-3.5 w-3.5" />
					</Link>
				</div>
			</div>
		</section>
	);
}
