"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { LuStar, LuClock, LuArrowRight } from "react-icons/lu";
import { createStaggerReveal, gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/useGsap";

type Destination = {
	id: number;
	name: string;
	country: string;
	image: string;
	price: number;
	rating: number;
	duration: string;
	tag?: string;
};

const DESTINATIONS: Destination[] = [
	{
		id: 1,
		name: "Bali",
		country: "Indonesia",
		image: "/image.jpg",
		price: 1299,
		rating: 4.9,
		duration: "7 Days",
		tag: "Popular",
	},
	{
		id: 2,
		name: "Santorini",
		country: "Greece",
		image: "/image.jpg",
		price: 1899,
		rating: 4.8,
		duration: "5 Days",
		tag: "Trending",
	},
	{
		id: 3,
		name: "Patagonia",
		country: "Chile",
		image: "/image.jpg",
		price: 2499,
		rating: 4.9,
		duration: "10 Days",
	},
	{
		id: 4,
		name: "Kyoto",
		country: "Japan",
		image: "/image.jpg",
		price: 1599,
		rating: 4.7,
		duration: "6 Days",
		tag: "New",
	},
	{
		id: 5,
		name: "Amalfi Coast",
		country: "Italy",
		image: "/image.jpg",
		price: 2199,
		rating: 4.8,
		duration: "8 Days",
	},
	{
		id: 6,
		name: "Maldives",
		country: "Indian Ocean",
		image: "/image.jpg",
		price: 3199,
		rating: 5.0,
		duration: "5 Days",
		tag: "Luxury",
	},
];

export default function Destinations() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		if (prefersReducedMotion()) return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			const headingNodes = headingRef.current?.children;
			if (headingNodes?.length) {
				createStaggerReveal(headingNodes, headingRef.current, {
					y: 56,
					duration: 0.95,
					stagger: 0.12,
				});
			}

			const section = sectionRef.current;
			const track = trackRef.current;
			if (!section || !track) return;

			const totalScroll = () => {
				const scrollWidth = track.scrollWidth;
				const viewport = window.innerWidth;
				return Math.max(0, scrollWidth - viewport);
			};

			gsap.to(track, {
				x: () => -totalScroll(),
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top top",
					end: () => `+=${totalScroll()}`,
					pin: true,
					scrub: true,
					invalidateOnRefresh: true,
				},
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} id="destinations" className="bg-[#070707] py-28 md:py-36">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div
					ref={headingRef}
					className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between"
				>
					<div className="max-w-xl">
						<p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							Explore the World
						</p>
						<h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-white">
							Popular Destinations
							<span className="font-light italic text-orange-500">.</span>
						</h2>
						<p className="mt-4 max-w-xl text-sm leading-relaxed text-white/40 md:text-base">
							Handpicked places our travelers keep coming back to. Scroll to
							glide through the journeys.
						</p>
					</div>
					<div className="hidden shrink-0 flex-col items-end text-right text-[11px] uppercase tracking-[0.22em] text-white/35 md:flex">
						<span className="text-white/55">0{DESTINATIONS.length}</span>
						<span className="mt-1 h-px w-10 bg-white/15" />
						<span className="mt-2">Destinations</span>
					</div>
				</div>

				<div ref={gridRef} className="relative overflow-hidden">
					<div
						ref={trackRef}
						className="flex gap-6 md:gap-8"
					>
						{DESTINATIONS.map((dest) => (
							<div
								key={dest.id}
								data-destination-card
								className="relative isolate h-[520px] min-w-[80vw] cursor-pointer overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#050505] shadow-[0_26px_80px_rgba(0,0,0,0.9)] sm:min-w-[65vw] md:h-[560px] lg:min-w-[420px] xl:min-w-[440px]"
							>
								<div className="absolute inset-0 overflow-hidden rounded-[1.9rem]">
									<Image
										src={dest.image}
										alt={dest.name}
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 33vw"
										data-destination-image
										className="object-cover"
									/>
								</div>
								<div className="absolute inset-0 rounded-[1.9rem] bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

								{dest.tag && (
									<span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-md">
										{dest.tag}
									</span>
								)}

								<div className="absolute inset-x-5 bottom-5 flex flex-col gap-4">
									<div>
										<h3 className="text-[1.7rem] font-semibold tracking-tight text-white md:text-[1.9rem]">
											{dest.name}
										</h3>
										<p className="mt-1 text-sm text-white/70">{dest.country}</p>
									</div>

									<div className="flex items-center justify-between text-xs text-white/70">
										<div className="flex items-center gap-2">
											<LuClock className="h-4 w-4 text-orange-500" />
											<span>{dest.duration}</span>
										</div>
										<div className="flex items-center gap-1 rounded-full bg-black/55 px-3 py-1.5 text-[11px] backdrop-blur">
											<LuStar className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
											<span className="font-semibold text-white">
												{dest.rating}
											</span>
										</div>
									</div>

									<div className="flex items-center justify-between">
										<div className="text-xs text-white/70">
											<p className="uppercase tracking-[0.18em] text-white/40">
												From
											</p>
											<p className="mt-1 text-base font-semibold tracking-tight text-orange-500">
												${dest.price.toLocaleString()}
											</p>
										</div>
										<button className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#050505] shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
											Explore
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="mt-12 text-center">
					<a
						href="#"
						className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-all duration-500 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
					>
						View All Destinations
						<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</a>
				</div>
			</div>
		</section>
	);
}
