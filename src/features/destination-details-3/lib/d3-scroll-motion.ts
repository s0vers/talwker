import { gsap, prefersReducedMotion } from "@/lib/useGsap";

const ENTER = { toggleActions: "play none none none" } as const;

export function bindDestinationDetails3Scroll(root: HTMLElement): void {
	const lineEls = gsap.utils.toArray<HTMLElement>("[data-d3-line]", root);
	lineEls.forEach((line, i) => {
		gsap.from(line, {
			y: 40,
			opacity: 0,
			duration: 0.85,
			delay: i * 0.06,
			ease: "power3.out",
			scrollTrigger: {
				trigger: line,
				start: "top 88%",
				...ENTER,
			},
		});
	});

	const revealEls = gsap.utils.toArray<HTMLElement>("[data-d3-reveal]", root);
	revealEls.forEach((el, i) => {
		gsap.from(el, {
			opacity: 0,
			y: 32,
			duration: 0.9,
			delay: i * 0.04,
			ease: "power2.out",
			scrollTrigger: {
				trigger: el,
				start: "top 86%",
				...ENTER,
			},
		});
	});

	const staggerRoots = gsap.utils.toArray<HTMLElement>("[data-d3-stagger]", root);
	staggerRoots.forEach((parent) => {
		const items = gsap.utils.toArray<HTMLElement>("[data-d3-item]", parent);
		if (items.length === 0) return;
		gsap.from(items, {
			opacity: 0,
			y: 36,
			scale: 0.988,
			duration: 0.78,
			stagger: 0.12,
			ease: "power2.out",
			scrollTrigger: {
				trigger: parent,
				start: "top 84%",
				...ENTER,
			},
		});
	});

	if (!prefersReducedMotion()) {
		const media = gsap.utils.toArray<HTMLElement>("[data-d3-media]", root);
		media.forEach((asset, index) => {
			gsap.fromTo(
				asset,
				{ yPercent: index % 2 === 0 ? -1.75 : 1.75 },
				{
					yPercent: index % 2 === 0 ? 1.75 : -1.75,
					ease: "none",
					scrollTrigger: {
						trigger: asset,
						start: "top bottom",
						end: "bottom top",
						scrub: 1.15,
					},
				},
			);
		});
	}

	const heroPane = root.querySelector<HTMLElement>("[data-d3-hero-pane]");
	if (heroPane) {
		gsap.from(heroPane, {
			opacity: 0,
			y: 28,
			duration: 1,
			ease: "power3.out",
			delay: 0.08,
		});
	}

	const heroImgRoot = root.querySelector<HTMLElement>("[data-d3-hero-media-root]");
	if (heroImgRoot) {
		gsap.from(heroImgRoot, {
			scale: 1.04,
			opacity: 0,
			duration: 1.1,
			ease: "power2.out",
		});
	}

	const heroBadge = root.querySelector<HTMLElement>("[data-d3-hero-badge]");
	if (heroBadge) {
		gsap.from(heroBadge, {
			opacity: 0,
			x: -14,
			duration: 0.75,
			ease: "power2.out",
			delay: 0.35,
		});
	}
}
