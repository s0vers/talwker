"use client";

import { useRef, type ReactNode } from "react";
import { bindDestinationDetails3Scroll } from "@/features/destination-details-3/lib/d3-scroll-motion";
import { useGsapContext } from "@/lib/useGsap";

type Props = {
	children: ReactNode;
};

export function D3MotionRoot({ children }: Props) {
	const scopeRef = useRef<HTMLDivElement | null>(null);

	useGsapContext(scopeRef, () => {
		const root = scopeRef.current;
		if (!root) return;
		bindDestinationDetails3Scroll(root);
	}, []);

	return (
		<div ref={scopeRef} className="relative">
			{children}
		</div>
	);
}
