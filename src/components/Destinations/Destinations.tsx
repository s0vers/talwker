"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/useGsap";
import { LuArrowUpRight } from "react-icons/lu";

const DESTINATIONS = [
	{ name: "Bali", country: "Indonesia", price: "$1,299", tag: "Popular" },
	{ name: "Santorini", country: "Greece", price: "$1,899", tag: "Trending" },
	{ name: "Kyoto", country: "Japan", price: "$1,599", tag: "Cultural" },
	{ name: "Patagonia", country: "Chile", price: "$2,499", tag: "Adventure" },
];

export default function Destinations() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.from(headingRef.current!.children, {
				y: 80,
				opacity: 0,
				duration: 1,
				stagger: 0.1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: headingRef.current,
					start: "top 85%",
				},
			});

			const cards = cardsRef.current!.children;
			gsap.from(cards, {
				y: 100,
				opacity: 0,
				duration: 0.9,
				stagger: 0.15,
				ease: "power3.out",
				scrollTrigger: {
					trigger: cardsRef.current,
					start: "top 80%",
				},
			});

			Array.from(cards).forEach((card) => {
				const img = card.querySelector("img");
				if (img) {
					gsap.to(img, {
						yPercent: -8,
						ease: "none",
						scrollTrigger: {
							trigger: card,
							start: "top bottom",
							end: "bottom top",
							scrub: true,
						},
					});
				}
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id="destinations"
			ref={sectionRef}
			className="section-spacing section-padding bg-neutral-50"
		>
			<div className="mx-auto max-w-[1400px]">
				<div ref={headingRef}>
					<div className="label-sm mb-4">Featured Destinations</div>
					<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
						<h2 className="heading-lg max-w-2xl text-neutral-900">
							Places that leave
							<br />
							you <span className="italic text-orange-500">speechless</span>
						</h2>
						<p className="body-lg max-w-sm">
							Handpicked locations for extraordinary experiences. Every
							journey tells a story.
						</p>
					</div>
				</div>

				<div
					ref={cardsRef}
					className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
				>
					{DESTINATIONS.map((dest, i) => (
						<div
							key={dest.name}
							className={`group relative cursor-pointer overflow-hidden rounded-2xl ${
								i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
							}`}
						>
							<div
								className={`relative overflow-hidden ${
									i === 0 ? "h-[500px] md:h-full" : "h-[360px]"
								}`}
							>
								<Image
									src="/image.jpg"
									alt={dest.name}
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
							</div>

							<div className="absolute inset-x-0 bottom-0 p-6">
								<span className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
									{dest.tag}
								</span>
								<div className="flex items-end justify-between">
									<div>
										<h3
											className={`font-bold text-white ${
												i === 0 ? "text-3xl md:text-4xl" : "text-2xl"
											}`}
										>
											{dest.name}
										</h3>
										<p className="mt-1 text-sm text-white/60">
											{dest.country}
										</p>
									</div>
									<div className="text-right">
										<p className="text-xs text-white/50">from</p>
										<p className="text-lg font-bold text-white">
											{dest.price}
										</p>
									</div>
								</div>
							</div>

							<div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/0 text-white/0 transition-all duration-300 group-hover:bg-white group-hover:text-neutral-900">
								<LuArrowUpRight className="h-5 w-5" />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
