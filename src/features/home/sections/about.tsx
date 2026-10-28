import Image from "next/image";
import type { AboutCopy } from "../lib/home-static-copy";
import { AboutFrame } from "./about-frame";

function Stat({
	value,
	suffix,
	label
}: {
	value: number;
	suffix: string;
	label: string;
}) {
	return (
		<div className="min-w-0 border-l border-white/10 pl-3 sm:pl-6">
			<div className="flex items-baseline gap-1">
				<span
					data-about-count={value}
					className="text-3xl font-bold text-white tabular-nums sm:text-4xl md:text-5xl"
				>
					{value.toLocaleString("en-US")}
				</span>
				<span className="text-2xl font-bold text-orange-500">{suffix}</span>
			</div>
			<p className="mt-1 text-[13px] text-white/60">{label}</p>
		</div>
	);
}

export default function About({ copy }: { copy: AboutCopy }) {
	const stats = [
		{ value: 500, suffix: "+", label: copy.statDestinations },
		{ value: 15, suffix: "", label: copy.statExperience },
		{ value: 50, suffix: "k+", label: copy.statTravelers }
	];

	return (
		<AboutFrame>
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
					<div data-about-text>
						<span className="mb-5 inline-block text-[11px] font-semibold tracking-[0.25em] text-orange-500 uppercase">
							{copy.label}
						</span>
						<h2
							id="about-title"
							className="text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.95] font-bold tracking-tighter text-white"
						>
							{copy.titleLead}
							<br />
							{copy.titleLine2Prefix}{" "}
							<span className="font-light text-orange-500 italic">
								{copy.titleAccent}
							</span>
						</h2>
						<p className="mt-8 max-w-md text-base leading-relaxed text-white/60">
							{copy.description}
						</p>
						<div className="mt-14 grid grid-cols-3 gap-3 sm:gap-6">
							{stats.map(stat => (
								<Stat
									key={stat.label}
									value={stat.value}
									suffix={stat.suffix}
									label={stat.label}
								/>
							))}
						</div>
					</div>

					<div
						data-about-image
						className="relative overflow-hidden rounded-3xl"
						style={{ clipPath: "inset(0 0% 0 0)" }}
					>
						<div className="relative h-[500px] overflow-hidden lg:h-[650px]">
							<Image
								src="/plane-window-sunset.jpg"
								alt="Airplane wing above a sunset horizon"
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover"
							/>
						</div>
						<div className="absolute bottom-6 left-6 rounded-xl bg-[#0a0a0a]/80 p-5 backdrop-blur-xl">
							<p className="text-3xl font-bold text-white">4.9</p>
							<p className="text-[12px] text-white/60">{copy.ratingSummary}</p>
						</div>
					</div>
				</div>
			</div>
		</AboutFrame>
	);
}
