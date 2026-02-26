"use client";

import { useEffect, useRef } from "react";
import { LuStar, LuQuote } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/useGsap";

type Testimonial = {
	id: number;
	name: string;
	avatar: string;
	location: string;
	rating: number;
	text: string;
	trip: string;
};

const TESTIMONIALS: Testimonial[] = [
	{
		id: 1,
		name: "Sarah Mitchell",
		avatar: "/writer.avif",
		location: "New York, USA",
		rating: 5,
		text: "Talkwer made our honeymoon absolutely magical. The attention to detail, the hidden gems they included in our itinerary, and the seamless transfers — everything was perfect.",
		trip: "Bali Cultural Immersion",
	},
	{
		id: 2,
		name: "James Chen",
		avatar: "/author.jpg",
		location: "Toronto, Canada",
		rating: 5,
		text: "As a solo traveler, I was nervous about group tours. But the small group size and incredible guide made it the best trip of my life. Already planning my next adventure!",
		trip: "Japan Heritage Trail",
	},
	{
		id: 3,
		name: "Elena Rodriguez",
		avatar: "/writer.avif",
		location: "Madrid, Spain",
		rating: 5,
		text: "The Patagonia expedition exceeded every expectation. Waking up to glaciers, trekking through pristine landscapes — it was a once-in-a-lifetime experience.",
		trip: "Patagonia Expedition",
	},
];

export default function Testimonials() {
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
				gsap.from(headingNodes, {
					y: 56,
					opacity: 0,
					duration: 0.9,
					stagger: 0.12,
					ease: "power3.out",
					scrollTrigger: {
						trigger: headingRef.current,
						start: "top 82%",
						toggleActions: "play none none none",
					},
				});
			}

			const cards = gsap.utils.toArray<HTMLElement>("[data-testimonial-card]");
			cards.forEach((card) => {
				const quote = card.querySelector("[data-quote]");
				const stars = card.querySelector("[data-stars]");
				const text = card.querySelector("[data-text]");
				const footer = card.querySelector("[data-footer]");

				gsap.timeline({
					scrollTrigger: {
						trigger: card,
						start: "top 84%",
						toggleActions: "play none none none",
					},
				})
					.from(card, { y: 70, opacity: 0, duration: 0.8, ease: "power3.out" })
					.from(quote, { y: 24, opacity: 0, duration: 0.45 }, "-=0.45")
					.from(stars, { y: 20, opacity: 0, duration: 0.4 }, "-=0.33")
					.from(text, { y: 26, opacity: 0, duration: 0.5 }, "-=0.2")
					.from(footer, { y: 18, opacity: 0, duration: 0.4 }, "-=0.28");
			});

			const mm = gsap.matchMedia();
			mm.add("(min-width: 768px)", () => {
				const emphasize = (activeCard: HTMLElement) => {
					cards.forEach((card) => {
						gsap.to(card, {
							opacity: card === activeCard ? 1 : 0.52,
							scale: card === activeCard ? 1.01 : 0.97,
							y: card === activeCard ? -6 : 0,
							duration: 0.35,
							ease: "power2.out",
							overwrite: "auto",
						});
					});
				};

				if (cards.length > 0) emphasize(cards[0]);

				cards.forEach((card) => {
					ScrollTrigger.create({
						trigger: card,
						start: "top 62%",
						end: "bottom 38%",
						onEnter: () => emphasize(card),
						onEnterBack: () => emphasize(card),
					});
				});
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} id="testimonials" className="bg-[#0b0b0b] py-28 md:py-36">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div ref={headingRef} className="mb-16 text-center md:mb-20">
					<p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
						Traveler Stories
					</p>
					<h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-white">
						What Our Travelers Say
						<span className="font-light italic text-orange-500">.</span>
					</h2>
					<p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/35 md:text-base">
						Real stories from real adventurers who trusted Talkwer to craft
						their perfect getaway.
					</p>
				</div>

				<div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{TESTIMONIALS.map((t) => (
						<div
							key={t.id}
							data-testimonial-card
							className="relative rounded-3xl border border-white/10 bg-[#101010] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
						>
							<LuQuote
								data-quote
								className="mb-4 h-8 w-8 text-orange-500/60"
							/>

							<div data-stars className="mb-4 flex gap-1">
								{Array.from({ length: t.rating }).map((_, i) => (
									<LuStar
										key={i}
										className="h-4 w-4 fill-orange-500 text-orange-500"
									/>
								))}
							</div>

							<p data-text className="mb-7 text-sm leading-relaxed text-white/65">
								&ldquo;{t.text}&rdquo;
							</p>

							<div
								data-footer
								className="flex items-center gap-3 border-t border-white/10 pt-5"
							>
								<Avatar className="h-11 w-11">
									<AvatarImage src={t.avatar} alt={t.name} />
									<AvatarFallback className="bg-white/10 text-white">
										{t.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-semibold text-white">
										{t.name}
									</p>
									<p className="text-xs text-white/45">{t.location}</p>
								</div>
							</div>

							<p className="mt-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/60">
								{t.trip}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
