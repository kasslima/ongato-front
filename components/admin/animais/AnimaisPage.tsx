'use client'

import { useEffect, useState } from "react";
import SimpleCrud from "@/components/admin/crud/SimpleCrud";
import { AnimaisFilter } from "@/components/admin/crud/CrudFilters";
import { getAnimals, deleteAnimal, createAnimal, updateAnimal } from "@/lib/animals";
import { Animal } from "@/types/animais";
import { AnimalModal } from "./AnimalModal";

type StatusMessage = {
  type: "success" | "error";
  text: string;
};

export default function AnimaisPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ name?: string; type?: "gato" | "cachorro" }>({});
  const [message, setMessage] = useState<StatusMessage | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

  const fetchAnimals = async (showError = true) => {
    try {
      setLoading(true);
      const data = await getAnimals(filter);
      setAnimals(data);
      return true;
    } catch (error) {
      console.error("Erro ao buscar animais:", error);
      if (showError) {
        setMessage({ type: "error", text: "Nao foi possivel carregar os animais." });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, [filter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este animal?")) return;
    try {
      await deleteAnimal(Number(id));
      const refreshed = await fetchAnimals(false);
      setMessage({
        type: refreshed ? "success" : "error",
        text: refreshed
          ? "Animal excluido com sucesso."
          : "Animal excluido, mas nao foi possivel atualizar a lista.",
      });
    } catch (error) {
      console.error("Erro ao excluir animal:", error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Erro ao excluir animal." });
    }
  };

  const handleOpenCreate = () => {
    setEditingAnimal(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (animal: Animal) => {
    setEditingAnimal(animal);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: FormData | Record<string, unknown>) => {
    const isEditing = Boolean(editingAnimal);
    if (editingAnimal) {
      await updateAnimal(editingAnimal.id, data);
    } else {
      await createAnimal(data as FormData);
    }
    const refreshed = await fetchAnimals(false);
    setMessage({
      type: refreshed ? "success" : "error",
      text: refreshed
        ? isEditing
          ? "Animal atualizado com sucesso."
          : "Animal cadastrado com sucesso."
        : "Registro salvo, mas nao foi possivel atualizar a lista.",
    });
  };

  const crudItems = animals.map((a) => ({
    id: a.id.toString(),
    imageUrl: a.imageUrl,
    values: {
      nome: a.name,
      especie: a.type,
      status: a.gender === 'macho' ? 'Macho' : 'Fêmea',
      responsavel: a.age,
    },
    raw: a
  }));

  return (
    <>
      <SimpleCrud
        title="Animais"
        description="Gerencie os animais cadastrados para adocao e acompanhamento."
        itemLabel="animais"
        filterComponent={
          <AnimaisFilter 
            onSearch={(params) => setFilter(prev => ({ ...prev, ...params }))}
            onAdd={handleOpenCreate}
          />
        }
        fields={[
          { key: "nome", label: "Nome", placeholder: "Ex: Mingau" },
          { key: "especie", label: "Especie", placeholder: "Ex: Gato" },
          { key: "status", label: "Gênero", placeholder: "Ex: Macho" },
          { key: "responsavel", label: "Idade", placeholder: "Ex: 1 ano" },
        ]}
        items={crudItems}
        loading={loading}
        message={message}
        onDelete={handleDelete}
        onEdit={(item) => handleOpenEdit(item.raw as Animal)}
      />

      <AnimalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        animal={editingAnimal}
      />
    </>
  );
}
