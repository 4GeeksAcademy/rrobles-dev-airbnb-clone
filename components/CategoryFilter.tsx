import { CATEGORIES } from "@/data/listings";
import type { Category } from "@/types/listing";

interface CategoryFilterProps {
  active: Category | null;
  onSelect: (category: Category | null) => void;
}

// Fila horizontal de categorías. Volver a tocar la activa la desactiva (muestra todas).
export default function CategoryFilter({ active, onSelect }: CategoryFilterProps) {
  return (
    <div className="border-b border-gray-200">
      <ul className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 md:justify-center md:px-8">
      {CATEGORIES.map(({ label, icon }) => {
        const isActive = label === active;
        return (
          <li key={label}>
            <button
              type="button"
              onClick={() => onSelect(isActive ? null : label)}
              aria-pressed={isActive}
              className={`flex flex-col items-center gap-1 border-b-2 py-3 text-xs whitespace-nowrap ${
                isActive ? "border-gray-900 font-semibold text-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              <span className="text-2xl" aria-hidden="true">{icon}</span>
              {label}
            </button>
          </li>
        );
      })}
    </ul>
    </div>
  );
}
