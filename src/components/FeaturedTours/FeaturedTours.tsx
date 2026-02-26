"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/useGsap";
import { LuClock, LuStar, LuArrowRight } from "react-icons/lu";

const TOURS = [
	{
		title: "Bali Cultural Immersion",
		location: "Bali, Indonesia",
		duration: "7 Days",
		price: "$1,299",
		oldPrice: "$1,599",
		rating: 4.9,
		tags: ["Temples", "Rice Terraces", "Cooking"],
	},
	{
		title: "Greek Island Odyssey",
		location: "Santorini & Mykonos",
		duration: "10 Days",
		price: "$2,199",
		oldPrice: "$2,799",
		rating: 4.8,
		tags: ["Sunset Cruise", "Wine Tasting"],
	},
	{
		title: "Patagonia Expedition",
		location: "Torres del Paine",
		duration: "12 Days",
		price: "$3,499",
		rating: 5.0,
		tags: ["Glacier Trek", "Wildlife", "Camping"],
	},
];

export default function FeaturedTours() {
	const sectionRef = useRef<HTMLElement>(null);
	const headRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.from(headRef.current!.children, {
				y: 60,
				opacity: 0,
				duration: 0.9,
				stagger: 0.1,
				ease: "power3.out",
				scrollTrigger: { trigger: headRef.current, start: "top 85%" },
			});

			gsap.from(cardsRef.current!.children, {
				y: 80,
				opacity: 0,
				duration: 0.9,
				stagger: 0.2,
				ease: "power3.out",
				scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id="tours"
			ref={sectionRef}
			className="section-spacing section-padding bg-neutral-900"
		>
			<div className="mx-auto max-w-[1400px]">
				<div ref={headRef}>
					<div className="label-sm mb-4 text-orange-400">Curated Tours</div>
					<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
						<h2 className="heading-lg max-w-2xl text-white">
							Journeys designed for
							<br />
							the <span className="italic text-orange-400">extraordinary</span>
						</h2>
						<a
							href="#"
							className="group flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-orange-400"
						>
							View all tours
							<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						</a>
					</div>
				</div>

				<div
					ref={cardsRef}
					className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
				>
					{TOURS.map((tour) => (
						<div
							key={tour.title}
							className="group cursor-pointer overflow-hidden rounded-2xl bg-neutral-800/60 backdrop-blur-sm transition-all duration-500 hover:bg-neutral-800"
						>
							<div className="relative h-56 overflow-hidden">
								<Image
									src="/image.jpg"
									alt={tour.title}
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
								{tour.oldPrice && (
									<span className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold text-white">
										Save ${(parseInt(tour.oldPrice.replace(/\D/g, "")) - parseInt(tour.price.replace(/\D/g, ""))).toLocaleString()}
									</span>
								)}
							</div>

							<div className="p-6">
								<p className="text-xs font-medium text-neutral-500">
									{tour.location}
								</p>
								<h3 className="mt-2 text-xl font-bold text-white">
									{tour.title}
								</h3>

								<div className="mt-4 flex flex-wrap gap-2">
									{tour.tags.map((tag) => (
										<span
											key={tag}
											className="rounded-full bg-neutral-700/50 px-3 py-1 text-[11px] font-medium text-neutral-400"
										>
											{tag}
										</span>
									))}
								</div>

								<div className="mt-6 flex items-center justify-between border-t border-neutral-700/50 pt-5">
									<div className="flex items-center gap-4 text-sm text-neutral-500">
										<span className="flex items-center gap-1">
											<LuClock className="h-3.5 w-3.5" />
											{tour.duration}
										</span>
										<span className="flex items-center gap-1">
											<LuStar className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
											{tour.rating}
										</span>
									</div>
									<div className="text-right">
										{tour.oldPrice && (
											<p className="text-xs text-neutral-600 line-through">
												{tour.oldPrice}
											</p>
										)}
										<p className="text-xl font-bold text-orange-400">
											{tour.price}
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
