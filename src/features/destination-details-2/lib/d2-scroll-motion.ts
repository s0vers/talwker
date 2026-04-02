import { gsap } from "@/lib/useGsap";

const ENTER = { toggleActions: "play none none none" } as const;

/** Scroll choreography for `destination-details-2` — distinct selectors from v1 story page. */
export function bindDestinationDetails2Scroll(root: HTMLElement): void {
	const lines = gsap.utils.toArray<HTMLElement>("[data-d2-line]", root);
	const reveals = gsap.utils.toArray<HTMLElement>("[data-d2-reveal]", root);

	lines.forEach((line) => {
		gsap.from(line, {
			y: 36,
			opacity: 0,
			duration: 0.75,
			ease: "power3.out",
			scrollTrigger: {
				trigger: line,
				start: "top 90%",
				...ENTER,
			},
		});
	});

	reveals.forEach((el) => {
		gsap.from(el, {
			opacity: 0,
			y: 24,
			duration: 0.85,
			ease: "power2.out",
			scrollTrigger: {
				trigger: el,
				start: "top 88%",
				...ENTER,
			},
		});
	});
}
