"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import {
	LuSend,
	LuQuote,
	LuBuilding2,
	LuMapPin,
	LuAward,
} from "react-icons/lu";
import {
	buildContactMailtoHref,
	inboxForFormTopic,
} from "@/features/contact/lib/contact-form-mailto";
import { PARTNERS_TESTIMONIAL } from "../content/partners-copy";

export function PartnersBody() {
	const t = useTranslations("Partners");
	const formId = useId();
	const orgId = `${formId}-org`;
	const contactId = `${formId}-contact`;
	const emailId = `${formId}-email`;
	const typeId = `${formId}-type`;
	const regionId = `${formId}-region`;
	const websiteId = `${formId}-website`;
	const messageId = `${formId}-message`;

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
		const inbox = inboxForFormTopic("partnerships");
		const href = buildContactMailtoHref({
			to: inbox.email,
			subject: `${inbox.subject} — ${formData.orgName || "Partner inquiry"}`,
			name: formData.contactName,
			fromEmail: formData.email,
			topicLabel: `Partnership (${formData.partnerType})`,
			message: [
				formData.message.trim(),
				"",
				`Organization: ${formData.orgName.trim()}`,
				`Category: ${formData.partnerType}`,
				`Region: ${formData.region.trim()}`,
				formData.website.trim() ? `Website: ${formData.website.trim()}` : null,
			]
				.filter(Boolean)
				.join("\n"),
		});
		window.location.assign(href);
	};

	return (
		<section className="bg-[#050505] text-white py-16 md:py-24 border-t border-white/6">
			<div className="pad-x mx-auto max-w-[1600px] space-y-16">
				<div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 md:p-12 shadow-2xl relative overflow-hidden">
					<div className="grid items-center gap-10 lg:grid-cols-12">
						<div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#121212] p-6 space-y-4">
							<div className="flex items-center justify-between border-b border-white/10 pb-3">
								<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 flex items-center gap-1.5">
									<LuBuilding2 className="h-3.5 w-3.5" /> {t.has("testimonial.badge") ? t("testimonial.badge") : "Guild Spotlight"}
								</span>
								<span className="text-[10px] text-orange-400 font-semibold flex items-center gap-1">
									<LuAward className="h-3 w-3" /> {t.has("testimonial.accredited") ? t("testimonial.accredited") : "Accredited"}
								</span>
							</div>

							<div>
								<h4 className="text-lg font-bold text-white">Patagonia Glacial Lodge</h4>
								<p className="text-xs text-white/50 flex items-center gap-1 mt-1">
									<LuMapPin className="h-3 w-3 text-orange-500" /> {t.has("testimonial.region") ? t("testimonial.region") : "Aysén Region, Chile"}
								</p>
							</div>

							<div className="pt-2 border-t border-white/10 text-xs space-y-1">
								<p className="font-semibold text-white">
									{t.has("testimonial.name") ? t("testimonial.name") : PARTNERS_TESTIMONIAL.name}
								</p>
								<p className="text-white/50 text-[11px]">
									{t.has("testimonial.role") ? t("testimonial.role") : PARTNERS_TESTIMONIAL.role}
								</p>
							</div>
						</div>

						<div className="lg:col-span-8 space-y-6">
							<LuQuote className="h-8 w-8 text-orange-500/40" />
							<p className="text-xl sm:text-2xl font-light italic text-white/95 leading-relaxed">
								&ldquo;{t.has("testimonial.quote") ? t("testimonial.quote") : PARTNERS_TESTIMONIAL.quote}&rdquo;
							</p>

							<div className="flex flex-wrap gap-4 pt-4 border-t border-white/10 text-xs text-white/60">
								<span className="text-orange-400 font-bold">94%</span> {t.has("testimonial.stat1") ? t("testimonial.stat1") : "Repeat Guest Engagement"}
								<span>·</span>
								<span className="text-white font-bold">4.8 Days</span> {t.has("testimonial.stat2") ? t("testimonial.stat2") : "Avg Guest Stay"}
								<span>·</span>
								<span className="text-orange-400 font-bold">Zero-Waste</span> {t.has("testimonial.stat3") ? t("testimonial.stat3") : "Certified"}
							</div>
						</div>
					</div>
				</div>

				<div id="partner-form" className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 md:p-12 shadow-2xl">
					<div className="mb-8">
						<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
							{t("form.label")}
						</p>
						<h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
							{t("form.titleLead")} <span className="text-orange-500">{t("form.titleAccent")}</span>
						</h3>
						<p className="text-xs sm:text-sm text-white/60 mt-2">
							{t("form.description")}
						</p>
					</div>

					<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label
								htmlFor={orgId}
								className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
							>
								{t("form.orgName")}
							</label>
							<input
								id={orgId}
								type="text"
								required
								value={formData.orgName}
								onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
								placeholder={t("form.orgPlaceholder")}
								className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
							/>
						</div>

						<div>
							<label
								htmlFor={contactId}
								className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
							>
								{t("form.contactName")}
							</label>
							<input
								id={contactId}
								type="text"
								required
								autoComplete="name"
								value={formData.contactName}
								onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
								placeholder={t("form.contactPlaceholder")}
								className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
							/>
						</div>

						<div>
							<label
								htmlFor={emailId}
								className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
							>
								{t("form.email")}
							</label>
							<input
								id={emailId}
								type="email"
								required
								autoComplete="email"
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								placeholder={t("form.emailPlaceholder")}
								className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
							/>
						</div>

						<div>
							<label
								htmlFor={typeId}
								className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
							>
								{t("form.category")}
							</label>
							<select
								id={typeId}
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
							<label
								htmlFor={regionId}
								className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
							>
								{t("form.location")}
							</label>
							<input
								id={regionId}
								type="text"
								required
								value={formData.region}
								onChange={(e) => setFormData({ ...formData, region: e.target.value })}
								placeholder={t("form.locationPlaceholder")}
								className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
							/>
						</div>

						<div>
							<label
								htmlFor={websiteId}
								className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
							>
								{t("form.website")}
							</label>
							<input
								id={websiteId}
								type="url"
								value={formData.website}
								onChange={(e) => setFormData({ ...formData, website: e.target.value })}
								placeholder={t("form.websitePlaceholder")}
								className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
							/>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor={messageId}
								className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
							>
								{t("form.notes")}
							</label>
							<textarea
								id={messageId}
								required
								rows={4}
								value={formData.message}
								onChange={(e) => setFormData({ ...formData, message: e.target.value })}
								placeholder={t("form.notesPlaceholder")}
								className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-500 focus:outline-none"
							/>
						</div>

						<div className="sm:col-span-2 pt-2 space-y-2">
							<button
								type="submit"
								className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-orange-600 transition-colors"
							>
								<LuSend className="h-4 w-4" /> {t("form.submit")}
							</button>
							<p className="text-[11px] text-white/45">
								Opens your email app with a draft addressed to partnerships. You stay in control of what goes out.
							</p>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
