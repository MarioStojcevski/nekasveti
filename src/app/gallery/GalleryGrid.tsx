"use client";

import Image from "next/image";

type GalleryImage = {
  id: string;
  image_url: string;
};

const GalleryGrid = ({ images }: { images: GalleryImage[] }) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-16 text-text-500 text-sm">
        Галеријата е празна.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {images.map((img) => (
        <div
          key={img.id}
          className="aspect-square rounded-2xl overflow-hidden bg-page-700 border border-page-500/50"
        >
          <Image
            src={img.image_url}
            alt="Галерија"
            width={400}
            height={400}
            sizes="(max-width: 640px) 50vw, 33vw"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
