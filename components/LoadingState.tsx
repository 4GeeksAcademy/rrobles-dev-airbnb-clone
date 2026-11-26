// Indicador de carga mientras el setTimeout "trae" los datos.
export default function LoadingState({ label }: { label: string }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-16 text-gray-500">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-rose-500" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
