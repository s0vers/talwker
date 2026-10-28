"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Cross2Icon } from "@radix-ui/react-icons";
import { LuClock, LuUsers, LuTag, LuCircleCheck } from "react-icons/lu";
import type { ExperienceItem } from "../content/experiences-page-copy";

export type ExperienceModalProps = {
	experience: ExperienceItem | null;
	onClose: () => void;
};

export function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
	const t = useTranslations("Experiences.modal");
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!experience) return;
		const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		closeRef.current?.focus();
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onClose();
			}
			if (e.key !== "Tab" || !dialogRef.current) return;
			const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]'));
			if (!focusable.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = originalOverflow;
			window.removeEventListener("keydown", handleKeyDown);
			previousFocus?.focus();
		};
	}, [experience, onClose]);

	if (!experience) return null;

	const tourHref = experience.tourSlug ? `/tours/${experience.tourSlug}` : "/tours";
	const contactHref = `/contact?experience=${encodeURIComponent(experience.title)}`;

	return (
		<div
			ref={dialogRef}
			className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in-0 duration-200"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="experience-modal-title"
		>
			<div
				className="dark-scrollbar relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a] text-white shadow-2xl animate-in zoom-in-95 duration-200"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close Button */}
				<button
					ref={closeRef}
					type="button"
					onClick={onClose}
					aria-label={t("closeLabel")}
					className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-black/60 text-white/80 transition-colors hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					<Cross2Icon className="h-5 w-5" />
				</button>

				{/* Header Image */}
				<div className="relative min-h-[260px] w-full overflow-hidden bg-white/5 sm:aspect-16/9 sm:min-h-0">
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
								<p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">{t("duration")}</p>
								<p className="text-sm font-semibold text-white">{experience.duration}</p>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row items-center gap-2">
							<LuUsers className="h-4 w-4 text-orange-500 shrink-0" />
							<div>
								<p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">{t("capacity")}</p>
								<p className="text-sm font-semibold text-white">{experience.groupSize}</p>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row items-center gap-2">
							<LuTag className="h-4 w-4 text-orange-500 shrink-0" />
							<div>
								<p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">{t("pricing")}</p>
								<p className="text-sm font-semibold text-white">{experience.price}</p>
							</div>
						</div>
					</div>

					{/* Description */}
					<div>
						<h3 className="text-xs font-semibold uppercase tracking-wider text-orange-500">{t("overview")}</h3>
						<p className="mt-2 text-sm leading-relaxed text-white/70">{experience.description}</p>
					</div>

					{/* Highlights */}
					<div>
						<h3 className="text-xs font-semibold uppercase tracking-wider text-orange-500">{t("highlights")}</h3>
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
						<h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">{t("itineraryNotes")}</h4>
						<p className="mt-2 text-xs leading-relaxed text-white/60">{experience.itinerarySummary}</p>
					</div>

					{/* Action Buttons */}
					<div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
						<Link
							href={tourHref}
							onClick={onClose}
							className="inline-flex min-h-11 w-full flex-1 items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-[background-color,box-shadow] hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
						>
							{t("viewTourPackage")}
						</Link>
						<Link
							href={contactHref}
							onClick={onClose}
							className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white/70 transition-[border-color,color] hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
						>
							{t("inquire")}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
