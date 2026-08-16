"use client";

import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { cn } from "@/lib/utils";

import { ButtonWithIcon } from "./button-with-icon";

const secondaryClassName =
	"rounded-full border border-white/10 px-10 py-4 text-[13px] font-semibold uppercase tracking-widest text-white/40 transition-all duration-300 hover:border-white/30 hover:text-white";

export type EditorialCtaBandAction = {
	label: string;
	href?: string;
	onClick?: () => void;
};

export type EditorialCtaBandProps = {
	label: string;
	titleLead: string;
	titleAccent: string;
	description: string;
	primary: EditorialCtaBandAction;
	secondary?: EditorialCtaBandAction;
	/** Section `id` (e.g. `contact` for in-page anchors). */
	id?: string;
	/** Sets `aria-labelledby` on the section and `id` on the `<h2>`. */
	headingId?: string;
	/** Top rule + orange hairline (destinations, about, destination details). */
	showTopFrame?: boolean;
};

function CtaControl({
	action,
	variant,
}: {
	action: EditorialCtaBandAction;
	variant: "primary" | "secondary";
}) {
	if (variant === "primary") {
		return (
			<ButtonWithIcon
				href={action.href}
				onClick={action.onClick}
				variant="orange"
				size="lg"
				className="shadow-2xl shadow-orange-500/25"
			>
				{action.label}
			</ButtonWithIcon>
		);
	}

	if (action.href) {
		return (
			<Link href={action.href} className={secondaryClassName} onClick={action.onClick}>
				{action.label}
			</Link>
		);
	}

	return (
		<button type="button" className={secondaryClassName} onClick={action.onClick}>
			{action.label}
		</button>
	);
}

export function EditorialCtaBand({
	label,
	titleLead,
	titleAccent,
	description,
	primary,
	secondary,
	id,
	headingId,
	showTopFrame = false,
}: EditorialCtaBandProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const headRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion() || !headRef.current) return;
			gsap.fromTo(
				headRef.current.children,
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.9,
					stagger: 0.1,
					ease: "power3.out",
					clearProps: "opacity,transform",
					scrollTrigger: { trigger: headRef.current, start: "top 85%", once: true },
				},
			);
		},
		[],
	);

	return (
		<section
			ref={sectionRef}
			id={id}
			{...(headingId ? { "aria-labelledby": headingId } : {})}
			className={cn("relative bg-[#0a0a0a] py-32 md:py-44", showTopFrame && "border-t border-white/6")}
		>
			<div
				className="absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
					backgroundSize: "30px 30px",
				}}
			/>
			{showTopFrame ? (
				<div
					className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-orange-500/25 to-transparent"
					aria-hidden
				/>
			) : null}

			<div ref={headRef} className="relative mx-auto max-w-[1600px] pad-x text-center">
				<span className="mb-6 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
					{label}
				</span>
				<h2
					{...(headingId ? { id: headingId } : {})}
					className="mx-auto max-w-4xl text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.9] tracking-tighter text-white"
				>
					{titleLead}{" "}
					<span className="font-light italic text-orange-500">{titleAccent}</span>
				</h2>
				<p className="mx-auto mt-8 max-w-lg text-base text-white/30">{description}</p>
				<div
					className={cn(
						"mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center",
						!secondary && "sm:flex-col",
					)}
				>
					<CtaControl action={primary} variant="primary" />
					{secondary ? <CtaControl action={secondary} variant="secondary" /> : null}
				</div>
			</div>
		</section>
	);
}
