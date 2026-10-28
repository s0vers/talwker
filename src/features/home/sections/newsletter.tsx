"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { HomeClientCopy } from "@/features/home/lib/home-client-copy";
import { LuSend } from "react-icons/lu";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { useDeferredGsapContext } from "@/lib/use-deferred-gsap";

export default function Newsletter({
	copy
}: {
	copy: HomeClientCopy["newsletter"];
}) {
	const sectionRef = useRef<HTMLElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const [submitted, setSubmitted] = useState(false);

	useDeferredGsapContext(
		sectionRef,
		({ gsap }) => {
			if (prefersReducedMotion()) return;
			const card = cardRef.current;
			const content = contentRef.current;
			if (!card || !content) return;

			gsap.fromTo(
				card,
				{ scale: 0.97, opacity: 0 },
				{
					scale: 1,
					opacity: 1,
					duration: 0.9,
					ease: "power3.out",
					clearProps: "opacity,transform",
					scrollTrigger: { trigger: card, start: "top 88%", once: true }
				}
			);

			gsap.fromTo(
				content.children,
				{ y: 36, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.08,
					ease: "power3.out",
					clearProps: "opacity,transform",
					delay: 0.1,
					scrollTrigger: { trigger: content, start: "top 88%", once: true }
				}
			);
		},
		[]
	);

	return (
		<section
			id="newsletter"
			ref={sectionRef}
			aria-labelledby="newsletter-title"
			className="relative overflow-hidden bg-[#050505] py-28 md:py-36"
		>
			<div className="pad-x relative mx-auto max-w-[1600px]">
				<div
					ref={cardRef}
					className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#080808]"
				>
					<div className="absolute inset-0">
						<Image
							src="/plane-window-sunset.jpg"
							alt=""
							fill
							sizes="(max-width: 768px) 100vw, 80vw"
							className="object-cover opacity-40"
						/>
					</div>
					<div className="absolute inset-0 bg-black/65" />

					<div
						ref={contentRef}
						className="relative px-8 py-16 text-center md:px-16 md:py-24"
					>
						<span className="mb-4 inline-block text-xs font-semibold tracking-[0.2em] text-orange-400 uppercase">
							{copy.label}
						</span>
						<h2
							id="newsletter-title"
							className="mt-2 text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95] font-extrabold tracking-tight text-white"
						>
							{copy.title}
						</h2>
						<p className="mx-auto mt-6 mb-10 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
							{copy.description}
						</p>

						<form
							onSubmit={event => {
								event.preventDefault();
								setSubmitted(true);
							}}
							className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row"
						>
							<label htmlFor="newsletter-email" className="sr-only">
								{copy.emailLabel}
							</label>
							<input
								id="newsletter-email"
								type="email"
								required
								name="email"
								onChange={() => setSubmitted(false)}
								placeholder={copy.placeholder}
								autoComplete="email"
								className="flex-1 rounded-full border border-white/20 bg-black/60 px-6 py-4 text-sm text-white backdrop-blur-md transition-all duration-300 placeholder:text-white/45 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/60 focus:outline-none"
							/>
							<button
								type="submit"
								className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-sm font-bold text-[#0a0a0a] transition-colors duration-200 hover:bg-orange-400"
							>
								<LuSend className="h-4 w-4" />
								{copy.subscribe}
							</button>
						</form>
						{submitted && (
							<p role="status" className="mt-4 text-sm text-orange-200">
								{copy.demoMessage}
							</p>
						)}

						<p className="mt-4 text-xs font-medium text-white/50">
							{copy.disclaimer}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
