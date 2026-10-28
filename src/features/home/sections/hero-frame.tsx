"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HeroFrame({ children }: { children: ReactNode }) {
	const section = useRef<HTMLElement>(null);
	useEffect(() => {
		const root = section.current;
		if (!root) return;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
		let frame = 0;
		const update = () => {
			frame = 0;
			const { top, height } = root.getBoundingClientRect();
			const progress = reducedMotion.matches
				? 0
				: Math.min(1, Math.max(0, (-top - height * 0.22) / (height * 0.43)));
			root.style.setProperty("--hero-scroll", String(progress));
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);
		reducedMotion.addEventListener("change", schedule);
		if (window.scrollY > 0) schedule();
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			reducedMotion.removeEventListener("change", schedule);
		};
	}, []);

	return (
		<section
			ref={section}
			className="relative h-svh min-h-[650px] overflow-hidden"
		>
			{children}
		</section>
	);
}
