"use client";

import { useId, useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Cross2Icon } from "@radix-ui/react-icons";
import { LuCircleCheck } from "react-icons/lu";
import {
	buildContactMailtoHref,
	inboxForFormTopic,
} from "@/features/contact/lib/contact-form-mailto";
import type { JobPosition } from "../content/careers-copy";

export type ApplicationModalProps = {
	position: JobPosition | null;
	onClose: () => void;
};

const EMPTY_FORM = {
	fullName: "",
	email: "",
	portfolioUrl: "",
	coverNote: "",
};

export function ApplicationModal({ position, onClose }: ApplicationModalProps) {
	const t = useTranslations("Careers");
	const formId = useId();
	const nameId = `${formId}-name`;
	const emailId = `${formId}-email`;
	const portfolioId = `${formId}-portfolio`;
	const noteId = `${formId}-note`;
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

	const [formData, setFormData] = useState(EMPTY_FORM);
	const [editingId, setEditingId] = useState<string | null>(null);
	const currentId = position?.id ?? null;

	if (currentId !== editingId) {
		setEditingId(currentId);
		setFormData(EMPTY_FORM);
	}

	useEffect(() => {
		if (!position) return;
		const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		closeRef.current?.focus();
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onClose();
			}
			if (e.key !== "Tab" || !dialogRef.current) return;
			const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex="0"]'));
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
	}, [position, onClose]);

	if (!position) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const inbox = inboxForFormTopic("editorial");
		const href = buildContactMailtoHref({
			to: inbox.email,
			subject: `Careers — ${position.title}`,
			name: formData.fullName,
			fromEmail: formData.email,
			topicLabel: `Job application: ${position.title} (${position.department})`,
			message: [
				formData.coverNote.trim(),
				"",
				`Portfolio / LinkedIn / GitHub: ${formData.portfolioUrl.trim()}`,
				`Role: ${position.title}`,
				`Location: ${position.location}`,
				`Type: ${position.type}`,
			].join("\n"),
		});
		window.location.assign(href);
	};

	return (
		<div
			ref={dialogRef}
			className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in-0 duration-200"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="application-modal-title"
		>
			<div
				className="dark-scrollbar relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-8 text-white shadow-2xl animate-in zoom-in-95 duration-200"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					ref={closeRef}
					type="button"
					onClick={onClose}
					aria-label="Close modal"
					className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					<Cross2Icon className="h-5 w-5" />
				</button>

				<span className="text-[10px] font-semibold uppercase tracking-wider text-orange-500">
					{position.department} · {position.type}
				</span>
				<h2
					id="application-modal-title"
					className="mt-1 text-2xl font-bold tracking-tight text-white"
				>
					{position.title}
				</h2>
				<p className="text-xs text-white/50">{position.location}</p>

				<form onSubmit={handleSubmit} className="mt-6 space-y-4">
					<div>
						<label
							htmlFor={nameId}
							className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5"
						>
							{t("modal.fullNameLabel")}
						</label>
						<input
							id={nameId}
							type="text"
							required
							autoComplete="name"
							value={formData.fullName}
							onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
							placeholder={t("modal.fullNamePlaceholder")}
							className="min-h-11 w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-2.5 text-base text-white placeholder:text-white/30 focus:border-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
						/>
					</div>

					<div>
						<label
							htmlFor={emailId}
							className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5"
						>
							{t("modal.emailLabel")}
						</label>
						<input
							id={emailId}
							type="email"
							required
							autoComplete="email"
							value={formData.email}
							onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							placeholder={t("modal.emailPlaceholder")}
							className="min-h-11 w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-2.5 text-base text-white placeholder:text-white/30 focus:border-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
						/>
					</div>

					<div>
						<label
							htmlFor={portfolioId}
							className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5"
						>
							{t("modal.portfolioLabel")}
						</label>
						<input
							id={portfolioId}
							type="url"
							required
							value={formData.portfolioUrl}
							onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
							placeholder={t("modal.portfolioPlaceholder")}
							className="min-h-11 w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-2.5 text-base text-white placeholder:text-white/30 focus:border-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
						/>
					</div>

					<div>
						<label
							htmlFor={noteId}
							className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5"
						>
							{t("modal.coverLabel")}
						</label>
						<textarea
							id={noteId}
							required
							rows={4}
							value={formData.coverNote}
							onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
							placeholder={t("modal.coverPlaceholder")}
							className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-2.5 text-base text-white placeholder:text-white/30 focus:border-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
						/>
					</div>

					<div className="pt-2 space-y-2">
						<button
							type="submit"
							className="min-h-11 w-full rounded-full bg-orange-500 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-orange-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
						>
							{t("modal.submitApp")}
						</button>
						<p className="flex items-start gap-2 text-[11px] leading-relaxed text-white/45">
							<LuCircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" aria-hidden />
							Opens your email app with a draft addressed to our editorial desk. Nothing is sent until
							you hit send.
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
