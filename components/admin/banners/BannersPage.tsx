'use client'

import { useEffect, useState } from "react";
import SimpleCrud from "@/components/admin/crud/SimpleCrud";
import { BannersFilter } from "@/components/admin/crud/CrudFilters";
import { getBanners, deleteBanner, createBanner, updateBanner } from "@/lib/banners";
import { Banner } from "@/types/banners";
import { BannerModal } from "./BannerModal";

type StatusMessage = {
  type: "success" | "error";
  text: string;
};

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ title?: string }>({});
  const [message, setMessage] = useState<StatusMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const fetchBanners = async (showError = true) => {
    try {
      setLoading(true);
      const data = await getBanners(filter);
      setBanners(data);
      return true;
    } catch (error) {
      console.error("Erro ao buscar banners:", error);
      if (showError) {
        setMessage({ type: "error", text: "Nao foi possivel carregar os banners." });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBanners(); }, [filter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este banner?")) return;
    try {
      await deleteBanner(Number(id));
      const refreshed = await fetchBanners(false);
      setMessage({
        type: refreshed ? "success" : "error",
        text: refreshed
          ? "Banner excluido com sucesso."
          : "Banner excluido, mas nao foi possivel atualizar a lista.",
      });
    }
    catch (error) {
      console.error("Erro ao excluir banner:", error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Erro ao excluir banner." });
    }
  };

  const handleSubmit = async (data: FormData | Record<string, unknown>) => {
    const isEditing = Boolean(editingBanner);
    if (editingBanner) { await updateBanner(editingBanner.id, data); }
    else { await createBanner(data as FormData); }
    const refreshed = await fetchBanners(false);
    setMessage({
      type: refreshed ? "success" : "error",
      text: refreshed
        ? isEditing
          ? "Banner atualizado com sucesso."
          : "Banner cadastrado com sucesso."
        : "Registro salvo, mas nao foi possivel atualizar a lista.",
    });
  };

  const crudItems = banners.map((b) => ({
    id: b.id.toString(),
    imageUrl: b.imageUrl,
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
        loading={loading}
        message={message}
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
