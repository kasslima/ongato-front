'use client'

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { logout } from "@/lib/api";

type AdminShellProps = {
  children: ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
    router.refresh();
  };

  return (
    <SidebarProvider defaultCollapsed>
      <AdminSidebar onLogout={handleLogout} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

