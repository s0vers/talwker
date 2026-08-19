"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { LuArrowRight, LuCompass, LuMapPin, LuStar } from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const HERO_PANELS = [
	{
		id: "patagonia",
		slug: "patagonia-chile",
		name: "Patagonia",
		country: "Chile",
		subtitle: "Glacial silence and granite monoliths across the southern ice cap",
		image: "/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
		price: "$2,499",
		duration: "10 Days",
		rating: 4.9,
	},
	{
		id: "kyoto",
		slug: "kyoto-japan",
		name: "Kyoto",
		country: "Japan",
		subtitle: "Centuries of moss, cedar shrines, and dawn temple meditations",
		image: "/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg",
		price: "$1,599",
		duration: "6 Days",
		rating: 4.8,
	},
	{
		id: "santorini",
		slug: "santorini-greece",
		name: "Santorini",
		country: "Greece",
		subtitle: "Sun-bleached caldera terraces overlooking the deep blue Aegean",
		image: "/vertical-high-angle-shot-white-buildings-santorini-greece.jpg",
		price: "$1,899",
		duration: "5 Days",
		rating: 4.9,
	},
];

export function AtelierHero() {
	const sectionRef = useRef<HTMLElement>(null);
	const [activePanel, setActivePanel] = useState<number>(0);
	const line1Ref = useRef<HTMLDivElement>(null);
	const line2Ref = useRef<HTMLDivElement>(null);
	const triptychRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;

			const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

			tl.from(line1Ref.current, { y: "115%", duration: 1.2, delay: 0.2 })
				.from(line2Ref.current, { y: "115%", duration: 1.2 }, "-=1.0")
				.from(
					triptychRef.current,
					{ y: 40, opacity: 0, duration: 1.0, ease: "power3.out" },
					"-=0.7",
				);
		},
		[],
	);

	return (
		<section
			ref={sectionRef}
			id="atelier-hero"
			aria-labelledby="hero-title"
			className="relative min-h-svh w-full overflow-hidden bg-[#050505] text-white pt-24 pb-12 flex flex-col justify-between"
		>
			{/* Top Eyebrow */}
			<div className="relative z-10 w-full max-w-[1600px] mx-auto pad-x">
				<div className="flex items-center justify-between border-b border-white/10 pb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50">
					<div className="flex items-center gap-3">
						<span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
						<span>TALKWER · VISUAL FOLIO Nº 02</span>
					</div>
					<span className="hidden sm:inline text-white/40">CURATED TRAVEL ARCHIVE</span>
				</div>
			</div>

			{/* Main Masthead Headline */}
			<div className="relative z-10 w-full max-w-[1600px] mx-auto pad-x my-auto py-6">
				<div className="space-y-2 mb-8">
					<div className="overflow-hidden">
						<h1
							id="hero-title"
							ref={line1Ref}
							className="text-[clamp(2.5rem,7.5vw,6.5rem)] font-bold tracking-tighter leading-[0.92] text-white"
						>
							EXPLORE WITH INTENTION.
						</h1>
					</div>
					<div className="overflow-hidden">
						<h1
							ref={line2Ref}
							className="text-[clamp(2.5rem,7.5vw,6.5rem)] font-bold tracking-tighter leading-[0.92]"
						>
							<span className="text-white/80">JOURNEYS CRAFTED FOR </span>
							<span className="font-light italic text-orange-500">DEPTH.</span>
						</h1>
					</div>
				</div>

				{/* 3-Panel Interactive Triptych */}
				<div
					ref={triptychRef}
					className="flex flex-col md:flex-row gap-4 h-[380px] sm:h-[440px] lg:h-[500px] w-full"
				>
					{HERO_PANELS.map((panel, idx) => {
						const isExpanded = activePanel === idx;
						return (
							<article
								key={panel.id}
								onMouseEnter={() => setActivePanel(idx)}
								className={cn(
									"relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] transition-all duration-700 ease-out cursor-pointer group flex flex-col justify-between p-6",
									isExpanded
										? "md:flex-[2.2] border-orange-500/40 shadow-2xl shadow-orange-500/10"
										: "md:flex-1 opacity-70 hover:opacity-100 hover:border-white/25",
								)}
							>
								{/* Background Image */}
								<Image
									src={panel.image}
									alt={panel.name}
									fill
									sizes="(max-width: 768px) 100vw, 600px"
									className="object-cover transition-transform duration-1000 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

								{/* Top Badge */}
								<div className="relative z-10 flex items-center justify-between">
									<span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md">
										<LuMapPin className="h-3 w-3 text-orange-400" />
										<span>{panel.country}</span>
									</span>

									<div className="flex items-center gap-1 font-mono text-xs text-white/90 bg-black/60 px-2.5 py-1 rounded-full border border-white/15 backdrop-blur-md">
										<LuStar className="h-3 w-3 fill-orange-400 text-orange-400" />
										<span>{panel.rating}</span>
									</div>
								</div>

								{/* Bottom Details */}
								<div className="relative z-10 space-y-2">
									<div className="flex items-end justify-between gap-4">
										<div>
											<p className="text-[10px] font-mono uppercase tracking-widest text-orange-400">
												{panel.duration} TRIP
											</p>
											<h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
												{panel.name}
											</h2>
										</div>

										<div className="text-right">
											<p className="text-[10px] font-mono uppercase text-white/40">FROM</p>
											<p className="text-lg font-bold font-mono text-white">{panel.price}</p>
										</div>
									</div>

									{isExpanded && (
										<p className="hidden md:block text-xs text-white/70 leading-relaxed pt-1">
											{panel.subtitle}
										</p>
									)}

									<div className="pt-2">
										<Link
											href={`/destinations/${panel.slug}`}
											className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400 transition-colors hover:text-orange-300"
										>
											<span>Explore Itinerary</span>
											<LuArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
										</Link>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</div>

			{/* Base Footer Bar */}
			<div className="relative z-10 w-full max-w-[1600px] mx-auto pad-x">
				<div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/50 font-mono">
					<div className="flex items-center gap-2">
						<LuCompass className="h-4 w-4 text-orange-400" />
						<span>CURATED COLLECTION // 2026 EDITION</span>
					</div>

					<a
						href="#curators-gallery"
						className="hover:text-white transition-colors"
					>
						Scroll to Discover ↓
					</a>
				</div>
			</div>
		</section>
	);
}
