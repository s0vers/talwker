"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
	bindTourDetailsRailObserver,
	bindTourDetailsScroll,
} from "@/features/tours/lib/tour-details-scroll";
import { prefersReducedMotion, useGsapContext } from "@/lib/useGsap";

type TourDetailsMotionRootProps = {
	children: ReactNode;
	tourSlug: string;
};

export function TourDetailsMotionRoot({
	children,
	tourSlug,
}: TourDetailsMotionRootProps) {
	const scopeRef = useRef<HTMLDivElement>(null);

	// `useGsapContext` no-ops under reduced motion; keep rail active-chip sync via IO.
	useEffect(() => {
		const root = scopeRef.current;
		if (!root || !prefersReducedMotion()) return;
		return bindTourDetailsRailObserver(root);
	}, [tourSlug]);

	useGsapContext(
		scopeRef,
		() => {
			const root = scopeRef.current;
			if (!root) return;
			bindTourDetailsScroll(root);
		},
		[tourSlug],
	);

	return (
		<div ref={scopeRef} className="relative">
			{children}
		</div>
	);
}
