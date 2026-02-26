"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { LuStar, LuClock, LuArrowRight } from "react-icons/lu";
import {
	createElementParallax,
	createStaggerReveal,
	gsap,
	prefersReducedMotion,
	ScrollTrigger,
} from "@/lib/useGsap";

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

			const cards = gsap.utils.toArray<HTMLElement>("[data-destination-card]");
			ScrollTrigger.create({
				trigger: gridRef.current,
				start: "top 78%",
				once: true,
				onEnter: () => {
					gsap.from(cards, {
						y: 84,
						opacity: 0,
						scale: 0.96,
						duration: 1.1,
						stagger: {
							each: 0.1,
							from: "start",
						},
						ease: "power4.out",
					});
				},
			});

			cards.forEach((card) => {
				const image = card.querySelector("[data-destination-image]");
				if (!image) return;
				createElementParallax(image, card, {
					fromY: -10,
					toY: 10,
					fromScale: 1.1,
					toScale: 1.02,
				});
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} id="destinations" className="bg-[#070707] py-28 md:py-36">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div ref={headingRef} className="mb-16 text-center md:mb-20">
					<p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
						Explore the World
					</p>
					<h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-white">
						Popular Destinations
						<span className="font-light italic text-orange-500">.</span>
					</h2>
					<p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/35 md:text-base">
						Handpicked destinations loved by thousands of travelers. Your next
						unforgettable adventure starts here.
					</p>
				</div>

				<div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{DESTINATIONS.map((dest) => (
						<div
							key={dest.id}
							data-destination-card
							className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#101010] transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
						>
							<div className="relative h-64 overflow-hidden">
								<Image
									src={dest.image}
									alt={dest.name}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									data-destination-image
									className="object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

								{dest.tag && (
									<span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-md">
										{dest.tag}
									</span>
								)}

								<div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
									<div>
										<h3 className="text-2xl font-semibold tracking-tight text-white">
											{dest.name}
										</h3>
										<p className="text-sm text-white/70">{dest.country}</p>
									</div>
									<div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 backdrop-blur-md">
										<LuStar className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
										<span className="text-sm font-semibold text-white">
											{dest.rating}
										</span>
									</div>
								</div>
							</div>

							<div className="flex items-center justify-between p-6">
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-1.5 text-white/55">
										<LuClock className="h-4 w-4 text-orange-500" />
										<span className="text-sm">{dest.duration}</span>
									</div>
								</div>
								<div className="text-right">
									<p className="text-xs uppercase tracking-[0.12em] text-white/35">
										From
									</p>
									<p className="text-2xl font-semibold tracking-tight text-orange-500">
										${dest.price.toLocaleString()}
									</p>
								</div>
							</div>
						</div>
					))}
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
