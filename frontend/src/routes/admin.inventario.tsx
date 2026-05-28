import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, AlertTriangle, Check, X } from "lucide-react";

export const Route = createFileRoute("/admin/inventario")({
  head: () => ({ meta: [{ title: "AulaHub — Inventario (Admin)" }] }),
  component: InvAdmin,
});

const items = [
  { id: "INV-001", name: "Proyector portátil", cat: "Proyectores", total: 5, avail: 3, state: "available" },
  { id: "INV-002", name: "Notebook Lenovo i5", cat: "Laptops", total: 8, avail: 1, state: "low" },
  { id: "INV-003", name: "Cable HDMI 3m", cat: "Accesorios", total: 20, avail: 12, state: "available" },
  { id: "INV-004", name: "Micrófono inalámbrico", cat: "Accesorios", total: 4, avail: 0, state: "out" },
  { id: "INV-005", name: "Tablet Samsung", cat: "Otros", total: 6, avail: 2, state: "maintenance" },
];

const reqs = [
  { who: "Prof. García", item: "2× Proyectores", when: "Mar 14:00", use: "Clase práctica", room: "Aula 204" },
  { who: "Prof. López", item: "1× Notebook", when: "Vie 10:00", use: "Examen oral", room: "Aula 311" },
];

function stateBadge(s: string) {
  if (s === "available") return <StatusBadge variant="success">Disponible</StatusBadge>;
  if (s === "low") return <StatusBadge variant="cyan">Bajo stock</StatusBadge>;
  if (s === "maintenance") return <StatusBadge variant="muted">Mantenimiento</StatusBadge>;
  return <StatusBadge variant="error">Agotado</StatusBadge>;
}

function InvAdmin() {
  return (
    <>
      <AppHeader title="Inventario" subtitle="Equipamiento, préstamos y solicitudes." />
      <main className="p-4 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
            <p className="text-xs uppercase tracking-wider text-text-muted">Total equipamiento</p>
            <p className="text-3xl font-bold mt-2">43</p>
            <StatusBadge variant="warning" className="mt-2">2 con stock bajo</StatusBadge>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
            <p className="text-xs uppercase tracking-wider text-text-muted">Solicitudes pendientes</p>
            <p className="text-3xl font-bold mt-2">{reqs.length}</p>
            <p className="text-xs text-text-secondary mt-1">Requieren resolución</p>
          </div>
          <div className="bg-state-error/10 border border-state-error/30 rounded-2xl p-5 shadow-card">
            <p className="text-xs uppercase tracking-wider text-state-error">Préstamos vencidos</p>
            <p className="text-3xl font-bold mt-2 text-state-error">2</p>
            <Button variant="outline" size="sm" className="mt-2 border-state-error/50 text-state-error hover:bg-state-error/10 hover:text-state-error">
              Reclamar
            </Button>
          </div>
        </div>

        <Tabs defaultValue="items">
          <TabsList className="bg-input-bg border border-border">
            <TabsTrigger value="items" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">Ítems</TabsTrigger>
            <TabsTrigger value="reqs" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">Solicitudes</TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">Activos</TabsTrigger>
            <TabsTrigger value="hist" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="mt-5 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-4 shadow-card flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <Input placeholder="Buscar ítem..." className="pl-9 bg-input-bg border-border" />
              </div>
              <Button className="bg-accent-cyan text-background font-semibold hover:brightness-110 shadow-glow">
                <Plus className="h-4 w-4" /> Agregar ítem
              </Button>
            </div>
            <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-text-muted border-b border-border">
                      <th className="text-left py-3 px-4">ID</th>
                      <th className="text-left py-3 px-4">Nombre</th>
                      <th className="text-left py-3 px-4">Categoría</th>
                      <th className="text-left py-3 px-4">Stock</th>
                      <th className="text-left py-3 px-4">Disponible</th>
                      <th className="text-left py-3 px-4">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it) => (
                      <tr key={it.id} className="border-b border-border/40 hover:bg-white/[0.02]">
                        <td className="py-3 px-4 text-text-muted text-xs">{it.id}</td>
                        <td className="py-3 px-4 font-semibold">{it.name}</td>
                        <td className="py-3 px-4 text-text-secondary">{it.cat}</td>
                        <td className="py-3 px-4">{it.total}</td>
                        <td className="py-3 px-4">{it.avail}</td>
                        <td className="py-3 px-4">{stateBadge(it.state)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reqs" className="mt-5 space-y-3">
            {reqs.map((r, i) => (
              <article key={i} className="bg-card border border-border rounded-2xl p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{r.who} — {r.item}</p>
                  <p className="text-xs text-text-muted mt-1">{r.when} · {r.room} · {r.use}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-state-error/50 text-state-error hover:bg-state-error/10 hover:text-state-error">
                    <X className="h-4 w-4" /> Rechazar
                  </Button>
                  <Button className="bg-state-success text-background font-semibold hover:brightness-110">
                    <Check className="h-4 w-4" /> Aprobar
                  </Button>
                </div>
              </article>
            ))}
          </TabsContent>

          <TabsContent value="active" className="mt-5">
            <div className="bg-state-error/10 border-l-4 border-state-error rounded-r-lg p-3 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-state-error" />
              <p className="text-xs text-state-error">2 préstamos vencidos requieren atención.</p>
            </div>
            <div className="text-center text-text-secondary py-8">Tabla de préstamos activos.</div>
          </TabsContent>
          <TabsContent value="hist" className="mt-5">
            <div className="text-center text-text-secondary py-12">Historial completo de movimientos.</div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
