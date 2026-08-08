"use client";

import { useState } from "react";
import { CheckCircle2, Send, Quote } from "lucide-react";
import { PARTNERS_TESTIMONIAL } from "../content/partners-copy";

export function PartnersBody() {
	const [submitted, setSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		orgName: "",
		contactName: "",
		email: "",
		partnerType: "Lodging",
		region: "",
		website: "",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
	};

	return (
		<section className="bg-[#050505] text-white py-16 md:py-24 border-t border-white/6">
			<div className="pad-x mx-auto max-w-[1600px] space-y-16">
				{/* Partner Quote Callout */}
				<div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 md:p-12 text-center relative overflow-hidden">
					<Quote className="h-12 w-12 text-orange-500/20 mx-auto mb-4" />
					<p className="text-lg sm:text-xl md:text-2xl font-serif italic text-white/90 leading-relaxed">
						&ldquo;{PARTNERS_TESTIMONIAL.quote}&rdquo;
					</p>
					<div className="mt-6">
						<p className="text-sm font-semibold text-white">{PARTNERS_TESTIMONIAL.name}</p>
						<p className="text-xs text-orange-500">{PARTNERS_TESTIMONIAL.role}</p>
					</div>
				</div>

				{/* Interactive Partner Inquiry Form */}
				<div id="partner-form" className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 md:p-12 shadow-2xl">
					<div className="mb-8">
						<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
							Application Form
						</p>
						<h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
							Partner Network Inquiry
						</h3>
						<p className="text-xs sm:text-sm text-white/60 mt-2">
							Tell us about your property, guiding operation, or cultural atelier. Our team will review your submission and connect within 48 hours.
						</p>
					</div>

					{submitted ? (
						<div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-8 text-center space-y-3">
							<CheckCircle2 className="mx-auto h-12 w-12 text-orange-500" />
							<h4 className="text-xl font-bold text-white">Partnership Application Submitted!</h4>
							<p className="text-sm text-white/70 max-w-lg mx-auto">
								Thank you, {formData.contactName}. We have received the partnership proposal for <strong>{formData.orgName}</strong>. Our partnership desk will get in touch via <strong>{formData.email}</strong>.
							</p>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
							<div>
								<label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
									Organization / Property Name *
								</label>
								<input
									type="text"
									required
									value={formData.orgName}
									onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
									placeholder="e.g. Kyoto Heritage Ryokan"
									className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
									Contact Person Name *
								</label>
								<input
									type="text"
									required
									value={formData.contactName}
									onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
									placeholder="e.g. Kenji Takahashi"
									className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
									Email Address *
								</label>
								<input
									type="email"
									required
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									placeholder="kenji@ryokan.example"
									className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
									Partner Category *
								</label>
								<select
									value={formData.partnerType}
									onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
									className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white focus:border-orange-500 focus:outline-none"
								>
									<option value="Lodging">Boutique Hotel / Lodge</option>
									<option value="Guiding">Expedition / Mountain Guide</option>
									<option value="Culinary">Culinary & Wine Host</option>
									<option value="Cultural">Cultural Atelier / Artisan</option>
								</select>
							</div>

							<div>
								<label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
									Country & Region *
								</label>
								<input
									type="text"
									required
									value={formData.region}
									onChange={(e) => setFormData({ ...formData, region: e.target.value })}
									placeholder="e.g. Kyoto, Japan"
									className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
									Website / Social Link
								</label>
								<input
									type="url"
									value={formData.website}
									onChange={(e) => setFormData({ ...formData, website: e.target.value })}
									placeholder="https://ryokan.example.com"
									className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
								/>
							</div>

							<div className="sm:col-span-2">
								<label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
									Tell Us About Your Operation *
								</label>
								<textarea
									required
									rows={4}
									value={formData.message}
									onChange={(e) => setFormData({ ...formData, message: e.target.value })}
									placeholder="Describe your property, capacity, guiding certifications, or hosted experience..."
									className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
								/>
							</div>

							<div className="sm:col-span-2 pt-2">
								<button
									type="submit"
									className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-orange-600 transition-colors"
								>
									<Send className="h-4 w-4" /> Submit Partnership Application
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</section>
	);
}
