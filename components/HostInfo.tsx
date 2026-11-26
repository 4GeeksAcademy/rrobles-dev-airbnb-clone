import type { Host } from "@/types/listing";

export default function HostInfo({ host }: { host: Host }) {
  return (
    <section className="flex items-center gap-4 border-y border-gray-200 py-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-lg font-semibold text-gray-700">
        {host.name[0]}
      </span>
      <div>
        <h2 className="font-semibold">Anfitrión: {host.name}</h2>
        <p className="text-sm text-gray-500">{host.yearsHosting} años como anfitrión</p>
      </div>
    </section>
  );
}
