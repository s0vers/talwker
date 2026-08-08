import { LuQuote, LuMail, LuShieldCheck } from "react-icons/lu";
import { PRESS_QUOTE, PRESS_HERO } from "../content/press-copy";

export function PressBody() {
	return (
		<section className="bg-[#050505] text-white py-16 md:py-24 border-t border-white/6">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="relative rounded-3xl border border-white/12 bg-[#0a0a0a] p-8 md:p-14 shadow-2xl overflow-hidden group hover:border-orange-500/30 transition-all duration-500">
					{/* Ambient Glow */}
					<div
						className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"
						aria-hidden
					/>

					{/* Giant Background Quote Watermark */}
					<LuQuote className="pointer-events-none absolute right-8 bottom-6 h-36 w-36 text-orange-500/5 rotate-12" aria-hidden />

					<div className="relative z-10 max-w-4xl space-y-8">
						<div className="flex items-center gap-2 text-orange-500">
							<LuQuote className="h-6 w-6" />
							<span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400">
								Executive Mission Statement
							</span>
						</div>

						<p className="text-xl sm:text-2xl md:text-3xl font-light italic text-white/95 leading-relaxed">
							&ldquo;{PRESS_QUOTE.quote}&rdquo;
						</p>

						<div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10">
							<div className="flex items-center gap-4">
								{/* Author Avatar Badge */}
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/15 border border-orange-500/30 font-bold text-sm text-orange-400 shrink-0">
									ML
								</div>
								<div>
									<div className="flex items-center gap-2">
										<p className="text-base font-bold text-white">{PRESS_QUOTE.author}</p>
										<LuShieldCheck className="h-4 w-4 text-orange-500" />
									</div>
									<p className="text-xs text-orange-400/90 font-medium">{PRESS_QUOTE.title}</p>
								</div>
							</div>

							<div>
								<a
									href={`mailto:${PRESS_HERO.pressEmail}?subject=Media Inquiry for Marcus Lindqvist`}
									className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/80 hover:border-orange-500/50 hover:text-white transition-all"
								>
									<LuMail className="h-3.5 w-3.5 text-orange-500" /> Direct Media Inquiry
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
