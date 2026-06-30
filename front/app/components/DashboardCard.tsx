export default function DashboardCard({ titulo, valor, cor }: { titulo: string, valor: number | string, cor: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-all">
      <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest">{titulo}</h3>
      <p className={`text-4xl font-black mt-2 ${cor}`}>{valor}</p>
    </div>
  );
}