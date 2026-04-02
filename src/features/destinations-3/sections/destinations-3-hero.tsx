import Image from "next/image";
import { DESTINATIONS_3_PAGE_HERO } from "@/features/destinations-3/content/destinations-3-page-copy";
import { DESTINATIONS_3_PAGE_SHELL } from "@/features/destinations-3/lib/destinations-3-page-shell";

const LIST_HERO_IMAGE_SRC = "/vertical-high-angle-shot-white-buildings-santorini-greece.jpg";

export function Destinations3Hero() {
	const h = DESTINATIONS_3_PAGE_HERO;

	return (
		<section className="border-b border-white/10 bg-[#050505] text-white" aria-labelledby="destinations-3-hero-title">
			<div>
				<div className="relative aspect-21/10 min-h-[220px] w-full overflow-hidden rounded-sm sm:aspect-2/1 sm:min-h-[280px] lg:aspect-21/9 lg:min-h-[320px]">
					<Image
						src={LIST_HERO_IMAGE_SRC}
						alt=""
						fill
						className="object-cover"
						priority
						sizes="(max-width: 1600px) 100vw, 1600px"
					/>
					<div
						className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/55 to-black/25"
						aria-hidden
					/>
					<div
						className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_100%,rgba(0,0,0,0.85),transparent_55%)]"
						aria-hidden
					/>

					<div className="absolute inset-x-0 bottom-2 flex justify-center pt-8 md:pt-10">
						<p className="max-w-[90vw] text-center font-mono text-[10px] font-medium uppercase tracking-[0.38em] text-white/80">
							<span className="text-orange-300">{h.rail}</span>
							<span className="mx-2 text-white/35" aria-hidden>
								·
							</span>
							<span className="text-white/55">{h.kicker}</span>
						</p>
					</div>

					<div className="absolute inset-x-0 bottom-0 pb-10 pt-16 md:pb-14 md:pt-20">
						<h1
							id="destinations-3-hero-title"
							className="mx-auto max-w-[22ch] text-center text-[clamp(1.85rem,5.2vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:max-w-[28ch]"
						>
							{h.title}{" "}
							<span className="text-orange-400">{h.titleAccent}</span>
						</h1>
					</div>
				</div>

				<div className="border-t border-white/10 bg-[#080808] py-12 text-center md:py-14">
					<p className="mx-auto max-w-lg text-sm leading-relaxed text-white/60 md:max-w-xl md:text-base">
						{h.lede}
					</p>
				</div>
			</div>
		</section>
	);
}
