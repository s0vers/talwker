"use client";

import { LuDownload, LuFileText, LuMail } from "react-icons/lu";
import { PRESS_HERO, PRESS_KIT_ASSETS } from "../content/press-copy";

export function PressKits() {
	return (
		<section id="press-kits" className="bg-[#050505] text-white py-16 md:py-24 border-t border-white/6">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="mb-12">
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
						Brand Assets & Resources
					</p>
					<h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Downloadable Press Kits
					</h2>
					<p className="mt-3 max-w-2xl text-sm text-white/55">
						Request any kit by email. We send the real files from the press desk — no placeholder downloads.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{PRESS_KIT_ASSETS.map((asset) => {
						const mailto = `mailto:${PRESS_HERO.pressEmail}?subject=${encodeURIComponent(
							`Press kit request — ${asset.title}`,
						)}&body=${encodeURIComponent(
							`Hi Talkwer press desk,\n\nPlease send the following asset:\n${asset.title} (${asset.format}, ${asset.size})\n\nOutlet / publication:\nDeadline:\n\nThanks.`,
						)}`;

						return (
							<div
								key={asset.id}
								className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0a0a] p-7 transition-all hover:border-white/20"
							>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<div className="rounded-xl bg-orange-500/10 p-2.5 text-orange-500">
											<LuFileText className="h-5 w-5" />
										</div>
										<span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] text-white/50">
											{asset.format} · {asset.size}
										</span>
									</div>
									<h3 className="text-base font-bold tracking-tight text-white">{asset.title}</h3>
									<p className="text-xs leading-relaxed text-white/55">{asset.description}</p>
								</div>

								<div className="mt-6">
									<a
										href={mailto}
										className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-orange-500 hover:border-orange-500"
									>
										<LuMail className="h-4 w-4 text-orange-500" />
										Request via Email
										<LuDownload className="h-3.5 w-3.5 opacity-60" aria-hidden />
									</a>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
