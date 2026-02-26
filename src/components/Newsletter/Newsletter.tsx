"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LuSend } from "react-icons/lu";

export default function Newsletter() {
	return (
		<section id="contact" className="relative overflow-hidden bg-background py-24">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<div className="relative overflow-hidden rounded-3xl">
					<Image
						src="/image.jpg"
						alt="Subscribe background"
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />

					<div className="relative px-8 py-16 text-center md:px-16 md:py-24">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/80">
								Stay in the Loop
							</p>
							<h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
								Get Exclusive Travel Deals
							</h2>
							<p className="mx-auto mb-10 max-w-xl text-white/80">
								Subscribe to our newsletter and be the first to know about
								flash sales, new destinations, and insider travel tips.
							</p>

							<div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
								<input
									type="email"
									placeholder="Enter your email"
									className="flex-1 rounded-full bg-white/20 px-6 py-3.5 text-sm text-white placeholder:text-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
								/>
								<button className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-white/90">
									<LuSend className="h-4 w-4" />
									Subscribe
								</button>
							</div>

							<p className="mt-4 text-xs text-white/60">
								No spam, ever. Unsubscribe anytime.
							</p>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
