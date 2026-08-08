import Link from "next/link";
import { MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";

export function FaqSupportCard() {
	return (
		<section className="bg-[#050505] text-white pb-24 border-t border-white/6 pt-16">
			<div className="pad-x mx-auto max-w-[1000px]">
				<div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
					<div className="space-y-3 text-center md:text-left">
						<div className="inline-flex rounded-xl bg-orange-500/10 p-3 text-orange-500 mb-1">
							<MessageSquare className="h-6 w-6" />
						</div>
						<h3 className="text-2xl font-bold tracking-tight text-white">Still Have Questions?</h3>
						<p className="text-sm text-white/60 max-w-md leading-relaxed">
							Our editorial team and trip planners are available to discuss dates, custom routes, accessibility, and booking requirements.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
						<Link
							href="/contact"
							className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-orange-600 transition-colors"
						>
							Contact Support <ArrowRight className="h-4 w-4" />
						</Link>
						<Link
							href="/booking-policy"
							className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white/70 hover:border-white/40 hover:text-white transition-colors"
						>
							<ShieldCheck className="h-4 w-4 text-orange-500" /> Booking Policy
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
