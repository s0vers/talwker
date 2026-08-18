"use client";

import { useId, useState, useEffect } from "react";
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
	const formId = useId();
	const nameId = `${formId}-name`;
	const emailId = `${formId}-email`;
	const portfolioId = `${formId}-portfolio`;
	const noteId = `${formId}-note`;

	const [formData, setFormData] = useState(EMPTY_FORM);
	const [editingId, setEditingId] = useState<string | null>(null);
	const currentId = position?.id ?? null;

	if (currentId !== editingId) {
		setEditingId(currentId);
		setFormData(EMPTY_FORM);
	}

	useEffect(() => {
		if (!position) return;
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
			className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in-0 duration-200"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="application-modal-title"
		>
			<div
				className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-8 text-white shadow-2xl animate-in zoom-in-95 duration-200"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					type="button"
					onClick={onClose}
					aria-label="Close modal"
					className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white"
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
							Full Name *
						</label>
						<input
							id={nameId}
							type="text"
							required
							autoComplete="name"
							value={formData.fullName}
							onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Please enter your full name so we know who to address.")}
							onInput={(e) => {
								(e.target as HTMLInputElement).setCustomValidity("");
								setFormData({ ...formData, fullName: (e.target as HTMLInputElement).value });
							}}
							placeholder="e.g. Elena Vance"
							className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-orange-500 focus:outline-none"
						/>
					</div>

					<div>
						<label
							htmlFor={emailId}
							className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5"
						>
							Email Address *
						</label>
						<input
							id={emailId}
							type="email"
							required
							autoComplete="email"
							value={formData.email}
							onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Please provide a valid email address so we can reach you.")}
							onInput={(e) => {
								(e.target as HTMLInputElement).setCustomValidity("");
								setFormData({ ...formData, email: (e.target as HTMLInputElement).value });
							}}
							placeholder="elena@example.com"
							className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-orange-500 focus:outline-none"
						/>
					</div>

					<div>
						<label
							htmlFor={portfolioId}
							className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5"
						>
							Portfolio / LinkedIn / GitHub URL *
						</label>
						<input
							id={portfolioId}
							type="url"
							required
							value={formData.portfolioUrl}
							onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Please provide a URL to your portfolio or LinkedIn profile.")}
							onInput={(e) => {
								(e.target as HTMLInputElement).setCustomValidity("");
								setFormData({ ...formData, portfolioUrl: (e.target as HTMLInputElement).value });
							}}
							placeholder="https://portfolio.example.com"
							className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-orange-500 focus:outline-none"
						/>
					</div>

					<div>
						<label
							htmlFor={noteId}
							className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5"
						>
							Short Introduction & Why Talkwer *
						</label>
						<textarea
							id={noteId}
							required
							rows={4}
							value={formData.coverNote}
							onInvalid={(e) => (e.target as HTMLTextAreaElement).setCustomValidity("Please tell us a bit about yourself and why you want to join.")}
							onInput={(e) => {
								(e.target as HTMLTextAreaElement).setCustomValidity("");
								setFormData({ ...formData, coverNote: (e.target as HTMLTextAreaElement).value });
							}}
							placeholder="Tell us about your background and what draws you to our work..."
							className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-orange-500 focus:outline-none"
						/>
					</div>

					<div className="pt-2 space-y-2">
						<button
							type="submit"
							className="w-full rounded-full bg-orange-500 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-orange-600 transition-colors"
						>
							Open Email Draft
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
