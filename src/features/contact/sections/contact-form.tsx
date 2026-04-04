"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_FORM_COPY } from "@/features/contact/content/contact-page-copy";
import {
	buildContactMailtoHref,
	inboxForFormTopic,
} from "@/features/contact/lib/contact-form-mailto";
import { useContactScrollReveal } from "@/features/contact/lib/contact-page-motion";
import { cn } from "@/lib/utils";

const fieldSurface =
	"border-white/15 bg-white/[0.04] text-white shadow-[0_1px_0_rgba(255,255,255,0.04)]";

const selectItemClass =
	"rounded-full text-white data-highlighted:bg-white/10 data-highlighted:text-white";

const selectContentClass =
	"border-white/15 bg-[#0c0c0c] text-white shadow-[0_24px_80px_rgba(0,0,0,0.85)]";

function FieldLabel({
	htmlFor,
	children,
}: {
	htmlFor: string;
	children: React.ReactNode;
}) {
	return (
		<label
			htmlFor={htmlFor}
			className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50"
		>
			{children}
		</label>
	);
}

function topicLabelForValue(value: string) {
	const row = CONTACT_FORM_COPY.topics.find((t) => t.value === value);
	return row?.label ?? value;
}

export default function ContactForm() {
	const sectionRef = useRef<HTMLElement>(null);
	useContactScrollReveal(sectionRef, "[data-contact-form-reveal]");

	const formId = useId();
	const nameId = `${formId}-name`;
	const emailId = `${formId}-email`;
	const topicId = `${formId}-topic`;
	const messageId = `${formId}-message`;

	const [topic, setTopic] = useState<string>(CONTACT_FORM_COPY.topics[0].value);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = e.currentTarget;
		const fd = new FormData(form);
		const name = String(fd.get("name") ?? "").trim();
		const email = String(fd.get("email") ?? "").trim();
		const message = String(fd.get("message") ?? "").trim();
		const inbox = inboxForFormTopic(topic);
		const topicLabel = topicLabelForValue(topic);

		const href = buildContactMailtoHref({
			to: inbox.email,
			subject: `${inbox.subject} — ${name || "Talkwer contact"}`,
			name,
			fromEmail: email,
			topicLabel,
			message,
		});

		window.location.assign(href);
	}

	return (
		<section
			ref={sectionRef}
			className="border-t border-white/6 bg-[#050505] py-20 md:py-28"
			aria-labelledby="contact-form-heading"
		>
			<div className="pad-x">
				<div className="mx-auto max-w-[1600px]">
					<div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
						<div className="lg:col-span-5">
							<p
								data-contact-form-reveal
								className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500 will-change-transform"
							>
								{CONTACT_FORM_COPY.eyebrow}
							</p>
							<h2
								data-contact-form-reveal
								id="contact-form-heading"
								className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tighter text-white will-change-transform"
							>
								{CONTACT_FORM_COPY.title}
							</h2>
							<p
								data-contact-form-reveal
								className="mt-4 max-w-md text-sm leading-relaxed text-white/70 will-change-transform md:text-base"
							>
								{CONTACT_FORM_COPY.description}
							</p>
							<div
								data-contact-form-reveal
								className="mt-10 hidden h-px w-24 bg-linear-to-r from-orange-500/80 to-transparent lg:block"
								aria-hidden
							/>
						</div>

						<div className="lg:col-span-7">
							<div
								data-contact-form-reveal
								className="rounded-3xl border border-white/6 bg-linear-to-b from-white/[0.05] to-transparent p-6 shadow-[0_40px_120px_rgba(0,0,0,0.35)] will-change-transform md:p-10"
							>
								<form onSubmit={handleSubmit}>
									<div className="grid gap-6 md:grid-cols-2">
										<div className="md:col-span-1">
											<FieldLabel htmlFor={nameId}>
												{CONTACT_FORM_COPY.nameLabel}
											</FieldLabel>
											<Input
												id={nameId}
												name="name"
												type="text"
												autoComplete="name"
												required
												placeholder={CONTACT_FORM_COPY.namePlaceholder}
												className={cn(
													fieldSurface,
													"rounded-2xl placeholder:text-white/35",
												)}
											/>
										</div>
										<div className="md:col-span-1">
											<FieldLabel htmlFor={emailId}>
												{CONTACT_FORM_COPY.emailLabel}
											</FieldLabel>
											<Input
												id={emailId}
												name="email"
												type="email"
												autoComplete="email"
												required
												placeholder={CONTACT_FORM_COPY.emailPlaceholder}
												className={cn(
													fieldSurface,
													"rounded-2xl placeholder:text-white/35",
												)}
											/>
										</div>
									</div>

									<div className="mt-6">
										<FieldLabel htmlFor={topicId}>
											{CONTACT_FORM_COPY.topicLabel}
										</FieldLabel>
										<Select value={topic} onValueChange={setTopic}>
											<SelectTrigger
												id={topicId}
												className={cn(
													fieldSurface,
													"rounded-2xl data-placeholder:text-white/35",
												)}
												aria-label={CONTACT_FORM_COPY.topicLabel}
											>
												<SelectValue placeholder={CONTACT_FORM_COPY.topicPlaceholder} />
											</SelectTrigger>
											<SelectContent
												position="popper"
												sideOffset={8}
												className={selectContentClass}
											>
												{CONTACT_FORM_COPY.topics.map((t) => (
													<SelectItem
														key={t.value}
														value={t.value}
														className={selectItemClass}
													>
														{t.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<input type="hidden" name="topic" value={topic} />
									</div>

									<div className="mt-6">
										<FieldLabel htmlFor={messageId}>
											{CONTACT_FORM_COPY.messageLabel}
										</FieldLabel>
										<Textarea
											id={messageId}
											name="message"
											required
											rows={6}
											placeholder={CONTACT_FORM_COPY.messagePlaceholder}
											className={cn(
												fieldSurface,
												"placeholder:text-white/35",
											)}
										/>
									</div>

									<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
										<Button
											type="submit"
											size="lg"
											className="w-full rounded-full bg-orange-500 text-white hover:bg-orange-500/90 sm:w-auto sm:min-w-[200px]"
										>
											{CONTACT_FORM_COPY.submitLabel}
										</Button>
										<p className="max-w-xs text-center text-[12px] leading-relaxed text-white/45 sm:text-right">
											{CONTACT_FORM_COPY.submitHint}
										</p>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
