import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Pencil, Power, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/personas")({
  head: () => ({ meta: [{ title: "AulaHub — Personas y Roles" }] }),
  component: PersonasAdmin,
});

const requests = [
  { name: "Lucía Pereyra", dni: "32145678", email: "lucia@uni.edu", date: "Hoy 09:23", motive: "Soy docente del Dpto. de Ingeniería." },
  { name: "Mateo Ríos", dni: "39876543", email: "mateo@uni.edu", date: "Ayer 14:50", motive: "Alumno reincorporación 2026." },
];

const persons = [
  { name: "Sofía García", dni: "30111222", email: "sgarcia@uni.edu", roles: ["Profesor"], active: true },
  { name: "Diego Méndez", dni: "27333444", email: "dmendez@uni.edu", roles: ["Profesor", "Admin"], active: true },
  { name: "Martina Romero", dni: "44555666", email: "mromero@uni.edu", roles: ["Alumno"], active: true },
  { name: "Ariel Suárez", dni: "29888777", email: "asuarez@uni.edu", roles: ["Alumno"], active: false },
];

function PersonasAdmin() {
  return (
    <>
      <AppHeader title="Personas y Roles" subtitle="Activá cuentas y gestioná permisos." />
      <main className="p-4 sm:p-6">
        <Tabs defaultValue="reqs">
          <TabsList className="bg-input-bg border border-border">
            <TabsTrigger value="reqs" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background gap-2">
              Solicitudes
              <span className="h-5 min-w-5 px-1.5 rounded-full bg-state-error text-white text-[10px] font-bold flex items-center justify-center">{requests.length}</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-accent-cyan data-[state=active]:text-background">Personas activas</TabsTrigger>
          </TabsList>

          <TabsContent value="reqs" className="mt-5 space-y-3">
            {requests.map((r) => (
              <article key={r.dni} className="bg-card border border-border rounded-2xl p-5 shadow-card">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{r.name}</h3>
                    <p className="text-xs text-text-muted mt-1">DNI {r.dni} · {r.email}</p>
                    <p className="text-xs text-text-muted">Solicitado: {r.date}</p>
                    <p className="text-sm text-text-secondary mt-2 max-w-prose">{r.motive}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <Button variant="outline" className="border-state-error/50 text-state-error hover:bg-state-error/10 hover:text-state-error">Rechazar</Button>
                    <ApproveDialog />
                  </div>
                </div>
              </article>
            ))}
          </TabsContent>

          <TabsContent value="active" className="mt-5 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-4 shadow-card flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <Input placeholder="Buscar por nombre, DNI o email..." className="pl-9 bg-input-bg border-border" />
              </div>
              <Button className="bg-accent-cyan text-background font-semibold hover:brightness-110 shadow-glow">
                <UserPlus className="h-4 w-4" /> Crear persona
              </Button>
            </div>

            <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-text-muted border-b border-border">
                      <th className="text-left py-3 px-4">Nombre</th>
                      <th className="text-left py-3 px-4">DNI</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Roles</th>
                      <th className="text-left py-3 px-4">Estado</th>
                      <th className="text-right py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {persons.map((p) => (
                      <tr key={p.dni} className="border-b border-border/40 hover:bg-white/[0.02]">
                        <td className="py-3 px-4 font-semibold">{p.name}</td>
                        <td className="py-3 px-4 text-text-secondary">{p.dni}</td>
                        <td className="py-3 px-4 text-text-secondary">{p.email}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {p.roles.map((r) => <StatusBadge key={r} variant="cyan">{r}</StatusBadge>)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge variant={p.active ? "success" : "muted"}>{p.active ? "Activo" : "Inactivo"}</StatusBadge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button size="icon" variant="ghost" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-state-error hover:text-state-error"><Power className="h-4 w-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}

function ApproveDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent-cyan text-background font-semibold hover:brightness-110 shadow-glow">Aprobar y asignar roles</Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader><DialogTitle>Asignar roles</DialogTitle></DialogHeader>
        <div className="space-y-3">
          {["Alumno", "Profesor", "Administrador"].map((r) => (
            <label key={r} className="flex items-center gap-3 p-3 rounded-lg bg-input-bg border border-border cursor-pointer hover:border-accent-cyan/30">
              <Checkbox className="border-border data-[state=checked]:bg-accent-cyan data-[state=checked]:text-background" />
              <span className="text-sm font-medium">{r}</span>
            </label>
          ))}
          <div>
            <Label className="text-[11px] uppercase tracking-wider text-text-muted">Nota interna (opcional)</Label>
            <Textarea className="bg-input-bg border-border mt-1.5" rows={2} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => setOpen(false)} className="bg-accent-cyan text-background font-semibold hover:brightness-110 shadow-glow">Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
