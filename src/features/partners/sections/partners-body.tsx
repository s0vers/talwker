"use client";

import { PARTNERS_BODY } from "@/features/partners/content/partners-copy";

export default function PartnersBody() {
	return (
		<section className="relative border-t border-white/6 bg-[#050505] py-20 md:py-28">
			<div className="pad-x">
				<div className="mx-auto max-w-[1600px]">
					<div className="max-w-2xl">
						<h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-white">
							{PARTNERS_BODY.heading}
						</h2>
						<div className="mt-8 space-y-5">
							{PARTNERS_BODY.paragraphs.map((paragraph) => (
								<p
									key={paragraph}
									className="text-base leading-relaxed text-white/45 md:text-lg"
								>
									{paragraph}
								</p>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
