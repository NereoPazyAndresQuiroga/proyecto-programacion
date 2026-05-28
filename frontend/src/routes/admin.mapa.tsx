import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { RoomMap } from "@/components/room-map";

export const Route = createFileRoute("/admin/mapa")({
  head: () => ({ meta: [{ title: "AulaHub — Mapa (Admin)" }] }),
  component: () => (
    <>
      <AppHeader title="Mapa de Aulas" subtitle="Clausurá, editá y revisá disponibilidad." />
      <main className="p-4 sm:p-6"><RoomMap adminActions /></main>
    </>
  ),
});
