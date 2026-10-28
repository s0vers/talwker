import { MARQUEE_WORDS } from "@/features/home/content/section-copy";

export default function Marquee() {
	const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

	return (
		<div className="overflow-hidden border-y border-white/6 bg-[#0a0a0a] py-6">
			<div className="marquee-track flex w-max items-center gap-8">
				{items.map((w, i) => (
					<div key={i} className="flex items-center gap-8">
						<span className="text-[clamp(1.2rem,3vw,2rem)] font-light tracking-tight whitespace-nowrap text-white/60">
							{w}
						</span>
						<span className="h-1.5 w-1.5 rounded-full bg-orange-500/60" />
					</div>
				))}
			</div>
		</div>
	);
}
