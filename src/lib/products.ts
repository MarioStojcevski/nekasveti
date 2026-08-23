import type { Product } from "../types";

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

export const fetchProducts = (): Promise<Product[]> =>
  apiFetch<Product[]>("/api/products");

export const createProduct = (
  name: string,
  price: number,
  sort_order: number,
  image_url?: string | null
): Promise<Product> =>
  apiFetch<Product>("/api/products", json({ name, price, sort_order, image_url: image_url ?? null }));

export const updateProduct = (
  id: string,
  updates: Partial<Pick<Product, "name" | "price" | "sort_order" | "image_url">>
): Promise<void> =>
  apiFetch<void>("/api/products", { ...json({ id, ...updates }), method: "PATCH" });

export const deleteProduct = (id: string): Promise<void> =>
  apiFetch<void>("/api/products", { ...json({ id }), method: "DELETE" });
