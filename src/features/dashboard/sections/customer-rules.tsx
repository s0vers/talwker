"use client";

import { LuArrowUpRight, LuCalendarDays, LuFileText } from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import type { DashboardCopy } from "@/features/dashboard/content/dashboard-content";

export function CustomerRules({ copy }: { copy: DashboardCopy }) {
  const policies = [{ label: copy.bookingPolicy, href: "/booking-policy" }, { label: copy.cancellationPolicy, href: "/cancellation" }, { label: copy.terms, href: "/terms" }] as const;
  return <div className="tw-customer-view tw-view-enter"><div className="tw-customer-intro"><div><span className="tw-eyebrow">{copy.beforeYouGo} · {copy.customerSample}</span><h1>{copy.travelRules}</h1><p>{copy.rulesIntro}</p></div></div><div className="tw-rules-grid"><section className="tw-surface tw-rules-main"><div className="tw-surface-head"><div><h2>{copy.beforeYouGo}</h2><p>{copy.rulesNote}</p></div><LuFileText aria-hidden="true" /></div><div className="tw-policy-list">{policies.map((policy, index) => <Link key={policy.href} href={policy.href}><span>0{index + 1}</span><strong>{policy.label}</strong><small>{copy.readPolicy}</small><LuArrowUpRight aria-hidden="true" /></Link>)}</div></section><aside className="tw-surface tw-rules-booking"><div className="tw-surface-head"><div><h2>{copy.myBooking}</h2><p>TW-2048 · {copy.sampleData}</p></div><LuCalendarDays aria-hidden="true" /></div><div className="tw-booking-facts"><div><span>{copy.bookingTime}</span><strong>17 October 2026 · 10:30 AM</strong></div><div><span>{copy.travelWindow}</span><strong>17–23 November 2026</strong></div></div><Link href="/contact" className="tw-button tw-button-quiet">{copy.contactUs}<LuArrowUpRight aria-hidden="true" /></Link></aside></div></div>;
}
