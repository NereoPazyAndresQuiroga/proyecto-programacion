import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/status-badge";
import { Plus, Pencil, Search } from "lucide-react";

export const Route = createFileRoute("/admin/aulas")({
  head: () => ({ meta: [{ title: "AulaHub — Gestión de Aulas" }] }),
  component: AulasAdmin,
});

const aulas = [
  { num: "201", edif: "A", piso: "2°", cap: 40, eq: ["Proyector", "Pizarrón"], state: "available" },
  { num: "203", edif: "A", piso: "2°", cap: 50, eq: ["Pizarrón"], state: "closed" },
  { num: "204", edif: "A", piso: "2°", cap: 45, eq: ["Proyector", "Pizarrón", "AC", "Sonido"], state: "available" },
  { num: "311", edif: "B", piso: "3°", cap: 60, eq: ["Proyector", "AC"], state: "available" },
  { num: "Lab 1", edif: "C", piso: "1°", cap: 25, eq: ["PCs", "Proyector"], state: "available" },
];

function AulasAdmin() {
  return (
    <>
      <AppHeader title="Gestión de Aulas" subtitle="Catálogo, capacidades y equipamiento." />
      <main className="p-4 sm:p-6 space-y-5">
        <section className="bg-card border border-border rounded-2xl p-4 shadow-card flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input placeholder="Buscar aula..." className="pl-9 bg-input-bg border-border" />
          </div>
          <Button className="bg-accent-cyan text-background font-semibold hover:brightness-110 shadow-glow">
            <Plus className="h-4 w-4" /> Nueva aula
          </Button>
        </section>

        <section className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-text-muted border-b border-border">
                  <th className="text-left py-3 px-4">Número</th>
                  <th className="text-left py-3 px-4">Edificio</th>
                  <th className="text-left py-3 px-4">Piso</th>
                  <th className="text-left py-3 px-4">Capacidad</th>
                  <th className="text-left py-3 px-4">Equipamiento</th>
                  <th className="text-left py-3 px-4">Estado</th>
                  <th className="text-right py-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {aulas.map((a) => (
                  <tr key={a.num} className="border-b border-border/40 hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-semibold">{a.num}</td>
                    <td className="py-3 px-4 text-text-secondary">Edif. {a.edif}</td>
                    <td className="py-3 px-4 text-text-secondary">{a.piso}</td>
                    <td className="py-3 px-4 text-text-secondary">{a.cap}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {a.eq.map((e) => (
                          <span key={e} className="text-[10px] px-2 py-0.5 rounded border border-border bg-input-bg text-text-secondary">{e}</span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge variant={a.state === "available" ? "success" : "warning"}>
                        {a.state === "available" ? "Activa" : "Clausurada"}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 flex items-center justify-between border-t border-border text-xs text-text-muted">
            <span>Mostrando {aulas.length} de 84 aulas</span>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost">Anterior</Button>
              <Button size="sm" variant="ghost" className="text-accent-cyan">1</Button>
              <Button size="sm" variant="ghost">2</Button>
              <Button size="sm" variant="ghost">Siguiente</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
