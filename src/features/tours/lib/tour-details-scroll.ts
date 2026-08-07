import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/useGsap";

const ACTIVE_ATTR = "data-tour-rail-active";

function setActiveRailTarget(root: HTMLElement, targetHash: string) {
	const buttons = root.querySelectorAll<HTMLElement>("[data-tour-rail-target]");
	buttons.forEach((button) => {
		const isActive = button.getAttribute("data-tour-rail-target") === targetHash;
		button.toggleAttribute(ACTIVE_ATTR, isActive);
		button.setAttribute("aria-current", isActive ? "true" : "false");
	});
}

function collectTrackTargets(root: HTMLElement): { el: HTMLElement; hash: string }[] {
	const chapters = Array.from(
		root.querySelectorAll<HTMLElement>("[data-tour-day][id]"),
	);
	const includes = root.querySelector<HTMLElement>("#tour-includes");
	const trackTargets = chapters.map((el) => ({
		el,
		hash: `#${el.id}`,
	}));
	if (includes) {
		trackTargets.push({ el: includes, hash: "#tour-includes" });
	}
	return trackTargets;
}

/**
 * Active-chip sync without GSAP — used when `prefers-reduced-motion` skips
 * `useGsapContext` / ScrollTrigger entirely.
 */
export function bindTourDetailsRailObserver(root: HTMLElement): () => void {
	const trackTargets = collectTrackTargets(root);
	if (trackTargets[0]) {
		setActiveRailTarget(root, trackTargets[0].hash);
	}

	const ratios = new Map<Element, number>();
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				ratios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
			}
			let bestHash: string | null = null;
			let bestRatio = 0;
			for (const { el, hash } of trackTargets) {
				const ratio = ratios.get(el) ?? 0;
				if (ratio > bestRatio) {
					bestRatio = ratio;
					bestHash = hash;
				}
			}
			if (bestHash) setActiveRailTarget(root, bestHash);
		},
		{
			// Approximate ScrollTrigger "top/bottom center" band without GSAP.
			rootMargin: "-40% 0px -40% 0px",
			threshold: [0, 0.25, 0.5, 0.75, 1],
		},
	);

	trackTargets.forEach(({ el }) => observer.observe(el));
	return () => observer.disconnect();
}

/**
 * Rail sync + light media scrub for tour day chapters.
 * Call inside `useGsapContext` (or a scoped gsap.context).
 * Rail click → scrollIntoView is wired on the rail buttons in the component
 * so reduced-motion users still navigate without GSAP.
 */
export function bindTourDetailsScroll(root: HTMLElement): void {
	const chapters = gsap.utils.toArray<HTMLElement>("[data-tour-day][id]", root);
	const media = gsap.utils.toArray<HTMLElement>("[data-tour-day-media]", root);
	const trackTargets = collectTrackTargets(root);

	trackTargets.forEach(({ el, hash }) => {
		ScrollTrigger.create({
			trigger: el,
			start: "top center",
			end: "bottom center",
			onEnter: () => setActiveRailTarget(root, hash),
			onEnterBack: () => setActiveRailTarget(root, hash),
		});
	});

	if (trackTargets[0]) {
		setActiveRailTarget(root, trackTargets[0].hash);
	}

	if (prefersReducedMotion()) return;

	media.forEach((asset) => {
		const chapter = asset.closest<HTMLElement>("[data-tour-day]");
		gsap.fromTo(
			asset,
			{ yPercent: -4, scale: 1.06 },
			{
				yPercent: 4,
				scale: 1.02,
				ease: "none",
				scrollTrigger: {
					trigger: chapter ?? asset,
					start: "top bottom",
					end: "bottom top",
					scrub: 1.1,
				},
			},
		);
	});

	chapters.forEach((chapter) => {
		const copy = chapter.querySelector<HTMLElement>("[data-tour-day-copy]");
		if (!copy) return;
		gsap.from(copy, {
			y: 36,
			opacity: 0,
			duration: 0.85,
			ease: "power3.out",
			immediateRender: false,
			scrollTrigger: {
				trigger: chapter,
				start: "top 72%",
				toggleActions: "play none none none",
			},
		});
	});
}
