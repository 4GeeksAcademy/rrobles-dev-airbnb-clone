import type { SortOrder } from "@/types/listing";

interface ResultsHeaderProps {
  count: number;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

export default function ResultsHeader({ count, sortOrder, onSortChange }: ResultsHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h1 className="text-lg font-semibold">{count} alojamientos</h1>
      <label className="text-sm">
        <span className="sr-only">Ordenar por precio</span>
        <select
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value as SortOrder)}
          className="rounded-lg border border-gray-300 px-2 py-1"
        >
          <option value="asc">Precio: ascendente</option>
          <option value="desc">Precio: descendente</option>
        </select>
      </label>
    </div>
  );
}
