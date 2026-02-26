import Link from "next/link";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const FOOTER_LINKS = {
	Explore: ["Destinations", "Tours", "Experiences", "Travel Blog"],
	Company: ["About Us", "Careers", "Press", "Partners"],
	Support: ["FAQ", "Booking Policy", "Cancellation", "Contact"],
};

export default function Footer() {
	return (
		<footer className="border-t border-neutral-100 bg-white">
			<div className="mx-auto max-w-[1400px] section-padding py-16 md:py-20">
				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
					<div className="lg:col-span-2">
						<Link href="/" className="inline-block">
							<span className="text-2xl font-bold tracking-tight text-neutral-900">
								talkwer
								<span className="text-orange-500">.</span>
							</span>
						</Link>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
							Crafting unforgettable journeys since 2010. We believe the
							best stories begin with a single step into the unknown.
						</p>
						<div className="mt-6 flex gap-3">
							{[FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
								<a
									key={i}
									href="#"
									className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 transition-all hover:bg-orange-500 hover:text-white"
								>
									<Icon className="h-4 w-4" />
								</a>
							))}
						</div>
					</div>

					{Object.entries(FOOTER_LINKS).map(([title, links]) => (
						<div key={title}>
							<h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-900">
								{title}
							</h4>
							<ul className="mt-5 space-y-3">
								{links.map((link) => (
									<li key={link}>
										<a
											href="#"
											className="text-sm text-neutral-400 transition-colors hover:text-neutral-900"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-100 pt-8 md:flex-row">
					<p className="text-xs text-neutral-400">
						&copy; 2026 Talkwer. All rights reserved.
					</p>
					<div className="flex gap-6 text-xs text-neutral-400">
						<a href="#" className="hover:text-neutral-900">Privacy</a>
						<a href="#" className="hover:text-neutral-900">Terms</a>
						<a href="#" className="hover:text-neutral-900">Cookies</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
