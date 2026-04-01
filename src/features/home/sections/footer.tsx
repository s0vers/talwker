import Link from "next/link";
import {
	FOOTER_COLUMNS,
	FOOTER_COPY,
	LEGAL_LINKS,
} from "@/features/home/content/section-copy";

export default function Footer() {
	return (
		<footer className="border-t border-white/6 bg-[#0a0a0a]">
			<div className="mx-auto max-w-[1600px] pad-x py-16 md:py-20">
				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
					<div className="lg:col-span-2">
						<Link href="/">
							<span className="text-xl font-bold tracking-tight text-white">
								talkwer<span className="text-orange-500">.</span>
							</span>
						</Link>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
							{FOOTER_COPY.blurb}
						</p>
					</div>

					{Object.entries(FOOTER_COLUMNS).map(([title, links]) => (
						<div key={title}>
							<h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
								{title}
							</h3>
							<ul aria-label={`${title} links`} className="mt-5 space-y-3">
								{links.map((l) => (
									<li key={l}>
										<button
											type="button"
											aria-label={`${title}: ${l}`}
											className="text-sm text-white/55 transition-colors hover:text-white/80"
										>
											{l}
										</button>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-8 md:flex-row">
					<p className="text-[12px] text-white/60">
						&copy; {new Date().getFullYear()} {FOOTER_COPY.copyrightRest}
					</p>
					<div className="flex gap-6 text-[12px] text-white/60">
						{LEGAL_LINKS.map((linkLabel) => (
							<button
								key={linkLabel}
								type="button"
								aria-label={`View ${linkLabel.toLowerCase()}`}
								className="hover:text-white/80"
							>
								{linkLabel}
							</button>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}

