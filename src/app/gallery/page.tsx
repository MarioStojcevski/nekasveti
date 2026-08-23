import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import PageBg from "@/components/PageBg";
import GalleryGrid from "./GalleryGrid";

export const metadata: Metadata = {
  title: "Галерија",
  description:
    "Погледнете ја нашата работа - професионално хемиско чистење на мебел од mebelmajstor.",
};

export const dynamic = "force-dynamic";

const Gallery = async () => {
  const { data } = await supabaseAdmin
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });

  const images = data ?? [];

  return (
    <PageBg image="balcony">
      <div className="flex flex-col min-h-full pt-6 sm:pt-8 pb-6">
        <div className="text-center mb-5">
          <h1 className="text-2xl sm:text-3xl text-text-100 mb-1 font-bold">
            Галерија
          </h1>
          <p className="text-sm text-text-400">
            Нашата работа пред и по чистењето
          </p>
        </div>

        <GalleryGrid images={images} />
      </div>
    </PageBg>
  );
};

export default Gallery;
