"use client";

import { useState } from "react";
import { CheckCircle2, Send, Quote, Building2, MapPin, Award } from "lucide-react";
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
				{/* Bespoke 2-Column Partner Property Spotlight (100% Unique Layout) */}
				<div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 md:p-12 shadow-2xl relative overflow-hidden">
					<div className="grid items-center gap-10 lg:grid-cols-12">
						{/* Left Column: Property Badge & Location */}
						<div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#121212] p-6 space-y-4">
							<div className="flex items-center justify-between border-b border-white/10 pb-3">
								<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 flex items-center gap-1.5">
									<Building2 className="h-3.5 w-3.5" /> Guild Spotlight
								</span>
								<span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
									<Award className="h-3 w-3" /> Accredited
								</span>
							</div>

							<div>
								<h4 className="text-lg font-bold text-white">Patagonia Glacial Lodge</h4>
								<p className="text-xs text-white/50 flex items-center gap-1 mt-1">
									<MapPin className="h-3 w-3 text-orange-500" /> Aysén Region, Chile
								</p>
							</div>

							<div className="pt-2 border-t border-white/10 text-xs space-y-1">
								<p className="font-semibold text-white">{PARTNERS_TESTIMONIAL.name}</p>
								<p className="text-white/50 text-[11px]">{PARTNERS_TESTIMONIAL.role}</p>
							</div>
						</div>

						{/* Right Column: Large Serif Quote & Impact Metrics */}
						<div className="lg:col-span-8 space-y-6">
							<Quote className="h-8 w-8 text-orange-500/40" />
							<p className="text-xl sm:text-2xl font-serif italic text-white/95 leading-relaxed">
								&ldquo;{PARTNERS_TESTIMONIAL.quote}&rdquo;
							</p>

							<div className="flex flex-wrap gap-4 pt-4 border-t border-white/10 text-xs text-white/60">
								<span className="font-mono text-orange-400 font-bold">94%</span> Repeat Guest Engagement
								<span>·</span>
								<span className="font-mono text-white font-bold">4.8 Days</span> Avg Guest Stay
								<span>·</span>
								<span className="font-mono text-emerald-400 font-bold">Zero-Waste</span> Certified
							</div>
						</div>
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
