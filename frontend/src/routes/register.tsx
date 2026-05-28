import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { UserPlus, GraduationCap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "AulaHub — Crear cuenta" },
      { name: "description", content: "Solicitá acceso a la plataforma AulaHub." },
    ],
  }),
  component: RegisterPage,
});

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs uppercase tracking-wider text-text-muted">{label}</Label>
      {children}
    </div>
  );
}

const inputCls = "h-11 bg-input-bg border-border focus-visible:border-accent-cyan focus-visible:ring-accent-cyan/30";

function RegisterPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen w-full bg-background bg-radial-hero flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[520px]">
        <div className="glass border border-border rounded-2xl p-8 shadow-card">
          {sent ? (
            <div className="flex flex-col items-center text-center py-6">
              <div className="h-16 w-16 rounded-full bg-state-success/15 border border-state-success/30 flex items-center justify-center mb-5">
                <CheckCircle className="h-8 w-8 text-state-success" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Solicitud enviada</h1>
              <p className="text-text-secondary mb-6">
                Recibirás un email cuando tu cuenta sea activada por el administrador.
              </p>
              <Link to="/" className="text-accent-cyan hover:brightness-110 text-sm">Volver al inicio</Link>
            </div>
          ) : (
            <>
              <header className="flex flex-col items-center text-center mb-7">
                <div className="h-14 w-14 rounded-2xl bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center mb-4">
                  <GraduationCap className="h-7 w-7 text-accent-cyan" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Crear Cuenta</h1>
                <p className="text-sm text-text-secondary mt-1">
                  Completá tus datos. Un administrador revisará y activará tu cuenta.
                </p>
              </header>

              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <Field label="Nombre"><Input className={inputCls} required /></Field>
                <Field label="Apellido"><Input className={inputCls} required /></Field>
                <Field label="DNI"><Input inputMode="numeric" maxLength={8} className={inputCls} required /></Field>
                <Field label="Email"><Input type="email" className={inputCls} required /></Field>
                <Field label="Contraseña"><Input type="password" className={inputCls} required /></Field>
                <Field label="Confirmar contraseña"><Input type="password" className={inputCls} required /></Field>
                <div className="sm:col-span-2">
                  <Field label="Motivo o rol solicitado (opcional)">
                    <Textarea
                      placeholder="Ej: Soy docente del Dpto. de Matemáticas"
                      className="bg-input-bg border-border focus-visible:border-accent-cyan focus-visible:ring-accent-cyan/30"
                    />
                  </Field>
                </div>

                <label className="sm:col-span-2 flex items-start gap-2 text-sm text-text-secondary">
                  <Checkbox required className="mt-0.5 border-border data-[state=checked]:bg-accent-cyan data-[state=checked]:text-background" />
                  <span>
                    Acepto los{" "}
                    <a href="#" className="text-accent-cyan">Términos de Servicio</a> y la{" "}
                    <a href="#" className="text-accent-cyan">Política de Privacidad</a>.
                  </span>
                </label>

                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    className="w-full h-11 bg-accent-cyan text-background font-semibold hover:brightness-110 shadow-glow"
                  >
                    <UserPlus className="h-4 w-4" />
                    Completar Registro
                  </Button>
                </div>

                <p className="sm:col-span-2 text-center text-sm text-text-secondary">
                  ¿Ya tenés cuenta?{" "}
                  <Link to="/" className="text-accent-cyan hover:brightness-110">Iniciar sesión</Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
