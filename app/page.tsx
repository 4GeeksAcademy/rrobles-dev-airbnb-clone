"use client";

import { useEffect, useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import ListingGrid from "@/components/ListingGrid";
import Navbar from "@/components/Navbar";
import { LISTINGS } from "@/data/listings";
import type { Category, Listing } from "@/types/listing";

// Página de inicio ( / ): búsqueda en vivo + filtro por categoría sobre la lista cargada.
export default function HomePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | null>(null);

  // Simula la llamada a una API al montar la página.
  useEffect(() => {
    const timer = setTimeout(() => {
      setListings(LISTINGS);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Dato derivado: no se guarda en estado, se recalcula en cada render.
  const query = search.trim().toLowerCase();
  const visible = listings.filter(
    (listing) =>
      (category === null || listing.category === category) &&
      `${listing.title} ${listing.location}`.toLowerCase().includes(query),
  );

  return (
    <>
      <Navbar searchValue={search} onSearchChange={setSearch} />
      <CategoryFilter active={category} onSelect={setCategory} />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
        <ListingGrid listings={visible} isLoading={isLoading} />
      </main>
    </>
  );
}
