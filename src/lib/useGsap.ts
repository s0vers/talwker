"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

export function useParallax(speed = 0.3) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const ctx = gsap.context(() => {
			gsap.to(ref.current, {
				yPercent: speed * 100,
				ease: "none",
				scrollTrigger: {
					trigger: ref.current,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
			});
		});
		return () => ctx.revert();
	}, [speed]);

	return ref;
}

export function useFadeUp() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const children = ref.current.children;
		const ctx = gsap.context(() => {
			gsap.from(children, {
				y: 60,
				opacity: 0,
				duration: 0.8,
				stagger: 0.12,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ref.current,
					start: "top 85%",
					toggleActions: "play none none none",
				},
			});
		});
		return () => ctx.revert();
	}, []);

	return ref;
}

export function useTextReveal() {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const ctx = gsap.context(() => {
			gsap.from(ref.current, {
				y: 80,
				opacity: 0,
				duration: 1.2,
				ease: "power4.out",
				scrollTrigger: {
					trigger: ref.current,
					start: "top 90%",
					toggleActions: "play none none none",
				},
			});
		});
		return () => ctx.revert();
	}, []);

	return ref;
}

export function useCountUp(target: number, duration = 2) {
	const ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const obj = { val: 0 };
		const ctx = gsap.context(() => {
			gsap.to(obj, {
				val: target,
				duration,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ref.current,
					start: "top 85%",
					toggleActions: "play none none none",
				},
				onUpdate: () => {
					if (ref.current) {
						ref.current.textContent =
							target >= 1000
								? Math.floor(obj.val).toLocaleString()
								: target % 1 !== 0
									? obj.val.toFixed(1)
									: Math.floor(obj.val).toString();
					}
				},
			});
		});
		return () => ctx.revert();
	}, [target, duration]);

	return ref;
}

export { gsap, ScrollTrigger };
