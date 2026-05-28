import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/alumno/calendario")({
  component: () => (
    <>
      <AppHeader title="Calendario" subtitle="Próximamente" />
      <div className="p-10 flex flex-col items-center justify-center text-center text-text-secondary gap-3">
        <div className="h-16 w-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
          <Calendar className="h-7 w-7 text-accent-cyan" />
        </div>
        <p>El calendario institucional con feriados aparecerá acá.</p>
      </div>
    </>
  ),
});
