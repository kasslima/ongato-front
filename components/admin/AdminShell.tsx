'use client'

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { logout } from "@/lib/auth";

type AdminShellProps = {
  children: ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
    // Força o reload para limpar os caches do Next.js e passar pelo middleware novamente
    router.refresh();
  };

  return (
    <SidebarProvider>
      <AdminSidebar onLogout={handleLogout} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

