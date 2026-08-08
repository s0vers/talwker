import Image from "next/image";
import Link from "next/link";
import { EXPERIENCE_THEMES } from "../content/experience-themes";

export function ExperiencesThemes() {
	return (
		<section className="bg-[#050505] text-white py-16 md:py-24 border-t border-white/6">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="mb-12">
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
						Curated Categories
					</p>
					<h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Signature Themes</h2>
				</div>
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{EXPERIENCE_THEMES.map((theme) => (
						<Link
							key={theme.id}
							href={theme.href}
							className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:border-white/20"
						>
							<div className="relative aspect-4/3 w-full overflow-hidden bg-white/5">
								<Image
									src={theme.image}
									alt={theme.imageAlt}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent opacity-80" />
							</div>
							<div className="relative p-6 sm:p-8">
								<h3 className="text-xl font-semibold tracking-tight text-white group-hover:text-orange-500 transition-colors">
									{theme.title}
								</h3>
								<p className="mt-2 text-sm text-white/60 leading-relaxed">
									{theme.description}
								</p>
								<span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-orange-500">
									View Journeys <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
