type AboutValue = {
	id: number;
	number: string;
	title: string;
	description: string;
	accent: string;
};

type AboutValueCardProps = {
	value: AboutValue;
	className?: string;
};

export function AboutValueCard({ value, className }: AboutValueCardProps) {
	return (
		<div
			data-value-card
			className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#101010] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-orange-500/30 md:p-9 ${className ?? ""}`}
		>
			<div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-orange-500/5 blur-3xl transition-all duration-700 group-hover:bg-orange-500/10" />

			<span className="text-[clamp(3.4rem,7vw,6rem)] leading-none font-black text-white/4">
				{value.number}
			</span>

			<div className="relative mt-2">
				<h3 className="text-xl font-bold tracking-tight text-white md:text-[1.65rem]">
					{value.title}
				</h3>
				<p className="mt-3 text-sm leading-relaxed text-white/40 md:text-[15px]">
					{value.description}
				</p>
				<p className="mt-5 text-[12px] font-semibold text-orange-500 italic">
					{value.accent}
				</p>
			</div>

			<div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-500 transition-all duration-700 group-hover:w-full" />
		</div>
	);
}
