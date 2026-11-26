"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AmenitiesList from "@/components/AmenitiesList";
import BookingCard from "@/components/BookingCard";
import Breadcrumb from "@/components/Breadcrumb";
import HostInfo from "@/components/HostInfo";
import ListingHeader from "@/components/ListingHeader";
import LoadingState from "@/components/LoadingState";
import PhotoGallery from "@/components/PhotoGallery";
import { LISTINGS } from "@/data/listings";
import type { Listing } from "@/types/listing";

// Recibe el id de la URL y "carga" el alojamiento con un setTimeout.
export default function RoomDetail({ id }: { id: string }) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setListing(LISTINGS.find((item) => item.id === id) ?? null);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer); // si el usuario se va antes, se cancela
  }, [id]);

  if (isLoading) return <LoadingState label="Cargando alojamiento…" />;
  if (!listing) {
    return (
      <div className="py-16 text-center">
        <p>No encontramos este alojamiento.</p>
        <Link href="/catalog" className="mt-2 inline-block font-semibold underline">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb current={listing.title} />
      <PhotoGallery photos={listing.photos} title={listing.title} />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ListingHeader listing={listing} />
          <p className="text-gray-700">{listing.description}</p>
          <HostInfo host={listing.host} />
          <AmenitiesList amenities={listing.amenities} />
        </div>
        <BookingCard pricePerNight={listing.pricePerNight} maxGuests={listing.maxGuests} />
      </div>
    </div>
  );
}
