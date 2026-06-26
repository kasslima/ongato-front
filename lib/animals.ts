import { apiFetch, throwApiError } from "./api";
import { Animal, GetAnimalsParams } from "@/types/animais";

export async function getAnimals(params: GetAnimalsParams = {}) {
  const query = new URLSearchParams();
  if (params.cursor) query.set("cursor", params.cursor.toString());
  if (params.limit) query.set("limit", params.limit.toString());
  if (params.name) query.set("name", params.name);
  if (params.type) query.set("type", params.type);
  if (params.gender) query.set("gender", params.gender);
  if (params.featured) query.set("featured", "1");

  const response = await apiFetch(`/animals?${query.toString()}`);
  if (!response.ok) await throwApiError(response, "Falha ao buscar animais");
  
  const data = await response.json();
  return data.result as Animal[];
}

export function getAnimalAttributes(attributes: Animal["attributes"]) {
  return (attributes || "")
    .split(",")
    .map((attribute) => attribute.trim())
    .filter(Boolean);
}

export function getAnimalTypeLabel(type: Animal["type"]) {
  return type === "gato" ? "Gato" : "Cão";
}

export function getAnimalLifeStage(age: Animal["age"]) {
  if (age === "0 a 6 meses" || age === "6 a 12 meses") return "Filhote";
  if (age === "mais de 9 anos") return "Sênior";
  return "Adulto";
}

export function getAnimalSizeLabel(size: Animal["size"]) {
  const labels: Record<Animal["size"], string> = {
    pequeno: "Pequeno",
    medio: "Médio",
    grande: "Grande",
  };

  return labels[size];
}

export async function deleteAnimal(id: number) {
  const response = await apiFetch(`/animals/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) await throwApiError(response, "Falha ao excluir animal");
}

export async function createAnimal(formData: FormData) {
  const response = await apiFetch("/animals", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) await throwApiError(response, "Falha ao criar animal");
  return await response.json();
}

export async function updateAnimal(id: number, data: FormData | Record<string, unknown>) {
  const isFormData = data instanceof FormData;
  
  const response = await apiFetch(`/animals/${id}`, {
    method: "PATCH",
    headers: isFormData ? {} : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data),
  });
  if (!response.ok) await throwApiError(response, "Falha ao atualizar animal");
  return await response.json();
}
