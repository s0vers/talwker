"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/useGsap";
import { LuArrowDown } from "react-icons/lu";

export default function Hero() {
	const sectionRef = useRef<HTMLElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const subtextRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

			tl.from(imageRef.current, {
				scale: 1.3,
				duration: 2,
				ease: "power2.out",
			})
				.from(
					headingRef.current!.children,
					{ y: 120, opacity: 0, duration: 1.2, stagger: 0.15 },
					"-=1.4",
				)
				.from(
					subtextRef.current!.children,
					{ y: 40, opacity: 0, duration: 0.8, stagger: 0.1 },
					"-=0.6",
				)
				.from(
					scrollRef.current,
					{ y: 20, opacity: 0, duration: 0.6 },
					"-=0.3",
				);

			gsap.to(imageRef.current, {
				yPercent: 20,
				ease: "none",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});

			gsap.to(headingRef.current, {
				yPercent: -30,
				opacity: 0,
				ease: "none",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top top",
					end: "60% top",
					scrub: true,
				},
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			className="relative flex h-screen items-end overflow-hidden"
		>
			<div
				ref={imageRef}
				className="absolute inset-0 -top-[10%] -bottom-[10%]"
			>
				<Image
					src="/image.jpg"
					alt="Travel destination"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
			</div>

			<div className="relative z-10 mx-auto w-full max-w-[1400px] section-padding pb-20 md:pb-28">
				<div ref={headingRef} className="overflow-hidden">
					<div className="label-sm mb-6 text-orange-400">
						Wander. Discover. Share.
					</div>
					<div>
						<h1 className="heading-xl text-white">
							Travel is the only
						</h1>
					</div>
					<div>
						<h1 className="heading-xl text-white">
							thing you buy that
						</h1>
					</div>
					<div>
						<h1 className="heading-xl text-white">
							makes you{" "}
							<span className="italic text-orange-400">richer</span>
						</h1>
					</div>
				</div>

				<div ref={subtextRef} className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="max-w-md text-base leading-relaxed text-white/60">
							Curated journeys to the world&apos;s most extraordinary
							places. Let us craft your next unforgettable adventure.
						</p>
					</div>
					<div>
						<a
							href="#destinations"
							className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/20"
						>
							Explore Destinations
							<span className="inline-block transition-transform group-hover:translate-x-1">
								→
							</span>
						</a>
					</div>
				</div>

				<div
					ref={scrollRef}
					className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-10"
				>
					<div className="flex animate-bounce flex-col items-center gap-2">
						<span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
							Scroll
						</span>
						<LuArrowDown className="h-4 w-4 text-white/40" />
					</div>
				</div>
			</div>
		</section>
	);
}
