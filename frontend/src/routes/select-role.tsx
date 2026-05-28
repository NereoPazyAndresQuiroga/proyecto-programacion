import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GraduationCap, BookOpen, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/select-role")({
  head: () => ({ meta: [{ title: "AulaHub — Seleccionar rol" }] }),
  component: SelectRolePage,
});

const roles = [
  {
    key: "alumno",
    name: "Alumno",
    icon: GraduationCap,
    desc: "Consultá tu horario, avisos y mapa de aulas.",
    features: ["Mi horario", "Avisos de cátedra", "Mapa interactivo"],
    last: true,
  },
  {
    key: "profesor",
    name: "Profesor",
    icon: BookOpen,
    desc: "Gestioná clases, solicitudes y avisos a tus alumnos.",
    features: ["Solicitudes", "Inventario", "Avisos masivos"],
    last: false,
  },
  {
    key: "admin",
    name: "Administrador",
    icon: Shield,
    desc: "Controlá aulas, personas y solicitudes globales.",
    features: ["Personas y roles", "Aulas y mapa", "Calendario"],
    last: false,
  },
];

function SelectRolePage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen w-full bg-background bg-radial-hero flex flex-col items-center justify-center px-4 py-12">
      <div className="flex items-center gap-2 mb-8">
        <div className="h-10 w-10 rounded-xl bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center">
          <GraduationCap className="h-5 w-5 text-accent-cyan" />
        </div>
        <span className="text-xl font-bold">AulaHub</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">Seleccioná tu rol</h1>
      <p className="text-text-secondary mt-2 mb-10 text-center max-w-md">
        La plataforma adaptará el entorno según tu tipo de acceso.
      </p>

      <div className="flex gap-5 justify-center flex-wrap max-w-4xl">
        {roles.map((r) => (
          <button
            key={r.key}
            onClick={() => navigate({ to: `/${r.key}` as any })}
            className="relative w-[240px] text-left bg-card border border-border rounded-2xl p-6 cursor-pointer hover:border-accent-cyan/50 hover:shadow-glow-soft transition-all duration-200 group"
          >
            {r.last && (
              <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                Último acceso
              </span>
            )}
            <div className="h-12 w-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-4 group-hover:shadow-glow-soft transition-all">
              <r.icon className="h-6 w-6 text-accent-cyan" />
            </div>
            <h2 className="text-lg font-semibold mb-1">{r.name}</h2>
            <p className="text-sm text-text-secondary mb-4">{r.desc}</p>
            <ul className="space-y-1.5">
              {r.features.map((f) => (
                <li key={f} className="text-xs text-text-muted flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent-cyan" />
                  {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <Button
        variant="ghost"
        onClick={() => navigate({ to: "/" })}
        className="mt-10 text-text-secondary hover:text-foreground hover:bg-white/5"
      >
        <LogOut className="h-4 w-4" />
        Cerrar sesión
      </Button>
    </main>
  );
}
