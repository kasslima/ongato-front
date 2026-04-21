"use client";

import { CalendarDays, Cat, Megaphone, Search, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import { ADMIN_TABS, type AdminTab } from "./admin-types";

type AdminSidebarProps = {
  onLogout: () => void;
};

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const activePath = typeof window === "undefined" ? "" : window.location.pathname;

  return (
    <Sidebar>
      <SidebarHeader>
        <AdminSidebarHeader />
      </SidebarHeader>

      <SidebarContent>
        <AdminSidebarSearch />

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ADMIN_TABS.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    type="button"
                    isActive={activePath === item.href}
                    onClick={() => window.location.assign(item.href)}
                    icon={renderSidebarIcon(item.key)}
                    title={item.label}
                  >
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <AdminSidebarFooter onLogout={onLogout} />
      </SidebarFooter>
    </Sidebar>
  );
}

function renderSidebarIcon(tab: AdminTab) {
  if (tab === "animais") return <Cat className="h-4 w-4" />;
  if (tab === "eventos") return <CalendarDays className="h-4 w-4" />;
  if (tab === "banners") return <Megaphone className="h-4 w-4" />;
  return <Users className="h-4 w-4" />;
}

function AdminSidebarHeader() {
  const { collapsed } = useSidebar();

  if (collapsed) {
    return (
      <div className="px-0">
        <SidebarTrigger className="h-10 w-full rounded-lg border-neutral-800 bg-neutral-900 hover:bg-neutral-800" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-white transition-all duration-300">
      <div className="flex items-center justify-between gap-2">
        <div
          className={cn(
            "h-8 rounded-md bg-neutral-100/10 transition-all duration-300",
            "w-8 scale-100 opacity-100"
          )}
        />
        <div className="min-w-0 max-w-[140px] flex-1 overflow-hidden transition-all duration-300">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Untitled</p>
        </div>
        <SidebarTrigger className="h-8 w-8 shrink-0 rounded-md transition-all duration-300" />
      </div>
    </div>
  );
}

function AdminSidebarSearch() {
  const { collapsed } = useSidebar();

  if (collapsed) {
    return (
      <button
        type="button"
        className="flex w-full items-center justify-center rounded-lg bg-neutral-900 px-3 py-2 text-neutral-300 hover:bg-neutral-800"
        aria-label="Buscar"
        title="Buscar"
      >
        <Search className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
      <Input
        placeholder="Search"
        className="h-9 border-neutral-800 bg-neutral-900 pl-8 text-neutral-100 placeholder:text-neutral-500 focus-visible:ring-neutral-700"
      />
    </div>
  );
}

function AdminSidebarFooter({ onLogout }: { onLogout: () => void }) {
  const { collapsed } = useSidebar();

  return (
    <Button
      variant="outline"
      className="w-full border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800"
      onClick={onLogout}
      title="Sair"
    >
      {collapsed ? "↩" : "Sair"}
    </Button>
  );
}
