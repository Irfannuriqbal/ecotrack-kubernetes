const navigationItems = [
  { id: "dashboard", label: "Dashboard", description: "Overview and stats" },
  { id: "reports", label: "Reports", description: "Manage waste reports" },
];

function Sidebar({ activeSection, onNavigate }) {
  return (
    <aside className="border-b border-emerald-500/10 bg-slate-900/90 px-4 py-6 lg:min-h-screen lg:w-80 lg:border-b-0 lg:border-r lg:px-6">
      <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/20 to-slate-800 p-5 shadow-glow">
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">
          EcoTrack
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Admin Panel</h2>
        <p className="mt-3 text-sm text-slate-300">
          Sistem monitoring sampah sederhana untuk mendukung lingkungan kota
          yang lebih bersih.
        </p>
      </div>

      <nav className="mt-6 space-y-2">
        {navigationItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                isActive
                  ? "border-emerald-400/40 bg-emerald-500/15 text-white"
                  : "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-emerald-500/20 hover:bg-slate-900"
              }`}
            >
              <span>
                <span className="block font-medium">{item.label}</span>
                <span className="block text-xs text-slate-400">
                  {item.description}
                </span>
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-emerald-300">
                {item.id}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-6 rounded-2xl border border-dashed border-emerald-500/20 bg-slate-950/60 p-4 text-sm text-slate-300">
        <p className="font-medium text-white">SDGs Focus</p>
        <p className="mt-2">Goal 11: Sustainable Cities and Communities</p>
        <p>Goal 12: Responsible Consumption and Production</p>
      </div>
    </aside>
  );
}

export default Sidebar;
