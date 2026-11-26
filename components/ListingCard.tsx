import Link from "next/link";
import type { Listing } from "@/types/listing";

// Tarjeta reutilizada en la Home y en el Catálogo. Toda la tarjeta es un <Link>.
export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/rooms/${listing.id}`} className="group block">
      <div className={`aspect-square w-full rounded-xl ${listing.photos[0]} transition group-hover:opacity-90`} />
      <div className="mt-2 flex justify-between gap-2 text-sm">
        <h3 className="font-semibold">{listing.location}</h3>
        <span className="shrink-0">★ {listing.rating.toFixed(2)}</span>
      </div>
      <p className="truncate text-sm text-gray-500">{listing.title}</p>
      <p className="mt-1 text-sm">
        <span className="font-semibold">US${listing.pricePerNight}</span> noche
      </p>
    </Link>
  );
}
