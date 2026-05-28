import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { ScheduleGrid } from "@/components/schedule-grid";
import { NewRequestDialog } from "@/components/new-request-dialog";
import { StatusBadge } from "@/components/status-badge";
import { Bell, Clock, BookOpen, AlertTriangle, ArrowLeftRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profesor/")({
  head: () => ({ meta: [{ title: "AulaHub — Dashboard Profesor" }] }),
  component: ProfDashboard,
});

const reqs = [
  { icon: ArrowLeftRight, tipo: "Intercambio", desc: "Con Prof. Méndez · Física I", state: "pending" as const },
  { icon: Package, tipo: "Instrumento", desc: "2x Proyectores portátiles", state: "approved" as const },
  { icon: AlertTriangle, tipo: "Cambio de aula", desc: "Aula 311 → Aula 405", state: "rejected" as const },
];

function stateBadge(s: "pending" | "approved" | "rejected") {
  if (s === "pending") return <StatusBadge variant="warning">Pendiente</StatusBadge>;
  if (s === "approved") return <StatusBadge variant="success">Aprobada</StatusBadge>;
  return <StatusBadge variant="error">Rechazada</StatusBadge>;
}

function ProfDashboard() {
  return (
    <>
      <AppHeader title="Bienvenido, Prof. García" subtitle="Resumen de tu actividad académica para hoy." />
      <main className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="border-border hover:border-accent-cyan/40">
              <Bell className="h-4 w-4" />
              Avisar a alumnos
            </Button>
            <NewRequestDialog />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KPI icon={Clock} label="Próxima clase" value="Análisis II" sub="10:00 — Aula 204" />
          <KPI icon={BookOpen} label="Total materias" value="5" sub="Semestre actual" />
          <KPI icon={AlertTriangle} label="Solicitudes pendientes" value="3" sub="Requieren atención" accent="warning" />
        </div>

        <ScheduleGrid />

        <section className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Estado de Solicitudes</h3>
            <a href="/profesor/solicitudes" className="text-xs text-accent-cyan hover:brightness-110">Ver todas</a>
          </div>
          <ul className="divide-y divide-border">
            {reqs.map((r, i) => (
              <li key={i} className="py-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                  <r.icon className="h-4 w-4 text-accent-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{r.tipo}</p>
                  <p className="text-xs text-text-muted truncate">{r.desc}</p>
                </div>
                {stateBadge(r.state)}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

function KPI({ icon: Icon, label, value, sub, accent = "cyan" }: any) {
  const tone = accent === "warning" ? "text-state-warning bg-state-warning/10 border-state-warning/20" : "text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20";
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card hover:border-accent-cyan/20 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-text-muted">{label}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          <p className="text-xs text-text-secondary mt-1">{sub}</p>
        </div>
        <div className={`h-10 w-10 rounded-xl border flex items-center justify-center ${tone}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
