import { Bell, Menu, GraduationCap, LayoutDashboard, Map, Calendar, Settings, FileText, Bell as BellIcon, Package, Shield, BookOpen, Users, DoorOpen, LogOut, ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";

const notifications = [
  { id: 1, title: "Cambio de aula aprobado", desc: "Análisis Matemático II — Aula 304", time: "Hace 5 min", unread: true },
  { id: 2, title: "Aviso del profesor", desc: "Prof. García: Sin clase el martes", time: "Hace 2 h", unread: true },
  { id: 3, title: "Recordatorio", desc: "Examen parcial el viernes 14:00", time: "Ayer", unread: false },
];

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
    { to: "/profesor/avisos", label: "Avisos", icon: BellIcon },
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

export function AppHeader({ title, subtitle, role }: { title: string; subtitle?: string; role?: Role }) {
  const unread = notifications.filter((n) => n.unread).length;
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = role ? NAV[role] : [];
  const meta = role ? ROLE_META[role] : null;

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">

          {/* Menú mobile */}
          <Sheet>
            <SheetTrigger className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-white/5">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-sidebar-bg border-border p-0 w-[260px]">
              {/* Header del sidebar mobile */}
              <div className="px-5 py-5 flex items-center gap-3 border-b border-border">
                <div className="h-9 w-9 rounded-xl bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-accent-cyan" />
                </div>
                <div>
                  <div className="font-bold text-sm leading-tight">AulaHub</div>
                  <div className="text-[11px] text-text-muted">Gestión Académica</div>
                </div>
              </div>

              {/* Links de navegación */}
              <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
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

              {/* Footer con rol y logout */}
              {meta && (
                <div className="p-3 border-t border-border mt-auto">
                  <button
                    onClick={() => navigate({ to: "/" })}
                    className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-state-error hover:bg-state-error/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </SheetContent>
          </Sheet>

          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold truncate">{title}</h1>
            {subtitle && <p className="text-xs text-text-secondary truncate">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notificaciones */}
          <Sheet>
            <SheetTrigger className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
              <Bell className="h-5 w-5 text-text-secondary" />
              {unread > 0 && (
                <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-state-error text-[10px] font-bold text-white flex items-center justify-center">
                  {unread}
                </span>
              )}
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-border w-full sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  Notificaciones
                  <button className="text-xs text-accent-cyan font-normal hover:brightness-110">
                    Marcar todas como leídas
                  </button>
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="mt-4 h-[calc(100vh-100px)]">
                <ul className="space-y-2 pr-2">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className={[
                        "p-3 rounded-xl border border-border flex items-start gap-3 transition-colors",
                        n.unread ? "bg-white/[0.03]" : "bg-transparent",
                      ].join(" ")}
                    >
                      <div className="h-8 w-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                        <Bell className="h-4 w-4 text-accent-cyan" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={["text-sm", n.unread ? "font-semibold" : "text-text-secondary"].join(" ")}>
                          {n.title}
                        </p>
                        <p className="text-xs text-text-muted mt-0.5">{n.desc}</p>
                        <p className="text-[11px] text-text-muted mt-1">{n.time}</p>
                      </div>
                      {n.unread && <span className="h-2 w-2 rounded-full bg-accent-cyan shrink-0 mt-1.5" />}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Avatar className="h-9 w-9 border border-border">
            <AvatarFallback className="bg-accent-cyan/15 text-accent-cyan text-sm font-semibold">MR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
