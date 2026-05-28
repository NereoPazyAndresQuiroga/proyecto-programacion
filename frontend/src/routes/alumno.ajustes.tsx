import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { Settings } from "lucide-react";

export const Route = createFileRoute("/alumno/ajustes")({
  component: () => (
    <>
      <AppHeader title="Ajustes" subtitle="Próximamente" />
      <div className="p-10 flex flex-col items-center justify-center text-center text-text-secondary gap-3">
        <div className="h-16 w-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
          <Settings className="h-7 w-7 text-accent-cyan" />
        </div>
        <p>Tus ajustes de cuenta aparecerán acá.</p>
      </div>
    </>
  ),
});
