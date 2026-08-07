"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { STORIES_ISSUE_INDEX } from "@/features/stories/content/stories-page-copy";
import { getStorySlug } from "@/features/stories/lib/story-slug";
import {
	createStaggerReveal,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import type { Story } from "@/shared/types/domain";

type StoriesIssueGridProps = {
	stories: Story[];
};

function formatIndex(index: number): string {
	return String(index + 1).padStart(2, "0");
}

export default function StoriesIssueGrid({ stories }: StoriesIssueGridProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const [featured, ...rest] = stories;

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const lead = sectionRef.current?.querySelectorAll("[data-st-lead]");
			const rail = sectionRef.current?.querySelectorAll("[data-st-rail]");
			if (lead?.length) {
				createStaggerReveal(lead, sectionRef.current, {
					y: 40,
					duration: 0.85,
					stagger: 0.1,
					start: "top 82%",
				});
			}
			if (rail?.length) {
				createStaggerReveal(rail, sectionRef.current, {
					y: 28,
					duration: 0.7,
					stagger: 0.07,
					start: "top 86%",
				});
			}
		},
		[stories],
	);

	if (!featured) return null;

	const featuredSlug = getStorySlug(featured);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="stories-issue-heading"
			className="border-t border-white/10 bg-[#070707] text-white"
		>
			<div className="mx-auto max-w-[1600px] pad-x py-16 md:py-24">
				<div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
					<div>
						<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
							{STORIES_ISSUE_INDEX.featuredLabel}
						</p>
						<h2
							id="stories-issue-heading"
							className="sr-only"
						>
							Stories
						</h2>
					</div>
					<p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">
						{stories.length} essays
					</p>
				</div>

				{/* Featured lead */}
				<article data-st-lead className="group">
					<Link
						href={`/stories/${featuredSlug}`}
						className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-12"
					>
						<div className="relative aspect-[16/11] overflow-hidden bg-[#111] md:aspect-[16/10]">
							<Image
								src={featured.heroImage}
								alt={featured.title}
								fill
								priority
								sizes="(max-width: 1024px) 100vw, 60vw"
								className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
							/>
							<div
								className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"
								aria-hidden
							/>
						</div>

						<div className="flex flex-col justify-end pb-1">
							<p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
								[{formatIndex(0)}]
								<span className="mx-2 text-white/20" aria-hidden>
									·
								</span>
								{featured.location}
							</p>
							<h3 className="mt-4 text-3xl font-semibold tracking-tight text-white transition-colors group-hover:text-orange-400 md:text-4xl lg:text-5xl">
								{featured.title}
							</h3>
							<p className="mt-5 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
								{featured.dek}
							</p>
							<p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
								{featured.author}
								<span className="mx-2 text-white/20" aria-hidden>
									|
								</span>
								{featured.readMinutes} {STORIES_ISSUE_INDEX.minutesSuffix}
							</p>
							<span className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400 transition-colors group-hover:text-orange-300">
								{STORIES_ISSUE_INDEX.readCta}
								<span aria-hidden>→</span>
							</span>
						</div>
					</Link>
				</article>

				{/* Secondary rail */}
				{rest.length > 0 ? (
					<div className="mt-16 border-t border-white/10 pt-12 md:mt-20 md:pt-16">
						<p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
							{STORIES_ISSUE_INDEX.railLabel}
						</p>

						<ul className="flex flex-col gap-10 md:snap-x md:snap-mandatory md:flex-row md:gap-6 md:overflow-x-auto md:pb-4 md:[-ms-overflow-style:none] md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden">
							{rest.map((story, index) => {
								const slug = getStorySlug(story);
								return (
									<li
										key={story.id}
										data-st-rail
										className="md:w-[min(340px,72vw)] md:shrink-0 md:snap-start"
									>
										<Link
											href={`/stories/${slug}`}
											className="group flex flex-col gap-4 md:h-full"
										>
											<div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
												<Image
													src={story.heroImage}
													alt={story.title}
													fill
													sizes="(max-width: 768px) 100vw, 340px"
													className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
												/>
											</div>
											<div>
												<p className="font-mono text-[11px] uppercase tracking-[0.16em] text-orange-500/90">
													[{formatIndex(index + 1)}]
												</p>
												<h3 className="mt-2 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-orange-400 md:text-2xl">
													{story.title}
												</h3>
												<p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/50">
													{story.dek}
												</p>
												<p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
													{story.author}
													<span className="mx-2 text-white/15" aria-hidden>
														·
													</span>
													{story.readMinutes} {STORIES_ISSUE_INDEX.minutesSuffix}
												</p>
											</div>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				) : null}
			</div>
		</section>
	);
}
