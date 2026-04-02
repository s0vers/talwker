import { gsap, prefersReducedMotion } from "@/lib/useGsap";

const ENTER = { toggleActions: "play none none none" } as const;

/**
 * Scroll + light mount choreography for `destination-details-2`.
 * Hooks: `data-d2-line`, `data-d2-reveal`, `data-d2-stagger` + `data-d2-item`, `data-d2-media`, hero `data-d2-hero-*`.
 */
export function bindDestinationDetails2Scroll(root: HTMLElement): void {
	const lineEls = gsap.utils.toArray<HTMLElement>("[data-d2-line]", root);
	lineEls.forEach((line, i) => {
		gsap.from(line, {
			y: 44,
			opacity: 0,
			duration: 0.9,
			delay: i * 0.07,
			ease: "power3.out",
			scrollTrigger: {
				trigger: line,
				start: "top 88%",
				...ENTER,
			},
		});
	});

	const revealEls = gsap.utils.toArray<HTMLElement>("[data-d2-reveal]", root);
	revealEls.forEach((el, i) => {
		gsap.from(el, {
			opacity: 0,
			y: 36,
			duration: 0.95,
			delay: i * 0.05,
			ease: "power2.out",
			scrollTrigger: {
				trigger: el,
				start: "top 86%",
				...ENTER,
			},
		});
	});

	const staggerRoots = gsap.utils.toArray<HTMLElement>("[data-d2-stagger]", root);
	staggerRoots.forEach((parent) => {
		const items = gsap.utils.toArray<HTMLElement>("[data-d2-item]", parent);
		if (items.length === 0) return;
		gsap.from(items, {
			opacity: 0,
			y: 40,
			scale: 0.985,
			duration: 0.82,
			stagger: 0.14,
			ease: "power2.out",
			scrollTrigger: {
				trigger: parent,
				start: "top 84%",
				...ENTER,
			},
		});
	});

	if (!prefersReducedMotion()) {
		const media = gsap.utils.toArray<HTMLElement>("[data-d2-media]", root);
		media.forEach((asset, index) => {
			gsap.fromTo(
				asset,
				{ yPercent: index % 2 === 0 ? -2 : 2 },
				{
					yPercent: index % 2 === 0 ? 2 : -2,
					ease: "none",
					scrollTrigger: {
						trigger: asset,
						start: "top bottom",
						end: "bottom top",
						scrub: 1.2,
					},
				},
			);
		});
	}

	const heroPane = root.querySelector<HTMLElement>("[data-d2-hero-pane]");
	if (heroPane) {
		gsap.from(heroPane, {
			opacity: 0,
			y: 32,
			duration: 1.05,
			ease: "power3.out",
			delay: 0.1,
		});
	}

	const heroImgRoot = root.querySelector<HTMLElement>("[data-d2-hero-media-root]");
	if (heroImgRoot) {
		gsap.from(heroImgRoot, {
			scale: 1.05,
			opacity: 0,
			duration: 1.2,
			ease: "power2.out",
		});
	}

	const heroBadge = root.querySelector<HTMLElement>("[data-d2-hero-badge]");
	if (heroBadge) {
		gsap.from(heroBadge, {
			opacity: 0,
			x: -18,
			duration: 0.8,
			ease: "power2.out",
			delay: 0.4,
		});
	}
}
