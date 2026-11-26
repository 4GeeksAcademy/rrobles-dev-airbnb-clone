"use client";

import { useEffect, useState } from "react";
import ListingGrid from "@/components/ListingGrid";
import MapPlaceholder from "@/components/MapPlaceholder";
import Navbar from "@/components/Navbar";
import ResultsHeader from "@/components/ResultsHeader";
import { LISTINGS } from "@/data/listings";
import type { Listing, SortOrder } from "@/types/listing";

// Catálogo ( /catalog ): resultados ordenables por precio + mapa.
export default function CatalogPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  useEffect(() => {
    const timer = setTimeout(() => {
      setListings(LISTINGS);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // [...listings] copia antes de ordenar: sort() muta y el estado de React no se debe mutar.
  const sorted = [...listings].sort((a, b) =>
    sortOrder === "asc" ? a.pricePerNight - b.pricePerNight : b.pricePerNight - a.pricePerNight,
  );

  return (
    <>
      <Navbar />
      <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 md:px-8 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <ResultsHeader count={sorted.length} sortOrder={sortOrder} onSortChange={setSortOrder} />
          <ListingGrid listings={sorted} isLoading={isLoading} columns="sm:grid-cols-2" />
        </section>
        <section aria-label="Mapa de resultados" className="lg:col-span-2">
          <MapPlaceholder />
        </section>
      </main>
    </>
  );
}
