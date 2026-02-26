"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { LuSend } from "react-icons/lu";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/useGsap";

export default function Newsletter() {
	const sectionRef = useRef<HTMLElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const bgRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const glowRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		if (prefersReducedMotion()) return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.from(cardRef.current, {
				y: 90,
				opacity: 0,
				scale: 0.97,
				duration: 1,
				ease: "power4.out",
				scrollTrigger: {
					trigger: cardRef.current,
					start: "top 82%",
					toggleActions: "play none none none",
				},
			});

			gsap.from(contentRef.current?.children ?? [], {
				y: 36,
				opacity: 0,
				stagger: 0.1,
				duration: 0.75,
				ease: "power3.out",
				scrollTrigger: {
					trigger: contentRef.current,
					start: "top 83%",
					toggleActions: "play none none none",
				},
			});

			gsap.fromTo(
				bgRef.current,
				{ scale: 1.12, yPercent: -8 },
				{
					scale: 1.02,
					yPercent: 8,
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top bottom",
						end: "bottom top",
						scrub: true,
					},
				},
			);

			gsap.to(glowRef.current, {
				xPercent: 18,
				yPercent: -12,
				duration: 3.2,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const liftButton = () => {
		gsap.to(buttonRef.current, { y: -2, scale: 1.02, duration: 0.22, ease: "power2.out" });
	};

	const resetButton = () => {
		gsap.to(buttonRef.current, { y: 0, scale: 1, duration: 0.22, ease: "power2.out" });
	};

	const focusInput = () => {
		gsap.to(inputRef.current, {
			boxShadow: "0 0 0 2px rgba(249,115,22,0.45)",
			duration: 0.2,
			ease: "power2.out",
		});
	};

	const blurInput = () => {
		gsap.to(inputRef.current, { boxShadow: "0 0 0 0 rgba(249,115,22,0)", duration: 0.2 });
	};

	return (
		<section
			ref={sectionRef}
			id="newsletter"
			className="relative overflow-hidden bg-[#070707] py-28 md:py-36"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div
					ref={cardRef}
					className="relative overflow-hidden rounded-[2rem] border border-white/10"
				>
					<div ref={bgRef} className="absolute inset-0">
						<Image
							src="/image.jpg"
							alt="Subscribe background"
							fill
							sizes="(max-width: 768px) 100vw, 80vw"
							className="object-cover"
						/>
					</div>
					<div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/55 to-orange-500/45" />
					<div
						ref={glowRef}
						className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl"
					/>

					<div
						ref={contentRef}
						className="relative px-8 py-16 text-center md:px-16 md:py-24"
					>
						<p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							Stay in the Loop
						</p>
						<h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-tighter text-white">
							Get Exclusive Travel Deals
						</h2>
						<p className="mx-auto mb-10 mt-6 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
							Subscribe to our newsletter and be the first to know about
							flash sales, new destinations, and insider travel tips.
						</p>

						<div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
							<input
								ref={inputRef}
								type="email"
								placeholder="Enter your email"
								onFocus={focusInput}
								onBlur={blurInput}
								className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm text-white placeholder:text-white/55 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-orange-500/60"
							/>
							<button
								ref={buttonRef}
								onMouseEnter={liftButton}
								onMouseLeave={resetButton}
								className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-500 hover:bg-orange-400"
							>
								<LuSend className="h-4 w-4" />
								Subscribe
							</button>
						</div>

						<p className="mt-4 text-xs text-white/60">
							No spam, ever. Unsubscribe anytime.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
