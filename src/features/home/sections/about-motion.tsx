"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { createGsapContext, prefersReducedMotion } from "@/lib/useGsap";

export default function AboutMotion({ root }: { root: HTMLElement }) {
	useEffect(() => {
		if (prefersReducedMotion()) return;
		return createGsapContext(root, () => {
			const text = root.querySelector<HTMLElement>("[data-about-text]");
			const image = root.querySelector<HTMLElement>("[data-about-image]");
			if (text?.children.length) {
				gsap.fromTo(
					text.children,
					{ y: 40, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.9,
						stagger: 0.1,
						ease: "power3.out",
						clearProps: "opacity,transform",
						scrollTrigger: { trigger: text, start: "top 85%", once: true }
					}
				);
			}
			if (image) {
				gsap.fromTo(
					image,
					{ clipPath: "inset(0 100% 0 0)" },
					{
						clipPath: "inset(0 0% 0 0)",
						duration: 1.4,
						ease: "power4.inOut",
						clearProps: "clipPath",
						scrollTrigger: { trigger: image, start: "top 80%", once: true }
					}
				);
				const photo = image.querySelector("img");
				if (photo)
					gsap.to(photo, {
						yPercent: -12,
						ease: "none",
						scrollTrigger: {
							trigger: root,
							start: "top bottom",
							end: "bottom top",
							scrub: true
						}
					});
			}
			root
				.querySelectorAll<HTMLElement>("[data-about-count]")
				.forEach(element => {
					const target = Number(element.dataset.aboutCount);
					const count = { value: 0 };
					gsap.to(count, {
						value: target,
						duration: 2,
						ease: "power2.out",
						scrollTrigger: {
							trigger: element,
							start: "top 85%",
							toggleActions: "play none none none"
						},
						onUpdate: () => {
							element.textContent = Math.floor(count.value).toLocaleString(
								"en-US"
							);
						}
					});
				});
		});
	}, [root]);
	return null;
}
