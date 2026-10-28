"use client";

import { useEffect, useRef, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./reduced-motion";
export { prefersReducedMotion } from "./reduced-motion";

function isSameOriginPathChange(href: string) {
	try {
		const url = new URL(href, window.location.href);
		if (url.origin !== window.location.origin) return false;
		return (
			url.pathname !== window.location.pathname ||
			url.search !== window.location.search
		);
	} catch {
		return false;
	}
}

/**
 * ScrollTrigger `pin` reparents nodes into `.pin-spacer`. React's unmount then
 * calls removeChild on the pre-pin parent and throws NotFoundError. Effect
 * cleanup runs too late (after mutation), so revert on capture-phase nav instead.
 */
function revertContextBeforeClientNavigation(ctx: gsap.Context) {
	const revert = () => {
		ctx.revert();
	};

	const onClickCapture = (event: MouseEvent) => {
		if (event.defaultPrevented || event.button !== 0) return;
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
			return;
		const target = event.target;
		if (!(target instanceof Element)) return;
		const anchor = target.closest("a[href]");
		if (!(anchor instanceof HTMLAnchorElement)) return;
		if (anchor.hasAttribute("download")) return;
		if (anchor.target && anchor.target !== "_self") return;
		const href = anchor.getAttribute("href");
		if (
			!href ||
			href.startsWith("#") ||
			href.startsWith("mailto:") ||
			href.startsWith("tel:")
		) {
			return;
		}
		if (isSameOriginPathChange(href)) revert();
	};

	document.addEventListener("click", onClickCapture, true);
	window.addEventListener("popstate", revert);

	return () => {
		document.removeEventListener("click", onClickCapture, true);
		window.removeEventListener("popstate", revert);
		revert();
	};
}

export function createGsapContext(scope: Element, animation: () => void) {
	gsap.registerPlugin(ScrollTrigger);
	return revertContextBeforeClientNavigation(gsap.context(animation, scope));
}

export function useGsapContext<T extends Element>(
	scopeRef: RefObject<T | null>,
	animation: () => void,
	deps: DependencyList = []
) {
	useEffect(() => {
		if (!scopeRef.current || prefersReducedMotion()) return;
		return createGsapContext(scopeRef.current, animation);
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
	options: StaggerRevealOptions = {}
) {
	const {
		y = 60,
		scale = 1,
		duration = 0.9,
		stagger = 0.1,
		start = "top 82%",
		ease = "power3.out"
	} = options;

	return gsap.from(targets, {
		y,
		scale,
		opacity: 0,
		duration,
		stagger,
		ease,
		scrollTrigger: {
			trigger: trigger ?? undefined,
			start,
			toggleActions: "play none none none"
		}
	});
}

export function useCountUp(target: number, duration = 2) {
	const ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		if (prefersReducedMotion()) {
			ref.current.textContent =
				target >= 1000
					? Math.floor(target).toLocaleString()
					: target % 1 !== 0
						? target.toFixed(1)
						: Math.floor(target).toString();
			return;
		}
		const obj = { val: 0 };
		gsap.registerPlugin(ScrollTrigger);
		const ctx = gsap.context(() => {
			gsap.to(obj, {
				val: target,
				duration,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ref.current,
					start: "top 85%",
					toggleActions: "play none none none"
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
				}
			});
		});
		return () => ctx.revert();
	}, [target, duration]);

	return ref;
}

export { gsap, ScrollTrigger };
