"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useEffect } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { LuClock, LuUsers, LuTag, LuCircleCheck } from "react-icons/lu";
import type { ExperienceItem } from "../content/experiences-page-copy";

export type ExperienceModalProps = {
	experience: ExperienceItem | null;
	onClose: () => void;
};

export function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
	useEffect(() => {
		if (!experience) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = originalOverflow;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [experience, onClose]);

	if (!experience) return null;

	const tourHref = experience.tourSlug ? `/tours/${experience.tourSlug}` : "/tours";
	const contactHref = `/contact?experience=${encodeURIComponent(experience.title)}`;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in-0 duration-200"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="experience-modal-title"
		>
			<div
				className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a] text-white shadow-2xl animate-in zoom-in-95 duration-200"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close Button */}
				<button
					type="button"
					onClick={onClose}
					aria-label="Close modal"
					className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2.5 text-white/80 transition-colors hover:bg-black hover:text-white"
				>
					<Cross2Icon className="h-5 w-5" />
				</button>

				{/* Header Image */}
				<div className="relative aspect-16/9 w-full overflow-hidden bg-white/5">
					<Image
						src={experience.image}
						alt={experience.imageAlt}
						fill
						sizes="(max-width: 768px) 100vw, 800px"
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
					<div className="absolute bottom-6 left-6 right-6">
						<span className="inline-block rounded-full bg-orange-500/20 border border-orange-500/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-orange-400 backdrop-blur-sm">
							{experience.categoryLabel}
						</span>
						<h2 id="experience-modal-title" className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
							{experience.title}
						</h2>
					</div>
				</div>

				{/* Body Content */}
				<div className="p-6 sm:p-8 space-y-6">
					{/* Meta stats bar */}
					<div className="grid grid-cols-3 gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-center sm:text-left">
						<div className="flex flex-col sm:flex-row items-center gap-2">
							<LuClock className="h-4 w-4 text-orange-500 shrink-0" />
							<div>
								<p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">Duration</p>
								<p className="text-sm font-semibold text-white">{experience.duration}</p>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row items-center gap-2">
							<LuUsers className="h-4 w-4 text-orange-500 shrink-0" />
							<div>
								<p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">Capacity</p>
								<p className="text-sm font-semibold text-white">{experience.groupSize}</p>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row items-center gap-2">
							<LuTag className="h-4 w-4 text-orange-500 shrink-0" />
							<div>
								<p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">Pricing</p>
								<p className="text-sm font-semibold text-white">{experience.price}</p>
							</div>
						</div>
					</div>

					{/* Description */}
					<div>
						<h3 className="text-xs font-semibold uppercase tracking-wider text-orange-500">Overview</h3>
						<p className="mt-2 text-sm leading-relaxed text-white/70">{experience.description}</p>
					</div>

					{/* Highlights */}
					<div>
						<h3 className="text-xs font-semibold uppercase tracking-wider text-orange-500">Experience Highlights</h3>
						<ul className="mt-3 space-y-2">
							{experience.highlights.map((item, idx) => (
								<li key={idx} className="flex items-start gap-2.5 text-sm text-white/80">
									<LuCircleCheck className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Itinerary Summary */}
					<div className="rounded-xl border border-white/10 bg-[#121212] p-4">
						<h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">Itinerary & Pacing Notes</h4>
						<p className="mt-2 text-xs leading-relaxed text-white/60">{experience.itinerarySummary}</p>
					</div>

					{/* Action Buttons */}
					<div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
						<Link
							href={tourHref}
							onClick={onClose}
							className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
						>
							View Full Tour Package →
						</Link>
						<Link
							href={contactHref}
							onClick={onClose}
							className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white/70 transition-all hover:border-white/40 hover:text-white"
						>
							Inquire About Experience
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
