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
			className="relative overflow-hidden bg-[#070707] py-28 md:py-36"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div
					ref={cardRef}
					className="relative overflow-hidden rounded-4xl border border-white/10"
				>
					<div className="absolute inset-0">
						<Image
							src="/image.jpg"
							alt="Subscribe background"
							fill
							sizes="(max-width: 768px) 100vw, 80vw"
							className="object-cover"
						/>
					</div>
					<div className="absolute inset-0 bg-linear-to-br from-black/85 via-black/55 to-orange-500/45" />
					<div className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />

					<div
						ref={contentRef}
						className="relative px-8 py-16 text-center md:px-16 md:py-24"
					>
						<p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							{t("label")}
						</p>
						<h2
							id="newsletter-title"
							className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-tighter text-white"
						>
							{t("title")}
						</h2>
						<p className="mx-auto mb-10 mt-6 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
							{t("description")}
						</p>

						<div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
							<label htmlFor="newsletter-email" className="sr-only">
								Email address
							</label>
							<input
								id="newsletter-email"
								type="email"
								placeholder={t("placeholder")}
								autoComplete="email"
								className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm text-white placeholder:text-white/55 backdrop-blur-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/60"
							/>
							<button
								type="button"
								className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-orange-400"
							>
								<LuSend className="h-4 w-4" />
								{t("subscribe")}
							</button>
						</div>

						<p className="mt-4 text-xs text-white/60">
							{t("disclaimer")}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

