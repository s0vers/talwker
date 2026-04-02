"use client";

import { useRef, type ReactNode } from "react";
import { bindDestinationStoryScroll } from "@/features/destination-details/lib/story-scroll-motion";
import { useGsapContext } from "@/lib/useGsap";

type Props = {
	children: ReactNode;
};

export function StorySectionsMotion({ children }: Props) {
	const scopeRef = useRef<HTMLDivElement | null>(null);

	useGsapContext(scopeRef, () => {
		const root = scopeRef.current;
		if (!root) return;
		bindDestinationStoryScroll(root);
	}, []);

	return <div ref={scopeRef}>{children}</div>;
}
