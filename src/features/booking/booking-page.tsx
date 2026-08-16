"use client";

import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { resolveBookingTour } from "@/features/booking/lib/booking-tour";
import { BookingScheduler } from "@/features/booking/sections";

export default function BookingPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const tour = resolveBookingTour(searchParams.get("tour"));

	useEffect(() => {
		if (!tour) router.replace("/tours");
	}, [tour, router]);

	if (!tour) {
		return (
			<main className="flex min-h-[100svh] items-center justify-center bg-[#050505] text-white/40">
				Redirecting…
			</main>
		);
	}

	return (
		<main className="min-h-[100svh] bg-[#050505] text-white">
			<div className="pad-x mx-auto flex max-w-[1600px] justify-center py-16 md:py-24">
				<BookingScheduler tour={tour} />
			</div>
		</main>
	);
}
