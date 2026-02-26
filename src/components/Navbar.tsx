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
		const fn = () => setScrolled(window.scrollY > 60);
		window.addEventListener("scroll", fn);
		return () => window.removeEventListener("scroll", fn);
	}, []);

	return (
		<header
			className={`fixed top-0 z-50 w-full transition-all duration-700 ${
				scrolled
					? "bg-[#0a0a0a]/90 backdrop-blur-xl"
					: "bg-transparent"
			}`}
		>
			<div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between pad-x">
				<Link href="/" className="relative z-50">
					<span className="text-xl font-bold tracking-tight text-white">
						talkwer<span className="text-orange-500">.</span>
					</span>
				</Link>

				<nav className="hidden items-center gap-10 md:flex">
					{LINKS.map((l) => (
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
					Let&apos;s Talk
				</Link>

				<button
					onClick={() => setOpen(!open)}
					className="relative z-50 md:hidden"
					aria-label="Toggle menu"
				>
					{open ? (
						<LuX className="h-6 w-6 text-white" />
					) : (
						<LuMenu className="h-6 w-6 text-white" />
					)}
				</button>
			</div>

			{open && (
				<div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#0a0a0a] md:hidden">
					{LINKS.map((l) => (
						<Link
							key={l.href}
							href={l.href}
							onClick={() => setOpen(false)}
							className="text-3xl font-light text-white/70 transition-colors hover:text-orange-500"
						>
							{l.label}
						</Link>
					))}
				</div>
			)}
		</header>
	);
}
