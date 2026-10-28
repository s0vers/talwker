"use client";

import { useState } from "react";
import { CustomerShell } from "@/features/dashboard/sections/customer-shell";
import { CustomerOverview } from "@/features/dashboard/sections/customer-overview";
import { CustomerItinerary } from "@/features/dashboard/sections/customer-itinerary";
import { CustomerRules } from "@/features/dashboard/sections/customer-rules";
import { getDashboardCopy, type CustomerView } from "@/features/dashboard/content/dashboard-content";
import "@/features/dashboard/dashboard.css";

export default function CustomerDashboardPage({ locale }: { locale: string }) {
  const copy = getDashboardCopy(locale);
  const [view, setView] = useState<CustomerView>("overview");
  const print = () => { setView("itinerary"); window.setTimeout(() => window.print(), 100); };
  return <CustomerShell copy={copy} active={view} onViewChange={setView}>{view === "overview" && <CustomerOverview copy={copy} onViewChange={setView} onPrint={print} />}{view === "itinerary" && <CustomerItinerary copy={copy} onPrint={print} />}{view === "rules" && <CustomerRules copy={copy} />}</CustomerShell>;
}
