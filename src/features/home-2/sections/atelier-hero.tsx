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
		subtitle:
			"Glacial silence and granite monoliths across the southern ice cap",
		image: "/patagonia-torres-del-paine.webp",
		price: "$2,499",
		duration: "10 Days",
		rating: 4.9
	},
	{
		id: "kyoto",
		slug: "kyoto-japan",
		name: "Kyoto",
		country: "Japan",
		subtitle: "Centuries of moss, cedar shrines, and dawn temple meditations",
		image: "/kyoto-historic-street.webp",
		price: "$1,599",
		duration: "6 Days",
		rating: 4.8
	},
	{
		id: "santorini",
		slug: "santorini-greece",
		name: "Santorini",
		country: "Greece",
		subtitle: "Sun-bleached caldera terraces overlooking the deep blue Aegean",
		image: "/santorini-white-village.jpg",
		price: "$1,899",
		duration: "5 Days",
		rating: 4.9
	}
];

export function AtelierHero() {
	const sectionRef = useRef<HTMLElement>(null);
	const [activePanel, setActivePanel] = useState<number>(0);
	const [instantPanel, setInstantPanel] = useState(false);
	const line1Ref = useRef<HTMLDivElement>(null);
	const line2Ref = useRef<HTMLDivElement>(null);
	const triptychRef = useRef<HTMLDivElement>(null);

	useGsapContext(sectionRef, () => {
		if (prefersReducedMotion()) return;

		const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

		tl.from(line1Ref.current, { y: "115%", duration: 1.2, delay: 0.2 })
			.from(line2Ref.current, { y: "115%", duration: 1.2 }, "-=1.0")
			.fromTo(
				Array.from(triptychRef.current?.children ?? []),
				{
					x: (index: number) => (index === 0 ? -24 : index === 2 ? 24 : 0),
					y: (index: number) => (index === 1 ? 18 : 0),
					opacity: 0
				},
				{
					x: 0,
					y: 0,
					opacity: 1,
					duration: 0.88,
					stagger: 0.1,
					ease: "power3.out",
					clearProps: "opacity,transform"
				},
				"-=0.65"
			);
	}, []);

	return (
		<section
			ref={sectionRef}
			id="atelier-hero"
			aria-labelledby="hero-title"
			className="relative flex min-h-svh w-full flex-col justify-between overflow-hidden bg-[#050505] pt-28 pb-12 text-white"
		>
			{/* Main Masthead Headline */}
			<div className="pad-x relative z-10 mx-auto my-auto w-full max-w-[1600px] py-6">
				<h1 id="hero-title" className="mb-8 space-y-2">
					<div className="overflow-hidden">
						<div
							ref={line1Ref}
							className="text-[clamp(2.5rem,7.5vw,6.5rem)] leading-[0.92] font-bold tracking-tighter text-white"
						>
							EXPLORE WITH INTENTION.
						</div>
					</div>
					<div className="overflow-hidden">
						<div
							ref={line2Ref}
							className="text-[clamp(2.5rem,7.5vw,6.5rem)] leading-[0.92] font-bold tracking-tighter"
						>
							<span className="text-white/80">JOURNEYS CRAFTED FOR </span>
							<span className="font-light text-orange-500 italic">DEPTH.</span>
						</div>
					</div>
				</h1>

				{/* 3-Panel Interactive Triptych */}
				<div
					ref={triptychRef}
					className="flex w-full flex-col gap-4 xl:h-[500px] xl:flex-row"
				>
					{HERO_PANELS.map((panel, idx) => {
						const isExpanded = activePanel === idx;
						return (
							<article
								key={panel.id}
								onPointerEnter={event => {
									if (
										event.pointerType === "mouse" &&
										window.matchMedia("(min-width: 1280px)").matches
									) {
										setInstantPanel(false);
										setActivePanel(idx);
									}
								}}
								onFocusCapture={() => {
									setInstantPanel(true);
									setActivePanel(idx);
								}}
								className={cn(
									"group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] p-6 transition-[flex,border-color] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none xl:min-h-0 xl:cursor-pointer",
									instantPanel ? "duration-0" : "duration-[520ms]",
									isExpanded
										? "xl:flex-[2.2] xl:border-orange-500/40 xl:shadow-2xl xl:shadow-orange-500/10"
										: "xl:flex-1 xl:opacity-70 xl:hover:border-white/25 xl:hover:opacity-100"
								)}
							>
								{/* Background Image */}
								<Image
									src={panel.image}
									alt={panel.name}
									fill
									sizes="(max-width: 768px) 100vw, 600px"
									className={cn(
										"object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035] motion-reduce:transition-none",
										isExpanded ? "xl:scale-[1.04]" : "xl:scale-[1.1]"
									)}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

								{/* Top Badge */}
								<div className="relative z-10 flex items-center justify-between">
									<span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[10px] tracking-wider text-white uppercase backdrop-blur-md">
										<LuMapPin className="h-3 w-3 text-orange-400" />
										<span>{panel.country}</span>
									</span>

									<div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-xs text-white/90 backdrop-blur-md">
										<LuStar className="h-3 w-3 fill-orange-400 text-orange-400" />
										<span>{panel.rating}</span>
									</div>
								</div>

								{/* Bottom Details */}
								<div className="relative z-10 space-y-2">
									<div className="flex items-end justify-between gap-4">
										<div>
											<p className="font-mono text-[10px] tracking-widest text-orange-400 uppercase">
												{panel.duration} TRIP
											</p>
											<h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
												{panel.name}
											</h2>
										</div>

										<div className="text-right">
											<p className="font-mono text-[10px] text-white/60 uppercase">
												FROM
											</p>
											<p className="font-mono text-lg font-bold text-white">
												{panel.price}
											</p>
										</div>
									</div>

									<p
										className={cn(
											"hidden pt-1 text-xs leading-relaxed text-white/70 sm:block",
											!isExpanded && "xl:hidden"
										)}
									>
										{panel.subtitle}
									</p>

									<div className="pt-2">
										<Link
											href={`/destinations/${panel.slug}`}
											className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold tracking-wider text-orange-400 uppercase transition-colors hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
			<div className="pad-x relative z-10 mx-auto w-full max-w-[1600px]">
				<div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 font-mono text-xs text-white/50">
					<div className="flex items-center gap-2">
						<LuCompass className="h-4 w-4 text-orange-400" />
						<span>CURATED COLLECTION // 2026 EDITION</span>
					</div>

					<a
						href="#curators-gallery"
						className="inline-flex min-h-11 items-center transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					>
						Scroll to Discover ↓
					</a>
				</div>
			</div>
		</section>
	);
}
