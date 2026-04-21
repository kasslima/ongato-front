'use client'

import { ReactNode, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { CalendarDays, Cat, Megaphone, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
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
} from "@/components/ui/sidebar";
import {
  getAuthServerSnapshot,
  isAuthenticated,
  logout,
  subscribeAuthChange,
} from "@/lib/auth";
import { cn } from "@/lib/utils";

type AdminTab = "animais" | "eventos" | "banners" | "usuarios";

type AdminSection = {
  title: string;
  description: string;
  emptyMessage: string;
  draftItems: string[];
};

const sidebarItems: Array<{ key: AdminTab; label: string }> = [
  { key: "animais", label: "Animais" },
  { key: "eventos", label: "Eventos" },
  { key: "banners", label: "Banners" },
  { key: "usuarios", label: "Usuarios" },
];

const sidebarIcons: Record<AdminTab, ReactNode> = {
  animais: <Cat className="h-4 w-4" />,
  eventos: <CalendarDays className="h-4 w-4" />,
  banners: <Megaphone className="h-4 w-4" />,
  usuarios: <Users className="h-4 w-4" />,
};

const sectionContent: Record<AdminTab, AdminSection> = {
  animais: {
    title: "Animais",
    description: "Gerencie os animais cadastrados para adocao e acompanhamento.",
    emptyMessage: "Nenhum animal cadastrado no momento.",
    draftItems: ["Nome", "Especie", "Status", "Responsavel"],
  },
  eventos: {
    title: "Eventos",
    description: "Organize campanhas, feiras e atividades do instituto.",
    emptyMessage: "Nenhum evento criado ainda.",
    draftItems: ["Titulo", "Data", "Local", "Publicacao"],
  },
  banners: {
    title: "Banners",
    description: "Atualize os banners exibidos nas paginas publicas do site.",
    emptyMessage: "Nenhum banner ativo neste momento.",
    draftItems: ["Titulo", "Posicao", "Periodo", "Visibilidade"],
  },
  usuarios: {
    title: "Usuarios",
    description: "Controle os acessos administrativos e permissoes da equipe.",
    emptyMessage: "Nenhum usuario administrativo encontrado.",
    draftItems: ["Nome", "E-mail", "Perfil", "Ultimo acesso"],
  },
};

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("animais");
  const authenticated = useSyncExternalStore(
    subscribeAuthChange,
    isAuthenticated,
    getAuthServerSnapshot
  );
  const activeSection = useMemo(() => sectionContent[activeTab], [activeTab]);

  useEffect(() => {
    if (!authenticated) {
      router.replace("/auth/login");
    }
  }, [authenticated, router]);

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
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
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      type="button"
                      isActive={item.key === activeTab}
                      onClick={() => setActiveTab(item.key)}
                      icon={sidebarIcons[item.key]}
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
          <AdminSidebarFooter onLogout={handleLogout} />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <section className="mx-auto w-full max-w-6xl">
          <Card className="max-w-none border-neutral-200 bg-white">
            <CardHeader>
              <CardTitle>{activeSection.title}</CardTitle>
              <CardDescription>{activeSection.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {activeSection.draftItems.map((field) => (
                  <div key={field} className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                    <p className="text-xs uppercase tracking-wide text-neutral-500">Campo</p>
                    <p className="mt-1 text-sm font-medium text-neutral-800">{field}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-4">
                <p className="text-sm text-neutral-600">{activeSection.emptyMessage}</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
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
      className={collapsed ? "w-full border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800" : "w-full border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800"}
      onClick={onLogout}
      title="Sair"
    >
      {collapsed ? "↩" : "Sair"}
    </Button>
  );
}
