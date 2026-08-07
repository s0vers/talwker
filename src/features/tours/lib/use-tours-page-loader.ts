"use client";

import { useEffect, useState } from "react";

const MIN_LOADER_MS = 200;
const FALLBACK_READY_MS = 1200;

/**
 * Shared InitialLoader gate for `/tours` and `/tours/[slug]`.
 * Locks body scroll while loading, then clears on window load (or fallback).
 */
export function useToursPageLoader(): boolean {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const mountedAt = Date.now();

		const clearLoading = () => {
			setIsLoading(false);
			document.body.style.overflow = originalOverflow;
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
				document.body.style.overflow = originalOverflow;
			};
		}

		const handleLoad = () => onReady();
		window.addEventListener("load", handleLoad);
		const timeout = window.setTimeout(onReady, FALLBACK_READY_MS);

		return () => {
			window.removeEventListener("load", handleLoad);
			window.clearTimeout(timeout);
			document.body.style.overflow = originalOverflow;
		};
	}, []);

	return isLoading;
}
