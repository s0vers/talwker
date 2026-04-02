"use client";

import { useRef, type ReactNode } from "react";
import { bindDestinationDetailsScroll } from "@/features/destination-details/lib/destination-details-scroll-motion";
import { useGsapContext } from "@/lib/useGsap";

type Props = {
	children: ReactNode;
};

export function DestinationDetailsSectionsMotion({ children }: Props) {
	const scopeRef = useRef<HTMLDivElement | null>(null);

	useGsapContext(scopeRef, () => {
		const root = scopeRef.current;
		if (!root) return;
		bindDestinationDetailsScroll(root);
	}, []);

	return <div ref={scopeRef}>{children}</div>;
}
