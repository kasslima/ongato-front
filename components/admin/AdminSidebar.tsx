"use client";

import { CalendarDays, Cat, Megaphone, Users } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
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

import { ADMIN_TABS, type AdminTab } from "@/types/admin";

type AdminSidebarProps = {
  onLogout: () => void;
};

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader>
        <AdminSidebarHeader />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ADMIN_TABS.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    type="button"
                    isActive={pathname === item.href}
                    onClick={() => router.push(item.href)}
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
      <div className="relative flex items-center gap-2">
        <div
          className={cn(
            "h-8 w-8 overflow-hidden rounded-md bg-neutral-100/10 transition-all duration-300",
            "w-8 scale-100 opacity-100"
          )}
        >
          <Image
            src="/ongato-logo.png"
            alt="Ongato logo"
            width={32}
            height={32}
            className="h-8 w-8 object-cover"
          />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 min-w-0 max-w-[140px] overflow-hidden transition-all duration-300">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">ongato</p>
        </div>
        <SidebarTrigger className="absolute right-0 h-8 w-8 shrink-0 rounded-md transition-all duration-300" />
      </div>
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
