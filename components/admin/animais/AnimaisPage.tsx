'use client'

import { useEffect, useState } from "react";
import SimpleCrud from "@/components/admin/crud/SimpleCrud";
import { AnimaisFilter } from "@/components/admin/crud/CrudFilters";
import { getAnimals, deleteAnimal, createAnimal, updateAnimal } from "@/lib/animals";
import { Animal } from "@/types/animais";
import { AnimalModal } from "./AnimalModal";

export default function AnimaisPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ name?: string; type?: "gato" | "cachorro" }>({});
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

  const fetchAnimals = async () => {
    try {
      setLoading(true);
      const data = await getAnimals(filter);
      setAnimals(data);
    } catch (error) {
      console.error("Erro ao buscar animais:", error);
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
      fetchAnimals();
    } catch (error) {
      console.error("Erro ao excluir animal:", error);
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

  const handleSubmit = async (data: FormData | Record<string, any>) => {
    if (editingAnimal) {
      await updateAnimal(editingAnimal.id, data);
    } else {
      await createAnimal(data as FormData);
    }
    fetchAnimals();
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
