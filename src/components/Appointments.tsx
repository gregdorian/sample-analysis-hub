import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Plus, Clock, Building2, TestTube, X, Edit, Search } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type AppointmentStatus = "Pendiente" | "Confirmada" | "Cancelada" | "Completada";

interface Appointment {
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

const mockLabs = [
  { id: "lab1", name: "Laboratorio Central" },
  { id: "lab2", name: "Laboratorio Norte" },
  { id: "lab3", name: "Laboratorio Sur" },
];

const mockExams = [
  { id: "ex1", name: "Hemograma Completo", lab: "lab1" },
  { id: "ex2", name: "Glucosa en Ayunas", lab: "lab1" },
  { id: "ex3", name: "Perfil Lipídico", lab: "lab1" },
  { id: "ex4", name: "Urocultivo", lab: "lab2" },
  { id: "ex5", name: "Prueba de Tiroides (TSH)", lab: "lab2" },
  { id: "ex6", name: "Hemoglobina Glicosilada", lab: "lab3" },
  { id: "ex7", name: "Perfil Hepático", lab: "lab3" },
  { id: "ex8", name: "Examen General de Orina", lab: "lab1" },
];

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

const initialAppointments: Appointment[] = [
  {
    id: 1,
    patientName: "María García",
    patientId: "PAC001",
    lab: "Laboratorio Central",
    exams: ["Hemograma Completo", "Glucosa en Ayunas"],
    date: new Date(2026, 1, 23),
    time: "08:00",
    status: "Confirmada",
    notes: "",
  },
  {
    id: 2,
    patientName: "Carlos López",
    patientId: "PAC002",
    lab: "Laboratorio Norte",
    exams: ["Prueba de Tiroides (TSH)"],
    date: new Date(2026, 1, 24),
    time: "09:30",
    status: "Pendiente",
    notes: "Paciente en ayunas 12 horas",
  },
  {
    id: 3,
    patientName: "Ana Martínez",
    patientId: "PAC003",
    lab: "Laboratorio Sur",
    exams: ["Perfil Hepático", "Hemoglobina Glicosilada"],
    date: new Date(2026, 1, 20),
    time: "10:00",
    status: "Completada",
    notes: "",
  },
];

export function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Form state
  const [formPatientName, setFormPatientName] = useState("");
  const [formPatientId, setFormPatientId] = useState("");
  const [formLab, setFormLab] = useState("");
  const [formExams, setFormExams] = useState<string[]>([]);
  const [formDate, setFormDate] = useState<Date | undefined>();
  const [formTime, setFormTime] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const availableExams = mockExams.filter((e) => e.lab === formLab);

  const resetForm = () => {
    setFormPatientName("");
    setFormPatientId("");
    setFormLab("");
    setFormExams([]);
    setFormDate(undefined);
    setFormTime("");
    setFormNotes("");
    setEditingId(null);
  };

  const handleOpenNew = () => {
    resetForm();
    setDialogOpen(true);
  };

  const handleEdit = (appt: Appointment) => {
    setFormPatientName(appt.patientName);
    setFormPatientId(appt.patientId);
    const labObj = mockLabs.find((l) => l.name === appt.lab);
    setFormLab(labObj?.id ?? "");
    setFormExams(appt.exams);
    setFormDate(appt.date);
    setFormTime(appt.time);
    setFormNotes(appt.notes);
    setEditingId(appt.id);
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formPatientName || !formPatientId || !formLab || formExams.length === 0 || !formDate || !formTime) {
      toast({ title: "Faltan datos", description: "Complete todos los campos obligatorios.", variant: "destructive" });
      return;
    }

    // Check duplicate: same patient, same date+time (not self)
    const duplicate = appointments.find(
      (a) =>
        a.patientId === formPatientId &&
        a.date.toDateString() === formDate!.toDateString() &&
        a.time === formTime &&
        a.id !== editingId
    );
    if (duplicate) {
      toast({ title: "Conflicto de horario", description: "Este paciente ya tiene una cita en esa fecha y hora.", variant: "destructive" });
      return;
    }

    const labName = mockLabs.find((l) => l.id === formLab)?.name ?? "";

    if (editingId !== null) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? { ...a, patientName: formPatientName, patientId: formPatientId, lab: labName, exams: formExams, date: formDate!, time: formTime, notes: formNotes }
            : a
        )
      );
      toast({ title: "Cita actualizada", description: "La cita fue reprogramada correctamente." });
    } else {
      const newAppt: Appointment = {
        id: Date.now(),
        patientName: formPatientName,
        patientId: formPatientId,
        lab: labName,
        exams: formExams,
        date: formDate!,
        time: formTime,
        status: "Pendiente",
        notes: formNotes,
      };
      setAppointments((prev) => [...prev, newAppt]);
      toast({ title: "Cita programada", description: `Cita registrada para ${formPatientName} el ${format(formDate!, "dd/MM/yyyy")} a las ${formTime}.` });
    }

    setDialogOpen(false);
    resetForm();
  };

  const handleCancel = (id: number) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Cancelada" as AppointmentStatus } : a)));
    toast({ title: "Cita cancelada" });
  };

  const handleConfirm = (id: number) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Confirmada" as AppointmentStatus } : a)));
    toast({ title: "Cita confirmada" });
  };

  const handleComplete = (id: number) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Completada" as AppointmentStatus } : a)));
    toast({ title: "Cita completada" });
  };

  const toggleExam = (examName: string) => {
    setFormExams((prev) => (prev.includes(examName) ? prev.filter((e) => e !== examName) : [...prev, examName]));
  };

  const filtered = appointments.filter((a) => {
    const matchSearch =
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.patientId.toLowerCase().includes(search.toLowerCase()) ||
      a.lab.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Gestión de Citas</h1>
          <p className="text-slate-600">Programación y seguimiento de citas de laboratorio</p>
        </div>
        <Button onClick={handleOpenNew} className="gap-2">
          <Plus className="h-4 w-4" /> Nueva Cita
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["Pendiente", "Confirmada", "Completada", "Cancelada"] as AppointmentStatus[]).map((st) => (
          <Card key={st} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus(st === filterStatus ? "all" : st)}>
            <CardContent className="p-4 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">{st}s</span>
              <Badge className={statusColors[st]}>{appointments.filter((a) => a.status === st).length}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" /> Listado de Citas
          </CardTitle>
          <CardDescription>
            <div className="flex flex-col md:flex-row gap-2 mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar paciente, ID o laboratorio…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Confirmada">Confirmada</SelectItem>
                  <SelectItem value="Completada">Completada</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Paciente</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Laboratorio</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Exámenes</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Fecha</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Hora</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-slate-400">No se encontraron citas.</td>
                  </tr>
                )}
                {filtered.map((appt) => (
                  <tr key={appt.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">{appt.patientName}</td>
                    <td className="py-3 px-4 text-sm text-slate-500">{appt.patientId}</td>
                    <td className="py-3 px-4 text-sm">{appt.lab}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {appt.exams.map((ex) => (
                          <Badge key={ex} variant="outline" className="text-xs">{ex}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{format(appt.date, "dd/MM/yyyy")}</td>
                    <td className="py-3 px-4 text-sm">{appt.time}</td>
                    <td className="py-3 px-4">
                      <Badge className={statusColors[appt.status]}>{appt.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1 flex-wrap">
                        {appt.status === "Pendiente" && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => handleConfirm(appt.id)}>Confirmar</Button>
                            <Button size="sm" variant="outline" onClick={() => handleEdit(appt)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleCancel(appt.id)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                        {appt.status === "Confirmada" && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => handleComplete(appt.id)}>Completar</Button>
                            <Button size="sm" variant="outline" onClick={() => handleEdit(appt)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleCancel(appt.id)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                        {(appt.status === "Completada" || appt.status === "Cancelada") && (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* New/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Reprogramar Cita" : "Programar Nueva Cita"}</DialogTitle>
            <DialogDescription>Complete los datos para {editingId ? "actualizar" : "registrar"} la cita.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Patient */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Nombre del paciente *</label>
                <Input value={formPatientName} onChange={(e) => setFormPatientName(e.target.value)} placeholder="Nombre completo" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">ID Paciente *</label>
                <Input value={formPatientId} onChange={(e) => setFormPatientId(e.target.value)} placeholder="PAC000" />
              </div>
            </div>

            {/* Lab */}
            <div>
              <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                <Building2 className="h-4 w-4" /> Laboratorio *
              </label>
              <Select value={formLab} onValueChange={(v) => { setFormLab(v); setFormExams([]); }}>
                <SelectTrigger><SelectValue placeholder="Seleccionar laboratorio" /></SelectTrigger>
                <SelectContent>
                  {mockLabs.map((l) => (
                    <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Exams */}
            {formLab && (
              <div>
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <TestTube className="h-4 w-4" /> Exámenes disponibles *
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {availableExams.map((ex) => (
                    <Badge
                      key={ex.id}
                      variant={formExams.includes(ex.name) ? "default" : "outline"}
                      className="cursor-pointer select-none"
                      onClick={() => toggleExam(ex.name)}
                    >
                      {ex.name}
                    </Badge>
                  ))}
                </div>
                {formExams.length > 0 && (
                  <p className="text-xs text-slate-500 mt-1">Seleccionados: {formExams.join(", ")}</p>
                )}
              </div>
            )}

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" /> Fecha *
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !formDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formDate ? format(formDate, "dd/MM/yyyy", { locale: es }) : "Seleccionar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formDate}
                      onSelect={setFormDate}
                      disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                      className="p-3 pointer-events-auto"
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Hora *
                </label>
                <Select value={formTime} onValueChange={setFormTime}>
                  <SelectTrigger><SelectValue placeholder="Hora" /></SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-medium text-slate-700">Observaciones (opcional)</label>
              <Textarea value={formNotes} onChange={(e) => setFormNotes(e.target.value)} placeholder="Historial médico, medicamentos, indicaciones…" rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSubmit}>{editingId ? "Actualizar Cita" : "Programar Cita"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
