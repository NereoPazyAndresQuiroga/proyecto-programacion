import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { Map } from "lucide-react";

export const Route = createFileRoute("/alumno/mapa")({
  component: () => (
    <>
      <AppHeader title="Mapa de Aulas" subtitle="Próximamente" />
      <div className="p-10 flex flex-col items-center justify-center text-center text-text-secondary gap-3">
        <div className="h-16 w-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
          <Map className="h-7 w-7 text-accent-cyan" />
        </div>
        <p>El mapa interactivo de aulas aparecerá acá.</p>
      </div>
    </>
  ),
});
