"use client";

import Image from "next/image";
import { useRef } from "react";
import { LuQuote } from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { ButtonWithIcon } from "@/shared/ui";

export function AtelierMonograph() {
	const sectionRef = useRef<HTMLElement>(null);
	const imgRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;

			if (imgRef.current) {
				gsap.fromTo(
					imgRef.current,
					{ clipPath: "inset(0 100% 0 0)" },
					{
						clipPath: "inset(0 0% 0 0)",
						duration: 1.4,
						ease: "power4.inOut",
						scrollTrigger: { trigger: imgRef.current, start: "top 75%", once: true },
					},
				);
			}

			if (textRef.current?.children.length) {
				gsap.fromTo(
					textRef.current.children,
					{ y: 30, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.9,
						stagger: 0.12,
						ease: "power3.out",
						scrollTrigger: { trigger: textRef.current, start: "top 75%", once: true },
					},
				);
			}
		},
		[],
	);

	return (
		<section
			ref={sectionRef}
			id="visual-monograph"
			aria-labelledby="monograph-title"
			className="relative bg-[#050505] py-20 md:py-36 border-t border-white/10 overflow-hidden"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
					{/* Left Large Full-Bleed Photograph */}
					<div ref={imgRef} className="lg:col-span-6">
						<div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] shadow-2xl">
							<Image
								src="/unsplash-culture-ritual.jpg"
								alt="Evening field monograph in the southern hemisphere"
								fill
								sizes="(max-width: 1024px) 100vw, 700px"
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
							<div className="absolute bottom-6 left-6 font-mono text-xs text-white/60">
								PATAGONIA SOUTHERN ICE CAP // FIELD ESSAY
							</div>
						</div>
					</div>

					{/* Right Editorial Story Spread */}
					<div ref={textRef} className="lg:col-span-6 space-y-6">
						<span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							FIELD ESSAY // VOL. 042
						</span>

						<h2
							id="monograph-title"
							className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]"
						>
							On Silence and the Art of Slow Traverse
						</h2>

						<p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
							ESSAY BY DR. ELENA ROSTOVA · PATAGONIA
						</p>

						{/* Pull Quote */}
						<div className="relative rounded-2xl border-l-2 border-orange-500 bg-white/[0.02] p-6">
							<LuQuote className="absolute top-4 right-4 h-6 w-6 text-orange-500/20" />
							<p className="text-base sm:text-xl font-light italic leading-relaxed text-white/95">
								“We do not traverse remote horizons to escape the world, but to allow the stillness of the terrain to fill our consciousness with permanent things.”
							</p>
						</div>

						<div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/70">
							<p>
								At 2,800 meters above sea level, sound propagates with architectural clarity. The wind ceases to be an abstraction; it becomes a tactile physical presence against tent canvas, and the glacial blue beneath the moraine appears to absorb every trace of modern haste.
							</p>
							<p>
								In our curated expeditions, velocity is discarded by design. We allocate entire days to observing the shift of low-angle light across a single ridge, translating raw sensory immersion into enduring memory.
							</p>
						</div>

						{/* Author Line & CTA */}
						<div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<div className="relative h-11 w-11 overflow-hidden rounded-full border border-orange-500/40">
									<Image
										src="/author.jpg"
										alt="Dr. Elena Rostova"
										fill
										sizes="44px"
										className="object-cover"
									/>
								</div>
								<div>
									<p className="text-sm font-semibold text-white">Dr. Elena Rostova</p>
									<p className="text-xs text-white/40">Lead Expedition Author & Naturalist</p>
								</div>
							</div>

							<ButtonWithIcon
								href="/stories/wind-at-the-edge-of-patagonia"
								variant="orange"
								size="default"
								className="text-xs uppercase tracking-widest font-semibold"
							>
								Read Full Story
							</ButtonWithIcon>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
