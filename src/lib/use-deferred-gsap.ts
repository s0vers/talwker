"use client";

import { useEffect, type DependencyList, type RefObject } from "react";
import { prefersReducedMotion } from "./reduced-motion";
import type * as MotionEngineModule from "./useGsap";

type MotionEngine = typeof MotionEngineModule;

/** Enhance server-rendered content near the viewport, after the first paint. */
export function useDeferredGsapContext<T extends Element>(
	scopeRef: RefObject<T | null>,
	animation: (engine: MotionEngine) => void,
	deps: DependencyList = []
) {
	useEffect(() => {
		const scope = scopeRef.current;
		if (!scope || prefersReducedMotion()) return;
		let disposed = false;
		let firstFrame = 0;
		let secondFrame = 0;
		let revert: (() => void) | undefined;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				observer.disconnect();
				firstFrame = requestAnimationFrame(() => {
					secondFrame = requestAnimationFrame(() => {
						void import("./useGsap").then(engine => {
							if (disposed || prefersReducedMotion()) return;
							revert = engine.createGsapContext(scope, () => animation(engine));
						});
					});
				});
			},
			{ rootMargin: "64px" }
		);
		observer.observe(scope);
		return () => {
			disposed = true;
			observer.disconnect();
			cancelAnimationFrame(firstFrame);
			cancelAnimationFrame(secondFrame);
			revert?.();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
}
