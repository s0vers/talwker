"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { resolveBookingTour } from "@/features/booking/lib/booking-tour";
import { formatCheckoutSlot } from "@/features/checkout/lib/format-checkout-slot";
import type { BookingConfirmation } from "@/features/checkout/lib/confirmation-id";
import { Calendar, CheckCircle2, MapPin } from "lucide-react";

export function CheckoutSuccessBody({
	confirmation,
}: {
	confirmation: BookingConfirmation;
}) {
	const t = useTranslations("Checkout");
	const tour = resolveBookingTour(confirmation.tourSlug);
	const slot = formatCheckoutSlot(confirmation.slotIso, confirmation.timeZone);

	const tourImage = tour?.image || "/images/tours/scandi-northern-lights.jpg";

	return (
		<section
			aria-labelledby="checkout-success-heading"
			className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0a0a] shadow-[0_32px_96px_rgba(0,0,0,0.5)]"
		>
			<div className="p-6 md:p-10">
				{/* Success Badge */}
				<div className="flex items-center gap-3">
					<div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
						<CheckCircle2 className="size-7" />
					</div>
					<div>
						<span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
							{t("successConfirmationLabel")}
						</span>
						<p className="text-xs text-white/50">{t("registeredNote")}</p>
					</div>
				</div>

				<h1
					id="checkout-success-heading"
					className="mt-6 text-[clamp(1.85rem,4vw,2.75rem)] font-bold tracking-tighter text-white"
				>
					{t("successTitle")}
				</h1>
				<p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
					{t("successBody")}
				</p>

				{/* Confirmation Code Box */}
				<div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4">
					<div>
						<p className="text-[10px] font-semibold uppercase tracking-widest text-orange-400">
							{t("successConfirmationLabel")}
						</p>
						<p className="font-mono text-lg font-bold tracking-wider text-orange-300">
							{confirmation.id}
						</p>
					</div>
					<div className="flex items-center gap-2">
						<span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs text-orange-200">
							{t("verifiedBooking")}
						</span>
					</div>
				</div>

				{/* Selected Tour Summary Box */}
				<div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
					<div className="flex flex-col sm:flex-row items-stretch">
						<div className="relative h-40 sm:h-auto sm:w-48 shrink-0 overflow-hidden">
							<Image
								src={tourImage}
								alt={confirmation.tourTitle}
								fill
								sizes="200px"
								className="object-cover"
							/>
						</div>
						<div className="p-5 grid gap-3 text-sm">
							<div>
								<span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
									{t("summaryTourLabel")}
								</span>
								<p className="text-base font-bold text-white mt-0.5">
									{confirmation.tourTitle}
								</p>
							</div>

							<div className="flex flex-wrap gap-4 text-xs text-white/80">
								<div className="flex items-center gap-1.5">
									<Calendar className="size-3.5 text-orange-500" />
									<span>{slot.date} {slot.time ? `• ${slot.time}` : ""}</span>
								</div>
								<div className="flex items-center gap-1.5 text-white/60">
									<MapPin className="size-3.5 text-white/40" />
									<span>{confirmation.timeZone}</span>
								</div>
							</div>

							<div className="border-t border-white/10 pt-2 text-xs text-white/70">
								<span className="font-medium text-white">{confirmation.guestName}</span> ({confirmation.guestEmail})
							</div>
						</div>
					</div>
				</div>

				{/* Action CTAs */}
				<div className="mt-10 flex flex-col gap-3 sm:flex-row">
					<Button
						asChild
						size="lg"
						className="rounded-full bg-orange-500 px-8 text-white transition-colors hover:bg-orange-500/90"
					>
						<Link href="/">{t("successHomeLabel")}</Link>
					</Button>
					<Button
						asChild
						size="lg"
						variant="outline"
						className="rounded-full border-white/20 bg-transparent text-white transition-colors hover:bg-white/10 hover:text-white"
					>
						<Link href={`/tours/${confirmation.tourSlug}`}>
							{t("successTourLabel")}
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
