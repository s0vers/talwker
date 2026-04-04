"use client";

import { useRef } from "react";
import { CONTACT_HERO_COPY } from "@/features/contact/content/contact-page-copy";
import { useContactHeroMotion } from "@/features/contact/lib/contact-page-motion";

export default function ContactHero() {
	const sectionRef = useRef<HTMLElement>(null);
	useContactHeroMotion(sectionRef);

	return (
		<section
			ref={sectionRef}
			className="relative isolate overflow-hidden bg-[#050505] pt-28 pb-12 md:pt-36 md:pb-20"
		>
			<div
				data-contact-hero-glow
				className="pointer-events-none absolute -right-1/4 -top-1/2 h-[120%] w-[70%] rounded-full blur-3xl will-change-transform"
				style={{
					background:
						"radial-gradient(ellipse at center, rgba(249,115,22,0.14) 0%, transparent 55%)",
				}}
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.07]"
				style={{
					backgroundImage:
						"repeating-linear-gradient(-32deg, transparent, transparent 47px, rgba(255,255,255,0.04) 47px, rgba(255,255,255,0.04) 48px)",
				}}
				aria-hidden
			/>
			<span
				data-contact-hero-at
				className="pointer-events-none absolute -right-4 bottom-0 select-none font-mono text-[clamp(6rem,22vw,14rem)] font-bold leading-none tracking-tighter text-white/4 will-change-transform md:right-[8%] md:bottom-[10%]"
				aria-hidden
			>
				@
			</span>

			<div className="relative z-10 pad-x">
				<div className="mx-auto max-w-[1600px]">
					<div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
						<div className="lg:col-span-7">
							<p
								data-contact-hero-line
								className="font-mono text-[11px] tracking-[0.35em] text-orange-500/90 will-change-transform"
							>
								{CONTACT_HERO_COPY.eyebrow}
							</p>

							<div
								data-contact-hero-line
								className="mt-8 flex gap-6 will-change-transform md:mt-10 md:gap-8"
							>
								<div
									className="w-1 shrink-0 rounded-full bg-linear-to-b from-orange-500 via-orange-500/40 to-transparent md:w-1.5"
									aria-hidden
								/>
								<div className="min-w-0">
									<h1 className="text-[clamp(2.75rem,10vw,6.5rem)] font-bold leading-[0.9] tracking-tighter text-white">
										<span className="block">{CONTACT_HERO_COPY.headlineLead}</span>
										<span className="mt-1 block font-light italic text-orange-500 md:mt-2">
											{CONTACT_HERO_COPY.headlineAccent}
										</span>
									</h1>
								</div>
							</div>

							<p
								data-contact-hero-line
								className="mt-8 max-w-xl border-l border-white/10 pl-5 text-sm leading-relaxed text-white/70 will-change-transform md:mt-10 md:text-base"
							>
								{CONTACT_HERO_COPY.description}
							</p>
						</div>

						<div className="lg:col-span-5">
							<div
								data-contact-hero-card
								className="relative mx-auto max-w-md rotate-[0.5deg] rounded-sm border border-dashed border-white/25 bg-[#0a0a0a]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm will-change-transform md:p-8 lg:ml-auto lg:mr-0"
							>
								<div
									className="absolute -right-2 -top-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-500/35 bg-[#050505]/95 font-mono text-[9px] font-bold uppercase leading-tight tracking-widest text-orange-500/80 ring-4 ring-[#050505]"
									aria-hidden
								>
									<span className="max-w-13 text-center">
										{CONTACT_HERO_COPY.stampLabel}
									</span>
								</div>
								<p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
									{CONTACT_HERO_COPY.metaCardTitle}
								</p>
								<dl className="mt-6 space-y-4 border-t border-white/10 pt-6">
									{CONTACT_HERO_COPY.metaLines.map((row) => (
										<div
											key={row.label}
											className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm"
										>
											<dt className="font-mono text-[11px] uppercase tracking-wider text-white/35">
												{row.label}
											</dt>
											<dd className="text-white/65">{row.value}</dd>
										</div>
									))}
								</dl>
								<div
									className="mt-8 flex justify-end border-t border-dotted border-white/15 pt-4"
									aria-hidden
								>
									<div className="h-10 w-24 bg-[repeating-linear-gradient(90deg,transparent,transparent_3px,rgba(255,255,255,0.08)_3px,rgba(255,255,255,0.08)_4px)] opacity-60" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
