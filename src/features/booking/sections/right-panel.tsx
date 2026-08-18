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
	handleChangeAvailableTime,
}: {
	date: DateValue;
	timeZone: string;
	weeksInMonth: number;
	handleChangeAvailableTime: (time: string) => void;
}) {
	const { locale } = useLocale();
	const [dayNumber, dayName] = date
		.toDate(timeZone)
		.toLocaleDateString(locale, {
			weekday: "short",
			day: "numeric",
		})
		.split(" ");

	return (
		<Tabs
			defaultValue="12"
			className="flex w-full lg:w-[280px] flex-col gap-4 border-t lg:border-t-0 lg:border-l border-white/[0.06] pt-6 lg:pt-0 pl-0 lg:pl-6"
		>
			<div className="flex items-center justify-between">
				<p
					aria-hidden
					className="align-center flex-1 text-md font-bold text-white"
				>
					{dayName} <span className="text-white/55">{dayNumber}</span>
				</p>
				<TabsList className="grid w-fit grid-cols-2">
					<TabsTrigger value="12">12h</TabsTrigger>
					<TabsTrigger value="24">24h</TabsTrigger>
				</TabsList>
			</div>
			{["12", "24"].map((time) => (
				<TabsContent key={time} value={time} className="mt-0">
					<ScrollArea
						type="always"
						className="h-full"
						style={{
							maxHeight: weeksInMonth > 5 ? "380px" : "320px",
						}}
					>
						<div className="grid gap-2 pr-3">
							{availableTimes.map((availableTime) => (
								<Button
									variant="outline"
									onClick={() =>
										handleChangeAvailableTime(
											availableTime[time as "12" | "24"],
										)
									}
									key={availableTime[time as "12" | "24"]}
									className="h-10 rounded-xl border-white/15 bg-transparent font-medium text-white transition-all hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white"
								>
									{availableTime[time as "12" | "24"]}
								</Button>
							))}
						</div>
					</ScrollArea>
				</TabsContent>
			))}
		</Tabs>
	);
}
