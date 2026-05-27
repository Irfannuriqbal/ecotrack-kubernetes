const badgeStyles = {
  Pending: "border-amber-400/30 bg-amber-400/10 text-amber-100",
  "In Progress": "border-sky-400/30 bg-sky-400/10 text-sky-100",
  Cleaned: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${badgeStyles[status] || badgeStyles.Pending}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
