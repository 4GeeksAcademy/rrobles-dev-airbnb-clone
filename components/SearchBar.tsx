interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

// Componente controlado: no guarda estado, lo recibe del padre (la Home).
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 shadow-sm">
      <span aria-hidden="true">🔍</span>
      <span className="sr-only">Buscar alojamiento</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="¿A dónde vas?"
        className="w-full bg-transparent text-sm outline-none"
      />
    </label>
  );
}
