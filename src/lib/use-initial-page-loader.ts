"use client";

import { useEffect, useState } from "react";

const MIN_LOADER_MS = 200;
const FALLBACK_READY_MS = 1200;

/**
 * Shared InitialLoader gate for page entries.
 * Clears loading state on window load (or fallback) without mutating body overflow,
 * preserving CSS position: sticky calculation on page mount.
 */
export function useInitialPageLoader(): boolean {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const mountedAt = Date.now();

		const clearLoading = () => {
			setIsLoading(false);
			// Force a subtle scroll/resize trigger so browser layout engine re-evaluates sticky bounds
			if (typeof window !== "undefined") {
				window.dispatchEvent(new Event("resize"));
			}
		};

		const onReady = () => {
			const remaining = Math.max(0, MIN_LOADER_MS - (Date.now() - mountedAt));
			if (remaining === 0) {
				clearLoading();
				return;
			}
			window.setTimeout(clearLoading, remaining);
		};

		if (document.readyState === "complete") {
			const timeout = window.setTimeout(onReady, 0);
			return () => {
				window.clearTimeout(timeout);
			};
		}

		const handleLoad = () => onReady();
		window.addEventListener("load", handleLoad);
		const timeout = window.setTimeout(onReady, FALLBACK_READY_MS);

		return () => {
			window.removeEventListener("load", handleLoad);
			window.clearTimeout(timeout);
		};
	}, []);

	return isLoading;
}
