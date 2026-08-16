"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { LuChevronDown, LuCompass, LuGrid, LuLayoutTemplate, LuMenu, LuX } from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import { prefersReducedMotion } from "@/lib/useGsap";
import { LanguageSwitcher } from "@/shared/ui";
import { cn } from "@/lib/utils";

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
	const t = useTranslations("Navbar");
	const rootRef = useRef<HTMLDivElement>(null);
	const [destinationsExpanded, setDestinationsExpanded] = useState(false);

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
				const links = root.querySelectorAll(".nav-anim-item");
				if (links.length) {
					gsap.from(links, {
						y: 22,
						opacity: 0,
						stagger: 0.05,
						duration: 0.38,
						ease: "power3.out",
						delay: 0.06,
					});
				}
			} else {
				const links = root.querySelectorAll(".nav-anim-item");
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

	const destinationOptions = [
		{ href: "/destinations", label: t("destinationsStandard") },
		{ href: "/destinations-2", label: t("destinationsStage") },
		{ href: "/destinations-3", label: t("destinationsCinematic") },
	];

	return createPortal(
		<div
			ref={rootRef}
			id={id}
			role="dialog"
			aria-modal="true"
			aria-label={t("mobileNav")}
			className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-6 overflow-y-auto bg-[#0a0a0a] px-6 py-12 md:hidden"
		>
			<div className="flex w-full max-w-sm flex-col items-center gap-5">
				{/* Destinations Expandable Section */}
				<div className="nav-anim-item flex w-full flex-col items-center">
					<button
						type="button"
						onClick={() => setDestinationsExpanded((prev) => !prev)}
						className="flex items-center gap-2 text-2xl font-light text-white transition-colors hover:text-orange-500"
					>
						<span>{t("destinations")}</span>
						<LuChevronDown
							className={cn(
								"h-5 w-5 text-white/50 transition-transform duration-200",
								destinationsExpanded && "rotate-180 text-orange-400",
							)}
						/>
					</button>

					{destinationsExpanded && (
						<div className="mt-3 flex flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 w-full animate-in fade-in slide-in-from-top-2 duration-150">
							{destinationOptions.map((opt) => (
								<Link
									key={opt.href}
									href={opt.href}
									onClick={onNavigate}
									className="text-base text-white/80 transition-colors hover:text-orange-400"
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
					className="nav-anim-item text-2xl font-light text-white transition-colors hover:text-orange-500"
				>
					{t("tours")}
				</Link>

				<Link
					href="/about"
					onClick={onNavigate}
					className="nav-anim-item text-2xl font-light text-white transition-colors hover:text-orange-500"
				>
					{t("about")}
				</Link>

				<Link
					href="/contact"
					onClick={onNavigate}
					className="nav-anim-item text-2xl font-light text-white transition-colors hover:text-orange-500"
				>
					{t("contact")}
				</Link>

				<Link
					href="/stories"
					onClick={onNavigate}
					className="nav-anim-item text-2xl font-light text-white transition-colors hover:text-orange-500"
				>
					{t("stories")}
				</Link>

				<div className="nav-anim-item mt-4 pt-4 border-t border-white/10 flex flex-col items-center gap-4 w-full">
					<LanguageSwitcher />
					<Link
						href="/contact"
						onClick={onNavigate}
						className="rounded-full border border-orange-500/50 bg-orange-500/10 px-8 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-orange-400 transition-colors hover:bg-orange-500 hover:text-white"
					>
						{t("letsTalk")}
					</Link>
				</div>
			</div>
		</div>,
		document.body,
	);
}

export default function Navbar() {
	const t = useTranslations("Navbar");
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const [menuInDom, setMenuInDom] = useState(false);
	const [destinationsOpen, setDestinationsOpen] = useState(false);
	const destinationsRef = useRef<HTMLDivElement>(null);
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
		const handleClickOutside = (event: MouseEvent) => {
			if (
				destinationsRef.current &&
				!destinationsRef.current.contains(event.target as Node)
			) {
				setDestinationsOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				if (open) closeMobileNav();
				setDestinationsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("keydown", handleKeyDown);
		};
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

	const destinationMenuItems = [
		{
			href: "/destinations",
			title: t("destinationsStandard"),
			icon: LuGrid,
			description: "Classic grid layout with interactive style filters",
		},
		{
			href: "/destinations-2",
			title: t("destinationsStage"),
			icon: LuLayoutTemplate,
			description: "Cinematic spotlight stage & interactive filmstrip",
		},
		{
			href: "/destinations-3",
			title: t("destinationsCinematic"),
			icon: LuCompass,
			description: "Immersive visual masonry and card exploration",
		},
	];

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

				<nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:gap-10 md:flex">
					{/* Destinations Dropdown */}
					<div
						ref={destinationsRef}
						className="relative"
						onMouseEnter={() => setDestinationsOpen(true)}
						onMouseLeave={() => setDestinationsOpen(false)}
					>
						<button
							type="button"
							onClick={() => setDestinationsOpen((prev) => !prev)}
							aria-expanded={destinationsOpen}
							aria-haspopup="true"
							className="group inline-flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.18em] text-white/50 transition-colors duration-200 hover:text-white focus:outline-none"
						>
							<span className={cn(destinationsOpen && "text-white")}>{t("destinations")}</span>
							<LuChevronDown
								className={cn(
									"h-3.5 w-3.5 text-white/40 transition-transform duration-200 group-hover:text-orange-400",
									destinationsOpen && "rotate-180 text-orange-400",
								)}
							/>
						</button>

						{destinationsOpen && (
							<div className="absolute left-1/2 -translate-x-1/2 top-full z-120 mt-2 w-72 origin-top rounded-2xl border border-white/12 bg-[#0c0c0c]/98 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
								<div className="space-y-1">
									{destinationMenuItems.map((item) => {
										const Icon = item.icon;
										return (
											<Link
												key={item.href}
												href={item.href}
												onClick={() => setDestinationsOpen(false)}
												className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/8 group/item"
											>
												<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-orange-400 group-hover/item:border-orange-500/40 group-hover/item:bg-orange-500/10">
													<Icon className="h-4 w-4" />
												</div>
												<div>
													<p className="text-[13px] font-medium text-white group-hover/item:text-orange-400">
														{item.title}
													</p>
													<p className="text-[11px] text-white/45 leading-snug line-clamp-1">
														{item.description}
													</p>
												</div>
											</Link>
										);
									})}
								</div>
							</div>
						)}
					</div>

					<Link
						href="/tours"
						className="text-[13px] font-medium uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 hover:text-white"
					>
						{t("tours")}
					</Link>

					<Link
						href="/about"
						className="text-[13px] font-medium uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 hover:text-white"
					>
						{t("about")}
					</Link>

					<Link
						href="/contact"
						className="text-[13px] font-medium uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 hover:text-white"
					>
						{t("contact")}
					</Link>

					<Link
						href="/stories"
						className="text-[13px] font-medium uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 hover:text-white"
					>
						{t("stories")}
					</Link>
				</nav>

				<div className="hidden items-center gap-4 md:flex">
					<LanguageSwitcher compact />
					<Link
						href="/contact"
						className="rounded-full border border-white/15 px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-white/70 transition-all duration-300 hover:border-orange-500 hover:text-orange-500"
					>
						{t("letsTalk")}
					</Link>
				</div>

				<button
					type="button"
					onClick={toggleMobileNav}
					className="relative z-50 md:hidden"
					aria-label={t("toggleMenu")}
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
