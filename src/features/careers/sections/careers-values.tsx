import { Feather, Compass, ShieldCheck, Heart } from "lucide-react";
import { CAREERS_VALUES, type CultureValue } from "../content/careers-copy";

const iconMap = {
	feather: Feather,
	compass: Compass,
	shield: ShieldCheck,
	heart: Heart,
};

export function CareersValues() {
	return (
		<section className="bg-[#050505] text-white py-16 md:py-24">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="mb-12">
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
						Culture & Philosophy
					</p>
					<h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Our Core Principles
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{CAREERS_VALUES.map((val: CultureValue) => {
						const IconComponent = iconMap[val.iconName];
						return (
							<div
								key={val.id}
								className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 transition-all duration-300 hover:border-orange-500/40 hover:bg-[#121212]"
							>
								<div>
									<div className="inline-flex rounded-xl bg-orange-500/10 p-3 text-orange-500 mb-6 group-hover:scale-110 transition-transform">
										<IconComponent className="h-6 w-6" />
									</div>
									<h3 className="text-xl font-bold tracking-tight text-white group-hover:text-orange-500 transition-colors">
										{val.title}
									</h3>
									<p className="mt-3 text-sm text-white/60 leading-relaxed">
										{val.description}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
