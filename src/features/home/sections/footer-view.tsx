import type { FooterCopy } from "../lib/home-static-copy";
import { Link } from "@/i18n/navigation";

export function FooterView({ copy }: { copy: FooterCopy }) {
	const exploreLinks = [
		{ label: copy.destinations, href: "/destinations" },
		{ label: copy.tours, href: "/tours" },
		{ label: copy.stories, href: "/stories" },
		{ label: copy.experiences, href: "/experiences" }
	];

	const companyLinks = [
		{ label: copy.about, href: "/about" },
		{ label: copy.careers, href: "/careers" },
		{ label: copy.press, href: "/press" },
		{ label: copy.partners, href: "/partners" }
	];

	const supportLinks = [
		{ label: copy.faq, href: "/faq" },
		{ label: copy.bookingPolicy, href: "/booking-policy" },
		{ label: copy.cancellation, href: "/cancellation" },
		{ label: copy.contact, href: "/contact" }
	];

	const legalLinks = [
		{ label: copy.privacy, href: "/privacy" },
		{ label: copy.terms, href: "/terms" },
		{ label: copy.cookies, href: "/cookies" }
	];

	const columns = [
		{ title: copy.explore, links: exploreLinks },
		{ title: copy.company, links: companyLinks },
		{ title: copy.support, links: supportLinks }
	];

	return (
		<footer className="border-t border-white/6 bg-[#0a0a0a]">
			<div className="pad-x mx-auto max-w-[1600px] py-16 md:py-20">
				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
					<div className="lg:col-span-2">
						<Link href="/" prefetch={false}>
							<span className="text-xl font-bold tracking-tight text-white">
								talkwer<span className="text-orange-500">.</span>
							</span>
						</Link>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
							{copy.blurb}
						</p>
					</div>

					{columns.map(col => (
						<div key={col.title}>
							<h3 className="text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
								{col.title}
							</h3>
							<ul aria-label={`${col.title} links`} className="mt-5 space-y-3">
								{col.links.map(item => (
									<li key={item.href}>
										<Link
											href={item.href}
											className="text-sm text-white/65 transition-colors hover:text-white/85"
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-8 md:flex-row">
					<p className="text-[12px] text-white/60">
						&copy; {new Date().getFullYear()} {copy.copyrightRest}
					</p>
					<div className="flex gap-6 text-[12px] text-white/60">
						{legalLinks.map(item => (
							<Link
								key={item.href}
								href={item.href}
								className="transition-colors hover:text-white/80"
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
