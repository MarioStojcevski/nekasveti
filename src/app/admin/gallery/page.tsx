"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft, Plus, Trash2, LoaderCircle, X, GripVertical, Upload,
} from "lucide-react";
import {
  fetchGalleryImages,
  createGalleryImage,
  deleteGalleryImage,
} from "@/lib/gallery";
import type { GalleryImage } from "@/types";

const AdminGallery = () => {
  const router = useRouter();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<GalleryImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const session = sessionStorage.getItem("admin_session");
    if (!session) {
      router.replace("/admin/login");
      return;
    }
    let active = true;
    void (async () => {
      try {
        const data = await fetchGalleryImages();
        if (active) setImages(data);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [router]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/gallery/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      const created = await createGalleryImage(data.url, images.length);
      setImages((prev) => [...prev, created]);
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setConfirmDelete(null);
    try {
      await deleteGalleryImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error("Failed to delete image:", err);
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
          <h1 className="text-2xl font-bold text-text-100">Галерија</h1>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-copper-500 text-text-100 text-sm font-semibold hover:bg-copper-400 transition-colors active:scale-95 disabled:opacity-50"
        >
          {uploading ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <Plus size={16} />
          )}
          {uploading ? "Прикачување..." : "Додади"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
            e.target.value = "";
          }}
        />
      </div>

      <div className="rounded-2xl bg-page-800 border border-page-500/50 overflow-hidden">
        {images.length === 0 ? (
          <div className="text-center py-16 text-text-500 text-sm">
            Нема слики. Додадете прва слика.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative aspect-square rounded-xl overflow-hidden bg-page-700 border border-page-500/30"
              >
                <Image
                  src={img.image_url}
                  alt={`Галерија ${img.id}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setConfirmDelete(img)}
                    disabled={deletingId === img.id}
                    className="p-2 rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-colors disabled:opacity-50"
                  >
                    {deletingId === img.id ? (
                      <LoaderCircle size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setConfirmDelete(null)} />
          <div className="relative w-full sm:max-w-sm bg-page-800 border border-page-500/50 rounded-t-2xl sm:rounded-2xl shadow-2xl p-5">
            <h2 className="text-base font-bold text-text-100 mb-2">Избриши слика?</h2>
            <p className="text-sm text-text-400 mb-5">
              Дали сте сигурни дека сакате да ја избришете оваа слика? Оваа акција не може да се поништи.
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

export default AdminGallery;
