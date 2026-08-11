"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DateValue } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { availableTimes } from "./available-times";

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
			className="flex w-[280px] flex-col gap-4 border-l border-white/[0.06] pl-6"
		>
			<div className="flex items-center justify-between">
				<p
					aria-hidden
					className="align-center flex-1 text-md font-bold text-white"
				>
					{dayName} <span className="text-white/55">{dayNumber}</span>
				</p>
				<TabsList className="grid w-fit grid-cols-2 border border-white/10 bg-white/5">
					<TabsTrigger
						value="12"
						className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
					>
						12h
					</TabsTrigger>
					<TabsTrigger
						value="24"
						className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
					>
						24h
					</TabsTrigger>
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
									className="border-white/15 bg-transparent text-white hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white"
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
