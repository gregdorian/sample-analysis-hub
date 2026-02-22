import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { CalendarIcon, Plus, Clock, Building2, TestTube, Search, Edit, X, ClipboardList, CalendarCheck } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type AppointmentStatus = "Pendiente" | "Confirmada" | "Cancelada" | "Completada";

interface PatientAppointment {
  id: number;
  patientName: string;
  patientId: string;
  lab: string;
  exams: string[];
  date: Date;
  time: string;
  status: AppointmentStatus;
  notes: string;
}

const labs = [
  { id: "lab1", name: "Laboratorio Central" },
  { id: "lab2", name: "Laboratorio Norte" },
  { id: "lab3", name: "Laboratorio Sur" },
];

const examsByLab: Record<string, string[]> = {
  lab1: ["Hemograma Completo", "Glucosa en Ayunas", "Perfil Lipídico", "Examen General de Orina"],
  lab2: ["Urocultivo", "Prueba de Tiroides (TSH)"],
  lab3: ["Hemoglobina Glicosilada", "Perfil Hepático"],
};

const timeSlots = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "14:00", "14:30", "15:00", "15:30", "16:00",
];

const statusColors: Record<AppointmentStatus, string> = {
  Pendiente: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Confirmada: "bg-blue-100 text-blue-800 border-blue-300",
  Cancelada: "bg-red-100 text-red-800 border-red-300",
  Completada: "bg-green-100 text-green-800 border-green-300",
};

export default function PatientAppointmentModule() {
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("nueva");

  // Form
  const [name, setName] = useState("");
  const [pid, setPid] = useState("");
  const [lab, setLab] = useState("");
  const [exams, setExams] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const resetForm = () => {
    setName(""); setPid(""); setLab(""); setExams([]); setDate(undefined); setTime(""); setNotes(""); setEditingId(null);
  };

  const toggleExam = (ex: string) => setExams(prev => prev.includes(ex) ? prev.filter(e => e !== ex) : [...prev, ex]);

  const handleSubmit = () => {
    if (!name || !pid || !lab || exams.length === 0 || !date || !time) {
      toast({ title: "Campos incompletos", description: "Complete todos los campos obligatorios.", variant: "destructive" });
      return;
    }
    const dup = appointments.find(a => a.patientId === pid && a.date.toDateString() === date!.toDateString() && a.time === time && a.id !== editingId);
    if (dup) {
      toast({ title: "Conflicto de horario", description: "Ya existe una cita para este paciente en esa fecha y hora.", variant: "destructive" });
      return;
    }
    const labName = labs.find(l => l.id === lab)?.name ?? "";
    if (editingId !== null) {
      setAppointments(prev => prev.map(a => a.id === editingId ? { ...a, patientName: name, patientId: pid, lab: labName, exams, date: date!, time, notes } : a));
      toast({ title: "Cita actualizada" });
    } else {
      setAppointments(prev => [...prev, { id: Date.now(), patientName: name, patientId: pid, lab: labName, exams, date: date!, time, status: "Pendiente", notes }]);
      toast({ title: "¡Cita programada!", description: `${name} — ${format(date!, "dd/MM/yyyy")} a las ${time}` });
    }
    resetForm();
    setActiveTab("mis-citas");
  };

  const handleEdit = (a: PatientAppointment) => {
    setName(a.patientName); setPid(a.patientId);
    const labObj = labs.find(l => l.name === a.lab);
    setLab(labObj?.id ?? ""); setExams(a.exams); setDate(a.date); setTime(a.time); setNotes(a.notes); setEditingId(a.id);
    setActiveTab("nueva");
  };

  const handleCancel = (id: number) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "Cancelada" as AppointmentStatus } : a));
    toast({ title: "Cita cancelada" });
  };

  const filtered = appointments.filter(a =>
    a.patientName.toLowerCase().includes(search.toLowerCase()) ||
    a.patientId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="w-full px-4 md:px-16 py-10 bg-gradient-to-b from-green-50 to-white dark:from-slate-900 dark:to-background">
      <Card className="max-w-4xl mx-auto shadow-2xl border-2 border-primary/20">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-3">
            <div className="bg-primary/10 rounded-full p-4">
              <CalendarCheck className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
            Portal de Citas — Pacientes
          </CardTitle>
          <p className="text-muted-foreground mt-1">
            Programe, consulte o cancele sus citas de laboratorio de forma rápida y sencilla.
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="nueva" className="gap-2">
                <Plus className="h-4 w-4" /> {editingId ? "Reprogramar Cita" : "Nueva Cita"}
              </TabsTrigger>
              <TabsTrigger value="mis-citas" className="gap-2">
                <ClipboardList className="h-4 w-4" /> Mis Citas {appointments.length > 0 && <Badge variant="secondary" className="ml-1">{appointments.length}</Badge>}
              </TabsTrigger>
            </TabsList>

            {/* ---- TAB: NUEVA CITA ---- */}
            <TabsContent value="nueva">
              <div className="space-y-5">
                {/* Patient info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Nombre completo *</label>
                    <Input value={name} onChange={e => setName(e.target.value)} placeholder="Ej: María García" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Documento / ID *</label>
                    <Input value={pid} onChange={e => setPid(e.target.value)} placeholder="Ej: 12345678" />
                  </div>
                </div>

                {/* Lab */}
                <div>
                  <label className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Building2 className="h-4 w-4" /> Laboratorio *
                  </label>
                  <Select value={lab} onValueChange={v => { setLab(v); setExams([]); }}>
                    <SelectTrigger><SelectValue placeholder="Seleccione un laboratorio" /></SelectTrigger>
                    <SelectContent>
                      {labs.map(l => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {/* Exams */}
                {lab && (
                  <div>
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <TestTube className="h-4 w-4" /> Exámenes disponibles *
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(examsByLab[lab] ?? []).map(ex => (
                        <Badge
                          key={ex}
                          variant={exams.includes(ex) ? "default" : "outline"}
                          className="cursor-pointer select-none text-sm py-1 px-3"
                          onClick={() => toggleExam(ex)}
                        >
                          {ex}
                        </Badge>
                      ))}
                    </div>
                    {exams.length > 0 && <p className="text-xs text-muted-foreground mt-2">Seleccionados: {exams.join(", ")}</p>}
                  </div>
                )}

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" /> Fecha *
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "dd/MM/yyyy", { locale: es }) : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={date} onSelect={setDate} disabled={d => d < new Date(new Date().setHours(0, 0, 0, 0))} className="p-3 pointer-events-auto" locale={es} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <Clock className="h-4 w-4" /> Hora *
                    </label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger><SelectValue placeholder="Seleccionar hora" /></SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-sm font-medium text-foreground">Observaciones (opcional)</label>
                  <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Historial médico, medicamentos, indicaciones…" rows={3} />
                </div>

                {/* Summary preview */}
                {name && lab && exams.length > 0 && date && time && (
                  <Card className="bg-muted/50 border-dashed">
                    <CardContent className="p-4 text-sm space-y-1">
                      <p className="font-semibold text-foreground">Resumen de la cita:</p>
                      <p><span className="text-muted-foreground">Paciente:</span> {name} ({pid})</p>
                      <p><span className="text-muted-foreground">Laboratorio:</span> {labs.find(l => l.id === lab)?.name}</p>
                      <p><span className="text-muted-foreground">Exámenes:</span> {exams.join(", ")}</p>
                      <p><span className="text-muted-foreground">Fecha y hora:</span> {format(date, "dd/MM/yyyy", { locale: es })} a las {time}</p>
                    </CardContent>
                  </Card>
                )}

                <div className="flex gap-3 pt-2">
                  {editingId && (
                    <Button variant="outline" onClick={() => { resetForm(); }} className="flex-1">Cancelar edición</Button>
                  )}
                  <Button onClick={handleSubmit} className="flex-1 gap-2" size="lg">
                    <CalendarCheck className="h-5 w-5" />
                    {editingId ? "Actualizar Cita" : "Confirmar y Programar Cita"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* ---- TAB: MIS CITAS ---- */}
            <TabsContent value="mis-citas">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar por nombre o documento…" value={search} onChange={e => setSearch(e.target.value)} className="pl-8" />
                </div>

                {filtered.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p className="text-lg font-medium">No hay citas registradas</p>
                    <p className="text-sm">Programe su primera cita en la pestaña "Nueva Cita".</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filtered.map(a => (
                      <Card key={a.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-foreground">{a.patientName}</span>
                                <span className="text-xs text-muted-foreground">({a.patientId})</span>
                                <Badge className={statusColors[a.status]}>{a.status}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                <Building2 className="inline h-3 w-3 mr-1" />{a.lab} · {format(a.date, "dd/MM/yyyy")} · {a.time}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {a.exams.map(ex => <Badge key={ex} variant="outline" className="text-xs">{ex}</Badge>)}
                              </div>
                              {a.notes && <p className="text-xs text-muted-foreground mt-1 italic">📝 {a.notes}</p>}
                            </div>
                            <div className="flex gap-2 shrink-0">
                              {(a.status === "Pendiente" || a.status === "Confirmada") && (
                                <>
                                  <Button size="sm" variant="outline" onClick={() => handleEdit(a)}>
                                    <Edit className="h-3 w-3 mr-1" /> Reprogramar
                                  </Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleCancel(a.id)}>
                                    <X className="h-3 w-3 mr-1" /> Cancelar
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
