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
			className="relative overflow-hidden border-t border-white/6 bg-[#050505] py-20 md:py-28"
			aria-labelledby="contact-channels-heading"
		>
			<div
				className="pointer-events-none absolute -right-1/3 top-0 h-[min(70%,420px)] w-[min(90%,520px)] rounded-full opacity-[0.12] blur-3xl"
				style={{
					background:
						"radial-gradient(ellipse at center, rgba(249,115,22,0.35) 0%, transparent 65%)",
				}}
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.04]"
				style={{
					backgroundImage:
						"radial-gradient(circle, #fff 1px, transparent 1px)",
					backgroundSize: "48px 48px",
				}}
				aria-hidden
			/>

			<div className="relative z-10 pad-x">
				<div className="mx-auto max-w-[1600px]">
					<header className="max-w-2xl">
						<div className="flex items-center gap-4 md:gap-6">
							<p
								data-contact-ch-eyebrow
								className="font-mono text-[11px] tracking-[0.3em] text-orange-500"
							>
								{CONTACT_CHANNELS_COPY.sectionEyebrow}
							</p>
							<span
								className="h-px flex-1 bg-linear-to-r from-white/15 to-transparent"
								aria-hidden
							/>
						</div>
						<h2
							data-contact-ch-title
							id="contact-channels-heading"
							className="mt-6 text-[clamp(1.75rem,4vw,2.85rem)] font-bold tracking-tighter text-white"
						>
							{CONTACT_CHANNELS_COPY.sectionTitle}
						</h2>
						<p
							data-contact-ch-desc
							className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 md:text-base"
						>
							{CONTACT_CHANNELS_COPY.sectionDescription}
						</p>
					</header>

					<ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
						{CONTACT_CHANNELS_COPY.channels.map((ch, index) => (
							<li key={ch.id} data-contact-ch-card>
								<div className="group relative flex h-full flex-col rounded-2xl border border-white/8 bg-linear-to-b from-white/[0.06] to-white/[0.01] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow,transform] duration-500 ease-out hover:border-orange-500/25 hover:shadow-[0_28px_90px_rgba(0,0,0,0.45)] md:p-9">
									<span
										className="font-mono text-[10px] font-medium tabular-nums tracking-[0.2em] text-white/25"
										aria-hidden
									>
										{String(index + 1).padStart(2, "0")}
									</span>
									<h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
										{ch.title}
									</h3>
									<p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
										{ch.body}
									</p>
									<p className="mt-5 font-mono text-[12px] text-white/40">{ch.email}</p>
									<Button
										asChild
										variant="outline"
										size="lg"
										className="mt-6 w-full border-white/15 bg-white/[0.02] text-white/90 transition-colors duration-300 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 group-hover:text-orange-400 md:w-auto"
									>
										<a
											href={mailtoHref(ch.email, ch.mailtoSubject)}
											aria-label={`${ch.ctaLabel}: ${ch.email}`}
										>
											{ch.ctaLabel}
										</a>
									</Button>
								</div>
							</li>
						))}
					</ul>

					<div
						data-contact-ch-social
						className="mt-16 rounded-2xl border border-white/8 bg-[#0a0a0a]/85 p-8 backdrop-blur-sm md:mt-20 md:p-10"
					>
						<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
							<div>
								<h3 className="text-lg font-semibold tracking-tight text-white">
									{CONTACT_SOCIAL_COPY.title}
								</h3>
								<p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
									{CONTACT_SOCIAL_COPY.description}
								</p>
							</div>
							<ul className="flex flex-wrap items-center gap-y-2 text-sm lg:justify-end">
								{CONTACT_SOCIAL_COPY.links.map((item) => (
									<li
										key={item.href}
										className="flex items-center before:mr-2.5 before:text-white/25 before:content-['·'] first:before:hidden"
									>
										<Link
											href={item.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-orange-500/90 underline-offset-4 transition-colors hover:text-orange-400 hover:underline"
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
