"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { LuArrowRight } from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { EXPERIENCES_CATALOG } from "../content/experiences-page-copy";
import { cn } from "@/lib/utils";

export function ExperiencesHero() {
	const t = useTranslations("Experiences.hero");
	const containerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const cardsStackRef = useRef<HTMLDivElement>(null);

	useGsapContext(containerRef, () => {
		if (prefersReducedMotion()) return;
		const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

		if (contentRef.current) {
			tl.from(contentRef.current.children, {
				y: 28,
				opacity: 0,
				duration: 0.85,
				stagger: 0.08,
				clearProps: "all"
			});
		}

		if (cardsStackRef.current) {
			tl.from(
				cardsStackRef.current,
				{
					y: 32,
					opacity: 0,
					duration: 1.0,
					clearProps: "all"
				},
				"-=0.6"
			);
		}
	}, []);

	// Top 3 featured experience cards for the visual stack
	const featuredStack = EXPERIENCES_CATALOG.slice(0, 3);

	return (
		<section
			ref={containerRef}
			aria-labelledby="experiences-hero-title"
			className="relative flex min-h-[55vh] items-center overflow-hidden border-b border-white/6 bg-[#050505] text-white"
		>
			<div className="pad-x relative z-10 mx-auto w-full max-w-[1600px] pt-28 pb-16 md:pt-36 md:pb-20">
				<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
					{/* Left Column: Unique Editorial Title & Copy */}
					<div ref={contentRef} className="min-w-0 space-y-6 lg:col-span-7">
						<p className="text-[11px] font-semibold tracking-[0.2em] text-orange-400 uppercase">
							{t("catalogTag")}
						</p>

						<h1
							id="experiences-hero-title"
							className="text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[0.93] font-bold tracking-tight text-white"
						>
							{t("titleLine1")}{" "}
							<span className="block font-light text-orange-500 italic sm:inline">
								{t("titleAccent")}
							</span>
						</h1>

						<p className="max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
							{t("description")}
						</p>

						<div className="flex flex-wrap items-center gap-4 pt-4">
							<Link
								href="/tours"
								className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-xs font-semibold tracking-widest text-white uppercase transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/20"
							>
								{t("primaryAction")} <LuArrowRight className="h-4 w-4" />
							</Link>
							<Link
								href="/contact"
								className="inline-flex items-center rounded-full border border-white/15 px-8 py-3.5 text-xs font-semibold tracking-widest text-white/70 uppercase transition-all hover:border-white/40 hover:text-white"
							>
								{t("secondaryAction")}
							</Link>
						</div>
					</div>

					{/* Right Column: Hardware-Accelerated Visual Cards Stack */}
					<div className="relative min-w-0 py-6 lg:col-span-5 lg:py-0">
						<div
							ref={cardsStackRef}
							className="relative mx-auto aspect-4/3 min-h-[300px] w-full max-w-md transform-gpu"
						>
							{featuredStack.map((item, index) => {
								const rotationClass =
									index === 0
										? "rotate-3 translate-x-2 -translate-y-2 z-30"
										: index === 1
											? "-rotate-2 -translate-x-3 translate-y-3 z-20"
											: "rotate-6 translate-x-4 translate-y-6 z-10 opacity-70";

								return (
									<div
										key={item.id}
										className={cn(
											"absolute inset-0 transform-gpu overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a] shadow-2xl",
											rotationClass
										)}
									>
										<Image
											src={item.image}
											alt={item.imageAlt}
											fill
											sizes="(max-width: 1024px) 100vw, 400px"
											className="object-cover"
										/>
										<div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-90" />

										<div className="absolute right-4 bottom-4 left-4">
											<span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
												{item.categoryLabel}
											</span>
											<h3 className="mt-1 truncate text-base font-bold text-white">
												{item.title}
											</h3>
											<p className="text-xs text-white/60">
												{item.duration} · {item.price}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
