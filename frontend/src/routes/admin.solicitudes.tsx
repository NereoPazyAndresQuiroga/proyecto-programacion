import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { StatusBadge } from "@/components/status-badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X, Check } from "lucide-react";

export const Route = createFileRoute("/admin/solicitudes")({
  head: () => ({ meta: [{ title: "AulaHub — Solicitudes Admin" }] }),
  component: AdminSols,
});

const sols = [
  {
    id: "1", type: "Cambio de aula", who: "Prof. García", subject: "Análisis II",
    from: "Aula 204", to: "Aula 210", time: "Lun 10:00–12:00", reason: "Necesito proyector de mayor resolución.",
    conflict: true, conflictWith: "Prof. Méndez (Física I)",
  },
  {
    id: "2", type: "Uso especial", who: "Prof. López", subject: "Algoritmos I",
    from: "—", to: "Aula magna", time: "Vie 15:00–17:00", reason: "Charla con invitado externo.", conflict: false,
  },
  {
    id: "3", type: "Instrumento", who: "Prof. Ruiz", subject: "Bases de Datos",
    from: "—", to: "2× Notebooks", time: "Jue 09:00", reason: "Para clase práctica de SQL.", conflict: false,
  },
];

const inputCls = "bg-input-bg border-border focus-visible:border-accent-cyan focus-visible:ring-accent-cyan/30";

function AdminSols() {
  return (
    <>
      <AppHeader title="Solicitudes" subtitle="Revisá y resolvé los pedidos de los profesores." />
      <main className="p-4 sm:p-6 space-y-5">
        <section className="bg-card border border-border rounded-2xl p-4 shadow-card flex flex-wrap gap-3">
          <Select><SelectTrigger className={`${inputCls} w-40`}><SelectValue placeholder="Tipo" /></SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="cambio">Cambio de aula</SelectItem>
              <SelectItem value="uso">Uso especial</SelectItem>
              <SelectItem value="instr">Instrumento</SelectItem>
            </SelectContent>
          </Select>
          <Select><SelectTrigger className={`${inputCls} w-40`}><SelectValue placeholder="Estado" /></SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="approved">Aprobada</SelectItem>
              <SelectItem value="rejected">Rechazada</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" className={`${inputCls} w-44`} />
          <Input placeholder="Buscar profesor..." className={`${inputCls} flex-1 min-w-48`} />
          <Button variant="ghost">Limpiar</Button>
        </section>

        <Accordion type="multiple" className="space-y-3">
          {sols.map((s) => (
            <AccordionItem
              key={s.id}
              value={s.id}
              className="bg-card border border-border rounded-2xl shadow-card data-[state=open]:border-accent-cyan/30 transition-all"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex flex-1 items-center gap-3 text-left">
                  <StatusBadge variant="muted">{s.type}</StatusBadge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{s.who} — {s.subject}</p>
                    <p className="text-xs text-text-muted">{s.time}</p>
                  </div>
                  <StatusBadge variant="warning">Pendiente</StatusBadge>
                  {s.conflict && <StatusBadge variant="error">Conflicto</StatusBadge>}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <Stat label="Origen" value={s.from} />
                  <Stat label="Destino" value={s.to} />
                  <Stat label="Horario" value={s.time} />
                  <Stat label="Profesor" value={s.who} />
                </div>

                <div className="bg-input-bg border border-border rounded-lg p-3 mb-4">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted">Motivo del profesor</p>
                  <p className="text-sm mt-1">{s.reason}</p>
                </div>

                {s.conflict && (
                  <div className="bg-state-error/10 border-l-4 border-state-error rounded-r-lg p-3 mb-4 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-state-error shrink-0 mt-0.5" />
                    <p className="text-xs text-state-error">
                      Conflicto con solicitud de <strong>{s.conflictWith}</strong>. Solo podés aprobar una de las dos.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-text-muted">Motivo de la decisión (obligatorio al rechazar) *</label>
                  <Textarea className={inputCls} placeholder="Explicá brevemente la decisión..." rows={3} />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" className="border-state-error/50 text-state-error hover:bg-state-error/10 hover:text-state-error">
                    <X className="h-4 w-4" /> Rechazar
                  </Button>
                  <Button className="bg-accent-blue text-white font-semibold hover:brightness-110">
                    <Check className="h-4 w-4" /> Aprobar
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg p-3 bg-input-bg border border-border">
      <p className="text-[10px] uppercase tracking-wider text-text-muted">{label}</p>
      <p className="text-sm font-semibold mt-1">{value}</p>
    </div>
  );
}
