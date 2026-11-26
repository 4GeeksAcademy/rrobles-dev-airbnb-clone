// Tipos del dominio: un alojamiento y sus piezas.
export type Category = "Playa" | "Mansiones" | "Tendencias" | "Cabañas" | "Piscinas";

export type SortOrder = "asc" | "desc";

export interface Host {
  name: string;
  yearsHosting: number;
}

export interface Amenity {
  icon: string;
  label: string;
}

export interface Listing {
  id: string;
  title: string;
  location: string;
  category: Category;
  pricePerNight: number; // USD
  rating: number; // 0-5
  reviewsCount: number;
  maxGuests: number;
  description: string;
  host: Host;
  amenities: Amenity[];
  photos: string[]; // clases de Tailwind que hacen de placeholder de cada foto
}
