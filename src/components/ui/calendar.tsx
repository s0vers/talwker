"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center h-10",
        caption_label: "text-sm font-medium text-foreground",
        nav: "flex items-center gap-1",
        button_previous: "absolute left-1 h-7 w-7 bg-transparent p-0 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md flex items-center justify-center",
        button_next: "absolute right-1 h-7 w-7 bg-transparent p-0 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md flex items-center justify-center",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-muted-foreground w-9 font-normal text-[0.8rem] h-9 flex items-center justify-center",
        week: "flex w-full mt-1",
        day: "h-9 w-9 text-center text-sm p-0 relative flex items-center justify-center",
        day_button: "h-9 w-9 p-0 font-normal rounded-md hover:bg-secondary hover:text-foreground focus:bg-primary focus:text-primary-foreground transition-colors",
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
        today: "bg-secondary text-foreground font-semibold",
        outside: "text-muted-foreground/50",
        disabled: "text-muted-foreground/30 cursor-not-allowed",
        range_middle: "bg-primary/10",
        range_start: "rounded-l-md",
        range_end: "rounded-r-md",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight
          return <Icon className="h-4 w-4" />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
