import ListingCard from "@/components/ListingCard";
import LoadingState from "@/components/LoadingState";
import type { Listing } from "@/types/listing";

interface ListingGridProps {
  listings: Listing[];
  isLoading: boolean;
  columns?: string; // clases de columnas para cada contexto (Home ancha, Catálogo con mapa)
}

// Mobile-first: 1 columna por defecto, más columnas desde sm/lg/xl.
export default function ListingGrid({ listings, isLoading, columns = "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" }: ListingGridProps) {
  if (isLoading) return <LoadingState label="Cargando alojamientos…" />;
  if (listings.length === 0) {
    return <p className="py-16 text-center text-gray-500">No hay alojamientos que coincidan.</p>;
  }
  return (
    <ul className={`grid grid-cols-1 gap-6 ${columns}`}>
      {listings.map((listing) => (
        <li key={listing.id}>
          <ListingCard listing={listing} />
        </li>
      ))}
    </ul>
  );
}
