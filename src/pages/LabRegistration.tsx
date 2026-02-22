import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Building2, Image as ImageIcon, Camera, Trash2, Users, FlaskConical,
  CreditCard, ChevronRight, ChevronLeft, CheckCircle2, ArrowLeft, TestTube,
  FileText, ShieldCheck, Clock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Datos del Laboratorio", icon: Building2 },
  { label: "Servicios y Exámenes", icon: FlaskConical },
  { label: "Usuarios y Plan", icon: Users },
  { label: "Confirmación", icon: CheckCircle2 },
];

const PLAN_OPTIONS = [
  { id: "basico", name: "Básico", users: 3, price: "$49/mes", features: ["Hasta 3 usuarios", "Gestión de citas", "Resultados básicos", "Soporte por email"] },
  { id: "profesional", name: "Profesional", users: 10, price: "$129/mes", features: ["Hasta 10 usuarios", "Gestión completa", "Reportes avanzados", "Soporte prioritario", "API de integración"] },
  { id: "enterprise", name: "Enterprise", users: 999, price: "Personalizado", features: ["Usuarios ilimitados", "Todas las funciones", "Soporte dedicado 24/7", "Personalización total", "SLA garantizado"] },
];

const LEASE_OPTIONS = [
  { value: "1", label: "1 mes" },
  { value: "3", label: "3 meses (5% dto.)" },
  { value: "6", label: "6 meses (10% dto.)" },
  { value: "12", label: "12 meses (20% dto.)" },
  { value: "24", label: "24 meses (30% dto.)" },
];

const EXAM_CATEGORIES = [
  {
    category: "Hematología",
    exams: ["Hemograma Completo", "Velocidad de Sedimentación", "Recuento de Plaquetas", "Tiempo de Protrombina"],
  },
  {
    category: "Bioquímica",
    exams: ["Glucosa en Ayunas", "Perfil Lipídico", "Perfil Hepático", "Perfil Renal", "Ácido Úrico"],
  },
  {
    category: "Endocrinología",
    exams: ["TSH", "T3 / T4", "Hemoglobina Glicosilada", "Insulina"],
  },
  {
    category: "Uroanálisis",
    exams: ["Examen General de Orina", "Urocultivo", "Proteinuria"],
  },
  {
    category: "Microbiología",
    exams: ["Cultivo Bacteriano", "Antibiograma", "Coprocultivo"],
  },
];

export default function LabRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  // Step 1 - Lab info
  const [labName, setLabName] = useState("");
  const [labRuc, setLabRuc] = useState("");
  const [labAddress, setLabAddress] = useState("");
  const [labPhone, setLabPhone] = useState("");
  const [labEmail, setLabEmail] = useState("");
  const [labLogo, setLabLogo] = useState<string | null>(null);
  const [labDescription, setLabDescription] = useState("");

  // Step 2 - Services
  const [selectedExams, setSelectedExams] = useState<string[]>([]);

  // Step 3 - Plan
  const [selectedPlan, setSelectedPlan] = useState("profesional");
  const [numUsers, setNumUsers] = useState("5");
  const [leaseDuration, setLeaseDuration] = useState("12");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "Archivo muy grande", description: "Máximo 2MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setLabLogo(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const toggleExam = (exam: string) =>
    setSelectedExams(prev => prev.includes(exam) ? prev.filter(e => e !== exam) : [...prev, exam]);

  const selectAllCategory = (exams: string[]) => {
    const allSelected = exams.every(e => selectedExams.includes(e));
    if (allSelected) {
      setSelectedExams(prev => prev.filter(e => !exams.includes(e)));
    } else {
      setSelectedExams(prev => [...new Set([...prev, ...exams])]);
    }
  };

  const validateStep = () => {
    if (step === 0) {
      if (!labName || !labEmail || !labPhone) {
        toast({ title: "Campos obligatorios", description: "Complete nombre, email y teléfono del laboratorio.", variant: "destructive" });
        return false;
      }
    }
    if (step === 1) {
      if (selectedExams.length === 0) {
        toast({ title: "Seleccione exámenes", description: "Debe elegir al menos un examen para ofrecer.", variant: "destructive" });
        return false;
      }
    }
    if (step === 2) {
      if (!adminName || !adminEmail) {
        toast({ title: "Datos del administrador", description: "Ingrese nombre y email del usuario administrador.", variant: "destructive" });
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = () => {
    const config = {
      lab: { name: labName, ruc: labRuc, address: labAddress, phone: labPhone, email: labEmail, logo: labLogo, description: labDescription },
      exams: selectedExams,
      plan: { planId: selectedPlan, users: numUsers, lease: leaseDuration, admin: { name: adminName, email: adminEmail } },
    };
    localStorage.setItem("lab-registration", JSON.stringify(config));
    toast({ title: "¡Registro completado!", description: `El laboratorio "${labName}" ha sido registrado exitosamente. Recibirá un correo de activación.` });
    navigate("/login");
  };

  const currentPlan = PLAN_OPTIONS.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/40 via-background to-muted/30">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border px-4 md:px-10 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-3xl font-extrabold text-primary">G-mint Lab</span>
        </button>
        <Badge variant="outline" className="text-sm">Registro de Laboratorio</Badge>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-10">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                    isDone ? "bg-primary border-primary text-primary-foreground" :
                    isActive ? "border-primary text-primary bg-primary/10" :
                    "border-muted-foreground/30 text-muted-foreground"
                  )}>
                    {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className={cn("text-xs text-center hidden md:block", isActive ? "font-semibold text-foreground" : "text-muted-foreground")}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn("flex-1 h-0.5 mx-2", isDone ? "bg-primary" : "bg-muted-foreground/20")} />
                )}
              </div>
            );
          })}
        </div>

        <Card className="shadow-lg border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              {(() => { const Icon = STEPS[step].icon; return <Icon className="h-5 w-5 text-primary" />; })()}
              {STEPS[step].label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* ===== STEP 0: Datos del Laboratorio ===== */}
            {step === 0 && (
              <div className="space-y-5">
                {/* Logo */}
                <div className="flex items-start gap-5">
                  <div
                    className="relative group cursor-pointer w-28 h-28 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden bg-muted/30 hover:border-primary/50 transition-colors shrink-0"
                    onClick={() => fileRef.current?.click()}
                  >
                    {labLogo ? (
                      <>
                        <img src={labLogo} alt="Logo" className="w-full h-full object-contain p-1" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        <ImageIcon className="h-8 w-8" />
                        <span className="text-[10px]">Logo</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">Logo del laboratorio</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG o SVG. Máximo 2MB. Se mostrará en reportes y portal.</p>
                    {labLogo && (
                      <Button variant="ghost" size="sm" onClick={() => setLabLogo(null)}>
                        <Trash2 className="h-3 w-3 mr-1" /> Quitar
                      </Button>
                    )}
                  </div>
                  <Input ref={fileRef} type="file" accept="image/png,image/jpeg,image/svg+xml" className="hidden" onChange={handleLogoChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre del laboratorio *</Label>
                    <Input value={labName} onChange={e => setLabName(e.target.value)} placeholder="Ej: Laboratorio Clínico Central" />
                  </div>
                  <div>
                    <Label>RUC / NIT / Identificación fiscal</Label>
                    <Input value={labRuc} onChange={e => setLabRuc(e.target.value)} placeholder="Ej: 20123456789" />
                  </div>
                </div>
                <div>
                  <Label>Dirección</Label>
                  <Input value={labAddress} onChange={e => setLabAddress(e.target.value)} placeholder="Dirección completa del laboratorio" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Teléfono *</Label>
                    <Input value={labPhone} onChange={e => setLabPhone(e.target.value)} placeholder="+51 999 999 999" />
                  </div>
                  <div>
                    <Label>Email institucional *</Label>
                    <Input value={labEmail} onChange={e => setLabEmail(e.target.value)} placeholder="contacto@laboratorio.com" type="email" />
                  </div>
                </div>
                <div>
                  <Label>Descripción / Especialidades</Label>
                  <Textarea value={labDescription} onChange={e => setLabDescription(e.target.value)} placeholder="Breve descripción de los servicios y especialidades del laboratorio…" rows={3} />
                </div>
              </div>
            )}

            {/* ===== STEP 1: Servicios y Exámenes ===== */}
            {step === 1 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">Seleccione los exámenes que su laboratorio ofrecerá. Podrá modificarlos después.</p>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{selectedExams.length} exámenes seleccionados</Badge>
                  {selectedExams.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => setSelectedExams([])}>Limpiar</Button>
                  )}
                </div>
                <div className="space-y-4">
                  {EXAM_CATEGORIES.map(cat => {
                    const allSelected = cat.exams.every(e => selectedExams.includes(e));
                    return (
                      <Card key={cat.category} className="border-border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <TestTube className="h-4 w-4 text-primary" />
                              <span className="font-semibold text-foreground">{cat.category}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => selectAllCategory(cat.exams)}>
                              {allSelected ? "Deseleccionar todo" : "Seleccionar todo"}
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {cat.exams.map(ex => (
                              <Badge
                                key={ex}
                                variant={selectedExams.includes(ex) ? "default" : "outline"}
                                className="cursor-pointer select-none py-1.5 px-3"
                                onClick={() => toggleExam(ex)}
                              >
                                {ex}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ===== STEP 2: Usuarios y Plan ===== */}
            {step === 2 && (
              <div className="space-y-6">
                {/* Plans */}
                <div>
                  <Label className="text-base font-semibold">Seleccione su plan</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    {PLAN_OPTIONS.map(plan => (
                      <Card
                        key={plan.id}
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md",
                          selectedPlan === plan.id ? "border-primary border-2 shadow-md" : "border-border"
                        )}
                        onClick={() => setSelectedPlan(plan.id)}
                      >
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-foreground">{plan.name}</span>
                            {selectedPlan === plan.id && <CheckCircle2 className="h-5 w-5 text-primary" />}
                          </div>
                          <p className="text-2xl font-bold text-primary">{plan.price}</p>
                          <ul className="space-y-1">
                            {plan.features.map(f => (
                              <li key={f} className="text-xs text-muted-foreground flex items-start gap-1">
                                <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 shrink-0" /> {f}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-1"><Users className="h-4 w-4" /> Número de usuarios</Label>
                    <Input type="number" min="1" max={currentPlan?.users} value={numUsers} onChange={e => setNumUsers(e.target.value)} />
                    <p className="text-xs text-muted-foreground mt-1">Máximo {currentPlan?.users === 999 ? "ilimitado" : currentPlan?.users} según su plan.</p>
                  </div>
                  <div>
                    <Label className="flex items-center gap-1"><Clock className="h-4 w-4" /> Duración del contrato</Label>
                    <Select value={leaseDuration} onValueChange={setLeaseDuration}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {LEASE_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <Label className="text-base font-semibold flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Usuario Administrador</Label>
                  <p className="text-xs text-muted-foreground mb-3">Este será el primer usuario con permisos de administración.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nombre completo *</Label>
                      <Input value={adminName} onChange={e => setAdminName(e.target.value)} placeholder="Nombre del administrador" />
                    </div>
                    <div>
                      <Label>Email *</Label>
                      <Input value={adminEmail} onChange={e => setAdminEmail(e.target.value)} placeholder="admin@laboratorio.com" type="email" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== STEP 3: Confirmación ===== */}
            {step === 3 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">Revise la información antes de confirmar el registro.</p>

                {/* Lab summary */}
                <Card className="bg-muted/30 border-dashed">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-3">
                      {labLogo && <img src={labLogo} alt="Logo" className="w-12 h-12 rounded-lg object-contain border border-border p-0.5" />}
                      <div>
                        <p className="font-bold text-foreground text-lg">{labName}</p>
                        <p className="text-sm text-muted-foreground">{labEmail} · {labPhone}</p>
                      </div>
                    </div>
                    {labAddress && <p className="text-sm text-muted-foreground">{labAddress}</p>}
                    {labRuc && <p className="text-sm text-muted-foreground">RUC/NIT: {labRuc}</p>}
                  </CardContent>
                </Card>

                {/* Exams summary */}
                <div>
                  <p className="font-semibold text-foreground flex items-center gap-1 mb-2"><FlaskConical className="h-4 w-4" /> Exámenes ({selectedExams.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedExams.map(ex => <Badge key={ex} variant="outline" className="text-xs">{ex}</Badge>)}
                  </div>
                </div>

                {/* Plan summary */}
                <div>
                  <p className="font-semibold text-foreground flex items-center gap-1 mb-2"><CreditCard className="h-4 w-4" /> Plan y Contrato</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">Plan:</span><span className="font-medium">{currentPlan?.name} — {currentPlan?.price}</span>
                    <span className="text-muted-foreground">Usuarios:</span><span className="font-medium">{numUsers}</span>
                    <span className="text-muted-foreground">Duración:</span><span className="font-medium">{LEASE_OPTIONS.find(o => o.value === leaseDuration)?.label}</span>
                    <span className="text-muted-foreground">Administrador:</span><span className="font-medium">{adminName} ({adminEmail})</span>
                  </div>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Al confirmar el registro:</p>
                      <ul className="text-muted-foreground mt-1 space-y-0.5 list-disc list-inside">
                        <li>Se creará su espacio de trabajo en la nube.</li>
                        <li>Recibirá un correo de activación en <strong>{adminEmail}</strong>.</li>
                        <li>Podrá iniciar sesión y comenzar a configurar su laboratorio.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-4 border-t border-border">
              <Button variant="outline" onClick={handleBack} disabled={step === 0} className="gap-1">
                <ChevronLeft className="h-4 w-4" /> Anterior
              </Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={handleNext} className="gap-1">
                  Siguiente <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} size="lg" className="gap-2">
                  <CheckCircle2 className="h-5 w-5" /> Confirmar Registro
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
