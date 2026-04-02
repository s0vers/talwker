import { gsap, prefersReducedMotion } from "@/lib/useGsap";

const ENTER = { toggleActions: "play none none none" } as const;

function revealVariant(el: HTMLElement): string {
	const raw = el.getAttribute("data-d3-reveal");
	if (raw === null) return "up";
	const t = raw.trim();
	return t === "" ? "up" : t;
}

function bindReveal(el: HTMLElement): void {
	const v = revealVariant(el);
	const st = { trigger: el, start: "top 86%", ...ENTER };

	switch (v) {
		case "fade":
			gsap.from(el, { opacity: 0, y: 14, duration: 1.05, ease: "power1.out", scrollTrigger: st });
			break;
		case "left":
			gsap.from(el, { opacity: 0, x: 52, duration: 0.88, ease: "power3.out", scrollTrigger: st });
			break;
		case "right":
			gsap.from(el, { opacity: 0, x: -52, duration: 0.88, ease: "power3.out", scrollTrigger: st });
			break;
		case "down":
			gsap.from(el, { opacity: 0, y: -40, duration: 0.85, ease: "power3.out", scrollTrigger: st });
			break;
		case "zoom":
			gsap.from(el, {
				opacity: 0,
				scale: 0.94,
				y: 18,
				duration: 0.95,
				ease: "power2.out",
				scrollTrigger: st,
			});
			break;
		case "rise":
			gsap.from(el, { opacity: 0, y: 48, duration: 1.12, ease: "power4.out", scrollTrigger: st });
			break;
		case "soft":
			gsap.from(el, { opacity: 0, y: 20, duration: 1.2, ease: "sine.out", scrollTrigger: st });
			break;
		case "up":
		default:
			gsap.from(el, { opacity: 0, y: 32, duration: 0.9, ease: "power2.out", scrollTrigger: st });
			break;
	}
}

function staggerMode(parent: HTMLElement): string {
	const raw = parent.getAttribute("data-d3-stagger");
	if (raw === null) return "up";
	const t = raw.trim();
	return t === "" ? "up" : t;
}

function bindStagger(parent: HTMLElement): void {
	const items = gsap.utils.toArray<HTMLElement>("[data-d3-item]", parent);
	if (items.length === 0) return;

	const mode = staggerMode(parent);
	const stBase = { trigger: parent, ...ENTER };

	switch (mode) {
		case "split": {
			items.forEach((item, i) => {
				gsap.from(item, {
					opacity: 0,
					x: i === 0 ? -48 : 48,
					duration: 0.95,
					ease: "power3.out",
					delay: i * 0.16,
					scrollTrigger: { ...stBase, start: "top 80%" },
				});
			});
			break;
		}
		case "split-reverse": {
			items.forEach((item, i) => {
				gsap.from(item, {
					opacity: 0,
					x: i === 0 ? 48 : -48,
					duration: 0.95,
					ease: "power3.out",
					delay: i * 0.16,
					scrollTrigger: { ...stBase, start: "top 80%" },
				});
			});
			break;
		}
		case "drift":
			gsap.from(items, {
				opacity: 0,
				x: (i: number) => (i % 2 === 0 ? 38 : -38),
				y: 22,
				duration: 0.84,
				stagger: 0.11,
				ease: "power2.out",
				scrollTrigger: { ...stBase, start: "top 82%" },
			});
			break;
		case "snap":
			gsap.from(items, {
				opacity: 0,
				y: 22,
				duration: 0.52,
				stagger: 0.055,
				ease: "back.out(1.25)",
				scrollTrigger: { ...stBase, start: "top 85%" },
			});
			break;
		case "up":
		default:
			gsap.from(items, {
				opacity: 0,
				y: 36,
				scale: 0.988,
				duration: 0.78,
				stagger: 0.12,
				ease: "power2.out",
				scrollTrigger: { ...stBase, start: "top 84%" },
			});
			break;
	}
}

export function bindDestinationDetails3Scroll(root: HTMLElement): void {
	const lineEls = gsap.utils.toArray<HTMLElement>("[data-d3-line]", root);
	lineEls.forEach((line, i) => {
		gsap.from(line, {
			scaleX: 0,
			transformOrigin: "0 50%",
			opacity: 0,
			duration: 0.75,
			delay: i * 0.05,
			ease: "power2.out",
			scrollTrigger: { trigger: line, start: "top 90%", ...ENTER },
		});
	});

	const revealEls = gsap.utils.toArray<HTMLElement>("[data-d3-reveal]", root);
	revealEls.forEach((el) => bindReveal(el));

	const staggerRoots = gsap.utils.toArray<HTMLElement>("[data-d3-stagger]", root);
	staggerRoots.forEach((parent) => bindStagger(parent));

	if (!prefersReducedMotion()) {
		const media = gsap.utils.toArray<HTMLElement>("[data-d3-media]", root);
		media.forEach((asset, index) => {
			const scrub = [0.85, 1.2, 1.55][index % 3] ?? 1.1;
			const fromY = index % 3 === 0 ? -2.1 : index % 3 === 1 ? 2.1 : -1.4;
			const toY = -fromY;
			gsap.fromTo(
				asset,
				{ yPercent: fromY },
				{
					yPercent: toY,
					ease: "none",
					scrollTrigger: {
						trigger: asset,
						start: "top bottom",
						end: "bottom top",
						scrub,
					},
				},
			);
		});
	}

	const heroPane = root.querySelector<HTMLElement>("[data-d3-hero-pane]");
	if (heroPane) {
		gsap.from(heroPane, {
			opacity: 0,
			x: -22,
			y: 18,
			duration: 1.05,
			ease: "power3.out",
			delay: 0.06,
		});
	}

	const heroImgRoot = root.querySelector<HTMLElement>("[data-d3-hero-media-root]");
	if (heroImgRoot) {
		gsap.from(heroImgRoot, {
			scale: 1.07,
			opacity: 0,
			x: 36,
			duration: 1.2,
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
