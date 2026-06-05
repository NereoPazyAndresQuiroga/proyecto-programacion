import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { StatusBadge } from "@/components/status-badge";
import { DoorOpen, Check, Lock, AlertTriangle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "AulaHub — Dashboard Admin" }] }),
  component: AdminDashboard,
});

const kpis = [
  { icon: DoorOpen, label: "Total aulas", value: "84", tone: "cyan" },
  { icon: Check, label: "Disponibles ahora", value: "37", tone: "success" },
  { icon: Lock, label: "Clausuradas", value: "4", tone: "warning" },
  { icon: AlertTriangle, label: "Pendientes hoy", value: "12", tone: "error" },
  { icon: Package, label: "En préstamo", value: "9", tone: "info" },
];

const TONE: Record<string, string> = {
  cyan: "bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan",
  success: "bg-state-success/10 border-state-success/20 text-state-success",
  warning: "bg-state-warning/10 border-state-warning/20 text-state-warning",
  error: "bg-state-error/10 border-state-error/20 text-state-error",
  info: "bg-state-info/10 border-state-info/20 text-state-info",
};

const pending = [
  { who: "Prof. García", type: "Cambio de aula", time: "Lun 10:00", conflict: false },
  { who: "Prof. Méndez", type: "Uso especial", time: "Vie 15:00", conflict: true },
  { who: "Prof. Ruiz", type: "Cambio de aula", time: "Mar 14:00", conflict: false },
  { who: "Prof. López", type: "Instrumento", time: "Jue 09:00", conflict: false },
];

function AdminDashboard() {
  return (
    <>
      <AppHeader title="Panel General" subtitle="Vista global de la institución." role="admin"/>
      <main className="p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="bg-card border border-border rounded-2xl p-5 shadow-card hover:border-accent-cyan/20 transition-all">
              <div className={`h-10 w-10 rounded-xl border flex items-center justify-center ${TONE[k.tone]}`}>
                <k.icon className="h-5 w-5" />
              </div>
              <p className="text-3xl font-bold mt-3">{k.value}</p>
              <p className="text-xs text-text-secondary mt-1">{k.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Vista global de ocupación</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-text-muted border-b border-border">
                    <th className="text-left py-2 px-3">Aula</th>
                    <th className="text-left py-2 px-3">Edif.</th>
                    <th className="text-left py-2 px-3">Materia</th>
                    <th className="text-left py-2 px-3">Profesor</th>
                    <th className="text-left py-2 px-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { a: "204", e: "A", m: "Análisis II", p: "García", s: "occupied" },
                    { a: "311", e: "B", m: "Algoritmos I", p: "López", s: "occupied" },
                    { a: "201", e: "A", m: "—", p: "—", s: "available" },
                    { a: "203", e: "A", m: "—", p: "—", s: "closed" },
                    { a: "Lab 1", e: "C", m: "Bases de Datos", p: "Ruiz", s: "occupied" },
                  ].map((r) => (
                    <tr key={r.a} className="border-b border-border/50 hover:bg-white/[0.02]">
                      <td className="py-2.5 px-3 font-semibold">{r.a}</td>
                      <td className="py-2.5 px-3 text-text-secondary">{r.e}</td>
                      <td className="py-2.5 px-3 text-text-secondary">{r.m}</td>
                      <td className="py-2.5 px-3 text-text-secondary">{r.p}</td>
                      <td className="py-2.5 px-3">
                        <StatusBadge variant={r.s === "available" ? "success" : r.s === "closed" ? "warning" : "error"}>
                          {r.s === "available" ? "Disponible" : r.s === "closed" ? "Clausurada" : "Ocupada"}
                        </StatusBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-card border border-border rounded-2xl p-5 shadow-card">
            <h2 className="font-semibold mb-4">Solicitudes pendientes</h2>
            <ul className="space-y-3">
              {pending.map((p, i) => (
                <li key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.02]">
                  <div className="h-8 w-8 rounded-lg bg-state-warning/15 border border-state-warning/30 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-state-warning" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{p.type}</p>
                    <p className="text-xs text-text-muted">{p.who} · {p.time}</p>
                  </div>
                  {p.conflict && <StatusBadge variant="error">Conflicto</StatusBadge>}
                  <Button size="sm" variant="outline" className="border-border">Revisar</Button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
