"use client";

import type { ReactNode } from "react";
import {
	LuCalendarDays,
	LuFileText,
	LuLayoutDashboard,
	LuMoveLeft
} from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/shared/ui";
import type {
	CustomerView,
	DashboardCopy
} from "@/features/dashboard/content/dashboard-content";

type Props = {
	children: ReactNode;
	copy: DashboardCopy;
	active: CustomerView;
	onViewChange: (view: CustomerView) => void;
};

const tabs = [
	{ key: "overview", icon: LuLayoutDashboard, label: "overview" },
	{ key: "itinerary", icon: LuFileText, label: "myItinerary" },
	{ key: "rules", icon: LuCalendarDays, label: "travelRules" }
] as const;

export function CustomerShell({ children, copy, active, onViewChange }: Props) {
	return (
		<div className="tw-dashboard tw-customer">
			<header className="tw-customer-header">
				<div className="tw-customer-brand">
					<Link href="/" className="tw-wordmark" aria-label="Talkwer home">
						talkwer<span>.</span>
					</Link>
					<span className="tw-role-caption">{copy.customer}</span>
				</div>
				<nav className="tw-customer-nav" aria-label={copy.customer}>
					{tabs.map(({ key, label }) => (
						<button
							key={key}
							type="button"
							aria-current={active === key ? "page" : undefined}
							onClick={() => onViewChange(key)}
						>
							{copy[label]}
						</button>
					))}
				</nav>
				<div className="tw-header-end">
					<span className="tw-preview-label">
						<i />
						{copy.preview}
					</span>
					<LanguageSwitcher compact />
					<Link href="/dashboard" className="tw-view-switch">
						<LuMoveLeft aria-hidden="true" />
						{copy.switchAdmin}
					</Link>
				</div>
			</header>
			<div className="tw-customer-scroll">{children}</div>
			<nav className="tw-customer-mobile-tabs" aria-label={copy.customer}>
				{tabs.map(({ key, icon: Icon, label }) => (
					<button
						key={key}
						type="button"
						aria-current={active === key ? "page" : undefined}
						onClick={() => onViewChange(key)}
					>
						<Icon aria-hidden="true" />
						<span>{copy[label]}</span>
					</button>
				))}
			</nav>
		</div>
	);
}
