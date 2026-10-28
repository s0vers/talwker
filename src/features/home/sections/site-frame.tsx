"use client";

import { usePathname } from "@/i18n/navigation";
import type { ReactNode } from "react";

export function SiteFrame({
	children,
	navbar,
	footer
}: {
	children: ReactNode;
	navbar: ReactNode;
	footer: ReactNode;
}) {
	const pathname = usePathname();
	const isDashboard =
		pathname === "/dashboard" || pathname.startsWith("/dashboard/");
	const isAuth = /^\/(?:login|register)(?:-[23])?$/.test(pathname);
	const showSiteChrome = !isDashboard && !isAuth;
	return (
		<>
			{showSiteChrome && navbar}
			<main id="main-content" className="relative bg-[#050505] text-white">
				{children}
			</main>
			{showSiteChrome && footer}
		</>
	);
}
