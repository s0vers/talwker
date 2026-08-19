import { ButtonWithIcon } from "@/shared/ui";
import { Link } from "@/i18n/navigation";

export function AtelierInvitation() {
	return (
		<section
			id="invitation"
			aria-labelledby="invitation-title"
			className="relative overflow-hidden bg-[#050505] py-28 md:py-44 border-t border-white/10"
		>
			{/* Ambient Warm Radial Backlight Glow */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(249,115,22,0.12),transparent_75%)]" />
			<div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

			<div className="relative z-10 mx-auto max-w-4xl pad-x text-center space-y-8">
				<span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
					BEGIN YOUR JOURNEY
				</span>

				<div className="space-y-4">
					<h2
						id="invitation-title"
						className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
					>
						Let&apos;s plan something <span className="font-light italic text-orange-500">extraordinary.</span>
					</h2>
					<p className="mx-auto max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed font-light">
						Tell us about your dream destination and travel style. We will design a personalized itinerary tailored to your rhythm and aesthetic.
					</p>
				</div>

				<div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
					<ButtonWithIcon
						href="/contact"
						variant="orange"
						size="lg"
						className="shadow-2xl shadow-orange-500/25 text-xs uppercase tracking-widest font-semibold"
					>
						Start Planning
					</ButtonWithIcon>

					<Link
						href="/tours"
						className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
					>
						<span>Explore Tours</span>
					</Link>
				</div>
			</div>
		</section>
	);
}
