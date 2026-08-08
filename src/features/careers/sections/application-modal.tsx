"use client";

import { useState, useEffect } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { CheckCircle2 } from "lucide-react";
import type { JobPosition } from "../content/careers-copy";

export type ApplicationModalProps = {
	position: JobPosition | null;
	onClose: () => void;
};

export function ApplicationModal({ position, onClose }: ApplicationModalProps) {
	const [submitted, setSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		portfolioUrl: "",
		coverNote: "",
	});

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

	const handleClose = () => {
		setSubmitted(false);
		onClose();
	};

	if (!position) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in-0 duration-200"
			onClick={handleClose}
			role="dialog"
			aria-modal="true"
		>
			<div
				className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-8 text-white shadow-2xl animate-in zoom-in-95 duration-200"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					type="button"
					onClick={handleClose}
					aria-label="Close modal"
					className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white"
				>
					<Cross2Icon className="h-5 w-5" />
				</button>

				<span className="text-[10px] font-semibold uppercase tracking-wider text-orange-500">
					{position.department} · {position.type}
				</span>
				<h2 className="mt-1 text-2xl font-bold tracking-tight text-white">{position.title}</h2>
				<p className="text-xs text-white/50">{position.location}</p>

				{submitted ? (
					<div className="my-8 rounded-xl border border-orange-500/30 bg-orange-500/10 p-6 text-center space-y-3">
						<CheckCircle2 className="mx-auto h-10 w-10 text-orange-500" />
						<h3 className="text-lg font-bold text-white">Application Received!</h3>
						<p className="text-xs text-white/70">
							Thank you for applying for {position.title}. Our editorial team will review your application and reach out within 3 business days.
						</p>
						<button
							type="button"
							onClick={handleClose}
							className="mt-4 inline-flex items-center rounded-full bg-orange-500 px-6 py-2 text-xs font-semibold text-white hover:bg-orange-600"
						>
							Close Window
						</button>
					</div>

				) : (
					<form onSubmit={handleSubmit} className="mt-6 space-y-4">
						<div>
							<label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
								Full Name *
							</label>
							<input
								type="text"
								required
								value={formData.fullName}
								onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
								placeholder="e.g. Elena Vance"
								className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
							/>
						</div>

						<div>
							<label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
								Email Address *
							</label>
							<input
								type="email"
								required
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								placeholder="elena@example.com"
								className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
							/>
						</div>

						<div>
							<label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
								Portfolio / LinkedIn / GitHub URL *
							</label>
							<input
								type="url"
								required
								value={formData.portfolioUrl}
								onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
								placeholder="https://portfolio.example.com"
								className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
							/>
						</div>

						<div>
							<label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
								Short Introduction & Why Talkwer *
							</label>
							<textarea
								required
								rows={4}
								value={formData.coverNote}
								onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
								placeholder="Tell us about your background and what draws you to our work..."
								className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
							/>
						</div>

						<div className="pt-2">
							<button
								type="submit"
								className="w-full rounded-full bg-orange-500 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-orange-600 transition-colors"
							>
								Submit Application
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
