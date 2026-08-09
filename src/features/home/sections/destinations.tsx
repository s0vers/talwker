"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { LuArrowRight } from "react-icons/lu";
import {
	gsap,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import { getFeaturedDestinations } from "@/features/home/content/featured-destinations";
import { DESTINATIONS_SECTION } from "@/features/home/content/section-copy";
import { DestinationsStage } from "@/features/home/sections/destinations-stage";
import { SectionCta, SectionHeading } from "@/shared/ui";

const AUTOPLAY_MS = 5000;
const featured = getFeaturedDestinations();

function subscribeReducedMotion(onStoreChange: () => void) {
	const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
	mq.addEventListener("change", onStoreChange);
	return () => mq.removeEventListener("change", onStoreChange);
}

export default function Destinations() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const stageWrapRef = useRef<HTMLDivElement>(null);

	const [activeIndex, setActiveIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const [progress, setProgress] = useState(0);
	const reduceMotion = useSyncExternalStore(
		subscribeReducedMotion,
		prefersReducedMotion,
		() => false,
	);

	useEffect(() => {
		if (reduceMotion || paused) {
			const reset = requestAnimationFrame(() => setProgress(0));
			return () => cancelAnimationFrame(reset);
		}
		let frame = 0;
		const started = performance.now();
		const tick = (now: number) => {
			const elapsed = now - started;
			const ratio = Math.min(1, elapsed / AUTOPLAY_MS);
			setProgress(ratio);
			if (ratio >= 1) {
				setActiveIndex((i) => (i + 1) % featured.length);
				return;
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [activeIndex, paused, reduceMotion]);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const heading = headingRef.current;
			const stage = stageWrapRef.current;
			if (heading) {
				gsap.from(heading, {
					y: 28,
					opacity: 0,
					duration: 0.9,
					ease: "power3.out",
					immediateRender: false,
					scrollTrigger: {
						trigger: heading,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				});
			}
			if (stage) {
				gsap.from(stage, {
					y: 40,
					opacity: 0,
					duration: 1,
					ease: "power3.out",
					immediateRender: false,
					scrollTrigger: {
						trigger: stage,
						start: "top 82%",
						toggleActions: "play none none none",
					},
				});
			}
		},
		[],
	);

	return (
		<section
			ref={sectionRef}
			id="destinations"
			aria-labelledby="destinations-title"
			className="bg-[#050505] py-28 md:py-36"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div
					ref={headingRef}
					className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between"
				>
					<SectionHeading
						containerClassName="max-w-xl"
						label={DESTINATIONS_SECTION.label}
						labelId="destinations-label"
						title={DESTINATIONS_SECTION.title}
						titleId="destinations-title"
						description={DESTINATIONS_SECTION.description}
						descriptionId="destinations-description"
						labelClassName="mb-3"
						descriptionClassName="mt-4 text-white/55"
					/>
					<div className="hidden shrink-0 flex-col items-end text-right text-[11px] uppercase tracking-[0.22em] text-white/35 md:flex">
						<span className="text-white/55">0{featured.length}</span>
						<span className="mt-1 h-px w-10 bg-white/15" />
						<span className="mt-2">{DESTINATIONS_SECTION.countSuffix}</span>
					</div>
				</div>

				<div ref={stageWrapRef}>
					<DestinationsStage
						destinations={featured}
						activeIndex={activeIndex}
						progress={progress}
						showProgress={!reduceMotion && !paused}
						onSelect={setActiveIndex}
						onPauseChange={setPaused}
					/>
				</div>

				<div className="mt-12 text-center">
					<SectionCta
						href="/destinations"
						icon={
							<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						}
					>
						{DESTINATIONS_SECTION.viewAllCta}
					</SectionCta>
				</div>
			</div>
		</section>
	);
}
