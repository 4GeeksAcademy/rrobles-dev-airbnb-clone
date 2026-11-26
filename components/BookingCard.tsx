"use client";

import { useState } from "react";

interface BookingCardProps {
  pricePerNight: number;
  maxGuests: number;
}

const MIN_GUESTS = 1;

// Tarjeta de reserva: useState guarda el número de huéspedes, acotado entre 1 y maxGuests.
export default function BookingCard({ pricePerNight, maxGuests }: BookingCardProps) {
  const [guests, setGuests] = useState(MIN_GUESTS);

  return (
    <aside className="rounded-xl border border-gray-200 p-6 shadow-lg lg:sticky lg:top-24">
      <p className="text-xl">
        <span className="font-semibold">US${pricePerNight}</span> noche
      </p>
      <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-300 px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase">Huéspedes</p>
          <p className="text-sm">{guests} {guests === 1 ? "huésped" : "huéspedes"}</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setGuests(guests - 1)} disabled={guests <= MIN_GUESTS}
            aria-label="Quitar huésped" className="h-8 w-8 rounded-full border border-gray-400 disabled:opacity-30">−</button>
          <span aria-live="polite">{guests}</span>
          <button type="button" onClick={() => setGuests(guests + 1)} disabled={guests >= maxGuests}
            aria-label="Agregar huésped" className="h-8 w-8 rounded-full border border-gray-400 disabled:opacity-30">+</button>
        </div>
      </div>
      <p className="mt-1 text-xs text-gray-500">Máximo {maxGuests} huéspedes</p>
      <button type="button" className="mt-4 w-full rounded-lg bg-rose-500 py-3 font-semibold text-white hover:bg-rose-600">
        Reservar
      </button>
    </aside>
  );
}
