"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { LuArrowRight, LuFeather, LuQuote } from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { Link } from "@/i18n/navigation";

export function AtelierDispatch() {
	const t = useTranslations("Home2.dispatch");
	const sectionRef = useRef<HTMLElement>(null);
	const imgRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;

			if (imgRef.current && contentRef.current) {
				gsap.fromTo(
					[imgRef.current, contentRef.current],
					{ y: 40, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.9,
						stagger: 0.15,
						ease: "power3.out",
						clearProps: "opacity,transform",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top 75%",
							toggleActions: "play none none none",
							once: true,
						},
					},
				);
			}
		},
		[],
	);

	return (
		<section
			ref={sectionRef}
			id="dispatch"
			aria-labelledby="dispatch-title"
			className="relative bg-[#050505] py-20 md:py-36 overflow-hidden border-t border-white/[0.06]"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
					{/* Left Archival Photography Spread */}
					<div ref={imgRef} className="lg:col-span-6">
						<div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/12 bg-[#0c0c0c] p-3 shadow-2xl group">
							<div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
								<Image
									src="/unsplash-culture-ritual.jpg"
									alt="Contemplative evening field expedition"
									fill
									sizes="(max-width: 1024px) 100vw, 650px"
									className="object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

								{/* Metadata Watermark Tag */}
								<div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-md">
									<span>PATAGONIA ICE FIELD // 2026</span>
								</div>

								<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-white/60">
									<span>PLATE ARCHIVE #042</span>
									<span>LEICA M11 // 35MM</span>
								</div>
							</div>
						</div>
					</div>

					{/* Right Editorial Essay Content */}
					<div ref={contentRef} className="lg:col-span-6 space-y-6">
						<div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
							<LuFeather className="h-3.5 w-3.5" />
							<span>{t("label")}</span>
						</div>

						<div className="space-y-2">
							<h2
								id="dispatch-title"
								className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]"
							>
								{t("title")}
							</h2>
							<p className="font-mono text-xs uppercase tracking-[0.2em] text-white/45">
								{t("subtitle")}
							</p>
						</div>

						{/* Pull Quote */}
						<div className="relative rounded-2xl border-l-2 border-orange-500 bg-white/[0.02] p-5 sm:p-6 my-4">
							<LuQuote className="absolute top-4 right-4 h-6 w-6 text-orange-500/20" />
							<p className="text-base sm:text-lg font-light italic leading-relaxed text-white/90">
								{t("pullQuote")}
							</p>
						</div>

						<div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/70">
							<p>{t("bodyP1")}</p>
							<p>{t("bodyP2")}</p>
						</div>

						{/* Author Signature Line */}
						<div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<div className="relative h-10 w-10 overflow-hidden rounded-full border border-orange-500/40">
									<Image
										src="/author.jpg"
										alt="Elena Rostova"
										fill
										sizes="40px"
										className="object-cover"
									/>
								</div>
								<div>
									<p className="text-sm font-semibold text-white">{t("authorName")}</p>
									<p className="text-xs text-white/45">{t("authorRole")}</p>
								</div>
							</div>

							<Link
								href="/stories"
								className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-400 transition-colors hover:text-orange-300 group/link"
							>
								<span>{t("readStories")}</span>
								<LuArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
