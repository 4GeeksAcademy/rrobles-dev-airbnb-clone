import type { Listing } from "@/types/listing";

export default function ListingHeader({ listing }: { listing: Listing }) {
  return (
    <section className="space-y-1">
      <h1 className="text-2xl font-semibold">{listing.title}</h1>
      <p className="text-sm">
        <span className="font-semibold">★ {listing.rating.toFixed(2)}</span>
        {" · "}
        <span className="underline">{listing.reviewsCount} reseñas</span>
        {" · "}
        {listing.location}
      </p>
    </section>
  );
}
