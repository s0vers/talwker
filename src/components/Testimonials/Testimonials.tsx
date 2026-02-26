"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/useGsap";
import { Avatar, AvatarFallback, AvatarImage } from "./../../components/ui/avatar";
import { LuStar, LuQuote } from "react-icons/lu";

const TESTIMONIALS = [
	{
		name: "Sarah Mitchell",
		avatar: "/writer.avif",
		location: "New York, USA",
		text: "Talkwer made our honeymoon absolutely magical. The attention to detail, the hidden gems they included — everything was flawless.",
		trip: "Bali Cultural Immersion",
	},
	{
		name: "James Chen",
		avatar: "/author.jpg",
		location: "Toronto, Canada",
		text: "As a solo traveler, I was nervous about group tours. But the small group size and incredible guide made it the best trip of my life.",
		trip: "Japan Heritage Trail",
	},
	{
		name: "Elena Rodriguez",
		avatar: "/writer.avif",
		location: "Madrid, Spain",
		text: "The Patagonia expedition exceeded every expectation. Waking up to glaciers, trekking through pristine landscapes — once in a lifetime.",
		trip: "Patagonia Expedition",
	},
];

export default function Testimonials() {
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
				y: 60,
				opacity: 0,
				duration: 0.8,
				stagger: 0.15,
				ease: "power3.out",
				scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id="stories"
			ref={sectionRef}
			className="section-spacing section-padding bg-neutral-50"
		>
			<div className="mx-auto max-w-[1400px]">
				<div ref={headRef} className="text-center">
					<div className="label-sm mb-4">Traveler Stories</div>
					<h2 className="heading-lg mx-auto max-w-2xl text-neutral-900">
						What our wanderers{" "}
						<span className="italic text-orange-500">say</span>
					</h2>
				</div>

				<div
					ref={cardsRef}
					className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
				>
					{TESTIMONIALS.map((t) => (
						<div
							key={t.name}
							className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
						>
							<LuQuote className="mb-6 h-8 w-8 text-orange-200" />

							<div className="mb-5 flex gap-0.5">
								{Array.from({ length: 5 }).map((_, i) => (
									<LuStar
										key={i}
										className="h-4 w-4 fill-orange-400 text-orange-400"
									/>
								))}
							</div>

							<p className="text-[15px] leading-relaxed text-neutral-600">
								&ldquo;{t.text}&rdquo;
							</p>

							<div className="mt-8 flex items-center gap-4 border-t border-neutral-100 pt-6">
								<Avatar className="h-12 w-12">
									<AvatarImage src={t.avatar} alt={t.name} />
									<AvatarFallback>
										{t.name.split(" ").map((n) => n[0]).join("")}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-semibold text-neutral-900">
										{t.name}
									</p>
									<p className="text-xs text-neutral-400">{t.location}</p>
								</div>
							</div>
							<span className="mt-4 inline-block rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold text-orange-600">
								{t.trip}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
