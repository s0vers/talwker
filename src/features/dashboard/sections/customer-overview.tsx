"use client";

import Image from "next/image";
import { LuArrowRight, LuCalendarDays, LuClock3, LuFileText, LuPrinter } from "react-icons/lu";
import { TOURS } from "@/features/home/content/tours";
import type { CustomerView, DashboardCopy } from "@/features/dashboard/content/dashboard-content";

export function CustomerOverview({ copy, onViewChange, onPrint }: { copy: DashboardCopy; onViewChange: (view: CustomerView) => void; onPrint: () => void }) {
  const tour = TOURS[0];
  return <div className="tw-customer-view tw-view-enter"><div className="tw-customer-intro"><div><span className="tw-eyebrow">{copy.customerSample} · TW-2048</span><h1>{copy.customerHeading}</h1><p>{copy.customerIntro}</p></div><button type="button" className="tw-button tw-button-quiet" onClick={onPrint}><LuPrinter aria-hidden="true" />{copy.printCopy}</button></div>
    <div className="tw-customer-feature"><div className="tw-customer-feature-image"><Image src={tour.image} alt="Bali temple courtyard" fill sizes="(max-width: 800px) 100vw, 480px" priority /></div><div className="tw-customer-feature-copy"><span className="tw-eyebrow">{copy.myItinerary} / 01</span><h2>{tour.title}</h2><p>{tour.summary}</p><div className="tw-feature-meta"><span>{tour.destination}</span><span>{tour.duration}</span></div><button type="button" className="tw-text-action" onClick={() => onViewChange("itinerary")}>{copy.openFullItinerary}<LuArrowRight aria-hidden="true" /></button></div></div>
    <div className="tw-customer-info-grid"><section className="tw-surface tw-booking-card"><div className="tw-surface-head"><div><h2>{copy.myBooking}</h2><p>{copy.customerSample}</p></div><LuFileText aria-hidden="true" /></div><div className="tw-booking-facts"><div><span>{copy.bookingReference}</span><strong>TW-2048</strong></div><div><span>{copy.travelWindow}</span><strong>17–23 November 2026</strong></div><div><span>{copy.bookingStatus}</span><strong>{copy.sampleData}</strong></div></div></section><section className="tw-surface tw-consult-card"><div className="tw-surface-head"><div><h2>{copy.consultation}</h2><p>{copy.videoCall}</p></div><LuCalendarDays aria-hidden="true" /></div><strong>17 October 2026 <span>·</span> 10:30 AM</strong><p>{copy.consultHint}</p><div className="tw-consult-note"><LuClock3 aria-hidden="true" />{copy.meetingReminder}</div></section></div>
    <div className="tw-customer-bottom-link"><span>{copy.beforeYouGo}</span><button type="button" className="tw-text-action" onClick={() => onViewChange("rules")}>{copy.travelRules}<LuArrowRight aria-hidden="true" /></button></div></div>;
}
