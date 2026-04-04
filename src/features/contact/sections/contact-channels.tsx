"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	CONTACT_CHANNELS_COPY,
	CONTACT_SOCIAL_COPY,
} from "@/features/contact/content/contact-page-copy";
import { useContactChannelsScrollMotion } from "@/features/contact/lib/contact-page-motion";

function mailtoHref(email: string, subject: string) {
	const q = new URLSearchParams({ subject });
	return `mailto:${email}?${q.toString()}`;
}

export default function ContactChannels() {
	const sectionRef = useRef<HTMLElement>(null);
	useContactChannelsScrollMotion(sectionRef);

	return (
		<section
			ref={sectionRef}
			className="border-t border-white/6 bg-[#050505] py-20 md:py-28"
			aria-labelledby="contact-channels-heading"
		>
			<div className="pad-x">
				<div className="mx-auto max-w-[1600px]">
					<h2
						data-contact-channel-reveal
						id="contact-channels-heading"
						className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tighter text-white will-change-transform"
					>
						{CONTACT_CHANNELS_COPY.sectionTitle}
					</h2>
					<p
						data-contact-channel-reveal
						className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 will-change-transform md:text-base"
					>
						{CONTACT_CHANNELS_COPY.sectionDescription}
					</p>

					<ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
						{CONTACT_CHANNELS_COPY.channels.map((ch) => (
							<li
								key={ch.id}
								data-contact-channel-reveal
								className="flex flex-col rounded-2xl border border-white/6 bg-white/[0.02] p-8 will-change-transform"
							>
								<h3 className="text-lg font-semibold tracking-tight text-white">
									{ch.title}
								</h3>
								<p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
									{ch.body}
								</p>
								<p className="mt-4 text-[13px] text-white/50">{ch.email}</p>
								<Button
									asChild
									variant="outline"
									size="lg"
									className="mt-6 w-full border-white/15 bg-transparent text-white/90 hover:border-orange-500 hover:bg-white/5 hover:text-orange-500 md:w-auto"
								>
									<a
										href={mailtoHref(ch.email, ch.mailtoSubject)}
										aria-label={`${ch.ctaLabel}: ${ch.email}`}
									>
										{ch.ctaLabel}
									</a>
								</Button>
							</li>
						))}
					</ul>

					<div
						data-contact-channel-reveal
						className="mt-16 rounded-2xl border border-white/6 bg-[#0a0a0a]/80 p-8 will-change-transform md:mt-20 md:p-10"
					>
						<h3 className="text-lg font-semibold tracking-tight text-white">
							{CONTACT_SOCIAL_COPY.title}
						</h3>
						<p className="mt-2 text-sm leading-relaxed text-white/70">
							{CONTACT_SOCIAL_COPY.description}
						</p>
						<ul className="mt-6 flex flex-wrap gap-4">
							{CONTACT_SOCIAL_COPY.links.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm font-medium text-orange-500 underline-offset-4 transition-colors hover:text-orange-400 hover:underline"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
