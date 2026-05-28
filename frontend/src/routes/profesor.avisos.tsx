import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { Bell, AlertTriangle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/profesor/avisos")({
  head: () => ({ meta: [{ title: "AulaHub — Avisar a alumnos" }] }),
  component: AvisosProf,
});

const inputCls = "bg-input-bg border-border focus-visible:border-accent-cyan focus-visible:ring-accent-cyan/30";

function AvisosProf() {
  return (
    <>
      <AppHeader title="Avisar a alumnos" subtitle="Comunicá cancelaciones, cambios o anuncios." />
      <main className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <section className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-5">
          <div className="flex flex-col gap-2">
            <Label className="text-[11px] uppercase tracking-wider text-text-muted">Materia</Label>
            <Select>
              <SelectTrigger className={inputCls}><SelectValue placeholder="Seleccionar materia" /></SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="ana">Análisis Matemático II</SelectItem>
                <SelectItem value="alg">Algoritmos I</SelectItem>
                <SelectItem value="fis">Física I</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[11px] uppercase tracking-wider text-text-muted">Tipo de aviso</Label>
            <Select defaultValue="sin-clase">
              <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="sin-clase">Sin clase</SelectItem>
                <SelectItem value="cambio">Cambio de aula</SelectItem>
                <SelectItem value="general">Comunicado general</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[11px] uppercase tracking-wider text-text-muted">Motivo</Label>
            <RadioGroup defaultValue="paro" className="grid grid-cols-2 gap-2">
              {["Paro docente", "Enfermedad", "Causa personal", "Feriado", "Otro"].map((m) => (
                <label key={m} className="flex items-center gap-2 rounded-lg p-2.5 bg-input-bg border border-border cursor-pointer hover:border-accent-cyan/30">
                  <RadioGroupItem value={m} className="border-border data-[state=checked]:border-accent-cyan data-[state=checked]:text-accent-cyan" />
                  <span className="text-sm">{m}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[11px] uppercase tracking-wider text-text-muted">Mensaje adicional</Label>
            <Textarea className={inputCls} placeholder="Opcional — más contexto para tus alumnos." rows={4} />
          </div>

          <div className="bg-state-warning/10 border-l-4 border-state-warning rounded-r-lg p-3 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-state-warning shrink-0 mt-0.5" />
            <p className="text-xs text-state-warning">Esta notificación se enviará por push y email a 42 alumnos inscriptos.</p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost">Cancelar</Button>
            <Button className="bg-accent-cyan text-background font-semibold hover:brightness-110 shadow-glow">
              <Send className="h-4 w-4" /> Enviar notificación
            </Button>
          </div>
        </section>

        <aside className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <p className="text-[11px] uppercase tracking-wider text-text-muted mb-3">Vista previa</p>
          <div className="rounded-xl bg-input-bg border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-state-error/15 border border-state-error/30 flex items-center justify-center">
                <Bell className="h-4 w-4 text-state-error" />
              </div>
              <p className="text-sm font-semibold">Sin clase — Análisis Matemático II</p>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              La clase de hoy queda suspendida por paro docente. Más detalles en el campus.
            </p>
            <p className="text-[10px] text-text-muted mt-3">Ahora · Push + Email</p>
          </div>
        </aside>
      </main>
    </>
  );
}
