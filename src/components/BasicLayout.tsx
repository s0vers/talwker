import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { LuMenu } from "react-icons/lu";

export default function BasicLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
			<header className="absolute top-0 z-50 my-4 flex h-16 w-full items-center gap-4 px-4 md:px-6">
				<nav className="flex w-full items-center justify-between gap-4">
					<Image
						src="/simple.png"
						alt="Talkwer logo"
						width={150}
						height={32}
						className="rounded-md bg-orange-400 p-2"
					/>
					<div className="hidden w-full items-center justify-center gap-8 align-middle text-2xl font-semibold text-white md:flex">
						<div className="flex gap-4 rounded-full bg-orange-400/80 px-6 py-3">
							<Link
								href="/travel"
								className=" transition duration-200 ease-in-out hover:scale-110 hover:text-[#2a9d8f]"
							>
								Travel
							</Link>
							<Link
								href="/technology"
								className="transition duration-200 ease-in-out hover:scale-110 hover:text-[#264653]"
							>
								Technology
							</Link>
							<Link
								href="/food"
								className="transition duration-200 ease-in-out hover:scale-110 hover:text-[#3f84e5]"
							>
								Food
							</Link>
							<Link
								href="/lifestyle"
								className="transition duration-200 ease-in-out hover:scale-110 hover:text-[#e76f51]"
							>
								Lifestyle
							</Link>
						</div>
					</div>
					<Sheet>
						<SheetTrigger asChild>
							<div className="md:hidden">
								<LuMenu className="h-8 w-8" />
								<span className="sr-only">Toggle navigation menu</span>
							</div>
						</SheetTrigger>
						<SheetContent side="left" className="bg-orange-100">
							<nav className="grid gap-6 text-lg font-medium">
								<Link
									href="#"
									className="flex items-center gap-2 text-lg font-semibold"
								>
									<Image
										src="/simple.png"
										alt="Talkwer logo"
										width={150}
										height={32}
										className="rounded-md bg-orange-400 p-1"
									/>
								</Link>
								<div className="flex flex-col gap-4 text-xl font-semibold text-[#2a9d8f]">
									<Link href="/travel">Travel</Link>
									<Link href="/technology">Technology</Link>
									<Link href="/food">Food</Link>
									<Link href="/lifestyle">Lifestyle</Link>
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
