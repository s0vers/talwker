"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/useGsap";
import { LuStar } from "react-icons/lu";

const TESTIMONIALS = [
	{
		name: "Sarah Mitchell",
		location: "New York",
		text: "Talkwer made our honeymoon absolutely magical. The attention to detail, the hidden gems — everything was flawless.",
		trip: "Bali Immersion",
	},
	{
		name: "James Chen",
		location: "Toronto",
		text: "The small group size and incredible guide made it the best trip of my life. Already planning the next one.",
		trip: "Japan Heritage",
	},
	{
		name: "Elena Rodriguez",
		location: "Madrid",
		text: "Waking up to glaciers, trekking through pristine landscapes — once in a lifetime. Thank you, Talkwer.",
		trip: "Patagonia",
	},
];

export default function Testimonials() {
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
				y: 60,
				opacity: 0,
				duration: 0.8,
				stagger: 0.15,
				ease: "power3.out",
				scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
			});
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section id="stories" ref={section} className="bg-[#0e0e0e] py-32 md:py-44">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div ref={headRef} className="mb-16 text-center">
					<span className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
						Traveler Stories
					</span>
					<h2 className="mx-auto max-w-2xl text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-white">
						What our wanderers <span className="font-light italic text-orange-500">say</span>
					</h2>
				</div>

				<div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{TESTIMONIALS.map((t) => (
						<div
							key={t.name}
							className="group rounded-2xl border border-white/[0.06] bg-[#111] p-8 transition-all duration-500 hover:border-orange-500/20"
						>
							<div className="mb-5 flex gap-1">
								{Array.from({ length: 5 }).map((_, i) => (
									<LuStar key={i} className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
								))}
							</div>
							<p className="text-[15px] leading-relaxed text-white/50">
								&ldquo;{t.text}&rdquo;
							</p>
							<div className="mt-8 border-t border-white/[0.06] pt-6">
								<p className="text-sm font-semibold text-white">{t.name}</p>
								<p className="text-[12px] text-white/25">{t.location}</p>
								<span className="mt-3 inline-block rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-semibold text-orange-500">
									{t.trip}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
