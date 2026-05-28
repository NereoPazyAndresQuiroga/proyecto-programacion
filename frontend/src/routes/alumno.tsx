import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";

export const Route = createFileRoute("/alumno")({
  component: AlumnoLayout,
});

function AlumnoLayout() {
  return (
    <div className="min-h-screen w-full flex bg-background">
      <AppSidebar role="alumno" />
      <div className="flex-1 min-w-0 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
