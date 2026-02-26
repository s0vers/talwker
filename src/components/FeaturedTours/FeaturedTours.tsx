"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/useGsap";
import { LuClock, LuStar } from "react-icons/lu";

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
		tags: ["Glacier Trek", "Wildlife"],
	},
];

export default function FeaturedTours() {
	const section = useRef<HTMLElement>(null);
	const headRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.from(headRef.current!.children, {
				y: 50,
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
				stagger: 0.18,
				ease: "power3.out",
				scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
			});
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section id="tours" ref={section} className="bg-[#0a0a0a] py-32 md:py-44">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div ref={headRef} className="mb-16">
					<span className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
						Curated Tours
					</span>
					<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
						<h2 className="max-w-2xl text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-white">
							Journeys for the{" "}
							<span className="font-light italic text-orange-500">extraordinary</span>
						</h2>
						<a href="#" className="text-[13px] font-medium uppercase tracking-[0.15em] text-white/30 transition-colors hover:text-orange-500">
							View all →
						</a>
					</div>
				</div>

				<div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{TOURS.map((tour) => (
						<div
							key={tour.title}
							className="group cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111] transition-all duration-500 hover:border-orange-500/30"
						>
							<div className="relative h-52 overflow-hidden">
								<Image
									src="/image.jpg"
									alt={tour.title}
									fill
									className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
								{tour.oldPrice && (
									<span className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
										Save ${parseInt(tour.oldPrice.replace(/\D/g, "")) - parseInt(tour.price.replace(/\D/g, ""))}
									</span>
								)}
							</div>

							<div className="p-6">
								<p className="text-[11px] font-medium uppercase tracking-wider text-white/25">
									{tour.location}
								</p>
								<h3 className="mt-2 text-lg font-bold text-white">
									{tour.title}
								</h3>

								<div className="mt-4 flex flex-wrap gap-2">
									{tour.tags.map((t) => (
										<span key={t} className="rounded-full bg-white/[0.04] px-3 py-1 text-[10px] font-medium text-white/30">
											{t}
										</span>
									))}
								</div>

								<div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
									<div className="flex items-center gap-4 text-[12px] text-white/25">
										<span className="flex items-center gap-1"><LuClock className="h-3.5 w-3.5" />{tour.duration}</span>
										<span className="flex items-center gap-1"><LuStar className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />{tour.rating}</span>
									</div>
									<div className="text-right">
										{tour.oldPrice && <p className="text-[11px] text-white/15 line-through">{tour.oldPrice}</p>}
										<p className="text-xl font-bold text-orange-500">{tour.price}</p>
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
