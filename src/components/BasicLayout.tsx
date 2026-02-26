"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { LuMenu, LuPhone, LuMail, LuMapPin } from "react-icons/lu";
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaYoutube,
} from "react-icons/fa";

const NAV_LINKS = [
	{ href: "#destinations", label: "Destinations" },
	{ href: "#tours", label: "Tours" },
	{ href: "#about", label: "Why Us" },
	{ href: "#testimonials", label: "Reviews" },
	{ href: "#contact", label: "Contact" },
];

export default function BasicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<main className="min-h-screen">
			<header
				className={`fixed top-0 z-50 w-full transition-all duration-300 ${
					scrolled
						? "bg-white/95 shadow-lg backdrop-blur-md"
						: "bg-transparent"
				}`}
			>
				<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
					<Link href="/" className="flex items-center gap-2">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500">
							<span className="text-lg font-bold text-white">V</span>
						</div>
						<span
							className={`text-2xl font-bold tracking-tight ${
								scrolled ? "text-gray-900" : "text-white"
							}`}
						>
							Voyager
						</span>
					</Link>

					<nav className="hidden items-center gap-8 lg:flex">
						{NAV_LINKS.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`text-sm font-medium transition-colors hover:text-sky-500 ${
									scrolled
										? "text-gray-600"
										: "text-white/80 hover:text-white"
								}`}
							>
								{link.label}
							</Link>
						))}
					</nav>

					<div className="hidden items-center gap-3 lg:flex">
						<Link
							href="#contact"
							className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
								scrolled
									? "bg-sky-500 text-white hover:bg-sky-600"
									: "bg-white text-gray-900 hover:bg-white/90"
							}`}
						>
							Book Now
						</Link>
					</div>

					<Sheet>
						<SheetTrigger asChild>
							<button className="lg:hidden" aria-label="Open menu">
								<LuMenu
									className={`h-7 w-7 ${
										scrolled ? "text-gray-900" : "text-white"
									}`}
								/>
							</button>
						</SheetTrigger>
						<SheetContent side="right" className="w-80 bg-white p-8">
							<div className="flex flex-col gap-8">
								<div className="flex items-center gap-2">
									<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500">
										<span className="text-base font-bold text-white">V</span>
									</div>
									<span className="text-xl font-bold text-gray-900">
										Voyager
									</span>
								</div>
								<nav className="flex flex-col gap-5">
									{NAV_LINKS.map((link) => (
										<Link
											key={link.href}
											href={link.href}
											className="text-lg font-medium text-gray-600 transition-colors hover:text-sky-500"
										>
											{link.label}
										</Link>
									))}
								</nav>
								<Link
									href="#contact"
									className="rounded-full bg-sky-500 px-5 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-sky-600"
								>
									Book Now
								</Link>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</header>

			{children}

			<footer className="bg-slate-900 text-white">
				<div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
					<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
						<div>
							<div className="mb-6 flex items-center gap-2">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500">
									<span className="text-lg font-bold text-white">V</span>
								</div>
								<span className="text-2xl font-bold">Voyager</span>
							</div>
							<p className="mb-6 text-sm leading-relaxed text-slate-400">
								Crafting unforgettable travel experiences since 2010. We
								believe every journey should tell a story worth sharing.
							</p>
							<div className="flex gap-3">
								{[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
									(Icon, i) => (
										<a
											key={i}
											href="#"
											className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-sky-500 hover:text-white"
										>
											<Icon className="h-4 w-4" />
										</a>
									),
								)}
							</div>
						</div>

						<div>
							<h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
								Quick Links
							</h3>
							<ul className="space-y-3 text-sm text-slate-400">
								{["Destinations", "Tour Packages", "Special Offers", "Travel Blog", "About Us"].map(
									(item) => (
										<li key={item}>
											<a href="#" className="transition-colors hover:text-white">
												{item}
											</a>
										</li>
									),
								)}
							</ul>
						</div>

						<div>
							<h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
								Support
							</h3>
							<ul className="space-y-3 text-sm text-slate-400">
								{["FAQ", "Booking Policy", "Privacy Policy", "Terms of Service", "Cancellation"].map(
									(item) => (
										<li key={item}>
											<a href="#" className="transition-colors hover:text-white">
												{item}
											</a>
										</li>
									),
								)}
							</ul>
						</div>

						<div>
							<h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
								Contact Us
							</h3>
							<ul className="space-y-4 text-sm text-slate-400">
								<li className="flex items-start gap-3">
									<LuMapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
									<span>123 Travel Street, Adventure City, AC 10001</span>
								</li>
								<li className="flex items-center gap-3">
									<LuPhone className="h-4 w-4 shrink-0 text-sky-500" />
									<span>+1 (555) 123-4567</span>
								</li>
								<li className="flex items-center gap-3">
									<LuMail className="h-4 w-4 shrink-0 text-sky-500" />
									<span>hello@voyager.travel</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
						<p className="text-sm text-slate-500">
							&copy; 2026 Voyager Travel. All rights reserved.
						</p>
						<p className="text-sm text-slate-500">
							Designed with passion for travelers worldwide.
						</p>
					</div>
				</div>
			</footer>
		</main>
	);
}
