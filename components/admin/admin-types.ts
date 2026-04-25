export type AdminTab = "animais" | "eventos" | "banners" | "usuarios";

export type AdminNavItem = {
  key: AdminTab;
  label: string;
  href: string;
};

export const ADMIN_TABS: AdminNavItem[] = [
  { key: "animais", label: "Animais", href: "/admin/animais" },
  { key: "eventos", label: "Eventos", href: "/admin/eventos" },
  { key: "banners", label: "Banners", href: "/admin/banners" },
  { key: "usuarios", label: "Usuarios", href: "/admin/usuarios" },
];
