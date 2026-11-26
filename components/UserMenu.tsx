// Iconos del menú de usuario (decorativos en el prototipo).
export default function UserMenu() {
  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm font-medium md:inline">Hazte anfitrión</span>
      <span className="hidden md:inline" aria-hidden="true">🌐</span>
      <button type="button" aria-label="Menú de usuario"
        className="flex items-center gap-2 rounded-full border border-gray-300 px-2 py-1 hover:shadow">
        <span aria-hidden="true">☰</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-500 text-xs text-white">R</span>
      </button>
    </div>
  );
}
