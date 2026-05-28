import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Lock, Eye, EyeOff, LogIn, GraduationCap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AulaHub — Iniciar sesión" },
      { name: "description", content: "Plataforma de gestión académica institucional. Ingresá con tu DNI." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dni.length < 7 || !password) {
      setError(true);
      return;
    }
    // Mock: si DNI termina en 1 → multi-rol, si no → directo a alumno
    if (dni.endsWith("1")) navigate({ to: "/select-role" });
    else if (dni.endsWith("2")) navigate({ to: "/profesor" });
    else if (dni.endsWith("3")) navigate({ to: "/admin" });
    else navigate({ to: "/alumno" });
  };

  return (
    <main className="min-h-screen w-full bg-background bg-radial-hero flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px]">
        <div className="glass border border-border rounded-2xl p-8 shadow-card">
          <header className="flex flex-col items-center text-center mb-8">
            <div className="h-14 w-14 rounded-2xl bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center mb-4 shadow-glow-soft">
              <GraduationCap className="h-7 w-7 text-accent-cyan" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">AulaHub</h1>
            <p className="text-sm text-text-secondary mt-1">Gestión Académica Institucional</p>
          </header>

          {error && (
            <Alert className="mb-5 bg-state-error/10 border-state-error/30 text-state-error">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-state-error">
                Credenciales incorrectas. Verificá tu DNI y contraseña.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="dni" className="text-xs uppercase tracking-wider text-text-muted">DNI</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <Input
                  id="dni"
                  inputMode="numeric"
                  maxLength={8}
                  value={dni}
                  onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))}
                  placeholder="12345678"
                  className="pl-10 h-11 bg-input-bg border-border focus-visible:border-accent-cyan focus-visible:ring-accent-cyan/30"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-xs uppercase tracking-wider text-text-muted">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-11 bg-input-bg border-border focus-visible:border-accent-cyan focus-visible:ring-accent-cyan/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
                <Checkbox className="border-border data-[state=checked]:bg-accent-cyan data-[state=checked]:text-background" />
                Recordar mis datos
              </label>
              <a href="#" className="text-accent-cyan hover:brightness-110">¿Olvidaste tu contraseña?</a>
            </div>

            <Button
              type="submit"
              className="h-11 mt-2 bg-accent-cyan text-background font-semibold hover:brightness-110 shadow-glow"
            >
              <LogIn className="h-4 w-4" />
              Ingresar
            </Button>

            <p className="text-center text-sm text-text-secondary mt-2">
              ¿No tenés cuenta?{" "}
              <Link to="/register" className="text-accent-cyan hover:brightness-110">Registrate</Link>
            </p>
          </form>
        </div>

        <footer className="mt-6 text-center text-xs text-text-muted">
          Términos de Uso · Política de Privacidad · Soporte Técnico
        </footer>
      </div>
    </main>
  );
}
