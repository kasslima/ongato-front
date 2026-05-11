'use client'

import { useEffect, useState } from "react";
import SimpleCrud from "@/components/admin/crud/SimpleCrud";
import { AnimaisFilter } from "@/components/admin/crud/CrudFilters";
import { getAnimals, deleteAnimal } from "@/lib/animals";
import { Animal } from "@/components/admin/animais-types";

export default function AnimaisPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ name?: string; type?: "gato" | "cachorro" }>({});

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

  const crudItems = animals.map((a) => ({
    id: a.id.toString(),
    values: {
      nome: a.name,
      especie: a.type,
      status: a.gender === 'macho' ? 'Macho' : 'Fêmea',
      responsavel: a.age,
    },
    raw: a
  }));

  return (
    <SimpleCrud
      title="Animais"
      description="Gerencie os animais cadastrados para adocao e acompanhamento."
      itemLabel="animais"
      filterComponent={
        <AnimaisFilter 
          onSearch={(params) => setFilter(prev => ({ ...prev, ...params }))}
          onAdd={() => alert("Modal de cadastro será implementado em seguida")}
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
      onEdit={(item) => alert(`Editar ${item.values.nome}`)}
    />
  );
}
