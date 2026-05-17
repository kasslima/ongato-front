'use client'

import { useEffect, useState } from "react";
import SimpleCrud from "@/components/admin/crud/SimpleCrud";
import { EventosFilter } from "@/components/admin/crud/CrudFilters";
import { getEvents, deleteEvent, createEvent, updateEvent } from "@/lib/events";
import { Event } from "@/types/eventos";
import { EventoModal } from "./EventoModal";

export default function EventosPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ title?: string }>({});
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvento, setEditingEvento] = useState<Event | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents(filter);
      setEvents(data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
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
      fetchEvents();
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
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

  const handleSubmit = async (data: FormData | Record<string, any>) => {
    if (editingEvento) {
      await updateEvent(editingEvento.id, data);
    } else {
      await createEvent(data as FormData);
    }
    fetchEvents();
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
