import { FAQ_HERO } from "../content/faq-copy";

export function FaqHero() {
	return (
		<section className="bg-[#050505] text-white pt-28 pb-16 md:pt-36 md:pb-20">
			<div className="pad-x mx-auto max-w-[1600px]">
				<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
					{FAQ_HERO.eyebrow}
				</p>
				<h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">{FAQ_HERO.title}</h1>
				<p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
					{FAQ_HERO.description}
				</p>
			</div>
		</section>
	);
}
