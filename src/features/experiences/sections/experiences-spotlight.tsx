import Image from "next/image";
import { Quote } from "lucide-react";
import { EXPERIENCES_SPOTLIGHT } from "../content/experiences-page-copy";

export function ExperiencesSpotlight() {
	return (
		<section className="bg-[#050505] text-white py-16 md:py-24 border-t border-white/6">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
					{/* Text Column */}
					<div className="lg:col-span-7 space-y-6">
						<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
							{EXPERIENCES_SPOTLIGHT.eyebrow}
						</p>
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
							{EXPERIENCES_SPOTLIGHT.title}
						</h2>
						<div className="relative pl-6 border-l-2 border-orange-500 my-6">
							<Quote className="h-8 w-8 text-orange-500/20 absolute -top-4 -left-3 -z-10" />
							<p className="text-base sm:text-lg italic text-white/80 leading-relaxed">
								&ldquo;{EXPERIENCES_SPOTLIGHT.quote}&rdquo;
							</p>
						</div>
						<div>
							<p className="text-sm font-semibold text-white">{EXPERIENCES_SPOTLIGHT.curatorName}</p>
							<p className="text-xs text-white/40">{EXPERIENCES_SPOTLIGHT.curatorTitle}</p>
						</div>
					</div>

					{/* Image Column */}
					<div className="lg:col-span-5 relative">
						<div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
							<Image
								src={EXPERIENCES_SPOTLIGHT.image}
								alt={EXPERIENCES_SPOTLIGHT.imageAlt}
								fill
								sizes="(max-width: 1024px) 100vw, 45vw"
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-[#050505]/80 via-transparent to-transparent" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
