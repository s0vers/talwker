"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { LuChevronDown } from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { LanguageSwitcher } from "@/shared/ui";
import { cn } from "@/lib/utils";

import type { NavbarCopy } from "./navbar-copy";

export default function MobileNavPortal({
	copy,
	open,
	showPortal,
	onExitComplete,
	onNavigate,
	id
}: {
	copy: NavbarCopy;
	open: boolean;
	showPortal: boolean;
	onExitComplete: () => void;
	onNavigate: () => void;
	id: string;
}) {
	const rootRef = useRef<HTMLDivElement>(null);
	const [homeExpanded, setHomeExpanded] = useState(false);
	const [destinationsExpanded, setDestinationsExpanded] = useState(false);

	useEffect(() => {
		if (!open) return;
		const root = rootRef.current;
		if (!root) return;
		root.focus();

		const keepFocusInside = (event: KeyboardEvent) => {
			if (event.key !== "Tab") return;
			const focusable = Array.from(
				root.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled]), [tabindex="0"]'
				)
			);
			if (!focusable.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (
				event.shiftKey &&
				(document.activeElement === first || document.activeElement === root)
			) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", keepFocusInside);
		return () => document.removeEventListener("keydown", keepFocusInside);
	}, [open]);

	useLayoutEffect(() => {
		if (!showPortal || typeof window === "undefined") return;
		const root = rootRef.current;
		if (!root) return;

		if (prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			if (open) {
				gsap.fromTo(
					root,
					{ opacity: 0 },
					{ opacity: 1, duration: 0.28, ease: "power2.out" }
				);
				const links = root.querySelectorAll(".nav-anim-item");
				if (links.length) {
					gsap.from(links, {
						y: 22,
						opacity: 0,
						stagger: 0.05,
						duration: 0.38,
						ease: "power3.out",
						delay: 0.06
					});
				}
			} else {
				const links = root.querySelectorAll(".nav-anim-item");
				const tl = gsap.timeline({
					onComplete: onExitComplete
				});
				if (links.length) {
					tl.to(
						links,
						{
							opacity: 0,
							y: -12,
							stagger: 0.03,
							duration: 0.12,
							ease: "power2.in"
						},
						0
					);
				}
				tl.to(root, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0.08);
			}
		}, root);

		return () => ctx.revert();
	}, [showPortal, open, onExitComplete]);

	if (typeof document === "undefined" || !showPortal) return null;

	const homeOptions = [
		{ href: "/", label: copy.homeJournal },
		{ href: "/home-2", label: copy.homeAtelier },
		{ href: "/home-3", label: copy.homeObservatory }
	];

	const destinationOptions = [
		{ href: "/destinations", label: copy.destinationsStandard },
		{ href: "/destinations-2", label: copy.destinationsStage },
		{ href: "/destinations-3", label: copy.destinationsCinematic }
	];

	return createPortal(
		<div
			ref={rootRef}
			id={id}
			role="dialog"
			aria-modal="true"
			aria-label={copy.mobileNav}
			tabIndex={-1}
			inert={!open}
			className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-6 overflow-y-auto bg-[#0a0a0a] px-6 py-12 xl:hidden"
		>
			<div className="flex w-full max-w-sm flex-col items-center gap-5">
				<div className="nav-anim-item flex w-full flex-col items-center">
					<button
						type="button"
						onClick={() => setHomeExpanded(prev => !prev)}
						aria-expanded={homeExpanded}
						aria-controls={homeExpanded ? "mobile-home-options" : undefined}
						className="flex min-h-11 items-center gap-2 rounded-sm text-2xl font-light text-white transition-colors hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					>
						<span>{copy.home}</span>
						<LuChevronDown
							className={cn(
								"h-5 w-5 text-white/50 transition-transform duration-200",
								homeExpanded && "rotate-180 text-orange-400"
							)}
						/>
					</button>

					{homeExpanded && (
						<div
							id="mobile-home-options"
							className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 mt-3 flex w-full flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 duration-150"
						>
							{homeOptions.map(opt => (
								<Link
									key={opt.href}
									href={opt.href}
									onClick={onNavigate}
									className="inline-flex min-h-11 items-center rounded-sm text-base text-white/80 transition-colors hover:text-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
								>
									{opt.label}
								</Link>
							))}
						</div>
					)}
				</div>

				<div className="nav-anim-item flex w-full flex-col items-center">
					<button
						type="button"
						onClick={() => setDestinationsExpanded(prev => !prev)}
						aria-expanded={destinationsExpanded}
						aria-controls={
							destinationsExpanded ? "mobile-destinations-options" : undefined
						}
						className="flex min-h-11 items-center gap-2 rounded-sm text-2xl font-light text-white transition-colors hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					>
						<span>{copy.destinations}</span>
						<LuChevronDown
							className={cn(
								"h-5 w-5 text-white/50 transition-transform duration-200",
								destinationsExpanded && "rotate-180 text-orange-400"
							)}
						/>
					</button>

					{destinationsExpanded && (
						<div
							id="mobile-destinations-options"
							className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 mt-3 flex w-full flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 duration-150"
						>
							{destinationOptions.map(opt => (
								<Link
									key={opt.href}
									href={opt.href}
									onClick={onNavigate}
									className="inline-flex min-h-11 items-center rounded-sm text-base text-white/80 transition-colors hover:text-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
								>
									{opt.label}
								</Link>
							))}
						</div>
					)}
				</div>

				<Link
					href="/tours"
					onClick={onNavigate}
					className="nav-anim-item inline-flex min-h-11 items-center rounded-sm text-2xl font-light text-white transition-colors hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					{copy.tours}
				</Link>

				<Link
					href="/about"
					onClick={onNavigate}
					className="nav-anim-item inline-flex min-h-11 items-center rounded-sm text-2xl font-light text-white transition-colors hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					{copy.about}
				</Link>

				<Link
					href="/contact"
					onClick={onNavigate}
					className="nav-anim-item inline-flex min-h-11 items-center rounded-sm text-2xl font-light text-white transition-colors hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					{copy.contact}
				</Link>

				<Link
					href="/stories"
					onClick={onNavigate}
					className="nav-anim-item inline-flex min-h-11 items-center rounded-sm text-2xl font-light text-white transition-colors hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					{copy.stories}
				</Link>

				<div className="nav-anim-item mt-4 flex w-full flex-col items-center gap-4 border-t border-white/10 pt-4">
					<LanguageSwitcher />
					<Link
						href="/contact"
						onClick={onNavigate}
						className="rounded-full border border-orange-500/50 bg-orange-500/10 px-8 py-2.5 text-sm font-semibold tracking-[0.15em] text-orange-400 uppercase transition-colors hover:bg-orange-500 hover:text-[#050505]"
					>
						{copy.letsTalk}
					</Link>
				</div>
			</div>
		</div>,
		document.body
	);
}
