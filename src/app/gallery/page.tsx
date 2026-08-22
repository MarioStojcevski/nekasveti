import type { Metadata } from "next";
import PageBg from "@/components/PageBg";

export const metadata: Metadata = {
  title: "Галерија",
  description:
    "Погледнете ја нашата работа - професионално хемиско чистење на мебел од mebelmajstor.",
};

const GALLERY_SIZE = 12;

const Gallery = () => {
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

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Array.from({ length: GALLERY_SIZE }, (_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-page-700 border border-page-500/50 animate-pulse"
            />
          ))}
        </div>
      </div>
    </PageBg>
  );
};

export default Gallery;
