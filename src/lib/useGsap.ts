"use client";

import { DependencyList, RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

export function prefersReducedMotion() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useGsapContext<T extends Element>(
	scopeRef: RefObject<T | null>,
	animation: () => void,
	deps: DependencyList = [],
) {
	useEffect(() => {
		if (typeof window === "undefined" || !scopeRef.current || prefersReducedMotion()) return;
		gsap.registerPlugin(ScrollTrigger);
		const ctx = gsap.context(animation, scopeRef);
		return () => ctx.revert();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
}

type StaggerRevealOptions = {
	y?: number;
	scale?: number;
	duration?: number;
	stagger?: number;
	start?: string;
	ease?: string;
};

export function createStaggerReveal(
	targets: gsap.TweenTarget,
	trigger: Element | string | null | undefined,
	options: StaggerRevealOptions = {},
) {
	const {
		y = 60,
		scale = 1,
		duration = 0.9,
		stagger = 0.1,
		start = "top 82%",
		ease = "power3.out",
	} = options;

	return gsap.from(targets, {
		y,
		scale,
		opacity: 0,
		duration,
		stagger,
		ease,
		immediateRender: false,
		scrollTrigger: {
			trigger: trigger ?? undefined,
			start,
			toggleActions: "play none none none",
		},
	});
}

type ParallaxOptions = {
	fromY?: number;
	toY?: number;
	fromScale?: number;
	toScale?: number;
};

export function createElementParallax(
	element: gsap.TweenTarget,
	trigger: Element | string | null | undefined,
	options: ParallaxOptions = {},
) {
	const { fromY = -10, toY = 10, fromScale = 1.08, toScale = 1.02 } = options;
	return gsap.fromTo(
		element,
		{ yPercent: fromY, scale: fromScale },
		{
			yPercent: toY,
			scale: toScale,
			ease: "none",
			scrollTrigger: {
				trigger: trigger ?? undefined,
				start: "top bottom",
				end: "bottom top",
				scrub: true,
			},
		},
	);
}

export function useParallax(speed = 0.3) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const ctx = gsap.context(() => {
			gsap.to(ref.current, {
				yPercent: speed * 100,
				ease: "none",
				scrollTrigger: {
					trigger: ref.current,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
			});
		});
		return () => ctx.revert();
	}, [speed]);

	return ref;
}

export function useFadeUp() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const children = ref.current.children;
		const ctx = gsap.context(() => {
			gsap.from(children, {
				y: 60,
				opacity: 0,
				duration: 0.8,
				stagger: 0.12,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ref.current,
					start: "top 85%",
					toggleActions: "play none none none",
				},
			});
		});
		return () => ctx.revert();
	}, []);

	return ref;
}

export function useTextReveal() {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const ctx = gsap.context(() => {
			gsap.from(ref.current, {
				y: 80,
				opacity: 0,
				duration: 1.2,
				ease: "power4.out",
				scrollTrigger: {
					trigger: ref.current,
					start: "top 90%",
					toggleActions: "play none none none",
				},
			});
		});
		return () => ctx.revert();
	}, []);

	return ref;
}

export function useCountUp(target: number, duration = 2) {
	const ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const obj = { val: 0 };
		const ctx = gsap.context(() => {
			gsap.to(obj, {
				val: target,
				duration,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ref.current,
					start: "top 85%",
					toggleActions: "play none none none",
				},
				onUpdate: () => {
					if (ref.current) {
						ref.current.textContent =
							target >= 1000
								? Math.floor(obj.val).toLocaleString()
								: target % 1 !== 0
									? obj.val.toFixed(1)
									: Math.floor(obj.val).toString();
					}
				},
			});
		});
		return () => ctx.revert();
	}, [target, duration]);

	return ref;
}

export { gsap, ScrollTrigger };
