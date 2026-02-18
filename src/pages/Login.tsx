
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

const mockUser = {
  email: "demo@gmintlab.com",
  password: "123456",
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock login: si email/contraseña coinciden, éxito, si no error.
    if (email === mockUser.email && password === mockUser.password) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  }

  return (
    <div className="min-h-screen bg-green-50 dark:bg-background flex items-center justify-center px-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-6 text-center">
          Ingreso a G-Mint Lab
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-sm text-slate-700 dark:text-slate-100 block mb-1">
              Email
            </label>
            <Input
              type="email"
              required
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="demo@gmintlab.com"
            />
          </div>
          <div>
            <label className="text-sm text-slate-700 dark:text-slate-100 block mb-1">
              Contraseña
            </label>
            <Input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="123456"
            />
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded text-center text-sm">
              {error}
            </div>
          )}
          <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full" type="submit">
            Ingresar
          </Button>
        </form>
        <div className="text-xs text-gray-500 mt-5 text-center">
          Usuario de prueba: <b>demo@gmintlab.com</b><br />Contraseña: <b>123456</b>
        </div>
        <div className="mt-4 text-center">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
