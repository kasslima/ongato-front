import { apiFetch } from "./api";
import { Animal, GetAnimalsParams } from "@/components/admin/animais-types";

export async function getAnimals(params: GetAnimalsParams = {}) {
  const query = new URLSearchParams();
  if (params.cursor) query.set("cursor", params.cursor.toString());
  if (params.limit) query.set("limit", params.limit.toString());
  if (params.name) query.set("name", params.name);
  if (params.type) query.set("type", params.type);
  if (params.gender) query.set("gender", params.gender);

  const response = await apiFetch(`/animals?${query.toString()}`);
  if (!response.ok) throw new Error("Falha ao buscar animais");
  
  const data = await response.json();
  return data.result as Animal[];
}

export async function deleteAnimal(id: number) {
  const response = await apiFetch(`/animals/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Falha ao excluir animal");
}

export async function createAnimal(formData: FormData) {
  const response = await apiFetch("/animals", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Falha ao criar animal");
  return await response.json();
}

export async function updateAnimal(id: number, data: FormData | Record<string, any>) {
  const isFormData = data instanceof FormData;
  
  const response = await apiFetch(`/animals/${id}`, {
    method: "PATCH",
    headers: isFormData ? {} : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Falha ao atualizar animal");
  return await response.json();
}
