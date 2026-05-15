'use client'

import { useEffect, useState } from "react";
import SimpleCrud from "@/components/admin/crud/SimpleCrud";
import { BannersFilter } from "@/components/admin/crud/CrudFilters";
import { getBanners, deleteBanner, createBanner, updateBanner } from "@/lib/banners";
import { Banner } from "@/types/banners";
import { BannerModal } from "./BannerModal";

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ title?: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const data = await getBanners(filter);
      setBanners(data);
    } catch (error) {
      console.error("Erro ao buscar banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBanners(); }, [filter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este banner?")) return;
    try { await deleteBanner(Number(id)); fetchBanners(); }
    catch (error) { console.error("Erro ao excluir banner:", error); }
  };

  const handleSubmit = async (data: FormData | Record<string, any>) => {
    if (editingBanner) { await updateBanner(editingBanner.id, data); }
    else { await createBanner(data as FormData); }
    fetchBanners();
  };

  const crudItems = banners.map((b) => ({
    id: b.id.toString(),
    values: {
      titulo: b.title,
      descricao: b.description || "—",
      criado: b.createdAt ? new Date(b.createdAt).toLocaleDateString("pt-BR") : "—",
    },
    raw: b
  }));

  return (
    <>
      <SimpleCrud
        title="Banners"
        description="Atualize os banners exibidos nas paginas publicas do site."
        itemLabel="banners"
        filterComponent={
          <BannersFilter
            onSearch={(params) => setFilter(prev => ({ ...prev, ...params }))}
            onAdd={() => { setEditingBanner(null); setIsModalOpen(true); }}
          />
        }
        fields={[
          { key: "titulo", label: "Título", placeholder: "Ex: Campanha de Inverno" },
          { key: "descricao", label: "Descrição", placeholder: "Ex: Banner principal" },
          { key: "criado", label: "Criado em", placeholder: "Ex: 01/01/2026" },
        ]}
        items={crudItems}
        onDelete={handleDelete}
        onEdit={(item) => { setEditingBanner(item.raw as Banner); setIsModalOpen(true); }}
      />
      <BannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        banner={editingBanner}
      />
    </>
  );
}
