import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { RoomMap } from "@/components/room-map";

export const Route = createFileRoute("/profesor/mapa")({
  head: () => ({ meta: [{ title: "AulaHub — Mapa de Aulas" }] }),
  component: () => (
    <>
      <AppHeader title="Mapa de Aulas" subtitle="Explorá los edificios y solicitá una reserva." />
      <main className="p-4 sm:p-6"><RoomMap /></main>
    </>
  ),
});
