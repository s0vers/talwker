"use client";

import {
	lazy,
	Suspense,
	useCallback,
	useEffect,
	useRef,
	useState
} from "react";
import {
	LuChevronDown,
	LuCompass,
	LuLayers,
	LuLayoutGrid,
	LuLayoutTemplate,
	LuMenu,
	LuOrbit,
	LuSparkles,
	LuX
} from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { LanguageSwitcher } from "@/shared/ui";
import { cn } from "@/lib/utils";

import type { NavbarCopy } from "./navbar-copy";

const MobileNavPortal = lazy(() => import("./mobile-nav-portal"));

export default function Navbar({ copy }: { copy: NavbarCopy }) {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const [menuInDom, setMenuInDom] = useState(false);
	const [homeOpen, setHomeOpen] = useState(false);
	const [destinationsOpen, setDestinationsOpen] = useState(false);
	const homeRef = useRef<HTMLDivElement>(null);
	const destinationsRef = useRef<HTMLDivElement>(null);
	const homeButtonRef = useRef<HTMLButtonElement>(null);
	const destinationsButtonRef = useRef<HTMLButtonElement>(null);
	const mobileToggleRef = useRef<HTMLButtonElement>(null);
	const homeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const mobileMenuId = "mobile-navigation";

	const showMobileLayer = open || menuInDom;

	const handleHomeEnter = () => {
		if (homeTimeoutRef.current) {
			clearTimeout(homeTimeoutRef.current);
		}
		setHomeOpen(true);
	};

	const handleHomeLeave = () => {
		if (homeTimeoutRef.current) {
			clearTimeout(homeTimeoutRef.current);
		}
		homeTimeoutRef.current = setTimeout(() => {
			if (!homeRef.current?.contains(document.activeElement))
				setHomeOpen(false);
		}, 180);
	};

	const handleDestinationsEnter = () => {
		if (dropdownTimeoutRef.current) {
			clearTimeout(dropdownTimeoutRef.current);
		}
		setDestinationsOpen(true);
	};

	const handleDestinationsLeave = () => {
		if (dropdownTimeoutRef.current) {
			clearTimeout(dropdownTimeoutRef.current);
		}
		dropdownTimeoutRef.current = setTimeout(() => {
			if (!destinationsRef.current?.contains(document.activeElement))
				setDestinationsOpen(false);
		}, 180);
	};

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
			if (homeRef.current && !homeRef.current.contains(event.target as Node)) {
				setHomeOpen(false);
			}
			if (
				destinationsRef.current &&
				!destinationsRef.current.contains(event.target as Node)
			) {
				setDestinationsOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				if (open) {
					closeMobileNav();
					mobileToggleRef.current?.focus();
				}
				if (homeOpen && homeRef.current?.contains(document.activeElement))
					homeButtonRef.current?.focus();
				if (
					destinationsOpen &&
					destinationsRef.current?.contains(document.activeElement)
				)
					destinationsButtonRef.current?.focus();
				setHomeOpen(false);
				setDestinationsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [open, homeOpen, destinationsOpen, closeMobileNav]);

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
		const mq = window.matchMedia("(min-width: 1280px)");
		const closeOnDesktop = () => {
			if (mq.matches) closeMobileNav();
		};
		closeOnDesktop();
		mq.addEventListener("change", closeOnDesktop);
		return () => mq.removeEventListener("change", closeOnDesktop);
	}, [open, closeMobileNav]);

	const homeMenuItems = [
		{
			href: "/",
			title: copy.homeJournal,
			icon: LuSparkles,
			description: copy.homeJournalDesc
		},
		{
			href: "/home-2",
			title: copy.homeAtelier,
			icon: LuLayers,
			description: copy.homeAtelierDesc
		},
		{
			href: "/home-3",
			title: copy.homeObservatory,
			icon: LuOrbit,
			description: copy.homeObservatoryDesc
		}
	];

	const destinationMenuItems = [
		{
			href: "/destinations",
			title: copy.destinationsStandard,
			icon: LuLayoutGrid,
			description: copy.destinationsStandardDesc
		},
		{
			href: "/destinations-2",
			title: copy.destinationsStage,
			icon: LuLayoutTemplate,
			description: copy.destinationsStageDesc
		},
		{
			href: "/destinations-3",
			title: copy.destinationsCinematic,
			icon: LuCompass,
			description: copy.destinationsCinematicDesc
		}
	];

	return (
		<header
			className={`fixed top-0 w-full transition-[background-color] duration-300 ease-out ${
				showMobileLayer ? "z-110" : "z-50"
			} ${scrolled ? "bg-[#0a0a0a]/92 backdrop-blur-md" : "bg-[#050505]/70 backdrop-blur-sm"}`}
		>
			<div className="pad-x mx-auto flex h-20 max-w-[1600px] items-center justify-between">
				<Link
					href="/"
					prefetch={false}
					className="relative z-50 inline-flex min-h-10 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
				>
					<span className="text-xl font-bold tracking-tight text-white">
						talkwer<span className="text-orange-500">.</span>
					</span>
				</Link>

				<nav
					aria-label="Primary navigation"
					className="hidden items-center gap-8 xl:flex xl:gap-10"
				>
					<div
						ref={homeRef}
						className="relative py-2"
						onMouseEnter={handleHomeEnter}
						onMouseLeave={handleHomeLeave}
						onBlur={event => {
							if (!event.currentTarget.contains(event.relatedTarget))
								setHomeOpen(false);
						}}
					>
						<button
							ref={homeButtonRef}
							type="button"
							onClick={() => setHomeOpen(prev => !prev)}
							aria-expanded={homeOpen}
							aria-controls={homeOpen ? "home-navigation-options" : undefined}
							className="group inline-flex min-h-10 items-center gap-1.5 rounded-sm text-[13px] font-medium tracking-[0.18em] text-white/80 uppercase transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
						>
							<span className={cn(homeOpen && "text-white")}>{copy.home}</span>
							<LuChevronDown
								className={cn(
									"h-3.5 w-3.5 text-white/40 transition-transform duration-200 group-hover:text-orange-400",
									homeOpen && "rotate-180 text-orange-400"
								)}
							/>
						</button>

						{homeOpen && (
							<div
								className="absolute top-full left-1/2 z-120 w-72 origin-top -translate-x-1/2 pt-2"
								onMouseEnter={handleHomeEnter}
								onMouseLeave={handleHomeLeave}
							>
								<div
									id="home-navigation-options"
									role="group"
									aria-label={copy.home}
									className="motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 rounded-2xl border border-white/12 bg-[#0c0c0c]/98 p-2 shadow-2xl backdrop-blur-xl duration-150"
								>
									<div className="space-y-1">
										{homeMenuItems.map(item => {
											const Icon = item.icon;
											return (
												<Link
													key={item.href}
													href={item.href}
													onClick={() => setHomeOpen(false)}
													className="group/item flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/8"
												>
													<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-orange-400 group-hover/item:border-orange-500/40 group-hover/item:bg-orange-500/10">
														<Icon className="h-4 w-4" />
													</div>
													<div>
														<p className="text-[13px] font-medium text-white group-hover/item:text-orange-400">
															{item.title}
														</p>
														<p className="line-clamp-1 text-[11px] leading-snug text-white/45">
															{item.description}
														</p>
													</div>
												</Link>
											);
										})}
									</div>
								</div>
							</div>
						)}
					</div>

					<div
						ref={destinationsRef}
						className="relative py-2"
						onMouseEnter={handleDestinationsEnter}
						onMouseLeave={handleDestinationsLeave}
						onBlur={event => {
							if (!event.currentTarget.contains(event.relatedTarget))
								setDestinationsOpen(false);
						}}
					>
						<button
							ref={destinationsButtonRef}
							type="button"
							onClick={() => setDestinationsOpen(prev => !prev)}
							aria-expanded={destinationsOpen}
							aria-controls={
								destinationsOpen ? "destinations-navigation-options" : undefined
							}
							className="group inline-flex min-h-10 items-center gap-1.5 rounded-sm text-[13px] font-medium tracking-[0.18em] text-white/80 uppercase transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
						>
							<span className={cn(destinationsOpen && "text-white")}>
								{copy.destinations}
							</span>
							<LuChevronDown
								className={cn(
									"h-3.5 w-3.5 text-white/40 transition-transform duration-200 group-hover:text-orange-400",
									destinationsOpen && "rotate-180 text-orange-400"
								)}
							/>
						</button>

						{destinationsOpen && (
							<div
								className="absolute top-full left-1/2 z-120 w-72 origin-top -translate-x-1/2 pt-2"
								onMouseEnter={handleDestinationsEnter}
								onMouseLeave={handleDestinationsLeave}
							>
								<div
									id="destinations-navigation-options"
									role="group"
									aria-label={copy.destinations}
									className="motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 rounded-2xl border border-white/12 bg-[#0c0c0c]/98 p-2 shadow-2xl backdrop-blur-xl duration-150"
								>
									<div className="space-y-1">
										{destinationMenuItems.map(item => {
											const Icon = item.icon;
											return (
												<Link
													key={item.href}
													href={item.href}
													onClick={() => setDestinationsOpen(false)}
													className="group/item flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/8"
												>
													<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-orange-400 group-hover/item:border-orange-500/40 group-hover/item:bg-orange-500/10">
														<Icon className="h-4 w-4" />
													</div>
													<div>
														<p className="text-[13px] font-medium text-white group-hover/item:text-orange-400">
															{item.title}
														</p>
														<p className="line-clamp-1 text-[11px] leading-snug text-white/45">
															{item.description}
														</p>
													</div>
												</Link>
											);
										})}
									</div>
								</div>
							</div>
						)}
					</div>

					<Link
						href="/tours"
						className="inline-flex min-h-10 items-center rounded-sm text-[13px] font-medium tracking-[0.18em] text-white/80 uppercase transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
					>
						{copy.tours}
					</Link>

					<Link
						href="/about"
						className="inline-flex min-h-10 items-center rounded-sm text-[13px] font-medium tracking-[0.18em] text-white/80 uppercase transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
					>
						{copy.about}
					</Link>

					<Link
						href="/contact"
						className="inline-flex min-h-10 items-center rounded-sm text-[13px] font-medium tracking-[0.18em] text-white/80 uppercase transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
					>
						{copy.contact}
					</Link>

					<Link
						href="/stories"
						className="inline-flex min-h-10 items-center rounded-sm text-[13px] font-medium tracking-[0.18em] text-white/80 uppercase transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
					>
						{copy.stories}
					</Link>
				</nav>

				<div className="hidden items-center gap-4 xl:flex">
					<LanguageSwitcher compact />
					<Link
						href="/contact"
						className="rounded-full border border-white/15 px-5 py-2 text-[12px] font-semibold tracking-[0.15em] text-white/70 uppercase transition-all duration-300 hover:border-orange-500 hover:text-orange-500"
					>
						{copy.letsTalk}
					</Link>
				</div>

				<button
					ref={mobileToggleRef}
					type="button"
					onClick={toggleMobileNav}
					className="relative z-50 inline-flex size-11 items-center justify-center rounded-full text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xl:hidden"
					aria-label={copy.toggleMenu}
					aria-expanded={open}
					aria-controls={showMobileLayer ? mobileMenuId : undefined}
				>
					{showMobileLayer ? (
						<LuX className="h-6 w-6 text-white" />
					) : (
						<LuMenu className="h-6 w-6 text-white" />
					)}
				</button>
			</div>

			{showMobileLayer && (
				<Suspense fallback={null}>
					<MobileNavPortal
						copy={copy}
						id={mobileMenuId}
						open={open}
						showPortal={showMobileLayer}
						onExitComplete={onMenuExitComplete}
						onNavigate={closeMobileNav}
					/>
				</Suspense>
			)}
		</header>
	);
}
