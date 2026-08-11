"use client";

import { BOOKING_COPY } from "@/features/booking/content/booking-copy";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Tour } from "@/shared/types/domain";
import { useLocale } from "@react-aria/i18n";
import { CalendarIcon, Clock4, Video } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { timeZones } from "./time-zones";

const TIME_ZONE_ITEMS = timeZones.map((tz) => ({
	value: tz.tzCode,
	label: tz.label.replace(/_/g, " "),
}));

export function LeftPanel({
	showForm,
	timeZone,
	setTimeZone,
	tour,
}: {
	showForm: boolean | null;
	timeZone: string;
	setTimeZone: (timeZone: string) => void;
	tour: Tour;
}) {
	const { locale } = useLocale();
	const searchParams = useSearchParams();
	const slotParam = searchParams.get("slot");

	return (
		<div className="flex w-[280px] flex-col gap-4 border-r border-white/[0.06] pr-6">
			<div className="grid gap-1">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<span className="inline-flex size-6 items-center justify-center rounded-full border border-white/15 bg-orange-500/15 text-[10px] font-semibold uppercase tracking-wider text-orange-400">
								tw
							</span>
						</TooltipTrigger>
						<TooltipContent className="border border-white/10 bg-[#0a0a0a] text-white">
							{BOOKING_COPY.brand}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<p className="text-sm font-semibold text-white/70">
					{BOOKING_COPY.brand}
					<span className="text-orange-500">.</span>
				</p>
			</div>
			<div className="grid gap-3">
				<p className="text-2xl font-bold text-white">{BOOKING_COPY.meetingTitle}</p>
				<p className="text-sm text-white/55">{tour.title}</p>
				{showForm && slotParam && (
					<div className="flex text-white/90">
						<CalendarIcon className="mr-2 size-4 shrink-0" />
						<div className="flex flex-col text-sm font-semibold">
							<p>
								{new Date(slotParam).toLocaleString(locale, {
									dateStyle: "full",
								})}
							</p>
							<p>
								{new Date(slotParam).toLocaleString(locale, {
									timeStyle: "short",
								})}
							</p>
						</div>
					</div>
				)}
				<div className="flex items-center text-white/90">
					<Clock4 className="mr-2 size-4" />
					<p className="text-sm font-semibold">{BOOKING_COPY.duration}</p>
				</div>
				<div className="flex items-center text-white/90">
					<Video className="mr-2 size-4 text-orange-500" aria-hidden />
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<p className="text-sm font-semibold">{BOOKING_COPY.meetingType}</p>
							</TooltipTrigger>
							<TooltipContent className="border border-white/10 bg-[#0a0a0a] text-white">
								{BOOKING_COPY.meetingTypeTooltip}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<Select
					value={timeZone}
					onValueChange={(value) => {
						if (typeof value === "string") setTimeZone(value);
					}}
					items={TIME_ZONE_ITEMS}
				>
					<SelectTrigger className="h-10 w-fit rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10">
						<SelectValue placeholder="Select time zone" />
					</SelectTrigger>
					<SelectContent className="max-h-72 w-fit border-white/10 bg-[#0a0a0a] text-white">
						{TIME_ZONE_ITEMS.map((item) => (
							<SelectItem
								key={item.value}
								value={item.value}
								className="rounded-lg text-white focus:bg-white/10 data-highlighted:bg-white/10"
							>
								{item.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
