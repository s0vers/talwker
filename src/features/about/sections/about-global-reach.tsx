"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import {
	ABOUT_GLOBAL_REACH_COPY,
	ABOUT_MAP_MARKERS,
} from "@/features/about/content/about-copy";
import { DottedMap } from "@/components/ui/dotted-map";

export default function AboutGlobalReach() {
	const section = useRef<HTMLElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		section,
		() => {
			if (prefersReducedMotion()) return;

			if (textRef.current?.children.length) {
				gsap.from(textRef.current.children, {
					y: 50,
					opacity: 0,
					duration: 0.9,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: { trigger: textRef.current, start: "top 82%" },
				});
			}

			if (mapRef.current) {
				gsap.from(mapRef.current, {
					opacity: 0,
					scale: 0.97,
					duration: 1.1,
					ease: "power3.out",
					scrollTrigger: { trigger: mapRef.current, start: "top 78%" },
				});
			}
		},
		[],
	);

	return (
		<section ref={section} className="bg-[#0a0a0a] py-32 md:py-44">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
					<div ref={textRef}>
						<span className="mb-5 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							{ABOUT_GLOBAL_REACH_COPY.label}
						</span>
						<h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-tighter text-white">
							{ABOUT_GLOBAL_REACH_COPY.titleLead}{" "}
							<span className="font-light italic text-orange-500">
								{ABOUT_GLOBAL_REACH_COPY.titleAccent}
							</span>
						</h2>
						<p className="mt-6 max-w-lg text-sm leading-relaxed text-white/40 md:text-base">
							{ABOUT_GLOBAL_REACH_COPY.description}
						</p>
						<ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium uppercase tracking-widest text-white/25">
							{ABOUT_MAP_MARKERS.map((m) => (
								<li key={m.label}>{m.label}</li>
							))}
						</ul>
					</div>

					<div
						ref={mapRef}
						className="relative w-full overflow-hidden rounded-3xl border border-white/6 bg-[#080808] p-3 md:p-5"
					>
						<div className="aspect-2/1 w-full min-h-[200px]">
							<DottedMap
								width={900}
								height={450}
								mapSamples={5500}
								markers={ABOUT_MAP_MARKERS.map((m) => ({
									lat: m.lat,
									lng: m.lng,
									pulse: true,
								}))}
								dotColor="rgba(249, 115, 22, 0.45)"
								markerColor="#ffffff"
								pulse
								className="block h-full w-full max-h-none"
								aria-label="World map with partner city markers"
								role="img"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
