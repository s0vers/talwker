import { Quote } from "lucide-react";
import { PRESS_QUOTE } from "../content/press-copy";

export function PressBody() {
	return (
		<section className="bg-[#050505] text-white py-16 md:py-20 border-t border-white/6">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 md:p-12 text-center relative overflow-hidden">
					<Quote className="h-12 w-12 text-orange-500/20 mx-auto mb-4" />
					<p className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl font-serif italic text-white/90 leading-relaxed">
						&ldquo;{PRESS_QUOTE.quote}&rdquo;
					</p>
					<div className="mt-6">
						<p className="text-sm font-semibold text-white">{PRESS_QUOTE.author}</p>
						<p className="text-xs text-orange-500">{PRESS_QUOTE.title}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
