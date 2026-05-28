import { Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const notifications = [
  { id: 1, title: "Cambio de aula aprobado", desc: "Análisis Matemático II — Aula 304", time: "Hace 5 min", unread: true },
  { id: 2, title: "Aviso del profesor", desc: "Prof. García: Sin clase el martes", time: "Hace 2 h", unread: true },
  { id: 3, title: "Recordatorio", desc: "Examen parcial el viernes 14:00", time: "Ayer", unread: false },
];

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const unread = notifications.filter((n) => n.unread).length;
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Sheet>
            <SheetTrigger className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-white/5">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-sidebar-bg border-border p-0">
              <div className="p-6 text-sm text-text-secondary">Menú móvil — usá el sidebar lateral en escritorio.</div>
            </SheetContent>
          </Sheet>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold truncate">{title}</h1>
            {subtitle && <p className="text-xs text-text-secondary truncate">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
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
