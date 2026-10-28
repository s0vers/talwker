"use client";

import {
	useCallback,
	useRef,
	useSyncExternalStore,
	type ReactNode
} from "react";
import {
	Carousel,
	CarouselNext,
	CarouselPrevious
} from "@/components/ui/carousel";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { useDeferredGsapContext } from "@/lib/use-deferred-gsap";

function subscribeReducedMotion(onStoreChange: () => void) {
	const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
	mq.addEventListener("change", onStoreChange);
	return () => mq.removeEventListener("change", onStoreChange);
}

export function TestimonialsFrame({
	heading,
	children
}: {
	heading: ReactNode;
	children: ReactNode;
}) {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const reduceMotion = useSyncExternalStore(
		subscribeReducedMotion,
		prefersReducedMotion,
		() => false
	);
	const loadPlugins = useCallback(async () => {
		if (reduceMotion) return [];
		const { default: Autoplay } = await import("embla-carousel-autoplay");
		return [Autoplay({ delay: 4500, stopOnInteraction: false })];
	}, [reduceMotion]);

	useDeferredGsapContext(
		sectionRef,
		({ gsap }) => {
			if (prefersReducedMotion()) return;
			const heading = headingRef.current;
			const carousel = carouselRef.current;
			if (heading) {
				gsap.from(heading, {
					y: 36,
					opacity: 0,
					duration: 0.9,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
						toggleActions: "play none none none"
					}
				});
			}
			if (carousel) {
				gsap.from(carousel, {
					y: 48,
					opacity: 0,
					duration: 1,
					ease: "power3.out",
					delay: 0.1,
					scrollTrigger: {
						trigger: carousel,
						start: "top 82%",
						toggleActions: "play none none none"
					}
				});
			}
		},
		[]
	);
	return (
		<section
			ref={sectionRef}
			id="testimonials"
			aria-labelledby="testimonials-title"
			className="relative overflow-hidden bg-[#060606] py-28 md:py-36"
		>
			<div className="pad-x relative mx-auto max-w-[1600px]">
				<div ref={headingRef} className="mb-14 text-center md:mb-18">
					{heading}
				</div>
				<div ref={carouselRef}>
					<Carousel
						opts={{ align: "start", loop: true, slidesToScroll: 1 }}
						deferUntilVisible
						plugins={loadPlugins}
						className="relative"
					>
						{children}
						<CarouselPrevious className="-left-4 border-white/20 bg-[#0d0d0d] text-white transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-[#050505] md:-left-12" />
						<CarouselNext className="-right-4 border-white/20 bg-[#0d0d0d] text-white transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-[#050505] md:-right-12" />
					</Carousel>
				</div>
			</div>
		</section>
	);
}
