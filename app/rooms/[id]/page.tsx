import Navbar from "@/components/Navbar";
import RoomDetail from "@/components/RoomDetail";
import { LISTINGS } from "@/data/listings";

// Con cacheComponents (activo por defecto en Next 16), los ids se declaran en build.
// Así Next conoce las rutas /rooms/1 ... /rooms/8 y no necesita un <Suspense>.
export function generateStaticParams() {
  return LISTINGS.map((listing) => ({ id: listing.id }));
}

// Server Component: lee el id de la URL y se lo pasa al componente cliente que simula la carga.
export default async function RoomPage({ params }: PageProps<"/rooms/[id]">) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-0 py-4 md:px-8 md:py-6">
        <div className="px-4 md:px-0">
          <RoomDetail id={id} />
        </div>
      </main>
    </>
  );
}
