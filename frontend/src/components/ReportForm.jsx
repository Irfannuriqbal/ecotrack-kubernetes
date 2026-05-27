function ReportForm({ form, onChange, onSubmit, saving }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Location</span>
          <input
            name="location"
            value={form.location}
            onChange={onChange}
            required
            placeholder="Example: Sukajadi Park"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Waste Type</span>
          <select
            name="wasteType"
            value={form.wasteType}
            onChange={onChange}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
          >
            <option>Plastic</option>
            <option>Organic</option>
            <option>Mixed</option>
            <option>Hazardous</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Status</span>
          <select
            name="status"
            value={form.status}
            onChange={onChange}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Cleaned</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">
            Description
          </span>
          <input
            name="description"
            value={form.description}
            onChange={onChange}
            required
            placeholder="Write a short description"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 font-medium text-white shadow-lg shadow-emerald-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {saving ? "Saving report..." : "Add Report"}
      </button>
    </form>
  );
}

export default ReportForm;
