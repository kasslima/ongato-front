import { apiFetch, throwApiError } from "./api";
import { Event, GetEventsParams } from "@/types/eventos";

export async function getEvents(params: GetEventsParams = {}) {
  const query = new URLSearchParams();
  if (params.cursor) query.set("cursor", params.cursor.toString());
  if (params.limit) query.set("limit", params.limit.toString());
  if (params.title) query.set("title", params.title);

  const response = await apiFetch(`/events?${query.toString()}`);
  if (!response.ok) await throwApiError(response, "Falha ao buscar eventos");
  
  const data = await response.json();
  return data.result as Event[];
}

export async function deleteEvent(id: number) {
  const response = await apiFetch(`/events/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) await throwApiError(response, "Falha ao excluir evento");
}

export async function createEvent(formData: FormData) {
  const response = await apiFetch("/events", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) await throwApiError(response, "Falha ao criar evento");
  return await response.json();
}

export async function updateEvent(id: number, data: FormData | Record<string, any>) {
  const isFormData = data instanceof FormData;
  
  const response = await apiFetch(`/events/${id}`, {
    method: "PATCH",
    headers: isFormData ? {} : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data),
  });
  if (!response.ok) await throwApiError(response, "Falha ao atualizar evento");
  return await response.json();
}
