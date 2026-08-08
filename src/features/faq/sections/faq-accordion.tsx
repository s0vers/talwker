import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_GROUPS } from "../content/faq-copy";

export function FaqAccordion() {
	return (
		<section className="bg-[#050505] text-white pb-28 md:pb-36">
			<div className="pad-x mx-auto max-w-[1000px] space-y-16">
				{FAQ_GROUPS.map((group) => (
					<div key={group.id} className="space-y-6">
						<h2 className="text-xl font-semibold tracking-tight text-white/90 border-b border-white/10 pb-3">
							{group.title}
						</h2>
						<Accordion type="single" collapsible className="w-full">
							{group.items.map((item) => (
								<AccordionItem key={item.id} value={item.id}>
									<AccordionTrigger className="text-white text-base md:text-lg">
										{item.question}
									</AccordionTrigger>
									<AccordionContent className="space-y-3">
										<p className="text-white/60">{item.answer}</p>
										{item.linkHref && item.linkLabel ? (
											<div>
												<Link
													href={item.linkHref}
													className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-orange-500 hover:underline underline-offset-4"
												>
													{item.linkLabel} →
												</Link>
											</div>
										) : null}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				))}
			</div>
		</section>
	);
}
