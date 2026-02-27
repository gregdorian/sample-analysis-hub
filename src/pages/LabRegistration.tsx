import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Building2, Image as ImageIcon, Camera, Trash2, Users, FlaskConical,
  CreditCard, ChevronRight, ChevronLeft, CheckCircle2, ArrowLeft, TestTube,
  FileText, ShieldCheck, Clock, Lock, Eye, EyeOff
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLabAuth } from "@/hooks/use-lab-auth";

const STEPS = [
  { label: "Datos del Laboratorio", icon: Building2 },
  { label: "Servicios y Exámenes", icon: FlaskConical },
  { label: "Plan y Administrador", icon: Users },
  { label: "Pago", icon: CreditCard },
  { label: "Confirmación", icon: CheckCircle2 },
];

const PLAN_OPTIONS = [
  { id: "basico", name: "Básico", users: 3, price: "$49/mes", priceNum: 49, features: ["Hasta 3 usuarios", "Gestión de citas", "Resultados básicos", "Soporte por email"] },
  { id: "profesional", name: "Profesional", users: 10, price: "$129/mes", priceNum: 129, features: ["Hasta 10 usuarios", "Gestión completa", "Reportes avanzados", "Soporte prioritario", "API de integración"] },
  { id: "enterprise", name: "Enterprise", users: 999, price: "Personalizado", priceNum: 299, features: ["Usuarios ilimitados", "Todas las funciones", "Soporte dedicado 24/7", "Personalización total", "SLA garantizado"] },
];

const LEASE_OPTIONS = [
  { value: "1", label: "1 mes", discount: 0 },
  { value: "3", label: "3 meses (5% dto.)", discount: 0.05 },
  { value: "6", label: "6 meses (10% dto.)", discount: 0.10 },
  { value: "12", label: "12 meses (20% dto.)", discount: 0.20 },
  { value: "24", label: "24 meses (30% dto.)", discount: 0.30 },
];

const EXAM_CATEGORIES = [
  { category: "Hematología", exams: ["Hemograma Completo", "Velocidad de Sedimentación", "Recuento de Plaquetas", "Tiempo de Protrombina"] },
  { category: "Bioquímica", exams: ["Glucosa en Ayunas", "Perfil Lipídico", "Perfil Hepático", "Perfil Renal", "Ácido Úrico"] },
  { category: "Endocrinología", exams: ["TSH", "T3 / T4", "Hemoglobina Glicosilada", "Insulina"] },
  { category: "Uroanálisis", exams: ["Examen General de Orina", "Urocultivo", "Proteinuria"] },
  { category: "Microbiología", exams: ["Cultivo Bacteriano", "Antibiograma", "Coprocultivo"] },
];

export default function LabRegistration() {
  const navigate = useNavigate();
  const { completeRegistration } = useLabAuth();
  const [step, setStep] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  // Step 0 - Lab info
  const [labName, setLabName] = useState("");
  const [labRuc, setLabRuc] = useState("");
  const [labAddress, setLabAddress] = useState("");
  const [labPhone, setLabPhone] = useState("");
  const [labEmail, setLabEmail] = useState("");
  const [labLogo, setLabLogo] = useState<string | null>(null);
  const [labDescription, setLabDescription] = useState("");

  // Step 1 - Services
  const [selectedExams, setSelectedExams] = useState<string[]>([]);

  // Step 2 - Plan & Admin
  const [selectedPlan, setSelectedPlan] = useState("profesional");
  const [numUsers, setNumUsers] = useState("5");
  const [leaseDuration, setLeaseDuration] = useState("12");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminPasswordConfirm, setAdminPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Step 3 - Payment
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

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

  const currentPlan = PLAN_OPTIONS.find(p => p.id === selectedPlan);
  const currentLease = LEASE_OPTIONS.find(o => o.value === leaseDuration);
  const totalPrice = currentPlan ? currentPlan.priceNum * Number(leaseDuration) * (1 - (currentLease?.discount || 0)) : 0;

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
      if (!adminPassword || adminPassword.length < 6) {
        toast({ title: "Contraseña requerida", description: "La contraseña debe tener al menos 6 caracteres.", variant: "destructive" });
        return false;
      }
      if (adminPassword !== adminPasswordConfirm) {
        toast({ title: "Contraseñas no coinciden", description: "Verifique que ambas contraseñas sean iguales.", variant: "destructive" });
        return false;
      }
    }
    if (step === 3) {
      if (!paymentCompleted) {
        toast({ title: "Pago requerido", description: "Debe completar el pago para continuar.", variant: "destructive" });
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

  const handleSimulatePayment = () => {
    if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
      toast({ title: "Complete los datos de pago", description: "Todos los campos de la tarjeta son obligatorios.", variant: "destructive" });
      return;
    }
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentCompleted(true);
      toast({ title: "¡Pago exitoso!", description: `Se ha procesado el pago de $${totalPrice.toFixed(2)} correctamente.` });
    }, 2000);
  };

  const handleSubmit = () => {
    const now = new Date();
    const leaseMonths = Number(leaseDuration);
    const expiresAt = new Date(now);
    expiresAt.setMonth(expiresAt.getMonth() + leaseMonths);

    const data = {
      lab: { name: labName, ruc: labRuc, address: labAddress, phone: labPhone, email: labEmail, logo: labLogo, description: labDescription },
      exams: selectedExams,
      plan: { planId: selectedPlan, users: numUsers, lease: leaseDuration, admin: { name: adminName, email: adminEmail, password: adminPassword } },
      paymentCompleted: true,
      registeredAt: now.toISOString(),
      leaseExpiresAt: expiresAt.toISOString(),
      status: "active" as const,
    };
    completeRegistration(data);
    toast({ title: "¡Registro completado!", description: `El laboratorio "${labName}" ha sido registrado exitosamente.` });
    navigate("/laboratorio");
  };

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
                    <p className="text-xs text-muted-foreground">PNG, JPG o SVG. Máximo 2MB.</p>
                    {labLogo && (
                      <Button variant="ghost" size="sm" onClick={() => setLabLogo(null)}>
                        <Trash2 className="h-3 w-3 mr-1" /> Quitar
                      </Button>
                    )}
                  </div>
                  <Input ref={fileRef} type="file" accept="image/png,image/jpeg,image/svg+xml" className="hidden" onChange={handleLogoChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Nombre del laboratorio *</Label><Input value={labName} onChange={e => setLabName(e.target.value)} placeholder="Ej: Laboratorio Clínico Central" /></div>
                  <div><Label>RUC / NIT / Identificación fiscal</Label><Input value={labRuc} onChange={e => setLabRuc(e.target.value)} placeholder="Ej: 20123456789" /></div>
                </div>
                <div><Label>Dirección</Label><Input value={labAddress} onChange={e => setLabAddress(e.target.value)} placeholder="Dirección completa del laboratorio" /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Teléfono *</Label><Input value={labPhone} onChange={e => setLabPhone(e.target.value)} placeholder="+51 999 999 999" /></div>
                  <div><Label>Email institucional *</Label><Input value={labEmail} onChange={e => setLabEmail(e.target.value)} placeholder="contacto@laboratorio.com" type="email" /></div>
                </div>
                <div><Label>Descripción / Especialidades</Label><Textarea value={labDescription} onChange={e => setLabDescription(e.target.value)} placeholder="Breve descripción…" rows={3} /></div>
              </div>
            )}

            {/* ===== STEP 1: Servicios y Exámenes ===== */}
            {step === 1 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">Seleccione los exámenes que su laboratorio ofrecerá.</p>
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
                              <Badge key={ex} variant={selectedExams.includes(ex) ? "default" : "outline"} className="cursor-pointer select-none py-1.5 px-3" onClick={() => toggleExam(ex)}>
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

            {/* ===== STEP 2: Plan y Administrador ===== */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold">Seleccione su plan</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    {PLAN_OPTIONS.map(plan => (
                      <Card key={plan.id} className={cn("cursor-pointer transition-all hover:shadow-md", selectedPlan === plan.id ? "border-primary border-2 shadow-md" : "border-border")} onClick={() => setSelectedPlan(plan.id)}>
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
                  <p className="text-xs text-muted-foreground mb-3">Este será el primer usuario con permisos de administración. Usará estas credenciales para iniciar sesión.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Nombre completo *</Label><Input value={adminName} onChange={e => setAdminName(e.target.value)} placeholder="Nombre del administrador" /></div>
                    <div><Label>Email *</Label><Input value={adminEmail} onChange={e => setAdminEmail(e.target.value)} placeholder="admin@laboratorio.com" type="email" /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Contraseña *</Label>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} value={adminPassword} onChange={e => setAdminPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
                        <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label>Confirmar contraseña *</Label>
                      <Input type="password" value={adminPasswordConfirm} onChange={e => setAdminPasswordConfirm(e.target.value)} placeholder="Repita la contraseña" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== STEP 3: Pago ===== */}
            {step === 3 && (
              <div className="space-y-6">
                {/* Resumen del cobro */}
                <Card className="bg-muted/30 border-dashed">
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-semibold text-foreground">Resumen de su suscripción</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Plan:</span><span className="font-medium">{currentPlan?.name}</span>
                      <span className="text-muted-foreground">Precio mensual:</span><span className="font-medium">${currentPlan?.priceNum}/mes</span>
                      <span className="text-muted-foreground">Duración:</span><span className="font-medium">{currentLease?.label}</span>
                      {currentLease && currentLease.discount > 0 && (
                        <><span className="text-muted-foreground">Descuento:</span><span className="font-medium text-primary">{(currentLease.discount * 100)}%</span></>
                      )}
                      <span className="text-muted-foreground font-semibold">Total a pagar:</span>
                      <span className="font-bold text-primary text-lg">${totalPrice.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>

                {paymentCompleted ? (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6 text-center space-y-3">
                      <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
                      <h3 className="text-lg font-bold text-foreground">¡Pago procesado exitosamente!</h3>
                      <p className="text-sm text-muted-foreground">Su pago de <strong>${totalPrice.toFixed(2)}</strong> ha sido confirmado. Continúe para finalizar el registro.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <div>
                      <Label className="text-base font-semibold flex items-center gap-1"><CreditCard className="h-4 w-4" /> Datos de la tarjeta</Label>
                      <p className="text-xs text-muted-foreground mb-3">Pago simulado — ingrese cualquier dato de prueba.</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>Número de tarjeta</Label>
                        <Input value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="4242 4242 4242 4242" maxLength={19} />
                      </div>
                      <div>
                        <Label>Nombre en la tarjeta</Label>
                        <Input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="NOMBRE COMPLETO" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><Label>Fecha de expiración</Label><Input value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} placeholder="MM/AA" maxLength={5} /></div>
                        <div><Label>CVV</Label><Input value={cardCvv} onChange={e => setCardCvv(e.target.value)} placeholder="123" maxLength={4} type="password" /></div>
                      </div>
                      <Button onClick={handleSimulatePayment} disabled={paymentProcessing} className="w-full gap-2" size="lg">
                        {paymentProcessing ? (
                          <><span className="animate-spin">⏳</span> Procesando pago...</>
                        ) : (
                          <><CreditCard className="h-5 w-5" /> Pagar ${totalPrice.toFixed(2)}</>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ===== STEP 4: Confirmación ===== */}
            {step === 4 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">Revise la información antes de confirmar el registro.</p>

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

                <div>
                  <p className="font-semibold text-foreground flex items-center gap-1 mb-2"><FlaskConical className="h-4 w-4" /> Exámenes ({selectedExams.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedExams.map(ex => <Badge key={ex} variant="outline" className="text-xs">{ex}</Badge>)}
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-foreground flex items-center gap-1 mb-2"><CreditCard className="h-4 w-4" /> Plan y Contrato</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">Plan:</span><span className="font-medium">{currentPlan?.name} — {currentPlan?.price}</span>
                    <span className="text-muted-foreground">Usuarios:</span><span className="font-medium">{numUsers}</span>
                    <span className="text-muted-foreground">Duración:</span><span className="font-medium">{currentLease?.label}</span>
                    <span className="text-muted-foreground">Pago:</span><span className="font-medium text-primary">${totalPrice.toFixed(2)} ✓</span>
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
                        <li>Podrá iniciar sesión con <strong>{adminEmail}</strong> y la contraseña que definió.</li>
                        <li>El arrendamiento expirará si no renueva su plan o incumple las condiciones de uso.</li>
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
                <Button onClick={handleNext} className="gap-1" disabled={step === 3 && !paymentCompleted}>
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
