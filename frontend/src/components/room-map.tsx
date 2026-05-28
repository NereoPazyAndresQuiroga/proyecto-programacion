import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { StatusBadge } from "@/components/status-badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Check, X, DoorOpen, Lock, Wrench } from "lucide-react";

type RoomState = "available" | "occupied" | "closed" | "own";

type Room = {
  id: string;
  number: string;
  x: number; y: number; w: number; h: number;
  state: RoomState;
  capacity: number;
  equipment: { name: string; ok: boolean }[];
};

const STATE_FILL: Record<RoomState, string> = {
  available: "fill-[oklch(0.72_0.18_145)]",
  occupied: "fill-[oklch(0.65_0.23_25)]",
  closed: "fill-[oklch(0.78_0.16_70)]",
  own: "fill-[oklch(0.83_0.16_200)]",
};
const STATE_LABEL: Record<RoomState, string> = {
  available: "Disponible",
  occupied: "Ocupada",
  closed: "Clausurada",
  own: "Tu aula",
};

const ROOMS: Room[] = [
  { id: "201", number: "201", x: 30, y: 40, w: 110, h: 80, state: "available", capacity: 40, equipment: [{ name: "Proyector", ok: true }, { name: "Pizarrón", ok: true }, { name: "AC", ok: false }] },
  { id: "202", number: "202", x: 150, y: 40, w: 110, h: 80, state: "occupied", capacity: 35, equipment: [{ name: "Proyector", ok: true }, { name: "Pizarrón", ok: true }, { name: "AC", ok: true }] },
  { id: "203", number: "203", x: 270, y: 40, w: 110, h: 80, state: "closed", capacity: 50, equipment: [{ name: "Proyector", ok: false }, { name: "Pizarrón", ok: true }] },
  { id: "204", number: "204", x: 390, y: 40, w: 110, h: 80, state: "own", capacity: 45, equipment: [{ name: "Proyector", ok: true }, { name: "Pizarrón", ok: true }, { name: "AC", ok: true }, { name: "Sonido", ok: true }] },
  { id: "205", number: "205", x: 510, y: 40, w: 110, h: 80, state: "available", capacity: 30, equipment: [{ name: "Proyector", ok: true }, { name: "Pizarrón", ok: true }] },
  { id: "210", number: "210", x: 30, y: 200, w: 140, h: 90, state: "available", capacity: 60, equipment: [{ name: "Proyector", ok: true }, { name: "Pizarrón", ok: true }, { name: "AC", ok: true }] },
  { id: "211", number: "211", x: 180, y: 200, w: 140, h: 90, state: "occupied", capacity: 80, equipment: [{ name: "Proyector", ok: true }, { name: "Sonido", ok: true }] },
  { id: "212", number: "212", x: 330, y: 200, w: 140, h: 90, state: "available", capacity: 70, equipment: [{ name: "Proyector", ok: true }, { name: "AC", ok: false }] },
  { id: "Lab", number: "Lab 1", x: 480, y: 200, w: 140, h: 90, state: "occupied", capacity: 25, equipment: [{ name: "PCs", ok: true }, { name: "Proyector", ok: true }] },
];

export function RoomMap({ adminActions = false }: { adminActions?: boolean }) {
  const [floor, setFloor] = useState("2");
  const [building, setBuilding] = useState("A");
  const [selected, setSelected] = useState<Room | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="text-[11px] uppercase tracking-wider text-text-muted">Edificio</label>
          <Select value={building} onValueChange={setBuilding}>
            <SelectTrigger className="bg-input-bg border-border mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="A">Edificio A — Central</SelectItem>
              <SelectItem value="B">Edificio B — Anexo</SelectItem>
              <SelectItem value="C">Edificio C — Laboratorios</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={floor} onValueChange={setFloor}>
        <TabsList className="bg-input-bg border border-border">
          <TabsTrigger value="0" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">PB</TabsTrigger>
          <TabsTrigger value="1" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">1° Piso</TabsTrigger>
          <TabsTrigger value="2" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">2° Piso</TabsTrigger>
        </TabsList>

        <TabsContent value={floor} className="mt-4">
          <div className="bg-card border border-border rounded-2xl p-3 sm:p-5 shadow-card overflow-hidden">
            <svg viewBox="0 0 660 320" className="w-full h-auto" style={{ touchAction: "none" }}>
              <rect x={10} y={10} width={640} height={300} rx={12} className="fill-transparent stroke-border" strokeWidth={1.5} />
              {/* corridor */}
              <rect x={20} y={140} width={620} height={40} className="fill-white/[0.02]" rx={6} />
              <text x={325} y={165} textAnchor="middle" className="fill-text-muted text-[10px]" style={{ fontSize: 10 }}>Pasillo</text>

              {ROOMS.map((r) => (
                <g key={r.id} onClick={() => setSelected(r)} className="cursor-pointer">
                  <rect
                    x={r.x} y={r.y} width={r.w} height={r.h} rx={8}
                    className={`${STATE_FILL[r.state]} opacity-60 hover:opacity-90 transition-opacity stroke-white/10`}
                    strokeWidth={1}
                  >
                    <title>{`Aula ${r.number} — ${STATE_LABEL[r.state]}`}</title>
                  </rect>
                  <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 4} textAnchor="middle" className="fill-white font-bold pointer-events-none" style={{ fontSize: 14 }}>
                    {r.number}
                  </text>
                </g>
              ))}
            </svg>

            <div className="flex flex-wrap gap-3 mt-4 text-xs">
              <Legend color="bg-state-success" label="Disponible" />
              <Legend color="bg-state-error" label="Ocupada" />
              <Legend color="bg-state-warning" label="Clausurada" />
              <Legend color="bg-accent-cyan" label="Tu aula" />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent side="right" className="bg-card border-border w-full sm:w-[420px]">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <DoorOpen className="h-5 w-5 text-accent-cyan" />
                  Aula {selected.number}
                  <StatusBadge variant={selected.state === "available" ? "success" : selected.state === "closed" ? "warning" : selected.state === "own" ? "cyan" : "error"}>
                    {STATE_LABEL[selected.state]}
                  </StatusBadge>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Stat label="Capacidad" value={`${selected.capacity} personas`} />
                  <Stat label="Edificio" value={`Edif. ${building}`} />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-text-muted mb-2">Equipamiento</p>
                  <ul className="space-y-1.5">
                    {selected.equipment.map((e) => (
                      <li key={e.name} className="flex items-center gap-2 text-sm">
                        {e.ok ? <Check className="h-4 w-4 text-state-success" /> : <X className="h-4 w-4 text-text-muted" />}
                        <span className={e.ok ? "" : "text-text-muted line-through"}>{e.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-text-muted mb-2">Disponibilidad semanal</p>
                  <div className="grid grid-cols-6 gap-1 text-[10px] text-center">
                    <div />
                    {["L", "M", "M", "J", "V"].map((d, i) => <div key={i} className="text-text-muted">{d}</div>)}
                    {["8h", "10h", "12h", "14h", "16h", "18h"].map((h) => (
                      <>
                        <div key={h} className="text-text-muted text-right pr-1">{h}</div>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={`${h}-${i}`} className={`h-5 rounded ${Math.random() > 0.5 ? "bg-state-success/40" : "bg-state-error/40"}`} />
                        ))}
                      </>
                    ))}
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <Button className="w-full bg-accent-cyan text-background font-semibold hover:brightness-110 shadow-glow">
                    Solicitar esta aula
                  </Button>
                  {adminActions && (
                    <>
                      <Button variant="outline" className="w-full border-state-warning/50 text-state-warning hover:bg-state-warning/10 hover:text-state-warning">
                        <Lock className="h-4 w-4" />
                        Clausurar aula
                      </Button>
                      <Button variant="outline" className="w-full border-accent-blue/50 text-accent-blue hover:bg-accent-blue/10 hover:text-accent-blue">
                        <Wrench className="h-4 w-4" />
                        Editar información
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-3 w-3 rounded ${color} opacity-70`} />
      <span className="text-text-secondary">{label}</span>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg p-3 bg-input-bg border border-border">
      <p className="text-[11px] uppercase tracking-wider text-text-muted">{label}</p>
      <p className="text-sm font-semibold mt-1">{value}</p>
    </div>
  );
}
