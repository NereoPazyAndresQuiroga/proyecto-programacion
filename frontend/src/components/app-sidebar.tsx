import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  GraduationCap, LayoutDashboard, Map, Calendar, Settings,
  ChevronsUpDown, LogOut, FileText, Bell, Package, Shield, BookOpen, Users, DoorOpen,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Role = "alumno" | "profesor" | "admin";

const NAV: Record<Role, { to: string; label: string; icon: any }[]> = {
  alumno: [
    { to: "/alumno", label: "Dashboard", icon: LayoutDashboard },
    { to: "/alumno/mapa", label: "Mapa de Aulas", icon: Map },
    { to: "/alumno/calendario", label: "Calendario", icon: Calendar },
    { to: "/alumno/ajustes", label: "Ajustes", icon: Settings },
  ],
  profesor: [
    { to: "/profesor", label: "Dashboard", icon: LayoutDashboard },
    { to: "/profesor/mapa", label: "Mapa de Aulas", icon: Map },
    { to: "/profesor/solicitudes", label: "Solicitudes", icon: FileText },
    { to: "/profesor/avisos", label: "Avisos", icon: Bell },
    { to: "/profesor/inventario", label: "Inventario", icon: Package },
    { to: "/profesor/calendario", label: "Calendario", icon: Calendar },
    { to: "/profesor/ajustes", label: "Ajustes", icon: Settings },
  ],
  admin: [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/solicitudes", label: "Solicitudes", icon: FileText },
    { to: "/admin/mapa", label: "Mapa de Aulas", icon: Map },
    { to: "/admin/personas", label: "Personas y Roles", icon: Users },
    { to: "/admin/aulas", label: "Gestión de Aulas", icon: DoorOpen },
    { to: "/admin/inventario", label: "Inventario", icon: Package },
    { to: "/admin/calendario", label: "Calendario", icon: Calendar },
    { to: "/admin/ajustes", label: "Ajustes", icon: Settings },
  ],
};

const ROLE_META: Record<Role, { label: string; icon: any }> = {
  alumno: { label: "Alumno", icon: GraduationCap },
  profesor: { label: "Profesor", icon: BookOpen },
  admin: { label: "Administrador", icon: Shield },
};

export function AppSidebar({ role }: { role: Role }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = NAV[role];
  const meta = ROLE_META[role];

  return (
    <aside className="hidden lg:flex flex-col w-[250px] shrink-0 h-screen sticky top-0 bg-sidebar-bg border-r border-border">
      <div className="px-5 py-6 flex items-center gap-3 border-b border-border">
        <div className="h-10 w-10 rounded-xl bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center shadow-glow-soft">
          <GraduationCap className="h-5 w-5 text-accent-cyan" />
        </div>
        <div>
          <div className="font-bold leading-tight">AulaHub</div>
          <div className="text-[11px] text-text-muted">Gestión Académica</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-5 flex flex-col gap-1 overflow-y-auto">
        {items.map((it) => {
          const active = pathname === it.to || (it.to !== `/${role}` && pathname.startsWith(it.to));
          return (
            <Link
              key={it.to}
              to={it.to}
              className={[
                "rounded-xl px-3 py-2.5 flex items-center gap-3 text-sm transition-all duration-200",
                active
                  ? "bg-accent-cyan text-background font-semibold shadow-glow"
                  : "text-text-secondary hover:bg-white/5 hover:text-foreground",
              ].join(" ")}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 bg-card border border-border hover:border-accent-cyan/30 transition-colors">
            <div className="flex items-center gap-2">
              <meta.icon className="h-4 w-4 text-accent-cyan" />
              <span className="text-sm font-medium">{meta.label}</span>
            </div>
            <ChevronsUpDown className="h-4 w-4 text-text-muted" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[220px] bg-card border-border">
            <DropdownMenuItem onClick={() => navigate({ to: "/select-role" })}>
              Cambiar de rol
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate({ to: "/" })} className="text-state-error focus:text-state-error">
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
