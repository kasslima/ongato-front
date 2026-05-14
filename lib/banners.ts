import { apiFetch } from "./api";
import { Banner, GetBannersParams } from "@/components/admin/banners-types";

export async function getBanners(params: GetBannersParams = {}) {
  const query = new URLSearchParams();
  if (params.cursor) query.set("cursor", params.cursor.toString());
  if (params.limit) query.set("limit", params.limit.toString());
  if (params.title) query.set("title", params.title);

  const response = await apiFetch(`/banners?${query.toString()}`);
  if (!response.ok) throw new Error("Falha ao buscar banners");
  
  const data = await response.json();
  return data.result as Banner[];
}

export async function deleteBanner(id: number) {
  const response = await apiFetch(`/banners/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Falha ao excluir banner");
}

export async function createBanner(formData: FormData) {
  const response = await apiFetch("/banners", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Falha ao criar banner");
  return await response.json();
}

export async function updateBanner(id: number, data: FormData | Record<string, any>) {
  const isFormData = data instanceof FormData;
  
  const response = await apiFetch(`/banners/${id}`, {
    method: "PATCH",
    headers: isFormData ? {} : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Falha ao atualizar banner");
  return await response.json();
}
