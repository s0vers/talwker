import Image from "next/image";
import type { HeroCopy } from "../lib/home-static-copy";
import { HeroFrame } from "./hero-frame";

import { ButtonWithIcon } from "@/shared/ui";

export default function Hero({ copy }: { copy: HeroCopy }) {
	return (
		<HeroFrame>
			<div className="hero-image-in absolute inset-0">
				<Image
					src="/plane-window-sunset.jpg"
					alt="Airplane wing above a sunset horizon"
					fill
					sizes="100vw"
					className="object-cover"
					fetchPriority="low"
					loading="eager"
				/>
				<div className="hero-overlay-in absolute inset-0 bg-linear-to-t from-[#050505] via-black/30 to-black/20" />
			</div>

			<div className="pad-x relative z-10 flex h-full flex-col justify-end pt-28 pb-10 md:pt-32 md:pb-14">
				<div className="hero-fade-up mb-6 [--hero-delay:200ms]">
					<span className="inline-block text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase">
						{copy.tagline}
					</span>
				</div>

				<h1 className="max-w-[18ch] text-[clamp(2.2rem,6.5vw,6rem)] leading-[0.98] tracking-[-0.04em]">
					<div className="-mb-[0.12em] overflow-hidden pb-[0.12em]">
						<div className="hero-scroll-line font-bold text-white">
							<div className="hero-line-in [--hero-delay:100ms]">
								{copy.titleLines1}
							</div>
						</div>
					</div>
					<div className="-mb-[0.12em] overflow-hidden pb-[0.12em]">
						<div className="hero-scroll-line font-bold text-white">
							<div className="hero-line-in [--hero-delay:300ms]">
								{copy.titleLines2}
							</div>
						</div>
					</div>
					<div className="-mb-[0.12em] overflow-hidden pb-[0.12em]">
						<div className="hero-scroll-line font-bold">
							<div className="hero-line-in [--hero-delay:500ms]">
								{copy.titleLines3}
							</div>
						</div>
					</div>
					<div className="-mb-[0.12em] overflow-hidden pb-[0.12em]">
						<div className="hero-scroll-line font-light text-orange-500 italic">
							<div className="hero-line-in [--hero-delay:700ms]">
								{copy.titleAccent}
							</div>
						</div>
					</div>
				</h1>

				<div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<p className="max-w-[44ch] text-base leading-relaxed text-white/80">
						{copy.description}
					</p>
					<ButtonWithIcon
						href="#destinations"
						variant="orange"
						size="lg"
						className="shrink-0 shadow-xl shadow-orange-500/20"
					>
						{copy.explore}
					</ButtonWithIcon>
				</div>
			</div>
		</HeroFrame>
	);
}
