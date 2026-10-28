"use client";

import {
	lazy,
	Suspense,
	useEffect,
	useRef,
	useState,
	type ReactNode
} from "react";
import { prefersReducedMotion } from "@/lib/reduced-motion";

const AboutMotion = lazy(() => import("./about-motion"));

export function AboutFrame({ children }: { children: ReactNode }) {
	const section = useRef<HTMLElement>(null);
	const [root, setRoot] = useState<HTMLElement | null>(null);
	useEffect(() => {
		const element = section.current;
		if (!element || prefersReducedMotion()) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setRoot(element);
				observer.disconnect();
			},
			{ rootMargin: "64px" }
		);
		observer.observe(element);
		return () => observer.disconnect();
	}, []);
	return (
		<section
			id="about"
			ref={section}
			aria-labelledby="about-title"
			className="bg-[#0a0a0a] py-32 md:py-44"
		>
			{children}
			{root && (
				<Suspense fallback={null}>
					<AboutMotion root={root} />
				</Suspense>
			)}
		</section>
	);
}
