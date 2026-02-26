"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

const LINKS = [
	{ href: "#destinations", label: "Destinations" },
	{ href: "#tours", label: "Tours" },
	{ href: "#about", label: "About" },
	{ href: "#stories", label: "Stories" },
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 60);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 z-50 w-full transition-all duration-500 ${
				scrolled
					? "bg-white/80 backdrop-blur-xl shadow-sm"
					: "bg-transparent"
			}`}
		>
			<div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between section-padding">
				<Link href="/" className="relative z-10">
					<span
						className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
							scrolled ? "text-neutral-900" : "text-white"
						}`}
					>
						talkwer
						<span className="text-orange-500">.</span>
					</span>
				</Link>

				<nav className="hidden items-center gap-10 md:flex">
					{LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`text-[13px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
								scrolled
									? "text-neutral-500 hover:text-neutral-900"
									: "text-white/70 hover:text-white"
							}`}
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="hidden md:block">
					<Link
						href="#contact"
						className={`rounded-full px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
							scrolled
								? "bg-neutral-900 text-white hover:bg-neutral-800"
								: "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 ring-1 ring-white/20"
						}`}
					>
						Get in Touch
					</Link>
				</div>

				{/* Mobile */}
				<button
					onClick={() => setOpen(!open)}
					className="relative z-10 md:hidden"
					aria-label="Toggle menu"
				>
					{open ? (
						<LuX className="h-6 w-6 text-neutral-900" />
					) : (
						<LuMenu
							className={`h-6 w-6 ${scrolled ? "text-neutral-900" : "text-white"}`}
						/>
					)}
				</button>
			</div>

			{open && (
				<div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-white md:hidden">
					{LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setOpen(false)}
							className="text-2xl font-semibold text-neutral-900 transition-colors hover:text-orange-500"
						>
							{link.label}
						</Link>
					))}
					<Link
						href="#contact"
						onClick={() => setOpen(false)}
						className="mt-4 rounded-full bg-neutral-900 px-8 py-3 text-sm font-semibold text-white"
					>
						Get in Touch
					</Link>
				</div>
			)}
		</header>
	);
}
