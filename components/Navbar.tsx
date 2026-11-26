import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import UserMenu from "@/components/UserMenu";

interface NavbarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

// Barra superior: logo, búsqueda e iconos de usuario.
// La búsqueda solo es editable donde la página le pasa el estado (Home).
export default function Navbar({ searchValue, onSearchChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-8">
        <Link href="/" className="text-xl font-bold text-rose-500 md:text-2xl">
          airbnb
        </Link>
        <div className="flex-1">
          {onSearchChange ? (
            <SearchBar value={searchValue ?? ""} onChange={onSearchChange} />
          ) : (
            <Link href="/catalog" className="block rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-500 shadow-sm">
              🔍 Ver todos los alojamientos
            </Link>
          )}
        </div>
        <UserMenu />
      </nav>
    </header>
  );
}
