"use client";

import type { ReactNode } from "react";
import {
	LuArrowUpRight,
	LuBookOpen,
	LuCalendarDays,
	LuFileText,
	LuLayoutDashboard
} from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/shared/ui";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
	useSidebar
} from "@/components/ui/sidebar";
import type {
	AdminView,
	DashboardCopy
} from "@/features/dashboard/content/dashboard-content";

type Props = {
	children: ReactNode;
	copy: DashboardCopy;
	active: AdminView;
	onViewChange: (view: AdminView) => void;
};
const navigation = [
	{ key: "overview", icon: LuLayoutDashboard },
	{ key: "schedule", icon: LuCalendarDays },
	{ key: "itineraries", icon: LuFileText },
	{ key: "website", icon: LuBookOpen }
] as const;

function AdminSidebar({ copy, active, onViewChange }: Omit<Props, "children">) {
	const { isMobile, setOpenMobile } = useSidebar();
	const choose = (view: AdminView) => {
		onViewChange(view);
		if (isMobile) setOpenMobile(false);
	};
	return (
		<Sidebar mobileTitle={copy.workspace}>
			<SidebarHeader className="tw-sidebar-header">
				<Link href="/" className="tw-wordmark" aria-label="Talkwer home">
					talkwer<span>.</span>
				</Link>
				<span className="tw-role-caption">{copy.admin}</span>
			</SidebarHeader>
			<SidebarContent role="navigation" aria-label={copy.workspace}>
				<SidebarMenu className="tw-sidebar-menu">
					{navigation.map(({ key, icon: Icon }) => (
						<SidebarMenuItem key={key}>
							<SidebarMenuButton
								title={copy[key]}
								isActive={active === key}
								aria-current={active === key ? "page" : undefined}
								onClick={() => choose(key)}
							>
								<Icon aria-hidden="true" />
								<span>{copy[key]}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter className="tw-sidebar-footer">
				<Link
					href="/"
					className="tw-sidebar-footer-link"
					aria-label={copy.backToSite}
				>
					<LuArrowUpRight aria-hidden="true" />
					<span>{copy.backToSite}</span>
				</Link>
			</SidebarFooter>
		</Sidebar>
	);
}

export function AdminShell({ children, copy, active, onViewChange }: Props) {
	return (
		<SidebarProvider className="tw-dashboard tw-admin">
			<a href="#dashboard-content" className="tw-skip">
				{copy.overview}
			</a>
			<AdminSidebar copy={copy} active={active} onViewChange={onViewChange} />
			<SidebarInset>
				<header className="tw-admin-header">
					<div className="tw-header-start">
						<SidebarTrigger
							expandLabel={copy.expand}
							collapseLabel={copy.collapse}
						/>
						<span className="tw-breadcrumb">
							{copy.workspace}
							<span aria-hidden="true">/</span>
							<strong>{copy[active]}</strong>
						</span>
					</div>
					<div className="tw-header-end">
						<span className="tw-preview-label">
							<i />
							{copy.preview}
						</span>
						<Link href="/dashboard/customer" className="tw-view-switch">
							{copy.switchCustomer}
							<LuArrowUpRight aria-hidden="true" />
						</Link>
						<LanguageSwitcher compact />
						<span className="tw-avatar" aria-label={copy.admin}>
							T
						</span>
					</div>
				</header>
				<div id="dashboard-content" className="tw-admin-scroll" tabIndex={-1}>
					{children}
				</div>
			</SidebarInset>
			<nav className="tw-admin-mobile-tabs" aria-label={copy.workspace}>
				{navigation.map(({ key, icon: Icon }) => (
					<button
						key={key}
						type="button"
						aria-current={active === key ? "page" : undefined}
						onClick={() => onViewChange(key)}
					>
						<Icon aria-hidden="true" />
						<span>{copy[key]}</span>
					</button>
				))}
			</nav>
		</SidebarProvider>
	);
}
