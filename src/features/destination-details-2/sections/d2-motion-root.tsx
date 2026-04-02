"use client";

import { useRef, type ReactNode } from "react";
import { bindDestinationDetails2Scroll } from "@/features/destination-details-2/lib/d2-scroll-motion";
import { useGsapContext } from "@/lib/useGsap";

type Props = {
	children: ReactNode;
};

export function D2MotionRoot({ children }: Props) {
	const scopeRef = useRef<HTMLDivElement | null>(null);

	useGsapContext(scopeRef, () => {
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
