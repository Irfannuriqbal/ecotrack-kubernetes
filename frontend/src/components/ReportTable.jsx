import StatusBadge from "./StatusBadge";

const statusOptions = ["Pending", "In Progress", "Cleaned"];

function ReportTable({ reports, onUpdateStatus, onDeleteReport }) {
  if (reports.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
        Belum ada laporan sampah.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800">
          <thead className="bg-slate-950/80 text-left text-xs uppercase tracking-[0.2em] text-slate-400">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-slate-900/60">
            {reports.map((report) => (
              <tr key={report.id} className="align-top text-sm text-slate-200">
                <td className="px-4 py-4 font-medium">{report.id}</td>
                <td className="px-4 py-4">
                  <p className="font-medium text-white">{report.location}</p>
                  <p className="mt-1 max-w-xs text-xs text-slate-400">
                    {report.description}
                  </p>
                </td>
                <td className="px-4 py-4">{report.wasteType}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={report.status} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <select
                      value={report.status}
                      onChange={(event) =>
                        onUpdateStatus(report.id, event.target.value)
                      }
                      className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none"
                    >
                      {statusOptions.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => onDeleteReport(report.id)}
                      className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200 transition hover:bg-rose-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportTable;
