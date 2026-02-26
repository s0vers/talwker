"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { LuStar, LuClock, LuUsers, LuMapPin } from "react-icons/lu";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/useGsap";

type Tour = {
	id: number;
	title: string;
	destination: string;
	image: string;
	price: number;
	originalPrice?: number;
	duration: string;
	groupSize: string;
	rating: number;
	reviews?: number;
	highlights: string[];
};

const TOURS: Tour[] = [
	{
		id: 1,
		title: "Bali Cultural Immersion",
		destination: "Bali, Indonesia",
		image: "/image.jpg",
		price: 1299,
		originalPrice: 1599,
		duration: "7 Days / 6 Nights",
		groupSize: "Max 12",
		rating: 4.9,
		reviews: 234,
		highlights: ["Temple Tours", "Rice Terraces", "Cooking Class"],
	},
	{
		id: 2,
		title: "Greek Island Odyssey",
		destination: "Santorini & Mykonos",
		image: "/image.jpg",
		price: 2199,
		originalPrice: 2799,
		duration: "10 Days / 9 Nights",
		groupSize: "Max 16",
		rating: 4.8,
		reviews: 189,
		highlights: ["Sunset Cruise", "Wine Tasting", "Beach Hopping"],
	},
	{
		id: 3,
		title: "Patagonia Expedition",
		destination: "Torres del Paine, Chile",
		image: "/image.jpg",
		price: 3499,
		duration: "12 Days / 11 Nights",
		groupSize: "Max 8",
		rating: 5.0,
		reviews: 97,
		highlights: ["Glacier Trek", "Wildlife Safari", "Camping"],
	},
	{
		id: 4,
		title: "Japan Heritage Trail",
		destination: "Tokyo to Kyoto",
		image: "/image.jpg",
		price: 2899,
		originalPrice: 3299,
		duration: "9 Days / 8 Nights",
		groupSize: "Max 14",
		rating: 4.9,
		reviews: 312,
		highlights: ["Tea Ceremony", "Mt. Fuji", "Bamboo Forest"],
	},
];

export default function FeaturedTours() {
	const sectionRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		if (prefersReducedMotion()) return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			const headerNodes = headerRef.current?.children;
			if (headerNodes?.length) {
				gsap.from(headerNodes, {
					y: 56,
					opacity: 0,
					stagger: 0.14,
					duration: 0.95,
					ease: "power3.out",
					scrollTrigger: {
						trigger: headerRef.current,
						start: "top 82%",
						toggleActions: "play none none none",
					},
				});
			}

			const cards = gsap.utils.toArray<HTMLElement>("[data-tour-card]");
			ScrollTrigger.create({
				trigger: gridRef.current,
				start: "top 80%",
				once: true,
				onEnter: () => {
					gsap.from(cards, {
						y: 110,
						opacity: 0,
						rotateX: 8,
						transformOrigin: "top center",
						duration: 1.1,
						ease: "power4.out",
						stagger: 0.12,
					});
				},
			});

			const mm = gsap.matchMedia();
			mm.add("(min-width: 1024px)", () => {
				if (!sectionRef.current || !headerRef.current) return;

				ScrollTrigger.create({
					trigger: sectionRef.current,
					start: "top top+=84",
					end: "+=220",
					pin: headerRef.current,
					pinSpacing: false,
					scrub: true,
				});
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} id="tours" className="bg-[#0b0b0b] py-28 md:py-36">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div
					ref={headerRef}
					className="mb-16 flex flex-col items-start justify-between gap-8 md:mb-20 md:flex-row md:items-end"
				>
					<div>
						<p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							Curated For You
						</p>
						<h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-white">
							Featured Tours
							<span className="font-light italic text-orange-500">.</span>
						</h2>
						<p className="mt-6 max-w-xl text-sm leading-relaxed text-white/35 md:text-base">
							Our most popular tour packages, designed for extraordinary
							experiences at unbeatable value.
						</p>
					</div>
					<a
						href="#"
						className="group shrink-0 rounded-full border border-white/20 px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-all duration-500 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
					>
						View All Tours
					</a>
				</div>

				<div ref={gridRef} className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
					{TOURS.map((tour) => (
						<div
							key={tour.id}
							data-tour-card
							className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-[#101010] transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
						>
							<div className="relative h-64 overflow-hidden">
								<Image
									src={tour.image}
									alt={tour.title}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
									className="object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
								{tour.originalPrice && (
									<span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">
										Save $
										{(tour.originalPrice - tour.price).toLocaleString()}
									</span>
								)}
								<div className="absolute bottom-5 left-4 right-4 flex items-center justify-between gap-3">
									<div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 backdrop-blur-md">
										<LuMapPin className="h-3.5 w-3.5 text-orange-500" />
										<span className="text-xs font-medium text-white/85">
											{tour.destination}
										</span>
									</div>
									<div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 backdrop-blur-md">
										<LuStar className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
										<span className="text-xs font-semibold text-white">
											{tour.rating}
										</span>
										<span className="text-xs text-white/50">
											({tour.reviews})
										</span>
									</div>
								</div>
							</div>

							<div className="p-6">
								<h3 className="mb-3 text-2xl font-semibold leading-tight tracking-tight text-white">
									{tour.title}
								</h3>

								<div className="mb-5 flex flex-wrap gap-2">
									{tour.highlights.map((hl) => (
										<span
											key={hl}
											className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/55"
										>
											{hl}
										</span>
									))}
								</div>

								<div className="mb-5 grid grid-cols-2 gap-4 text-xs text-white/55">
									<span className="flex items-center gap-1.5">
										<LuClock className="h-3.5 w-3.5 text-orange-500" />
										{tour.duration}
									</span>
									<span className="flex items-center gap-1.5">
										<LuUsers className="h-3.5 w-3.5 text-orange-500" />
										{tour.groupSize}
									</span>
								</div>

								<div className="flex items-end justify-between border-t border-white/10 pt-5">
									<div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
										Starting at
									</div>
									<div className="text-right">
										{tour.originalPrice && (
											<p className="text-xs text-white/30 line-through">
												${tour.originalPrice.toLocaleString()}
											</p>
										)}
										<p className="text-2xl font-semibold tracking-tight text-orange-500">
											${tour.price.toLocaleString()}
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
