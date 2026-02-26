import Link from "next/link";

const COLS: Record<string, string[]> = {
	Explore: ["Destinations", "Tours", "Experiences", "Blog"],
	Company: ["About", "Careers", "Press", "Partners"],
	Support: ["FAQ", "Booking Policy", "Cancellation", "Contact"],
};

export default function Footer() {
	return (
		<footer className="border-t border-white/[0.06] bg-[#0a0a0a]">
			<div className="mx-auto max-w-[1600px] pad-x py-16 md:py-20">
				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
					<div className="lg:col-span-2">
						<Link href="/">
							<span className="text-xl font-bold tracking-tight text-white">
								talkwer<span className="text-orange-500">.</span>
							</span>
						</Link>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-white/25">
							Crafting unforgettable journeys since 2010. The best stories
							begin with a single step into the unknown.
						</p>
					</div>

					{Object.entries(COLS).map(([title, links]) => (
						<div key={title}>
							<h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
								{title}
							</h4>
							<ul className="mt-5 space-y-3">
								{links.map((l) => (
									<li key={l}>
										<a href="#" className="text-sm text-white/20 transition-colors hover:text-white/60">
											{l}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
					<p className="text-[12px] text-white/15">
						&copy; 2026 Talkwer. All rights reserved.
					</p>
					<div className="flex gap-6 text-[12px] text-white/15">
						<a href="#" className="hover:text-white/40">Privacy</a>
						<a href="#" className="hover:text-white/40">Terms</a>
						<a href="#" className="hover:text-white/40">Cookies</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
