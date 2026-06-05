import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { ScheduleGrid } from "@/components/schedule-grid";
import { Bell, Eye, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/alumno/")({
  head: () => ({ meta: [{ title: "AulaHub — Mi horario" }] }),
  component: AlumnoDashboard,
});

const avisos = [
  { tipo: "Sin clase", subject: "Análisis Matemático II", desc: "Paro docente nacional el miércoles", time: "Hace 1 h", unread: true },
  { tipo: "Aula modificada", subject: "Física I", desc: "Pasamos al Aula 105 por refacciones", time: "Hace 4 h", unread: true },
  { tipo: "Comunicado", subject: "Algoritmos I", desc: "Material complementario disponible en el campus", time: "Ayer", unread: false },
];

function AlumnoDashboard() {
  return (
    <>
      <AppHeader title="Hola, Martina" subtitle="Acá está tu semana en AulaHub." role="alumno" />
      <main className="p-4 sm:p-6 grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        <div className="min-w-0">
          <ScheduleGrid />
        </div>

        <aside className="flex flex-col gap-5">
          <section className="bg-card border border-border rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Bell className="h-4 w-4 text-accent-cyan" />
                Avisos Recientes
              </h3>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                2 Nuevos
              </span>
            </div>
            <ul className="space-y-3">
              {avisos.map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  {a.unread && <span className="mt-1.5 h-2 w-2 rounded-full bg-accent-cyan shrink-0" />}
                  <div className={[!a.unread ? "ml-5" : "", "flex-1 min-w-0"].join(" ")}>
                    <p className={["text-sm truncate", a.unread ? "font-semibold" : "text-text-secondary"].join(" ")}>
                      {a.subject}
                    </p>
                    <p className="text-xs text-text-muted">{a.desc}</p>
                    <p className="text-[11px] text-text-muted mt-0.5">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-card border border-border rounded-2xl p-5 shadow-card">
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-accent-cyan" />
              Próxima evaluación
            </h3>
            <p className="text-sm text-text-secondary">Bases de Datos</p>
            <p className="text-2xl font-bold mt-1">Vie 28 Mar</p>
            <p className="text-xs text-text-muted mt-1">14:00 — Lab 3, Edif. C</p>
          </section>

          <Button variant="outline" className="border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10 hover:text-accent-cyan">
            <Calendar className="h-4 w-4" />
            Ver Calendario Completo
            <Eye className="h-4 w-4 ml-auto" />
          </Button>
        </aside>
      </main>
    </>
  );
}
