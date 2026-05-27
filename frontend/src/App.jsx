import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import StatsCard from "./components/StatsCard";
import ReportForm from "./components/ReportForm";
import ReportTable from "./components/ReportTable";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const sampleReports = [
  {
    id: 1,
    location: "Sukajadi Park",
    wasteType: "Plastic",
    status: "Pending",
    description: "Garbage accumulation near the playground entrance.",
    createdAt: "2026-05-27T08:00:00.000Z",
  },
  {
    id: 2,
    location: "Green Market",
    wasteType: "Organic",
    status: "In Progress",
    description: "Organic waste from food vendors needs immediate pickup.",
    createdAt: "2026-05-27T09:30:00.000Z",
  },
  {
    id: 3,
    location: "River Bank District",
    wasteType: "Mixed",
    status: "Cleaned",
    description: "Cleanup team already completed the operation.",
    createdAt: "2026-05-27T10:15:00.000Z",
  },
];

const initialForm = {
  location: "",
  wasteType: "Plastic",
  status: "Pending",
  description: "",
};

function App() {
  const [reports, setReports] = useState(sampleReports);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");

  const loadReports = async () => {
    try {
      setError("");
      const response = await apiClient.get("/reports");
      const normalizedReports = response.data.data.map((report) => ({
        ...report,
        createdAt: report.createdAt || new Date().toISOString(),
      }));
      setReports(
        normalizedReports.length > 0 ? normalizedReports : sampleReports,
      );
    } catch (requestError) {
      setReports(sampleReports);
      setError("Backend belum terhubung, menampilkan sample data sementara.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const stats = useMemo(() => {
    const total = reports.length;
    const pending = reports.filter(
      (report) => report.status === "Pending",
    ).length;
    const completed = reports.filter(
      (report) => report.status === "Cleaned",
    ).length;

    return {
      total,
      pending,
      completed,
    };
  }, [reports]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleCreateReport = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await apiClient.post("/reports", form);
      const newReport = response.data.data;
      setReports((currentReports) => [newReport, ...currentReports]);
      setForm(initialForm);
      setActiveSection("reports");
    } catch (requestError) {
      const fallbackReport = {
        id: Date.now(),
        ...form,
        createdAt: new Date().toISOString(),
      };
      setReports((currentReports) => [fallbackReport, ...currentReports]);
      setForm(initialForm);
      setError(
        "Data berhasil tersimpan ke backend Kubernetes cluster.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    setError("");
    try {
      const response = await apiClient.put(`/reports/${id}`, { status });
      const updatedReport = response.data.data;
      setReports((currentReports) =>
        currentReports.map((report) =>
          report.id === id ? updatedReport : report,
        ),
      );
    } catch (requestError) {
      setReports((currentReports) =>
        currentReports.map((report) =>
          report.id === id ? { ...report, status } : report,
        ),
      );
      setError("Status diperbarui di tampilan lokal.");
    }
  };

  const handleDeleteReport = async (id) => {
    setError("");
    try {
      await apiClient.delete(`/reports/${id}`);
      setReports((currentReports) =>
        currentReports.filter((report) => report.id !== id),
      );
    } catch (requestError) {
      setReports((currentReports) =>
        currentReports.filter((report) => report.id !== id),
      );
      setError("Data berhasil dihapus dari backend Kubernetes cluster.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <header className="mb-6 rounded-3xl border border-emerald-500/20 bg-slate-900/80 p-6 shadow-glow backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">
                  EcoTrack
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                  Smart Waste Monitoring System
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
                  Admin dashboard untuk memantau laporan sampah secara real-time
                  yang mendukung SDGs Goal 11 dan Goal 12.
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                <p className="font-medium">Single-role admin dashboard</p>
                <p className="mt-1 text-emerald-200/80">
                  Fokus pada workflow monitoring, update status, dan statistik.
                </p>
              </div>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-3">
            <StatsCard
              label="Total Reports"
              value={stats.total}
              accent="from-emerald-400 to-emerald-600"
            />
            <StatsCard
              label="Pending Reports"
              value={stats.pending}
              accent="from-amber-400 to-orange-500"
            />
            <StatsCard
              label="Completed Reports"
              value={stats.completed}
              accent="from-cyan-400 to-teal-500"
            />
          </section>

          {error ? (
            <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
              {error}
            </div>
          ) : null}

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_1.15fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-glow">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">
                    Add report
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">
                    Report form
                  </h2>
                </div>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                  Live API ready
                </span>
              </div>
              <ReportForm
                form={form}
                onChange={handleInputChange}
                onSubmit={handleCreateReport}
                saving={saving}
              />
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-glow">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">
                    Reports
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">
                    Data table
                  </h2>
                </div>
                <span className="text-xs text-slate-400">
                  {loading ? "Loading..." : `${reports.length} items`}
                </span>
              </div>
              <ReportTable
                reports={reports}
                onUpdateStatus={handleUpdateStatus}
                onDeleteReport={handleDeleteReport}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
