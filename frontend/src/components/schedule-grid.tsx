import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Cell = {
  day: number; // 0-4
  start: number; // hour
  duration: number; // hours
  subject: string;
  prof: string;
  room: string;
  state?: "normal" | "no-class" | "room-changed" | "holiday";
  newRoom?: string;
  color: string; // tailwind border color
};

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const hours = Array.from({ length: 14 }, (_, i) => 8 + i); // 8 to 21

const classes: Cell[] = [
  { day: 0, start: 8, duration: 2, subject: "Análisis Matemático II", prof: "Prof. García", room: "Aula 204 · Edif. A", color: "border-l-accent-cyan", state: "normal" },
  { day: 0, start: 14, duration: 3, subject: "Algoritmos I", prof: "Prof. López", room: "Aula 311 · Edif. B", color: "border-l-accent-blue" },
  { day: 1, start: 10, duration: 2, subject: "Física I", prof: "Prof. Méndez", room: "Aula 102 · Edif. A", color: "border-l-state-success", state: "room-changed", newRoom: "Aula 105" },
  { day: 2, start: 8, duration: 2, subject: "Análisis Matemático II", prof: "Prof. García", room: "Aula 204 · Edif. A", color: "border-l-accent-cyan", state: "no-class" },
  { day: 2, start: 14, duration: 2, subject: "Bases de Datos", prof: "Prof. Ruiz", room: "Lab 3 · Edif. C", color: "border-l-state-warning" },
  { day: 3, start: 16, duration: 3, subject: "Algoritmos I", prof: "Prof. López", room: "Aula 311 · Edif. B", color: "border-l-accent-blue" },
  { day: 4, start: 10, duration: 2, subject: "Inglés Técnico", prof: "Prof. Smith", room: "Aula 401 · Edif. D", color: "border-l-purple-500" },
];

const holidays = new Set<number>([]); // mark a day index as holiday if needed

export function ScheduleGrid() {
  const [granularity, setGranularity] = useState<"1h" | "15m">("1h");
  const today = new Date().getDay();
  const todayIdx = today >= 1 && today <= 5 ? today - 1 : -1;

  return (
    <section className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
      <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border">
        <div>
          <h2 className="text-lg font-bold">Mi Horario</h2>
          <p className="text-xs text-text-secondary">Semana 12 — Semestre B</p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs defaultValue="weekly">
            <TabsList className="bg-input-bg border border-border">
              <TabsTrigger value="weekly" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">Semanal</TabsTrigger>
              <TabsTrigger value="monthly" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">Mensual</TabsTrigger>
            </TabsList>
          </Tabs>
          <ToggleGroup
            type="single"
            value={granularity}
            onValueChange={(v) => v && setGranularity(v as "1h" | "15m")}
            className="bg-input-bg border border-border rounded-md"
          >
            <ToggleGroupItem value="1h" className="data-[state=on]:bg-accent-cyan data-[state=on]:text-background text-xs px-3">1h</ToggleGroupItem>
            <ToggleGroupItem value="15m" className="data-[state=on]:bg-accent-cyan data-[state=on]:text-background text-xs px-3">15min</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[760px] p-4">
          {/* header row */}
          <div className="grid grid-cols-[64px_repeat(5,1fr)] gap-2 mb-2">
            <div />
            {days.map((d, i) => (
              <div
                key={d}
                className={[
                  "text-center text-xs uppercase tracking-wider font-semibold py-2 rounded-lg",
                  i === todayIdx ? "text-accent-cyan bg-accent-cyan/5" : "text-text-muted",
                ].join(" ")}
              >
                {d}
              </div>
            ))}
          </div>

          {/* hour grid */}
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: "64px repeat(5, 1fr)",
              gridTemplateRows: `repeat(${hours.length * (granularity === "15m" ? 4 : 1)}, ${granularity === "15m" ? 18 : 56}px)`,
            }}
          >
            {hours.map((h, hi) =>
              Array.from({ length: granularity === "15m" ? 4 : 1 }).map((_, sub) => (
                <div
                  key={`${h}-${sub}`}
                  className="text-[11px] text-text-muted pt-1 pr-2 text-right border-t border-border/50"
                  style={{ gridColumn: 1, gridRow: hi * (granularity === "15m" ? 4 : 1) + sub + 1 }}
                >
                  {sub === 0 ? `${h}:00` : ""}
                </div>
              ))
            )}

            {/* day backgrounds */}
            {days.map((_, di) => (
              <div
                key={di}
                className={[
                  "rounded-lg border border-border/40",
                  di === todayIdx ? "bg-white/[0.03]" : "",
                  holidays.has(di) ? "bg-state-info/5" : "",
                ].join(" ")}
                style={{
                  gridColumn: di + 2,
                  gridRow: `1 / span ${hours.length * (granularity === "15m" ? 4 : 1)}`,
                }}
              />
            ))}

            {/* class cells */}
            {classes.map((c, i) => {
              const rowsPerHour = granularity === "15m" ? 4 : 1;
              const startRow = (c.start - hours[0]) * rowsPerHour + 1;
              const span = c.duration * rowsPerHour;
              const stateClasses =
                c.state === "no-class"
                  ? "bg-state-error/10 border-state-error"
                  : c.state === "room-changed"
                  ? "bg-state-warning/10 border-state-warning"
                  : "bg-card hover:bg-white/[0.04]";

              return (
                <button
                  key={i}
                  className={[
                    "relative rounded-xl p-2.5 text-left text-[11px] border border-border/40 border-l-4 transition-all duration-200 overflow-hidden",
                    c.color,
                    stateClasses,
                    "hover:shadow-glow-soft hover:border-accent-cyan/20",
                  ].join(" ")}
                  style={{
                    gridColumn: c.day + 2,
                    gridRow: `${startRow} / span ${span}`,
                  }}
                >
                  {c.state === "no-class" && (
                    <span className="inline-block mb-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-state-error/20 text-state-error border border-state-error/30">
                      Sin clase
                    </span>
                  )}
                  {c.state === "room-changed" && (
                    <span className="inline-block mb-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-state-warning/20 text-state-warning border border-state-warning/30">
                      Aula modificada
                    </span>
                  )}
                  <div className={["font-semibold leading-tight", c.state === "no-class" ? "line-through text-state-error" : "text-foreground"].join(" ")}>
                    {c.subject}
                  </div>
                  <div className="text-text-muted mt-0.5 truncate">{c.prof}</div>
                  <div className="text-text-secondary mt-0.5 truncate">
                    {c.state === "room-changed" ? c.newRoom : c.room}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
