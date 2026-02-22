
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LogIn, Building2, Phone, Mail, MapPin, TestTube, Microscope,
  FlaskConical, Heart, Activity, Clock, Users, Award, ChevronRight,
  CalendarCheck, FileText, Beaker, Dna, Bug, ShieldCheck
} from "lucide-react";

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

const serviceAreas = [
  { name: "Química Clínica", icon: FlaskConical, desc: "Análisis bioquímicos para diagnóstico integral" },
  { name: "Hematología", icon: Activity, desc: "Estudio completo de sangre y componentes" },
  { name: "Microbiología", icon: Bug, desc: "Cultivos e identificación de microorganismos" },
  { name: "Inmunología", icon: ShieldCheck, desc: "Pruebas inmunológicas y serológicas" },
  { name: "Hormonas", icon: Beaker, desc: "Perfiles hormonales y tiroideos" },
  { name: "Diagnóstico Molecular", icon: Dna, desc: "PCR y pruebas de biología molecular" },
];

const stats = [
  { label: "Años de trayectoria", value: "10+", icon: Award },
  { label: "Exámenes realizados", value: "50,000+", icon: TestTube },
  { label: "Pacientes atendidos", value: "25,000+", icon: Users },
  { label: "Sedes disponibles", value: "3", icon: Building2 },
];

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
  const labPhone = config?.lab?.phone || "+57 300 000 0000";
  const labEmail = config?.lab?.email || "contacto@laboratorio.com";
  const labAddress = config?.lab?.address || "Dirección del laboratorio";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ===== TOP BAR ===== */}
      <div className="bg-primary text-primary-foreground text-xs md:text-sm py-2 px-4 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {labPhone}</span>
          <span className="hidden md:flex items-center gap-1"><Mail className="h-3 w-3" /> {labEmail}</span>
        </div>
        <Button
          onClick={() => navigate("/login")}
          variant="secondary"
          size="sm"
          className="gap-1.5 rounded-full text-xs h-7"
        >
          <LogIn className="h-3 w-3" />
          Ingresar
        </Button>
      </div>

      {/* ===== HEADER / NAV ===== */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border px-4 md:px-10 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {config?.lab?.logo ? (
            <img src={config.lab.logo} alt="Logo" className="h-12 w-12 rounded-full object-cover border-2 border-primary/20" />
          ) : (
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Microscope className="h-6 w-6 text-primary" />
            </div>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-primary leading-tight">{labName}</h1>
            <p className="text-xs text-muted-foreground hidden md:block">Laboratorio Clínico</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#inicio" className="hover:text-primary transition-colors">Inicio</a>
          <a href="#servicios" className="hover:text-primary transition-colors">Servicios</a>
          <a href="#preparacion" className="hover:text-primary transition-colors">Preparación</a>
          <a href="#citas" className="hover:text-primary transition-colors">Citas</a>
          <a href="#contacto" className="hover:text-primary transition-colors">Contáctenos</a>
        </nav>
      </header>

      {/* ===== HERO ===== */}
      <section id="inicio" className="relative bg-gradient-to-br from-primary/5 via-accent/10 to-primary/10 py-16 md:py-24 px-4 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <p className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">Conozca aquí sus</p>
            <h2 className="text-4xl md:text-6xl font-black text-primary leading-tight">RESULTADOS</h2>
            <p className="text-muted-foreground max-w-md">
              Acceda a los resultados de sus exámenes de laboratorio de forma rápida, segura y confidencial.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="gap-2 rounded-full shadow-lg">
                <FileText className="h-5 w-5" />
                Laboratorio Clínico
              </Button>
              <Button size="lg" variant="outline" className="gap-2 rounded-full">
                <Heart className="h-5 w-5" />
                Medicina Laboral
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary/10 flex items-center justify-center">
                <Microscope className="h-32 w-32 md:h-40 md:w-40 text-primary/30" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-background border border-border rounded-2xl p-4 shadow-lg">
                <p className="text-xs text-muted-foreground">Resultados en</p>
                <p className="text-2xl font-bold text-primary">24h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEDES ===== */}
      <section className="py-10 px-4 md:px-10 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Sede Principal", address: labAddress, icon: Building2 },
            { title: "Toma de Muestras", address: "Consulte disponibilidad", icon: TestTube },
            { title: "Sede Administrativa", address: "Horario: Lun-Vie 8am-5pm", icon: Clock },
          ].map((sede) => (
            <Card key={sede.title} className="hover:shadow-lg transition-shadow border-primary/10">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="bg-primary/10 rounded-xl p-3 shrink-0">
                  <sede.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{sede.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{sede.address}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== SERVICIOS ===== */}
      <section id="servicios" className="py-16 px-4 md:px-10 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-primary">LABORATORIO DE VIDA</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Contamos con un portafolio completo de servicios para el cuidado de su salud.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceAreas.map((svc) => (
            <Card key={svc.name} className="group hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="bg-primary/10 rounded-full p-4 group-hover:bg-primary/20 transition-colors">
                  <svc.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg">{svc.name}</h3>
                <p className="text-sm text-muted-foreground">{svc.desc}</p>
                <span className="text-primary text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Conocer más <ChevronRight className="h-4 w-4" />
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== PREPARACIÓN DE EXÁMENES ===== */}
      <section id="preparacion" className="py-16 px-4 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="w-full max-w-sm mx-auto bg-primary/5 rounded-3xl p-8 flex items-center justify-center">
              <FileText className="h-32 w-32 text-primary/20" />
            </div>
          </div>
          <div className="flex-1 space-y-5">
            <p className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">¿Qué hacer para preparar sus</p>
            <h2 className="text-3xl md:text-4xl font-black text-primary">Exámenes?</h2>
            <p className="text-muted-foreground">
              Le explicamos todos los detalles y la preparación que debe tener para la realización de cualquiera de nuestros exámenes.
            </p>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-primary" /> Ayuno de 8-12 horas para exámenes de sangre</li>
              <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-primary" /> Traer orden médica y documento de identidad</li>
              <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-primary" /> Informar sobre medicamentos actuales</li>
              <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-primary" /> Hidratarse adecuadamente el día anterior</li>
            </ul>
            <Button className="gap-2 rounded-full">
              Conozca nuestro portafolio de pruebas
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===== CITAS ONLINE ===== */}
      <section id="citas" className="py-16 px-4 md:px-10 bg-primary/5">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-primary">Agende su Cita en Línea</h2>
          <p className="text-muted-foreground mt-2">
            Programe su cita de forma rápida y sencilla desde la comodidad de su hogar.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-primary/20">
            <CardContent className="p-8 text-center space-y-5">
              <div className="bg-primary/10 rounded-full p-5 w-fit mx-auto">
                <CalendarCheck className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Portal de Citas para Pacientes</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Reserve su turno, seleccione sus exámenes y reciba confirmación inmediata. Sin filas, sin esperas.
              </p>
              <Button size="lg" className="gap-2 rounded-full shadow-lg"
                onClick={() => navigate("/laboratorio/citas")}
              >
                <CalendarCheck className="h-5 w-5" />
                Agendar Cita Ahora
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===== ESTADÍSTICAS ===== */}
      <section className="py-16 px-4 md:px-10 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center space-y-2">
              <s.icon className="h-8 w-8 mx-auto opacity-80" />
              <p className="text-3xl md:text-4xl font-black">{s.value}</p>
              <p className="text-sm opacity-80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACTO ===== */}
      <section id="contacto" className="py-16 px-4 md:px-10">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-primary">Contáctenos</h2>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Phone, label: "Teléfono", value: labPhone },
            { icon: Mail, label: "Email", value: labEmail },
            { icon: MapPin, label: "Dirección", value: labAddress },
          ].map((c) => (
            <Card key={c.label} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto">
                  <c.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">{c.label}</h3>
                <p className="text-sm text-muted-foreground">{c.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-primary text-primary-foreground py-8 px-4 md:px-10 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {config?.lab?.logo ? (
              <img src={config.lab.logo} alt="Logo" className="h-8 w-8 rounded-full object-cover border border-primary-foreground/30" />
            ) : (
              <Microscope className="h-6 w-6" />
            )}
            <span className="font-bold text-lg">{labName}</span>
          </div>
          <p className="text-sm opacity-70">
            © {new Date().getFullYear()} {labName} — Powered by G-mint Lab
          </p>
        </div>
      </footer>
    </div>
  );
}
