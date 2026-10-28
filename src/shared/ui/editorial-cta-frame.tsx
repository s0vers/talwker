"use client";

import { useRef, type ReactNode } from "react";
import { useDeferredGsapContext } from "@/lib/use-deferred-gsap";

export function EditorialCtaFrame({
	children,
	id,
	headingId,
	className
}: {
	children: ReactNode;
	id?: string;
	headingId?: string;
	className: string;
}) {
	const section = useRef<HTMLElement>(null);
	useDeferredGsapContext(
		section,
		({ gsap }) => {
			const head = section.current?.querySelector("[data-editorial-cta-head]");
			if (!head) return;
			gsap.fromTo(
				head.children,
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.9,
					stagger: 0.1,
					ease: "power3.out",
					clearProps: "opacity,transform",
					scrollTrigger: { trigger: head, start: "top 85%", once: true }
				}
			);
		},
		[]
	);
	return (
		<section
			ref={section}
			id={id}
			aria-labelledby={headingId}
			className={className}
		>
			{children}
		</section>
	);
}
