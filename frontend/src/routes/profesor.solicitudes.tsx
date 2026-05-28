import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/status-badge";
import { NewRequestDialog } from "@/components/new-request-dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeftRight, AlertTriangle, MessageCircle, X } from "lucide-react";

export const Route = createFileRoute("/profesor/solicitudes")({
  head: () => ({ meta: [{ title: "AulaHub — Mis solicitudes" }] }),
  component: SolicitudesProf,
});

const sent = [
  { type: "Cambio de aula", room: "Aula 311 → 405", time: "Lun 10:00–12:00", date: "Hace 2 días", status: "pending" as const },
  { type: "Uso especial", room: "Aula magna", time: "Vie 15:00–17:00", date: "Hace 4 días", status: "approved" as const },
  { type: "Cambio de aula", room: "Aula 204 → 210", time: "Mié 14:00–16:00", date: "Hace 1 sem", status: "rejected" as const, reason: "El aula 210 está reservada por Decanato durante todo el semestre." },
  { type: "Intercambio", room: "Con Prof. Méndez", time: "Mar 10:00", date: "Hoy", status: "pending" as const, swap: "waiting" as const },
];

const received = [
  { from: "Prof. López", initials: "PL", offered: "Aula 311 (Mar 14h)", asked: "Aula 204 (Mar 10h)", time: "Hace 1 h" },
  { from: "Prof. Ruiz", initials: "PR", offered: "Lab 3 (Vie 14h)", asked: "Aula 204 (Vie 10h)", time: "Ayer" },
];

function SolicitudesProf() {
  return (
    <>
      <AppHeader title="Solicitudes" subtitle="Tus pedidos enviados y propuestas recibidas." />
      <main className="p-4 sm:p-6 space-y-5">
        <div className="flex justify-end">
          <NewRequestDialog />
        </div>

        <Tabs defaultValue="sent">
          <TabsList className="bg-input-bg border border-border">
            <TabsTrigger value="sent" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">Enviadas</TabsTrigger>
            <TabsTrigger value="received" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">Recibidas</TabsTrigger>
          </TabsList>

          <TabsContent value="sent" className="mt-5 space-y-4">
            {sent.map((r, i) => (
              <article key={i} className="bg-card border border-border rounded-2xl p-5 shadow-card hover:border-accent-cyan/20 transition-all">
                <header className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <StatusBadge variant={r.type === "Intercambio" ? "cyan" : "muted"}>{r.type}</StatusBadge>
                    <p className="font-semibold mt-2">{r.room}</p>
                    <p className="text-xs text-text-muted mt-0.5">{r.time} · {r.date}</p>
                  </div>
                  <StatusBadge variant={r.status === "pending" ? "warning" : r.status === "approved" ? "success" : "error"}>
                    {r.status === "pending" ? "Pendiente" : r.status === "approved" ? "Aprobada" : "Rechazada"}
                  </StatusBadge>
                </header>

                {r.status === "rejected" && r.reason && (
                  <div className="bg-state-error/10 border-l-4 border-state-error rounded-r-lg p-3 mb-3 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-state-error shrink-0 mt-0.5" />
                    <p className="text-xs text-state-error">{r.reason}</p>
                  </div>
                )}

                {r.swap && (
                  <div className="text-xs text-text-secondary mb-3">
                    Estado del otro profesor: <StatusBadge variant="info" className="ml-1">Esperando</StatusBadge>
                  </div>
                )}

                <footer className="flex justify-end gap-2">
                  {r.status === "pending" && (
                    <Button variant="outline" size="sm" className="border-state-error/50 text-state-error hover:bg-state-error/10 hover:text-state-error">
                      <X className="h-3.5 w-3.5" /> Cancelar
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">Ver detalle</Button>
                </footer>
              </article>
            ))}
          </TabsContent>

          <TabsContent value="received" className="mt-5 space-y-4">
            {received.map((p, i) => (
              <article key={i} className="bg-card border border-border rounded-2xl p-5 shadow-card">
                <header className="flex items-center gap-3 mb-3">
                  <Avatar className="border border-border">
                    <AvatarFallback className="bg-accent-cyan/15 text-accent-cyan font-semibold">{p.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{p.from} propone un intercambio</p>
                    <p className="text-xs text-text-muted">{p.time}</p>
                  </div>
                  <ArrowLeftRight className="h-5 w-5 text-accent-cyan" />
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="rounded-lg p-3 bg-input-bg border border-border">
                    <p className="text-[10px] uppercase tracking-wider text-text-muted">Te ofrece</p>
                    <p className="text-sm font-semibold mt-1">{p.offered}</p>
                  </div>
                  <div className="rounded-lg p-3 bg-input-bg border border-border">
                    <p className="text-[10px] uppercase tracking-wider text-text-muted">Te pide</p>
                    <p className="text-sm font-semibold mt-1">{p.asked}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-end">
                  <Button variant="ghost" size="sm"><MessageCircle className="h-3.5 w-3.5" /> Mensaje</Button>
                  <Button variant="outline" size="sm" className="border-state-error/50 text-state-error hover:bg-state-error/10 hover:text-state-error">Rechazar</Button>
                  <Button size="sm" className="bg-state-success text-background font-semibold hover:brightness-110">Aceptar</Button>
                </div>
              </article>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
