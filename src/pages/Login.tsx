
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, LogIn, ShieldCheck } from "lucide-react";
import { useLabAuth } from "@/hooks/use-lab-auth";

export default function Login() {
  const navigate = useNavigate();
  const { login, isRegistered, isPaid, registration } = useLabAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isRegistered || !isPaid) {
      setError("No hay un laboratorio registrado. Debe completar el registro y el pago primero.");
      return;
    }
    const success = login(email, password);
    if (success) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="bg-background border border-border rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">
            {registration?.lab?.name || "G-Mint Lab"}
          </h1>
        </div>
        <p className="text-center text-sm text-muted-foreground mb-6">
          Ingrese sus credenciales de administrador para acceder al panel de gestión.
        </p>

        {!isRegistered || !isPaid ? (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center space-y-3">
            <p className="text-sm text-destructive font-medium">
              No hay un laboratorio registrado con pago activo.
            </p>
            <Button variant="outline" onClick={() => navigate("/registro-laboratorio")} className="gap-2">
              Registrar Laboratorio
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-sm text-foreground block mb-1">Email</label>
              <Input
                type="email"
                required
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@laboratorio.com"
              />
            </div>
            <div>
              <label className="text-sm text-foreground block mb-1">Contraseña</label>
              <Input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            {error && (
              <div className="bg-destructive/10 text-destructive p-2 rounded text-center text-sm">
                {error}
              </div>
            )}
            <Button type="submit" className="gap-2">
              <LogIn className="h-4 w-4" /> Ingresar
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link to="/laboratorio" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver al portal del laboratorio
          </Link>
        </div>
      </div>
    </div>
  );
}
