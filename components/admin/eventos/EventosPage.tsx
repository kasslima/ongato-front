'use client'

import { useEffect, useState } from "react";
import SimpleCrud from "@/components/admin/crud/SimpleCrud";
import { EventosFilter } from "@/components/admin/crud/CrudFilters";
import { getEvents, deleteEvent, createEvent, updateEvent } from "@/lib/events";
import { Event } from "@/types/eventos";
import { EventoModal } from "./EventoModal";

type StatusMessage = {
  type: "success" | "error";
  text: string;
};

export default function EventosPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ title?: string }>({});
  const [message, setMessage] = useState<StatusMessage | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvento, setEditingEvento] = useState<Event | null>(null);

  const fetchEvents = async (showError = true) => {
    try {
      setLoading(true);
      const data = await getEvents(filter);
      setEvents(data);
      return true;
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      if (showError) {
        setMessage({ type: "error", text: "Nao foi possivel carregar os eventos." });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;
    try {
      await deleteEvent(Number(id));
      const refreshed = await fetchEvents(false);
      setMessage({
        type: refreshed ? "success" : "error",
        text: refreshed
          ? "Evento excluido com sucesso."
          : "Evento excluido, mas nao foi possivel atualizar a lista.",
      });
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Erro ao excluir evento." });
    }
  };

  const handleOpenCreate = () => {
    setEditingEvento(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (evento: Event) => {
    setEditingEvento(evento);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: FormData | Record<string, unknown>) => {
    const isEditing = Boolean(editingEvento);
    if (editingEvento) {
      await updateEvent(editingEvento.id, data);
    } else {
      await createEvent(data as FormData);
    }
    const refreshed = await fetchEvents(false);
    setMessage({
      type: refreshed ? "success" : "error",
      text: refreshed
        ? isEditing
          ? "Evento atualizado com sucesso."
          : "Evento cadastrado com sucesso."
        : "Registro salvo, mas nao foi possivel atualizar a lista.",
    });
  };

  const crudItems = events.map((e) => ({
    id: e.id.toString(),
    imageUrl: e.imageUrl,
    values: {
      titulo: e.title,
      texto: e.text || "—",
      criado: e.createdAt ? new Date(e.createdAt).toLocaleDateString("pt-BR") : "—",
    },
    raw: e
  }));

  return (
    <>
      <SimpleCrud
        title="Eventos"
        description="Organize campanhas, feiras e atividades do instituto."
        itemLabel="eventos"
        filterComponent={
          <EventosFilter 
            onSearch={(params) => setFilter(prev => ({ ...prev, ...params }))}
            onAdd={handleOpenCreate}
          />
        }
        fields={[
          { key: "titulo", label: "Título", placeholder: "Ex: Feira de Adoção" },
          { key: "texto", label: "Texto", placeholder: "Ex: Descrição do evento" },
          { key: "criado", label: "Criado em", placeholder: "Ex: 01/01/2026" },
        ]}
        items={crudItems}
        loading={loading}
        message={message}
        onDelete={handleDelete}
        onEdit={(item) => handleOpenEdit(item.raw as Event)}
      />

      <EventoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        evento={editingEvento}
      />
    </>
  );
}
