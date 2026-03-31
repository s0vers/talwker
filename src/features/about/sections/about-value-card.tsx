import type { AboutValue } from "@/features/about/content/about-copy";

type AboutValueCardProps = {
	value: AboutValue;
	className?: string;
};

export function AboutValueCard({ value, className }: AboutValueCardProps) {
	return (
		<div
			data-value-card
			className={`group relative overflow-hidden rounded-3xl border border-white/12 bg-[#101010] p-7 ring-1 ring-white/5 transition-all duration-500 before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:bg-linear-to-b before:from-white/4.5 before:to-transparent before:opacity-70 before:transition-opacity before:duration-500 hover:-translate-y-0.5 hover:border-orange-500/20 hover:ring-white/10 hover:before:opacity-100 md:p-9 ${className ?? ""}`}
		>
			<div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-orange-500/4 blur-2xl transition-all duration-700 group-hover:bg-orange-500/8" />

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
