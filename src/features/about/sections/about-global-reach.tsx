"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import {
	ABOUT_MAP_DOT_VARIANCE,
	ABOUT_MAP_HUB_SPOKES,
	ABOUT_MAP_MARKERS,
} from "@/features/about/content/about-copy";
import { DottedMap } from "@/components/ui/dotted-map";

export default function AboutGlobalReach() {
	const t = useTranslations("About.reach");
	const section = useRef<HTMLElement>(null);
	const columnRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		section,
		() => {
			if (prefersReducedMotion()) return;

			const col = columnRef.current;
			if (col && col.children.length >= 4) {
				const label = col.children[0];
				const title = col.children[1];
				const desc = col.children[2];
				const list = col.children[3];

				const copyTl = gsap.timeline({
					scrollTrigger: {
						trigger: col,
						start: "top 82%",
						toggleActions: "play none none none",
					},
				});
				copyTl.from(label, {
					x: -36,
					opacity: 0,
					duration: 0.78,
					ease: "power2.out",
				});
				copyTl.from(
					title,
					{ y: 44, opacity: 0, duration: 0.98, ease: "power2.out" },
					"-=0.38",
				);
				copyTl.from(
					desc,
					{ y: 26, opacity: 0, duration: 0.88, ease: "power2.out" },
					"-=0.48",
				);
				if (list instanceof HTMLElement && list.children.length) {
					copyTl.from(
						list.children,
						{
							x: -14,
							opacity: 0,
							duration: 0.68,
							stagger: 0.085,
							ease: "power2.out",
						},
						"-=0.42",
					);
				}
			}

			if (mapRef.current) {
				gsap.from(mapRef.current, {
					opacity: 0,
					y: 36,
					scale: 0.965,
					clipPath: "inset(6% 5% 6% 5%)",
					duration: 1.2,
					ease: "power3.inOut",
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
					<div ref={columnRef} className="min-w-0">
						<span className="mb-5 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							{t("label")}
						</span>
						<h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-tighter text-white">
							{t("titleLead")}{" "}
							<span className="font-light italic text-orange-500">
								{t("titleAccent")}
							</span>
						</h2>
						<p className="mt-6 max-w-lg text-sm leading-relaxed text-white/40 md:text-base">
							{t("description")}
						</p>
						<ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium uppercase tracking-widest text-white/25">
							{ABOUT_MAP_MARKERS.map((m) => (
								<li key={m.label}>{m.label}</li>
							))}
						</ul>
					</div>

					<div
						ref={mapRef}
						className="relative w-full overflow-hidden rounded-3xl border border-white/6 bg-[#080808] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] md:p-5"
					>
						<div
							className="pointer-events-none absolute inset-0 rounded-[1.35rem] opacity-40 md:rounded-3xl"
							style={{
								background:
									"radial-gradient(ellipse 80% 55% at 50% 0%, rgba(249,115,22,0.07), transparent 55%)",
							}}
							aria-hidden
						/>
						<div className="relative aspect-2/1 w-full min-h-[200px]">
							<DottedMap
								width={900}
								height={450}
								mapSamples={5600}
								destinationDots={320}
								destinationDotsSeed={0x7a11ba9}
								dotSizeSpread={ABOUT_MAP_DOT_VARIANCE.spread}
								dotSizeSeed={ABOUT_MAP_DOT_VARIANCE.seed}
								gridStep={75}
								gridColor="rgba(255,255,255,0.055)"
								hubLandSpokes={ABOUT_MAP_HUB_SPOKES}
								connectionColor="rgba(249, 115, 22, 0.42)"
								connectionCurve={16}
								markers={ABOUT_MAP_MARKERS.map((m) => ({
									lat: m.lat,
									lng: m.lng,
									pulse: true,
								}))}
								dotColor="rgba(249, 115, 22, 0.45)"
								markerColor="#ffffff"
								pulse
								className="block h-full w-full max-h-none"
								aria-label="World map with animated routes from regional points to hub cities"
								role="img"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
