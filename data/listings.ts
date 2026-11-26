import type { Category, Listing } from "@/types/listing";

export const CATEGORIES: { label: Category; icon: string }[] = [
  { label: "Playa", icon: "🏖️" },
  { label: "Mansiones", icon: "🏰" },
  { label: "Tendencias", icon: "🔥" },
  { label: "Cabañas", icon: "🛖" },
  { label: "Piscinas", icon: "🏊" },
];

const PHOTOS = {
  sea: ["bg-linear-to-br from-sky-300 to-blue-600", "bg-linear-to-br from-amber-200 to-orange-400", "bg-linear-to-br from-cyan-200 to-teal-500"],
  forest: ["bg-linear-to-br from-lime-300 to-green-700", "bg-linear-to-br from-amber-300 to-yellow-700", "bg-linear-to-br from-emerald-200 to-emerald-600"],
  city: ["bg-linear-to-br from-fuchsia-300 to-purple-600", "bg-linear-to-br from-slate-300 to-slate-600", "bg-linear-to-br from-rose-200 to-pink-500"],
};

const BASIC = [
  { icon: "📶", label: "Wifi" },
  { icon: "🍳", label: "Cocina" },
  { icon: "🚗", label: "Estacionamiento gratuito" },
];

// Datos hardcodeados: el brief no pide backend. La carga se simula con setTimeout en cada página.
export const LISTINGS: Listing[] = [
  { id: "1", title: "Casa frente al mar en Zapallar", location: "Zapallar, Chile", category: "Playa", pricePerNight: 180, rating: 4.92, reviewsCount: 128, maxGuests: 6,
    description: "Casa luminosa con terraza sobre la playa y acceso directo a la arena.", host: { name: "Carolina", yearsHosting: 6 },
    amenities: [...BASIC, { icon: "🌊", label: "Vista al mar" }], photos: PHOTOS.sea },
  { id: "2", title: "Mansión con viñedo en Colchagua", location: "Santa Cruz, Chile", category: "Mansiones", pricePerNight: 650, rating: 4.97, reviewsCount: 54, maxGuests: 12,
    description: "Casona patronal restaurada en medio de un viñedo, con cata incluida.", host: { name: "Ignacio", yearsHosting: 9 },
    amenities: [...BASIC, { icon: "🍷", label: "Bodega de vinos" }, { icon: "🏊", label: "Piscina" }], photos: PHOTOS.forest },
  { id: "3", title: "Loft de diseño en Barrio Italia", location: "Providencia, Chile", category: "Tendencias", pricePerNight: 95, rating: 4.81, reviewsCount: 312, maxGuests: 2,
    description: "Loft industrial a pasos de cafés y tiendas de diseño.", host: { name: "Martina", yearsHosting: 3 },
    amenities: [...BASIC, { icon: "💻", label: "Zona de trabajo" }], photos: PHOTOS.city },
  { id: "4", title: "Cabaña en el bosque de Puerto Varas", location: "Puerto Varas, Chile", category: "Cabañas", pricePerNight: 120, rating: 4.95, reviewsCount: 201, maxGuests: 4,
    description: "Cabaña de madera con tinaja caliente y vista al volcán Osorno.", host: { name: "Hans", yearsHosting: 11 },
    amenities: [...BASIC, { icon: "🔥", label: "Chimenea" }, { icon: "🛁", label: "Tinaja" }], photos: PHOTOS.forest },
  { id: "5", title: "Villa con piscina infinita en Cachagua", location: "Cachagua, Chile", category: "Piscinas", pricePerNight: 420, rating: 4.89, reviewsCount: 77, maxGuests: 8,
    description: "Villa moderna con piscina infinita sobre el Pacífico.", host: { name: "Felipe", yearsHosting: 5 },
    amenities: [...BASIC, { icon: "🏊", label: "Piscina" }, { icon: "🌊", label: "Vista al mar" }], photos: PHOTOS.sea },
  { id: "6", title: "Domo con cielo estrellado en el Elqui", location: "Pisco Elqui, Chile", category: "Tendencias", pricePerNight: 110, rating: 4.98, reviewsCount: 389, maxGuests: 2,
    description: "Domo con techo transparente para mirar las estrellas desde la cama.", host: { name: "Antonia", yearsHosting: 4 },
    amenities: [...BASIC, { icon: "🔭", label: "Telescopio" }], photos: PHOTOS.city },
  { id: "7", title: "Cabaña de playa en Pichilemu", location: "Pichilemu, Chile", category: "Playa", pricePerNight: 85, rating: 4.76, reviewsCount: 143, maxGuests: 5,
    description: "Cabaña simple para surfistas, a dos cuadras de Punta de Lobos.", host: { name: "Tomás", yearsHosting: 2 },
    amenities: [...BASIC, { icon: "🏄", label: "Guarda tablas" }], photos: PHOTOS.sea },
  { id: "8", title: "Mansión histórica en Valparaíso", location: "Valparaíso, Chile", category: "Mansiones", pricePerNight: 380, rating: 4.86, reviewsCount: 96, maxGuests: 10,
    description: "Casona de 1900 en Cerro Alegre con vista a la bahía.", host: { name: "Sofía", yearsHosting: 8 },
    amenities: [...BASIC, { icon: "🌅", label: "Terraza con vista" }], photos: PHOTOS.city },
];
