"use client";

import Image from "next/image";
import { LuSend } from "react-icons/lu";

export default function Newsletter() {
	return (
		<section
			id="newsletter"
			className="relative overflow-hidden bg-[#070707] py-28 md:py-36"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="relative overflow-hidden rounded-[2rem] border border-white/10">
					<div className="absolute inset-0">
						<Image
							src="/image.jpg"
							alt="Subscribe background"
							fill
							sizes="(max-width: 768px) 100vw, 80vw"
							className="object-cover"
						/>
					</div>
					<div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/55 to-orange-500/45" />
					<div className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />

					<div className="relative px-8 py-16 text-center md:px-16 md:py-24">
						<p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							Stay in the Loop
						</p>
						<h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-tighter text-white">
							Get Exclusive Travel Deals
						</h2>
						<p className="mx-auto mb-10 mt-6 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
							Subscribe to our newsletter and be the first to know about
							flash sales, new destinations, and insider travel tips.
						</p>

						<div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm text-white placeholder:text-white/55 backdrop-blur-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/60"
							/>
							<button
								type="button"
								className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-orange-400"
							>
								<LuSend className="h-4 w-4" />
								Subscribe
							</button>
						</div>

						<p className="mt-4 text-xs text-white/60">
							No spam, ever. Unsubscribe anytime.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
