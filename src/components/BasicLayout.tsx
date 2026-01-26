import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { LuMenu, LuPlane, LuHotel, LuMapPin, LuInfo } from "react-icons/lu";

export default function BasicLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="relative min-h-screen">
			<header className="absolute top-0 z-50 w-full px-4 pt-6 md:px-6">
				<nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md shadow-lg transition-all hover:bg-white/20">
					<Link href="/" className="flex items-center gap-2">
						<Image
							src="/simple.png"
							alt="Talkwer logo"
							width={120}
							height={30}
							className="h-auto w-auto object-contain p-1"
						/>
					</Link>
					
					<div className="hidden items-center justify-center gap-8 align-middle text-sm font-medium text-white md:flex">
						<Link
							href="/destinations"
							className="group flex items-center gap-2 transition duration-200 ease-in-out hover:text-[var(--secondary)]"
						>
							Destinations
						</Link>
						<Link
							href="/tours"
							className="group flex items-center gap-2 transition duration-200 ease-in-out hover:text-[var(--secondary)]"
						>
							Tours
						</Link>
						<Link
							href="/hotels"
							className="group flex items-center gap-2 transition duration-200 ease-in-out hover:text-[var(--secondary)]"
						>
							Hotels
						</Link>
						<Link
							href="/about"
							className="group flex items-center gap-2 transition duration-200 ease-in-out hover:text-[var(--secondary)]"
						>
							About Us
						</Link>
					</div>

					<div className="hidden md:block">
						<Link href="/book-now" className="rounded-full bg-[var(--secondary)] px-6 py-2 text-sm font-semibold text-white transition hover:bg-orange-500 hover:shadow-lg">
							Book Now
						</Link>
					</div>

					<Sheet>
						<SheetTrigger asChild>
							<div className="cursor-pointer text-white md:hidden hover:text-[var(--secondary)]">
								<LuMenu className="h-8 w-8" />
								<span className="sr-only">Toggle navigation menu</span>
							</div>
						</SheetTrigger>
						<SheetContent side="right" className="w-[300px] border-l-white/10 bg-black/90 text-white backdrop-blur-xl">
							<nav className="mt-8 flex flex-col gap-6 text-lg font-medium">
								<Link
									href="/"
									className="mb-4 flex items-center gap-2"
								>
									<Image
										src="/simple.png"
										alt="Talkwer logo"
										width={120}
										height={30}
										className="h-auto w-auto object-contain bg-white/10 rounded-lg p-2"
									/>
								</Link>
								<Link href="/destinations" className="flex items-center gap-4 hover:text-[var(--secondary)]">
									<LuMapPin className="h-5 w-5" /> Destinations
								</Link>
								<Link href="/tours" className="flex items-center gap-4 hover:text-[var(--secondary)]">
									<LuPlane className="h-5 w-5" /> Tours
								</Link>
								<Link href="/hotels" className="flex items-center gap-4 hover:text-[var(--secondary)]">
									<LuHotel className="h-5 w-5" /> Hotels
								</Link>
								<Link href="/about" className="flex items-center gap-4 hover:text-[var(--secondary)]">
									<LuInfo className="h-5 w-5" /> About Us
								</Link>
								
								<div className="mt-8">
									<Link href="/book-now" className="block w-full rounded-full bg-[var(--secondary)] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-orange-500">
										Book Now
									</Link>
								</div>
							</nav>
						</SheetContent>
					</Sheet>
				</nav>
			</header>
			{children}
		</main>
	);
}
