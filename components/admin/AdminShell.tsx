'use client'

import { ReactNode, useEffect, useSyncExternalStore } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  getAuthServerSnapshot,
  isAuthenticated,
  logout,
  subscribeAuthChange,
} from "@/lib/auth";

type AdminShellProps = {
  children: ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  const authenticated = useSyncExternalStore(
    subscribeAuthChange,
    isAuthenticated,
    getAuthServerSnapshot
  );

  useEffect(() => {
    if (!authenticated) {
      window.location.replace("/auth/login");
    }
  }, [authenticated]);

  const handleLogout = () => {
    logout();
    window.location.replace("/auth/login");
  };

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f1e8] p-6">
        <p className="text-sm text-neutral-600">Verificando acesso administrativo...</p>
      </main>
    );
  }

  return (
    <SidebarProvider>
      <AdminSidebar onLogout={handleLogout} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
