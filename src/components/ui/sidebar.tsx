"use client";

import * as React from "react";
import { LuPanelLeft } from "react-icons/lu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type SidebarContextValue = {
  open: boolean;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);
const mobileQuery = "(max-width: 767px)";
const subscribeMobile = (callback: () => void) => {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const getMobile = () => window.matchMedia(mobileQuery).matches;
const getServerMobile = () => false;

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
}

export function SidebarProvider({ children, className, style, defaultOpen = true, ...props }: React.ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const isMobile = React.useSyncExternalStore(subscribeMobile, getMobile, getServerMobile);
  const [open, setOpen] = React.useState(defaultOpen);
  const [openMobile, setOpenMobile] = React.useState(false);
  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((value) => !value);
    else setOpen((value) => { document.cookie = `sidebar_state=${!value}; path=/; max-age=604800`; return !value; });
  }, [isMobile]);
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "b" && (event.metaKey || event.ctrlKey)) { event.preventDefault(); toggleSidebar(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleSidebar]);
  const context = React.useMemo(() => ({ open, isMobile, openMobile, setOpenMobile, toggleSidebar }), [open, isMobile, openMobile, toggleSidebar]);
  return <SidebarContext.Provider value={context}><div data-slot="sidebar-wrapper" className={cn("tw-sidebar-wrapper", className)} style={{ "--sidebar-width": "224px", "--sidebar-width-icon": "68px", ...style } as React.CSSProperties} {...props}>{children}</div></SidebarContext.Provider>;
}

export function Sidebar({ children, className, mobileTitle = "Navigation", ...props }: React.ComponentProps<"aside"> & { mobileTitle?: string }) {
  const { isMobile, open, openMobile, setOpenMobile } = useSidebar();
  if (isMobile) return <Sheet open={openMobile} onOpenChange={setOpenMobile}><SheetContent side="left" data-slot="sidebar" data-mobile="true" className="tw-sidebar-mobile"><SheetHeader className="sr-only"><SheetTitle>{mobileTitle}</SheetTitle></SheetHeader><div className="tw-sidebar-inner">{children}</div></SheetContent></Sheet>;
  return <aside data-slot="sidebar" data-state={open ? "expanded" : "collapsed"} data-collapsible={open ? "" : "icon"} className={cn("tw-shadcn-sidebar", className)} {...props}><div data-slot="sidebar-gap" className="tw-sidebar-gap" /><div data-slot="sidebar-container" className="tw-sidebar-container"><div data-slot="sidebar-inner" className="tw-sidebar-inner">{children}</div></div></aside>;
}

export function SidebarInset({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-inset" className={cn("tw-sidebar-inset", className)} {...props} />;
}

export function SidebarTrigger({ className, expandLabel = "Expand sidebar", collapseLabel = "Collapse sidebar", ...props }: React.ComponentProps<"button"> & { expandLabel?: string; collapseLabel?: string }) {
  const { isMobile, open, openMobile, toggleSidebar } = useSidebar();
  const expanded = isMobile ? openMobile : open;
  return <button type="button" data-slot="sidebar-trigger" aria-label={expanded ? collapseLabel : expandLabel} aria-expanded={expanded} className={cn("tw-sidebar-trigger", className)} onClick={toggleSidebar} {...props}><LuPanelLeft aria-hidden="true" /></button>;
}

export function SidebarHeader(props: React.ComponentProps<"div">) { return <div data-slot="sidebar-header" {...props} />; }
export function SidebarContent(props: React.ComponentProps<"div">) { return <div data-slot="sidebar-content" {...props} />; }
export function SidebarFooter(props: React.ComponentProps<"div">) { return <div data-slot="sidebar-footer" {...props} />; }
export function SidebarGroup(props: React.ComponentProps<"div">) { return <div data-slot="sidebar-group" {...props} />; }
export function SidebarMenu(props: React.ComponentProps<"ul">) { return <ul data-slot="sidebar-menu" {...props} />; }
export function SidebarMenuItem(props: React.ComponentProps<"li">) { return <li data-slot="sidebar-menu-item" {...props} />; }
export function SidebarMenuButton({ isActive, className, ...props }: React.ComponentProps<"button"> & { isActive?: boolean }) {
  return <button type="button" data-slot="sidebar-menu-button" data-active={isActive || undefined} className={cn("tw-sidebar-menu-button", className)} {...props} />;
}
