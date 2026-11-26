"use client";

import { useState } from "react";

// Galería: useState guarda el índice de la foto visible.
export default function PhotoGallery({ photos, title }: { photos: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const last = photos.length - 1;

  // Al llegar a un extremo, la galería da la vuelta: después de la última viene la primera.
  const showPrevious = () => setIndex((current) => (current === 0 ? last : current - 1));
  const showNext = () => setIndex((current) => (current === last ? 0 : current + 1));

  return (
    <section aria-label={`Fotos de ${title}`} className="relative">
      <div className={`aspect-video w-full md:rounded-xl ${photos[index]}`} />
      <button type="button" onClick={showPrevious} 
        className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium shadow">‹ Anterior</button>
      <button type="button" onClick={showNext} 
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium shadow">Siguiente ›</button>
      <span className="absolute right-3 bottom-3 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
        {index + 1} / {photos.length}
      </span>
    </section>
  );
}
