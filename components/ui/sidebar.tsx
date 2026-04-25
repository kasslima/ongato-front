'use client'

import * as React from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { cn } from "@/lib/utils";

type SidebarContextValue = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}

function SidebarProvider({
  defaultCollapsed = false,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { defaultCollapsed?: boolean }) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  const toggleSidebar = React.useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
      <div
        data-slot="sidebar-provider"
        data-collapsed={collapsed ? "true" : "false"}
        className={cn("group/sidebar-wrapper flex min-h-screen w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function Sidebar({ className, children, ...props }: React.ComponentProps<"aside">) {
  const { collapsed } = useSidebar();

  return (
    <aside
      data-slot="sidebar"
      data-collapsed={collapsed ? "true" : "false"}
      className={cn(
        "relative flex shrink-0 flex-col border-r border-neutral-800/80 bg-neutral-950 text-neutral-100 p-3 transition-[width] duration-300",
        collapsed ? "w-[74px]" : "w-[280px]",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" className={cn("mb-3", className)} {...props} />;
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-content" className={cn("flex-1 space-y-3", className)} {...props} />;
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("mt-3 border-t border-neutral-800 pt-3", className)}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group" className={cn("space-y-2", className)} {...props} />;
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  const { collapsed } = useSidebar();

  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "px-2 text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition-opacity duration-200",
        collapsed ? "pointer-events-none h-0 overflow-hidden opacity-0" : "opacity-100",
        className
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group-content" className={cn("space-y-1", className)} {...props} />;
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="sidebar-menu" className={cn("space-y-1", className)} {...props} />;
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-item" className={cn("list-none", className)} {...props} />;
}

type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
  isActive?: boolean;
  icon?: React.ReactNode;
};

function SidebarMenuButton({
  className,
  isActive,
  icon,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const { collapsed } = useSidebar();

  return (
    <button
      data-slot="sidebar-menu-button"
      data-active={isActive ? "true" : "false"}
      className={cn(
        "flex w-full items-center rounded-lg text-left text-sm font-medium transition-colors",
        collapsed ? "justify-center px-2 py-2.5" : "gap-2.5 px-3 py-2.5",
        "data-[active=true]:bg-neutral-800 data-[active=true]:text-white",
        "data-[active=false]:text-neutral-300 data-[active=false]:hover:bg-neutral-900 data-[active=false]:hover:text-neutral-100",
        className
      )}
      {...props}
    >
      {icon ? <span className="text-neutral-300">{icon}</span> : null}
      <span
        className={cn(
          "truncate transition-all duration-200",
          collapsed ? "max-w-0 opacity-0" : "max-w-[180px] opacity-100"
        )}
      >
        {children}
      </span>
    </button>
  );
}

function SidebarTrigger({ className, ...props }: React.ComponentProps<"button">) {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <button
      data-slot="sidebar-trigger"
      type="button"
      onClick={toggleSidebar}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-700 bg-neutral-900 text-neutral-200 transition hover:bg-neutral-800",
        className
      )}
      aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
      {...props}
    >
      {collapsed ? <PanelLeftOpen className="h-3.5 w-3.5" /> : <PanelLeftClose className="h-3.5 w-3.5" />}
    </button>
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn("flex min-h-screen flex-1 flex-col bg-[#f4f1e7] p-4 md:p-6", className)}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
};