"use client";

import { useState } from "react";
import {
	LuHeadphones,
	LuShieldCheck,
	LuSparkles,
} from "react-icons/lu";
import { ButtonWithIcon } from "@/shared/ui";
import { cn } from "@/lib/utils";

const DESTINATION_CHOICES = ["Patagonia Ridge", "Kyoto Sanctuaries", "Amalfi Maritime", "Icelandic Aurora", "Bespoke Request"];

export function AtelierConciergeVault() {
	const [selectedDest, setSelectedDest] = useState(DESTINATION_CHOICES[0]);
	const [selectedPacing, setSelectedPacing] = useState("Private Traverse (1-4 Guests)");

	return (
		<section
			id="concierge-vault"
			aria-labelledby="concierge-vault-title"
			className="relative overflow-hidden bg-[#050505] py-24 md:py-44 border-t border-white/10"
		>
			{/* Dramatic Warm Orange Radial Lens Flare */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(249,115,22,0.14),transparent_75%)]" />
			<div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

			<div className="relative z-10 mx-auto max-w-4xl pad-x text-center space-y-10">
				{/* Top Guild Seal */}
				<div className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-orange-400">
					<LuSparkles className="h-3.5 w-3.5" />
					<span>THE NOCTURNAL CHAMBER // PRIVATE DISPATCH</span>
				</div>

				{/* Title & Description */}
				<div className="space-y-4">
					<h2
						id="concierge-vault-title"
						className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-white leading-tight"
					>
						Ready to Enter the Field?
					</h2>
					<p className="mx-auto max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed font-light">
						Collaborate directly with our master expedition architects to commission a private, bespoke departure tailored to your aesthetic, pacing, and geographic aspirations.
					</p>
				</div>

				{/* Interactive Concierge Request Card */}
				<div className="mx-auto max-w-2xl rounded-3xl border border-white/15 bg-[#0a0a0a]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-left space-y-6">
					<div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono text-white/40">
						<span className="text-orange-400 font-semibold">CUSTOM EXPEDITION INQUIRY</span>
						<span>DIRECT CONCIERGE DESK</span>
					</div>

					{/* Destination Chips */}
					<div className="space-y-2">
						<label className="text-xs font-mono uppercase text-white/60">Target Destination</label>
						<div className="flex flex-wrap gap-2">
							{DESTINATION_CHOICES.map((dest) => (
								<button
									key={dest}
									type="button"
									onClick={() => setSelectedDest(dest)}
									className={cn(
										"rounded-xl px-3.5 py-1.5 text-xs font-mono transition-all duration-300 border outline-none",
										selectedDest === dest
											? "border-orange-500 bg-orange-500/20 text-orange-300 font-semibold"
											: "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white",
									)}
								>
									{dest}
								</button>
							))}
						</div>
					</div>

					{/* Expedition Scale Selection */}
					<div className="space-y-2">
						<label className="text-xs font-mono uppercase text-white/60">Traverse Format</label>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							{["Private Traverse (1-4 Guests)", "Curated Micro-Group (Max 6)"].map((fmt) => (
								<button
									key={fmt}
									type="button"
									onClick={() => setSelectedPacing(fmt)}
									className={cn(
										"rounded-xl p-3 text-xs font-semibold text-left transition-all border outline-none",
										selectedPacing === fmt
											? "border-orange-500 bg-orange-500/10 text-white ring-1 ring-orange-500"
											: "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white",
									)}
								>
									{fmt}
								</button>
							))}
						</div>
					</div>

					{/* Action Buttons */}
					<div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
						<div className="flex items-center gap-2 text-xs font-mono text-white/40">
							<LuShieldCheck className="h-4 w-4 text-orange-400" />
							<span>Zero Obligation · 24h Response</span>
						</div>

						<ButtonWithIcon
							href={`/contact?destination=${encodeURIComponent(selectedDest)}`}
							variant="orange"
							size="lg"
							className="w-full sm:w-auto text-xs uppercase tracking-widest font-semibold shadow-xl shadow-orange-500/25"
						>
							Commission Inquiry
						</ButtonWithIcon>
					</div>
				</div>

				{/* 24/7 Hotline Note */}
				<div className="pt-4 flex items-center justify-center gap-3 text-xs font-mono text-white/40">
					<LuHeadphones className="h-4 w-4 text-orange-400" />
					<span>TALKWER PRIVATE CONCIERGE: 24/7 DIRECT SATELLITE DISPATCH</span>
				</div>
			</div>
		</section>
	);
}
