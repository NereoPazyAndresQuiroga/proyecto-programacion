import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { StatusBadge } from "@/components/status-badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profesor/calendario")({
  head: () => ({ meta: [{ title: "AulaHub — Calendario" }] }),
  component: CalendarProf,
});

const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const events: Record<number, { type: "holiday" | "closure" | "event"; name: string }[]> = {
  3: [{ type: "event", name: "Inscripción a finales" }],
  9: [{ type: "holiday", name: "Día de la Memoria" }],
  14: [{ type: "closure", name: "Aula 204 — Refacción" }],
  21: [{ type: "event", name: "Jornada institucional" }],
  28: [{ type: "closure", name: "Lab 1 — Limpieza" }],
};

function CalendarProf() {
  const today = new Date();
  const monthName = today.toLocaleDateString("es-AR", { month: "long", year: "numeric" });
  const daysInMonth = 30;

  return (
    <>
      <AppHeader title="Calendario" subtitle="Eventos institucionales, feriados y clausuras." />
      <main className="p-4 sm:p-6">
        <section className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <header className="p-5 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
              <h2 className="text-lg font-bold capitalize">{monthName}</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge variant="info">Feriado</StatusBadge>
              <StatusBadge variant="warning">Clausura</StatusBadge>
              <StatusBadge variant="cyan">Evento</StatusBadge>
            </div>
          </header>

          <div className="grid grid-cols-7 gap-px bg-border">
            {days.map((d) => (
              <div key={d} className="bg-card text-center text-[11px] uppercase tracking-wider text-text-muted py-2">{d}</div>
            ))}
            {Array.from({ length: daysInMonth + 2 }).map((_, i) => {
              if (i < 2) return <div key={`e${i}`} className="bg-card/50 min-h-24" />;
              const day = i - 1;
              const evs = events[day] ?? [];
              const isToday = day === today.getDate();
              return (
                <div key={i} className={`bg-card min-h-24 p-2 ${isToday ? "ring-2 ring-accent-cyan ring-inset" : ""}`}>
                  <div className={`text-xs font-semibold ${isToday ? "text-accent-cyan" : "text-text-secondary"}`}>{day}</div>
                  <div className="mt-1 space-y-1">
                    {evs.map((e, j) => (
                      <div
                        key={j}
                        className={`text-[10px] px-1.5 py-0.5 rounded truncate ${
                          e.type === "holiday" ? "bg-state-info/20 text-state-info border border-state-info/30"
                          : e.type === "closure" ? "bg-state-warning/20 text-state-warning border border-state-warning/30"
                          : "bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30"
                        }`}
                        title={e.name}
                      >
                        {e.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
