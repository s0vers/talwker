"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DateValue } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { availableTimes } from "@/features/booking/content/available-times";

export function RightPanel({
	date,
	timeZone,
	weeksInMonth,
	handleChangeAvailableTime
}: {
	date: DateValue;
	timeZone: string;
	weeksInMonth: number;
	handleChangeAvailableTime: (time: string) => void;
}) {
	const { locale } = useLocale();
	const dayLabel = date.toDate(timeZone).toLocaleDateString(locale, {
		weekday: "short",
		day: "numeric",
		timeZone
	});

	return (
		<Tabs
			defaultValue="12"
			className="flex w-full min-w-0 flex-col gap-4 border-t border-white/[0.06] pt-6 pl-0 xl:w-[280px] xl:border-t-0 xl:border-l xl:pt-0 xl:pl-6"
		>
			<div className="flex items-center justify-between">
				<p
					aria-hidden
					className="align-center text-md flex-1 font-bold text-white"
				>
					{dayLabel}
				</p>
				<TabsList className="grid h-11 w-fit grid-cols-2">
					<TabsTrigger value="12" className="min-w-11">
						12h
					</TabsTrigger>
					<TabsTrigger value="24" className="min-w-11">
						24h
					</TabsTrigger>
				</TabsList>
			</div>
			{(["12", "24"] as const).map(time => (
				<TabsContent key={time} value={time} className="mt-0">
					<ScrollArea
						type="always"
						className="h-full"
						style={{
							height: weeksInMonth > 5 ? "380px" : "320px"
						}}
					>
						<div className="grid gap-2 pr-3">
							{availableTimes.map(availableTime => (
								<Button
									variant="outline"
									onClick={() => handleChangeAvailableTime(availableTime[time])}
									key={availableTime[time]}
									className="h-11 rounded-xl border-white/15 bg-transparent font-medium text-white tabular-nums transition-colors hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white"
								>
									{availableTime[time]}
								</Button>
							))}
						</div>
					</ScrollArea>
				</TabsContent>
			))}
		</Tabs>
	);
}
