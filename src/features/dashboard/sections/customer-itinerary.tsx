"use client";

import { LuPrinter } from "react-icons/lu";
import { TOURS } from "@/features/home/content/tours";
import type { DashboardCopy } from "@/features/dashboard/content/dashboard-content";

export function CustomerItinerary({ copy, onPrint }: { copy: DashboardCopy; onPrint: () => void }) {
  const tour = TOURS[0];
  return <div className="tw-customer-view tw-view-enter"><div className="tw-customer-intro"><div><span className="tw-eyebrow">TW-2048 · {copy.customerSample}</span><h1>{copy.myItinerary}</h1><p>{tour.title} · {tour.destination} · {tour.duration}</p></div><button type="button" className="tw-button tw-button-primary tw-print-trigger" onClick={onPrint}><LuPrinter aria-hidden="true" />{copy.print}</button></div><div className="tw-itinerary-print"><div className="tw-print-heading"><span>talkwer.</span><h2>{tour.title}</h2><p>{tour.destination} · 17–23 November 2026 · TW-2048</p><small>{copy.customerSample}</small></div><div className="tw-customer-route"><div><span>{copy.routeAtGlance}</span><strong>{tour.destination}</strong></div><p>{copy.tripHint}</p></div><h2 className="tw-days-heading">{copy.itineraryDays}</h2><ol className="tw-customer-days">{tour.itinerary.map((day) => <li key={day.day}><div className="tw-customer-day-marker"><span>{copy.day}</span><strong>{String(day.day).padStart(2, "0")}</strong></div><div className="tw-customer-day-copy"><div><h3>{day.title}</h3><span>{day.overnight}</span></div><p>{day.detail}</p>{day.note && <small>{day.note}</small>}</div></li>)}</ol></div></div>;
}
