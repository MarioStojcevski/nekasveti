import type { GalleryImage } from "../types";

const apiFetch = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, init);
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = data?.error || data?.details || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data as T;
};

const json = (body: unknown) => ({
  method: "POST" as const,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const fetchGalleryImages = (): Promise<GalleryImage[]> =>
  apiFetch<GalleryImage[]>("/api/gallery");

export const createGalleryImage = (
  image_url: string,
  sort_order?: number
): Promise<GalleryImage> =>
  apiFetch<GalleryImage>("/api/gallery", json({ image_url, sort_order: sort_order ?? 0 }));

export const updateGalleryImage = (
  id: string,
  updates: Partial<Pick<GalleryImage, "sort_order">>
): Promise<void> =>
  apiFetch<void>("/api/gallery", { ...json({ id, ...updates }), method: "PATCH" });

export const deleteGalleryImage = (id: string): Promise<void> =>
  apiFetch<void>("/api/gallery", { ...json({ id }), method: "DELETE" });
