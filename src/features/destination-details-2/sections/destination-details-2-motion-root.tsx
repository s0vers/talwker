"use client";

import { useRef, type ReactNode } from "react";
import { bindDestinationDetails2Scroll } from "@/features/destination-details-2/lib/destination-details-2-scroll-motion";
import { prefersReducedMotion, useGsapContext } from "@/lib/useGsap";

type Props = {
	children: ReactNode;
};

export function DestinationDetails2MotionRoot({ children }: Props) {
	const scopeRef = useRef<HTMLDivElement | null>(null);

	useGsapContext(scopeRef, () => {
		if (prefersReducedMotion()) return;
		const root = scopeRef.current;
		if (!root) return;
		bindDestinationDetails2Scroll(root);
	}, []);

	return (
		<div ref={scopeRef} className="relative">
			{children}
		</div>
	);
}
