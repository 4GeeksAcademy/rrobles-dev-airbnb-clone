import type { Amenity } from "@/types/listing";

export default function AmenitiesList({ amenities }: { amenities: Amenity[] }) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Lo que este lugar ofrece</h2>
      <ul className="grid grid-cols-2 gap-4">
        {amenities.map((amenity) => (
          <li key={amenity.label} className="flex items-center gap-3 text-sm">
            <span className="text-xl" aria-hidden="true">{amenity.icon}</span>
            {amenity.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
