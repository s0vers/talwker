"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { LuSend } from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";

export default function Newsletter() {
	const t = useTranslations("Home.newsletter");
	const sectionRef = useRef<HTMLElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const card = cardRef.current;
			const content = contentRef.current;
			if (!card || !content) return;

			gsap.fromTo(
				card,
				{ scale: 0.97, opacity: 0 },
				{
					scale: 1,
					opacity: 1,
					duration: 0.9,
					ease: "power3.out",
					clearProps: "opacity,transform",
					scrollTrigger: { trigger: card, start: "top 88%", once: true },
				},
			);

			gsap.fromTo(
				content.children,
				{ y: 36, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.08,
					ease: "power3.out",
					clearProps: "opacity,transform",
					delay: 0.1,
					scrollTrigger: { trigger: content, start: "top 88%", once: true },
				},
			);
		},
		[],
	);

	return (
		<section
			id="newsletter"
			ref={sectionRef}
			aria-labelledby="newsletter-title"
			className="relative overflow-hidden bg-[#050505] py-28 md:py-36"
		>
			{/* Ambient atmospheric backlight glow */}
			<div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[150px]" />

			<div className="relative mx-auto max-w-[1600px] pad-x">
				<div
					ref={cardRef}
					className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#080808] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
				>
					<div className="absolute inset-0">
						<Image
							src="/image.jpg"
							alt="Subscribe background"
							fill
							sizes="(max-width: 768px) 100vw, 80vw"
							className="object-cover opacity-40"
						/>
					</div>
					<div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-orange-500/30" />
					<div className="pointer-events-none absolute -right-24 -top-20 h-96 w-96 rounded-full bg-orange-500/20 blur-[100px]" />

					<div
						ref={contentRef}
						className="relative px-8 py-16 text-center md:px-16 md:py-24"
					>
						<span className="mb-4 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
							{t("label")}
						</span>
						<h2
							id="newsletter-title"
							className="mt-2 text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-white"
						>
							{t("title")}
						</h2>
						<p className="mx-auto mb-10 mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
							{t("description")}
						</p>

						<div className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row">
							<label htmlFor="newsletter-email" className="sr-only">
								Email address
							</label>
							<input
								id="newsletter-email"
								type="email"
								placeholder={t("placeholder")}
								autoComplete="email"
								className="flex-1 rounded-full border border-white/20 bg-black/60 px-6 py-4 text-sm text-white placeholder:text-white/45 backdrop-blur-md transition-all duration-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/60"
							/>
							<button
								type="button"
								className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-orange-400 shadow-[0_10px_25px_rgba(249,115,22,0.35)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.5)]"
							>
								<LuSend className="h-4 w-4" />
								{t("subscribe")}
							</button>
						</div>

						<p className="mt-4 text-xs font-medium text-white/50">
							{t("disclaimer")}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

