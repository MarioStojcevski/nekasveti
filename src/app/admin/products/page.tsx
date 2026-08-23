"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft, Plus, Pencil, Trash2, LoaderCircle, X, GripVertical, Upload,
} from "lucide-react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/products";
import type { Product } from "@/types";

const AdminProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formSort, setFormSort] = useState("0");
  const [formError, setFormError] = useState("");

  const [formImageUrl, setFormImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [confirmDelete, setConfirmDelete] = useState<Product | null>(null);

  useEffect(() => {
    const session = sessionStorage.getItem("admin_session");
    if (!session) {
      router.replace("/admin/login");
      return;
    }
    let active = true;
    void (async () => {
      try {
        const data = await fetchProducts();
        if (active) setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [router]);

  const openAdd = () => {
    setEditing(null);
    setFormName("");
    setFormPrice("");
    setFormSort(String(products.length));
    setFormImageUrl(null);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setFormName(p.name);
    setFormPrice(String(p.price));
    setFormSort(String(p.sort_order));
    setFormImageUrl(p.image_url ?? null);
    setFormError("");
    setModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setFormError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/products/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setFormImageUrl(data.url);
    } catch (err) {
      console.error("Image upload failed:", err);
      setFormError("Грешка при прикачување на слика");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    const name = formName.trim();
    const price = parseInt(formPrice, 10);
    const sort_order = parseInt(formSort, 10) || 0;

    if (!name) { setFormError("Име е задолжително"); return; }
    if (isNaN(price) || price <= 0) { setFormError("Цената мора да биде позитивен број"); return; }

    setSaving(true);
    setFormError("");
    try {
      if (editing) {
        await updateProduct(editing.id, { name, price, sort_order, image_url: formImageUrl });
        setProducts((prev) =>
          prev.map((p) => (p.id === editing.id ? { ...p, name, price, sort_order, image_url: formImageUrl } : p))
        );
      } else {
        const created = await createProduct(name, price, sort_order, formImageUrl);
        setProducts((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to save product:", err);
      setFormError("Грешка при зачувување");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setConfirmDelete(null);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="w-8 h-8 border-2 border-copper-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-4 pb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-page-700 text-text-400 hover:text-copper-400 hover:bg-page-600 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-bold text-text-100">Производи</h1>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-copper-500 text-text-100 text-sm font-semibold hover:bg-copper-400 transition-colors active:scale-95"
        >
          <Plus size={16} />
          Додади
        </button>
      </div>

      <div className="rounded-2xl bg-page-800 border border-page-500/50 overflow-hidden">
        {products.length === 0 ? (
          <div className="text-center py-16 text-text-500 text-sm">
            Нема производи. Додадете прв производ.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-page-500/50">
                <th className="text-left py-3 px-4 text-text-400 font-medium w-10"></th>
                <th className="text-left py-3 px-4 text-text-400 font-medium w-14"></th>
                <th className="text-left py-3 px-4 text-text-400 font-medium">Име</th>
                <th className="text-left py-3 px-4 text-text-400 font-medium whitespace-nowrap">Цена</th>
                <th className="text-left py-3 px-4 text-text-400 font-medium whitespace-nowrap">Редослед</th>
                <th className="text-right py-3 px-4 text-text-400 font-medium">Акции</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-page-500/30 hover:bg-page-700/50 transition-colors">
                  <td className="py-3 px-4 text-text-500">
                    <GripVertical size={14} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-page-600 flex-shrink-0">
                      {p.image_url ? (
                        <Image
                          src={p.image_url}
                          alt={p.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-500">
                          <Upload size={14} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-100 font-medium">{p.name}</td>
                  <td className="py-3 px-4 text-copper-400 font-semibold whitespace-nowrap">
                    {p.price.toLocaleString("mk-MK")} ден.
                  </td>
                  <td className="py-3 px-4 text-text-400 whitespace-nowrap">{p.sort_order}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 rounded-lg hover:bg-page-600 text-text-400 hover:text-copper-400 transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(p)}
                        disabled={deletingId === p.id}
                        className="p-1.5 rounded-lg hover:bg-page-600 text-text-400 hover:text-red-400 transition-colors disabled:opacity-40"
                      >
                        {deletingId === p.id ? (
                          <LoaderCircle size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setModalOpen(false)} />
          <div className="relative w-full sm:max-w-md bg-page-800 border border-page-500/50 rounded-t-2xl sm:rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-page-500/50">
              <h2 className="text-base font-bold text-text-100">
                {editing ? "Уреди производ" : "Нов производ"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-page-700 text-text-400 hover:text-text-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              <div>
                <label className="block text-xs text-text-400 mb-1.5">Слика</label>
                <div className="flex items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-xl overflow-hidden bg-page-700 border border-page-500/50 flex-shrink-0 cursor-pointer hover:border-copper-400/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {formImageUrl ? (
                      <Image
                        src={formImageUrl}
                        alt="Preview"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-500">
                        <Upload size={18} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="text-xs text-copper-400 hover:text-copper-300 transition-colors disabled:opacity-50"
                    >
                      {uploading ? "Прикачување..." : formImageUrl == null ? "Прикачи слика" : "Промени слика"}
                    </button>
                    {formImageUrl && (
                      <button
                        type="button"
                        onClick={() => setFormImageUrl(null)}
                        className="block mt-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                      >
                        Отстрани слика
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                      e.target.value = "";
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-text-400 mb-1.5">Име</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="напр. Фотеља"
                  className="w-full bg-page-700 border border-page-500/50 rounded-xl py-2.5 px-3 text-sm text-text-100 outline-none placeholder:text-text-500 focus:border-copper-400/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-text-400 mb-1.5">Цена (ден.)</label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="500"
                    min={1}
                    className="w-full bg-page-700 border border-page-500/50 rounded-xl py-2.5 px-3 text-sm text-text-100 outline-none placeholder:text-text-500 focus:border-copper-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-400 mb-1.5">Редослед</label>
                  <input
                    type="number"
                    value={formSort}
                    onChange={(e) => setFormSort(e.target.value)}
                    placeholder="0"
                    className="w-full bg-page-700 border border-page-500/50 rounded-xl py-2.5 px-3 text-sm text-text-100 outline-none placeholder:text-text-500 focus:border-copper-400/50"
                  />
                </div>
              </div>
              {formError && (
                <p className="text-xs text-red-400">{formError}</p>
              )}
            </div>

            <div className="px-5 py-4 border-t border-page-500/50 flex items-center justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-page-700 text-text-400 text-sm font-medium hover:bg-page-600 transition-colors"
              >
                Откажи
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-copper-500 text-text-100 text-sm font-semibold hover:bg-copper-400 transition-colors disabled:opacity-50"
              >
                {saving && <LoaderCircle size={14} className="animate-spin" />}
                {editing ? "Зачувај" : "Додади"}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setConfirmDelete(null)} />
          <div className="relative w-full sm:max-w-sm bg-page-800 border border-page-500/50 rounded-t-2xl sm:rounded-2xl shadow-2xl p-5">
            <h2 className="text-base font-bold text-text-100 mb-2">Избриши производ?</h2>
            <p className="text-sm text-text-400 mb-5">
              Дали сте сигурни дека сакате да го избришете <span className="text-text-200 font-medium">{confirmDelete.name}</span>? Оваа акција не може да се поништи.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-xl bg-page-700 text-text-400 text-sm font-medium hover:bg-page-600 transition-colors"
              >
                Откажи
              </button>
              <button
                onClick={() => handleDelete(confirmDelete.id)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/30 transition-colors"
              >
                <Trash2 size={14} />
                Избриши
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
