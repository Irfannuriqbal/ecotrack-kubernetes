function StatsCard({ label, value, accent }) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-glow">
      <div className={`h-1 w-24 rounded-full bg-gradient-to-r ${accent}`} />
      <p className="mt-4 text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    </article>
  );
}

export default StatsCard;
