"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import {
	ABOUT_TEAM,
	ABOUT_TEAM_SECTION,
} from "@/features/about/content/about-copy";

export default function AboutTeam() {
	const section = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		section,
		() => {
			if (prefersReducedMotion()) return;

			if (headingRef.current?.children.length) {
				gsap.from(headingRef.current.children, {
					y: 60,
					opacity: 0,
					duration: 1,
					stagger: 0.12,
					ease: "power3.out",
					scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
				});
			}

			const cards =
				gridRef.current?.querySelectorAll<HTMLElement>("[data-team-card]");
			if (cards?.length) {
				gsap.from(cards, {
					y: 70,
					opacity: 0,
					scale: 0.9,
					rotationX: 8,
					transformOrigin: "center bottom",
					duration: 1,
					stagger: 0.12,
					ease: "power4.out",
					scrollTrigger: {
						trigger: gridRef.current,
						start: "top 78%",
						toggleActions: "play none none none",
					},
				});

				cards.forEach((card) => {
					const imgWrap =
						card.querySelector<HTMLElement>("[data-team-image]");
					if (imgWrap) {
						gsap.from(imgWrap, {
							scale: 1.15,
							duration: 1.2,
							ease: "power3.out",
							scrollTrigger: {
								trigger: card,
								start: "top 85%",
								toggleActions: "play none none none",
							},
						});
					}
				});
			}
		},
		[],
	);

	return (
		<section ref={section} className="bg-[#070707] py-32 md:py-44">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div ref={headingRef} className="mb-16 text-center md:mb-20">
					<span className="mb-5 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
						{ABOUT_TEAM_SECTION.label}
					</span>
					<h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-white">
						{ABOUT_TEAM_SECTION.title}
						<span className="font-light italic text-orange-500">
							{ABOUT_TEAM_SECTION.titleSuffix}
						</span>
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/40 md:text-base">
						{ABOUT_TEAM_SECTION.description}
					</p>
				</div>

				<div
					ref={gridRef}
					className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
					style={{ perspective: "1200px" }}
				>
					{ABOUT_TEAM.map((member) => (
						<div
							key={member.id}
							data-team-card
							className="group overflow-hidden rounded-3xl border border-white/10 bg-[#101010] transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
							style={{ transformStyle: "preserve-3d" }}
						>
							<div
								className="relative h-72 overflow-hidden"
								data-team-image
							>
								<Image
									src={member.image}
									alt={member.name}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
									className="object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-[#101010] via-transparent to-transparent" />
							</div>
							<div className="p-6">
								<h3 className="text-lg font-bold tracking-tight text-white">
									{member.name}
								</h3>
								<p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.15em] text-orange-500">
									{member.role}
								</p>
								<p className="mt-3 text-sm leading-relaxed text-white/40">
									{member.bio}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
