import Image from "next/image";
import { resolveBookingTour } from "@/features/booking/lib/booking-tour";
import type { BookingHandoff } from "@/features/booking/lib/booking-handoff";
import { CHECKOUT_COPY } from "@/features/checkout/content/checkout-copy";
import { formatCheckoutSlot } from "@/features/checkout/lib/format-checkout-slot";
import {
	Calendar,
	CheckCircle2,
	Clock,
	MapPin,
	ShieldCheck,
	Star,
	Users,
} from "lucide-react";

export function CheckoutSummary({ handoff }: { handoff: BookingHandoff }) {
	const tour = resolveBookingTour(handoff.tourSlug);
	const slot = formatCheckoutSlot(handoff.slotIso, handoff.timeZone);

	const tourImage = tour?.image || "/images/tours/scandi-northern-lights.jpg";
	const destination = tour?.destination || "Nordic Expedition";
	const rating = tour?.rating || 4.9;
	const reviewsCount = tour?.reviews || 128;
	const duration = tour?.duration || "8 Days / 7 Nights";
	const groupSize = tour?.groupSize || "Max 12 Guests";
	const priceFormatted = tour ? `$${tour.price.toLocaleString()}` : CHECKOUT_COPY.feeAmount;

	const includesList = tour?.includes && tour.includes.length > 0
		? tour.includes.slice(0, 3)
		: ["Expert Local Guide", "Luxury Transport", "Free 48h Cancellation"];

	return (
		<section
			aria-labelledby="checkout-summary-heading"
			className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0a0a] shadow-[0_32px_96px_rgba(0,0,0,0.5)]"
		>
			{/* Tour Cover Image Header */}
			<div className="relative h-48 sm:h-56 w-full overflow-hidden">
				<Image
					src={tourImage}
					alt={handoff.tourTitle}
					fill
					sizes="(max-width: 1024px) 100vw, 50vw"
					className="object-cover transition-transform duration-700 hover:scale-105"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
				
				<div className="absolute top-4 left-4 z-10">
					<span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-md">
						<MapPin className="size-3 text-orange-500" />
						{destination}
					</span>
				</div>
			</div>

			{/* Tour Details Content */}
			<div className="p-6 md:p-8">
				<h2 id="checkout-summary-heading" className="sr-only">
					{CHECKOUT_COPY.summaryTourLabel}
				</h2>

				{/* Title & Ratings */}
				<div className="grid gap-2">
					<h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">
						{handoff.tourTitle}
					</h3>
					
					<div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
						<div className="flex items-center gap-1 font-medium text-amber-400">
							<Star className="size-3.5 fill-amber-400" />
							<span>{rating}</span>
							<span className="text-white/40">({reviewsCount} reviews)</span>
						</div>
						<span className="text-white/20">•</span>
						<div className="flex items-center gap-1">
							<Clock className="size-3.5 text-white/50" />
							<span>{duration}</span>
						</div>
						<span className="text-white/20">•</span>
						<div className="flex items-center gap-1">
							<Users className="size-3.5 text-white/50" />
							<span>{groupSize}</span>
						</div>
					</div>
				</div>

				{/* Scheduled Slot Details Box */}
				<div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
					<div className="flex items-start gap-3">
						<div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
							<Calendar className="size-5" />
						</div>
						<div className="grid gap-0.5 text-sm">
							<p className="font-semibold text-white">Scheduled Departure</p>
							<p className="text-white/80">{slot.date}</p>
							{slot.time && (
								<p className="text-xs text-white/60">
									{slot.time} <span className="text-white/40">({handoff.timeZone})</span>
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Guest Info Box */}
				<div className="mt-4 grid gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs">
					<p className="font-semibold text-white/50 uppercase tracking-widest text-[10px]">
						Booker Information
					</p>
					<div className="flex items-center justify-between text-sm text-white/90">
						<span className="font-medium">{handoff.guestName}</span>
						<span className="text-white/60 text-xs">{handoff.guestEmail}</span>
					</div>
					{handoff.guestPhone && (
						<p className="text-white/50">{handoff.guestPhone}</p>
					)}
					{handoff.guestEmails && handoff.guestEmails.length > 0 && (
						<p className="mt-1 text-white/60">
							+ {handoff.guestEmails.length} additional guest{handoff.guestEmails.length > 1 ? "s" : ""}
						</p>
					)}
				</div>

				{/* Included Perks */}
				<div className="mt-6">
					<p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
						Included in this Booking
					</p>
					<ul className="mt-2.5 grid gap-2 text-xs text-white/80">
						{includesList.map((item, idx) => (
							<li key={idx} className="flex items-center gap-2">
								<CheckCircle2 className="size-4 shrink-0 text-orange-500" />
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Price Summary Breakdown */}
				<div className="mt-8 border-t border-white/10 pt-6">
					<div className="flex items-center justify-between text-xs text-white/60">
						<span>Tour Package</span>
						<span className="text-white">{priceFormatted}</span>
					</div>
					<div className="mt-1.5 flex items-center justify-between text-xs text-white/60">
						<span>Taxes & Booking Fees</span>
						<span className="text-emerald-400 font-medium">$0.00 (Included)</span>
					</div>

					<div className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-4">
						<div>
							<p className="text-xs font-semibold uppercase tracking-widest text-white/50">
								Total Due Now
							</p>
							<p className="text-[11px] text-white/40">Includes all taxes and guarantees</p>
						</div>
						<p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
							{priceFormatted}
						</p>
					</div>
				</div>

				{/* Trust Banner */}
				<div className="mt-6 flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2.5 text-xs text-emerald-300">
					<ShieldCheck className="size-4 shrink-0 text-emerald-400" />
					<span>Instant confirmation & 100% secure tour slot handoff</span>
				</div>
			</div>
		</section>
	);
}
