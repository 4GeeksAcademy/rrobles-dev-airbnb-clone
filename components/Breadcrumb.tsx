import Link from "next/link";

export default function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Ruta de navegación" className="text-sm text-gray-500">
      <Link href="/catalog" className="hover:underline">← Catálogo</Link>
      <span className="mx-2">/</span>
      <span className="text-gray-900">{current}</span>
    </nav>
  );
}
