"use client";

import { useTranslations } from "next-intl";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/components/ui/tooltip";
import type { Tour } from "@/shared/types/domain";
import { useLocale } from "@react-aria/i18n";
import { CalendarIcon, Clock4, Video } from "lucide-react";
import { timeZones } from "@/features/booking/content/time-zones";

const TIME_ZONE_ITEMS = timeZones.map(tz => ({
	value: tz.tzCode,
	label: tz.label.replace(/_/g, " ")
}));

export function LeftPanel({
	showForm,
	slotIso,
	timeZone,
	setTimeZone,
	tour
}: {
	showForm: boolean;
	slotIso: string | null;
	timeZone: string;
	setTimeZone: (timeZone: string) => void;
	tour: Tour;
}) {
	const t = useTranslations("Booking");
	const { locale } = useLocale();

	return (
		<div className="flex w-full min-w-0 flex-col gap-4 border-b border-white/[0.06] pr-0 pb-6 xl:w-[280px] xl:border-r xl:border-b-0 xl:pr-6 xl:pb-0">
			<div className="grid gap-1">
				<Tooltip>
					<TooltipTrigger asChild>
						<span className="inline-flex size-6 items-center justify-center rounded-full border border-white/15 bg-orange-500/15 text-[10px] font-semibold tracking-wider text-orange-400 uppercase">
							tw
						</span>
					</TooltipTrigger>
					<TooltipContent className="border border-white/10 bg-[#0a0a0a] text-white">
						{t("brand")}
					</TooltipContent>
				</Tooltip>
				<p className="text-sm font-semibold text-white/70">
					{t("brand")}
					<span className="text-orange-500">.</span>
				</p>
			</div>
			<div className="grid gap-3">
				<h1 className="text-2xl font-bold text-white">{t("meetingTitle")}</h1>
				<p className="text-sm text-white/55">{tour.title}</p>
				{showForm && slotIso && (
					<div className="flex text-white/90">
						<CalendarIcon className="mr-2 size-4 shrink-0" />
						<div className="flex flex-col text-sm font-semibold">
							<p>
								{new Date(slotIso).toLocaleString(locale, {
									dateStyle: "full",
									timeZone
								})}
							</p>
							<p>
								{new Date(slotIso).toLocaleString(locale, {
									timeStyle: "short",
									timeZone
								})}
							</p>
						</div>
					</div>
				)}
				<div className="flex items-center text-white/90">
					<Clock4 className="mr-2 size-4" />
					<p className="text-sm font-semibold">{t("duration")}</p>
				</div>
				<div className="flex items-center text-white/90">
					<Video className="mr-2 size-4 text-orange-500" aria-hidden />
					<Tooltip>
						<TooltipTrigger asChild>
							<p className="text-sm font-semibold">{t("meetingType")}</p>
						</TooltipTrigger>
						<TooltipContent className="border border-white/10 bg-[#0a0a0a] text-white">
							{t("meetingTypeTooltip")}
						</TooltipContent>
					</Tooltip>
				</div>
				<Select
					value={timeZone}
					onValueChange={value => {
						if (typeof value === "string") setTimeZone(value);
					}}
					items={TIME_ZONE_ITEMS}
				>
					<SelectTrigger className="h-11 w-full min-w-0" aria-label="Time zone">
						<SelectValue placeholder="Select time zone" />
					</SelectTrigger>
					<SelectContent className="max-h-72 w-64 sm:w-72">
						{TIME_ZONE_ITEMS.map(item => (
							<SelectItem key={item.value} value={item.value}>
								{item.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
