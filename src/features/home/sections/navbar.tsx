"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { LuMenu, LuX } from "react-icons/lu";
import {
	NAVBAR_CTA_LABEL,
	NAV_LINKS,
} from "@/features/home/content/section-copy";
import { prefersReducedMotion } from "@/lib/useGsap";

function MobileNavPortal({
	open,
	showPortal,
	onExitComplete,
	onNavigate,
	id,
}: {
	open: boolean;
	showPortal: boolean;
	onExitComplete: () => void;
	onNavigate: () => void;
	id: string;
}) {
	const rootRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!showPortal || typeof window === "undefined") return;
		const root = rootRef.current;
		if (!root) return;

		if (prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			if (open) {
				gsap.fromTo(
					root,
					{ autoAlpha: 0 },
					{ autoAlpha: 1, duration: 0.28, ease: "power2.out" },
				);
				const links = root.querySelectorAll("a");
				if (links.length) {
					gsap.from(links, {
						y: 22,
						opacity: 0,
						stagger: 0.06,
						duration: 0.38,
						ease: "power3.out",
						delay: 0.06,
					});
				}
			} else {
				const links = root.querySelectorAll("a");
				const tl = gsap.timeline({
					onComplete: onExitComplete,
				});
				if (links.length) {
					tl.to(
						links,
						{
							opacity: 0,
							y: -12,
							stagger: 0.03,
							duration: 0.12,
							ease: "power2.in",
						},
						0,
					);
				}
				tl.to(
					root,
					{ autoAlpha: 0, duration: 0.2, ease: "power2.in" },
					0.08,
				);
			}
		}, root);

		return () => ctx.revert();
	}, [showPortal, open, onExitComplete]);

	if (typeof document === "undefined" || !showPortal) return null;

	return createPortal(
		<div
			ref={rootRef}
			id={id}
			role="dialog"
			aria-modal="true"
			aria-label="Mobile navigation"
			className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-8 bg-[#0a0a0a] md:hidden"
		>
			{NAV_LINKS.map((l) => (
				<Link
					key={l.href}
					href={l.href}
					onClick={onNavigate}
					className="text-3xl font-light text-white transition-colors hover:text-orange-500"
				>
					{l.label}
				</Link>
			))}
		</div>,
		document.body,
	);
}

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const [menuInDom, setMenuInDom] = useState(false);
	const mobileMenuId = "mobile-navigation";

	const showMobileLayer = open || menuInDom;

	const onMenuExitComplete = useCallback(() => {
		setMenuInDom(false);
	}, []);

	const closeMobileNav = useCallback(() => {
		setOpen(false);
		if (typeof window !== "undefined" && prefersReducedMotion()) {
			setMenuInDom(false);
		}
	}, []);

	const toggleMobileNav = () => {
		if (!showMobileLayer) {
			setMenuInDom(true);
			setOpen(true);
			return;
		}
		setOpen(false);
		if (prefersReducedMotion()) {
			setMenuInDom(false);
			return;
		}
		// Exit animation in progress: `open` is already false; drop the layer without reopening.
		if (!open) {
			setMenuInDom(false);
		}
	};

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 60);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		if (!open) return;
		const onEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				closeMobileNav();
			}
		};
		window.addEventListener("keydown", onEscape);
		return () => window.removeEventListener("keydown", onEscape);
	}, [open, closeMobileNav]);

	useEffect(() => {
		if (!showMobileLayer) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [showMobileLayer]);

	useEffect(() => {
		if (!open) return;
		const mq = window.matchMedia("(min-width: 768px)");
		const closeOnDesktop = () => {
			if (mq.matches) closeMobileNav();
		};
		closeOnDesktop();
		mq.addEventListener("change", closeOnDesktop);
		return () => mq.removeEventListener("change", closeOnDesktop);
	}, [open, closeMobileNav]);

	return (
		<header
			className={`fixed top-0 w-full transition-[background-color] duration-300 ease-out ${
				showMobileLayer ? "z-110" : "z-50"
			} ${
				scrolled
					? "bg-[#0a0a0a]/92 backdrop-blur-md"
					: "bg-transparent"
			}`}
		>
			<div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between pad-x">
				<Link href="/" className="relative z-50">
					<span className="text-xl font-bold tracking-tight text-white">
						talkwer<span className="text-orange-500">.</span>
					</span>
				</Link>

				<nav aria-label="Primary navigation" className="hidden items-center gap-10 md:flex">
					{NAV_LINKS.map((l) => (
						<Link
							key={l.href}
							href={l.href}
							className="text-[13px] font-medium uppercase tracking-[0.18em] text-white/40 transition-colors duration-300 hover:text-white"
						>
							{l.label}
						</Link>
					))}
				</nav>

				<Link
					href="#contact"
					className="hidden rounded-full border border-white/15 px-6 py-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-white/60 transition-all duration-300 hover:border-orange-500 hover:text-orange-500 md:inline-flex"
				>
					{NAVBAR_CTA_LABEL}
				</Link>

				<button
					type="button"
					onClick={toggleMobileNav}
					className="relative z-50 md:hidden"
					aria-label="Toggle menu"
					aria-expanded={showMobileLayer}
					aria-controls={mobileMenuId}
				>
					{showMobileLayer ? (
						<LuX className="h-6 w-6 text-white" />
					) : (
						<LuMenu className="h-6 w-6 text-white" />
					)}
				</button>
			</div>

			<MobileNavPortal
				id={mobileMenuId}
				open={open}
				showPortal={showMobileLayer}
				onExitComplete={onMenuExitComplete}
				onNavigate={closeMobileNav}
			/>
		</header>
	);
}

