"use client";

import { useRef, type ReactNode } from "react";
import { bindTourDetailsScroll } from "@/features/tours/lib/tour-details-scroll";
import { useGsapContext } from "@/lib/useGsap";

type TourDetailsMotionRootProps = {
	children: ReactNode;
	tourSlug: string;
};

export function TourDetailsMotionRoot({
	children,
	tourSlug,
}: TourDetailsMotionRootProps) {
	const scopeRef = useRef<HTMLDivElement>(null);

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
