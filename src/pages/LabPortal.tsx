import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogIn, Building2 } from "lucide-react";
import PatientAppointmentModule from "@/components/landing/PatientAppointmentModule";

interface LabConfig {
  lab: {
    name: string;
    logo: string | null;
    description: string;
    phone: string;
    email: string;
    address: string;
  };
  exams: string[];
  plan: { planId: string; users: number; lease: string };
}

export default function LabPortal() {
  const navigate = useNavigate();
  const [config, setConfig] = useState<LabConfig | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("lab-registration");
    if (raw) {
      try { setConfig(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const labName = config?.lab?.name || "Laboratorio";

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/40 via-background to-muted/30 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border px-4 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {config?.lab?.logo ? (
            <img src={config.lab.logo} alt="Logo" className="h-10 w-10 rounded-full object-cover border" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
          )}
          <span className="text-2xl md:text-3xl font-extrabold text-primary">{labName}</span>
          <Badge variant="outline" className="hidden md:inline-flex">Portal del Paciente</Badge>
        </div>
        <Button
          onClick={() => navigate("/login")}
          className="gap-2 rounded-full"
          size="sm"
        >
          <LogIn className="h-4 w-4" />
          Ingresar
        </Button>
      </header>

      {/* Patient Appointment Module */}
      <PatientAppointmentModule />

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border mt-auto">
        © {new Date().getFullYear()} {labName} — Powered by G-mint Lab
      </footer>
    </div>
  );
}
