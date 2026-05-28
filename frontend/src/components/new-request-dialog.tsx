import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DoorOpen, CalendarPlus, ArrowLeftRight, Package, FileText, Info, Check, Plus } from "lucide-react";

type Tipo = "cambio" | "uso" | "intercambio" | "instrumento";

const TIPOS: { key: Tipo; icon: any; title: string; desc: string }[] = [
  { key: "cambio", icon: DoorOpen, title: "Cambio de aula", desc: "Reasignar a otra aula." },
  { key: "uso", icon: CalendarPlus, title: "Uso especial", desc: "Reservar un aula puntual." },
  { key: "intercambio", icon: ArrowLeftRight, title: "Intercambio", desc: "Acuerdo entre profesores." },
  { key: "instrumento", icon: Package, title: "Instrumento", desc: "Solicitar equipamiento." },
];

const inputCls = "bg-input-bg border-border focus-visible:border-accent-cyan focus-visible:ring-accent-cyan/30";

export function NewRequestDialog({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState<Tipo>("cambio");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="bg-accent-cyan text-background font-semibold hover:brightness-110 shadow-glow">
            <Plus className="h-4 w-4" />
            Nueva solicitud
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-card border-border max-w-[580px] sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent-cyan" />
            Nueva Solicitud
          </DialogTitle>
        </DialogHeader>

        <div>
          <Label className="text-xs uppercase tracking-wider text-text-muted">Tipo de solicitud</Label>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {TIPOS.map((t) => {
              const sel = tipo === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTipo(t.key)}
                  className={[
                    "relative text-left rounded-xl border-2 p-3 transition-all",
                    sel
                      ? "border-accent-cyan bg-accent-cyan/5 shadow-glow-soft"
                      : "border-border bg-input-bg hover:border-white/15",
                  ].join(" ")}
                >
                  {sel && (
                    <span className="absolute top-2 right-2 h-5 w-5 rounded-full bg-accent-cyan text-background flex items-center justify-center">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                  <t.icon className="h-5 w-5 text-accent-cyan mb-2" />
                  <div className="text-sm font-semibold">{t.title}</div>
                  <div className="text-[11px] text-text-muted">{t.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-2 space-y-3">
          {tipo === "cambio" && (
            <>
              <Field label="Materia">
                <Select><SelectTrigger className={inputCls}><SelectValue placeholder="Seleccionar materia" /></SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="ana">Análisis Matemático II</SelectItem>
                    <SelectItem value="alg">Algoritmos I</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Aula deseada"><Input className={inputCls} placeholder="Ej: Aula 304" /></Field>
              <Field label="Motivo *"><Textarea className={inputCls} placeholder="Describí el motivo del cambio" /></Field>
            </>
          )}
          {tipo === "uso" && (
            <>
              <Field label="Aula"><Input className={inputCls} placeholder="Ej: Aula magna" /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Inicio"><Input type="datetime-local" className={inputCls} /></Field>
                <Field label="Fin"><Input type="datetime-local" className={inputCls} /></Field>
              </div>
              <Field label="Motivo *"><Textarea className={inputCls} /></Field>
            </>
          )}
          {tipo === "intercambio" && (
            <>
              <Field label="Mi materia"><Input className={inputCls} placeholder="Tu materia" /></Field>
              <Field label="Profesor a intercambiar"><Input className={inputCls} placeholder="Nombre" /></Field>
              <Field label="Aula del profesor"><Input className={inputCls} /></Field>
              <Field label="Mensaje"><Textarea className={inputCls} placeholder="Mensaje al otro profesor" /></Field>
              <div className="flex items-start gap-2 rounded-lg p-3 bg-state-info/10 border border-state-info/20 text-xs text-state-info">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                Esta solicitud requiere aceptación del otro profesor. El administrador no interviene.
              </div>
            </>
          )}
          {tipo === "instrumento" && (
            <>
              <Field label="Ítem"><Input className={inputCls} placeholder="Proyector, notebook, etc." /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Cantidad"><Input type="number" min={1} className={inputCls} /></Field>
                <Field label="Fecha de uso"><Input type="datetime-local" className={inputCls} /></Field>
              </div>
              <Field label="Aula"><Input className={inputCls} /></Field>
              <Field label="Motivo *"><Textarea className={inputCls} /></Field>
            </>
          )}

          <div className="flex items-start gap-2 rounded-lg p-3 bg-accent-cyan/10 border border-accent-cyan/20 text-xs text-accent-cyan">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            Las solicitudes se procesan en máx. 24 horas hábiles.
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button
            onClick={() => setOpen(false)}
            className="bg-accent-cyan text-background font-semibold hover:brightness-110 shadow-glow"
          >
            Enviar Solicitud
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-[11px] uppercase tracking-wider text-text-muted">{label}</Label>
      {children}
    </div>
  );
}
