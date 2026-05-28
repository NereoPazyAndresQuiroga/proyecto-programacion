import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { Search, Package, Projector, Laptop, Mic, Cable } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/profesor/inventario")({
  head: () => ({ meta: [{ title: "AulaHub — Inventario" }] }),
  component: InvProf,
});

const items = [
  { name: "Proyector portátil", category: "Proyectores", icon: Projector, available: 3, total: 5, stock: "alto" },
  { name: "Notebook Lenovo i5", category: "Laptops", icon: Laptop, available: 1, total: 8, stock: "bajo" },
  { name: "Cable HDMI 3m", category: "Accesorios", icon: Cable, available: 12, total: 20, stock: "alto" },
  { name: "Micrófono inalámbrico", category: "Accesorios", icon: Mic, available: 0, total: 4, stock: "bajo" },
  { name: "Tablet Samsung", category: "Otros", icon: Package, available: 2, total: 6, stock: "medio" },
  { name: "Puntero láser", category: "Accesorios", icon: Package, available: 5, total: 10, stock: "medio" },
];

function InvProf() {
  const [cat, setCat] = useState("Todos");
  const filtered = cat === "Todos" ? items : items.filter((i) => i.category === cat);

  return (
    <>
      <AppHeader title="Inventario de Equipamiento" subtitle="Equipamiento de uso común del edificio." />
      <main className="p-4 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <ToggleGroup type="single" value={cat} onValueChange={(v) => v && setCat(v)} className="bg-input-bg border border-border rounded-md flex-wrap">
            {["Todos", "Proyectores", "Laptops", "Accesorios", "Otros"].map((c) => (
              <ToggleGroupItem key={c} value={c} className="text-xs px-3 data-[state=on]:bg-accent-cyan data-[state=on]:text-background">
                {c}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input placeholder="Buscar equipo..." className="pl-9 bg-input-bg border-border" />
          </div>
        </div>

        <Tabs defaultValue="cat">
          <TabsList className="bg-input-bg border border-border">
            <TabsTrigger value="cat" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">Catálogo</TabsTrigger>
            <TabsTrigger value="loans" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">Préstamos activos</TabsTrigger>
            <TabsTrigger value="reqs" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">Mis solicitudes</TabsTrigger>
          </TabsList>

          <TabsContent value="cat" className="mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((it, i) => {
                const pct = Math.round((it.available / it.total) * 100);
                const stockVar = it.stock === "alto" ? "success" : it.stock === "bajo" ? "error" : "muted";
                return (
                  <article key={i} className="bg-card border border-border rounded-2xl p-5 shadow-card hover:border-accent-cyan/20 transition-all">
                    <div className="aspect-video rounded-xl bg-gradient-to-br from-accent-cyan/10 to-accent-blue/10 border border-border mb-4 flex items-center justify-center relative">
                      <it.icon className="h-12 w-12 text-accent-cyan" />
                      <div className="absolute top-2 right-2">
                        <StatusBadge variant={stockVar as any}>
                          Stock {it.stock}
                        </StatusBadge>
                      </div>
                    </div>
                    <p className="text-[10px] uppercase tracking-wider text-text-muted">{it.category}</p>
                    <h3 className="font-semibold mt-1">{it.name}</h3>
                    <p className="text-xs text-text-secondary mt-1">{it.available} / {it.total} unidades</p>
                    <div className="h-1.5 w-full bg-input-bg rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-accent-cyan" style={{ width: `${pct}%` }} />
                    </div>
                    <Button
                      disabled={it.available === 0}
                      variant="outline"
                      className="w-full mt-4 border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10 hover:text-accent-cyan disabled:opacity-40"
                    >
                      Solicitar Equipo
                    </Button>
                  </article>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="loans" className="mt-5">
            <div className="text-center text-text-secondary py-12">No tenés préstamos activos.</div>
          </TabsContent>
          <TabsContent value="reqs" className="mt-5">
            <div className="text-center text-text-secondary py-12">No tenés solicitudes pendientes.</div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
