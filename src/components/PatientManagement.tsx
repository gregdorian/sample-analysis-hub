import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit, Eye, Trash2, Import, Database } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface Patient {
  id: number;
  nroIdentificacion: string;
  nombre: string;
  apellido: string;
  historiaClinica: string;
  sexo: "M" | "F";
  fechaNacimiento: string;
  telefono: string;
  email: string;
}

function parseCsv(text: string): Patient[] {
  // Asumimos que los encabezados coinciden con el modelo Patient (menos id)
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",");
  // id autoincremental
  let nextId = Date.now();
  return lines.slice(1).map(line => {
    const values = line.split(",");
    const p: any = {};
    headers.forEach((h, i) => p[h.trim()] = values[i]?.trim() || '');
    return {
      ...p,
      id: nextId++,
      sexo: p.sexo === "F" ? "F" : "M", // sanitize
    } as Patient;
  });
}

export function PatientManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      nroIdentificacion: "12345678",
      nombre: "María",
      apellido: "García",
      historiaClinica: "HC001",
      sexo: "F",
      fechaNacimiento: "1985-03-15",
      telefono: "555-0123",
      email: "maria.garcia@email.com"
    },
    {
      id: 2,
      nroIdentificacion: "87654321",
      nombre: "Carlos",
      apellido: "López",
      historiaClinica: "HC002",
      sexo: "M",
      fechaNacimiento: "1978-11-22",
      telefono: "555-0456",
      email: "carlos.lopez@email.com"
    },
    {
      id: 3,
      nroIdentificacion: "11223344",
      nombre: "Ana",
      apellido: "Martínez",
      historiaClinica: "HC003",
      sexo: "F",
      fechaNacimiento: "1992-07-08",
      telefono: "555-0789",
      email: "ana.martinez@email.com"
    }
  ]);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [csvImporting, setCsvImporting] = useState(false);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [importFromApiLoading, setImportFromApiLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // --- Paciente a crear/editar (form state) ---
  const [formFields, setFormFields] = useState<Omit<Patient, "id">>({
    nroIdentificacion: "",
    nombre: "",
    apellido: "",
    historiaClinica: "",
    sexo: "M",
    fechaNacimiento: "",
    telefono: "",
    email: "",
  });

  // --- FUNCIONES CRUD ---
  const handleSavePatient = () => {
    // Crear o actualizar paciente
    if (!formFields.nombre.trim() || !formFields.apellido.trim() || !formFields.nroIdentificacion.trim()) {
      toast({
        title: "Campos obligatorios",
        description: "Debe completar nombre, apellido e identificación.",
        variant: "destructive"
      });
      return;
    }
    if (editingPatient) {
      setPatients((prev) =>
        prev.map((p) => (p.id === editingPatient.id ? { ...editingPatient, ...formFields } : p))
      );
      toast({ title: "Paciente actualizado" });
    } else {
      // Nuevo id autoincremental
      const maxId = Math.max(0, ...patients.map((p) => p.id));
      setPatients((prev) => [
        ...prev,
        {
          id: maxId + 1,
          ...formFields
        }
      ]);
      toast({ title: "Paciente registrado" });
    }
    setAddDialogOpen(false);
    setEditDialogOpen(false);
    setEditingPatient(null);
    setFormFields({
      nroIdentificacion: "",
      nombre: "",
      apellido: "",
      historiaClinica: "",
      sexo: "M",
      fechaNacimiento: "",
      telefono: "",
      email: "",
    });
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setFormFields({
      nroIdentificacion: patient.nroIdentificacion,
      nombre: patient.nombre,
      apellido: patient.apellido,
      historiaClinica: patient.historiaClinica ?? "",
      sexo: patient.sexo,
      fechaNacimiento: patient.fechaNacimiento,
      telefono: patient.telefono,
      email: patient.email,
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (patient: Patient) => {
    setDeletingPatient(patient);
  };

  const confirmDelete = () => {
    if (deletingPatient) {
      setPatients((prev) => prev.filter((p) => p.id !== deletingPatient.id));
      toast({
        title: "Paciente eliminado",
        description: `${deletingPatient.nombre} ${deletingPatient.apellido} fue eliminado de la lista.`,
        variant: "destructive"
      });
    }
    setDeletingPatient(null);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.nroIdentificacion.includes(searchTerm) ||
    patient.historiaClinica.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- DIALOG: FORM PARA AGREGAR/EDITAR PACIENTE ---
  const PatientFormDialog = (
    <Dialog open={addDialogOpen || editDialogOpen} onOpenChange={open => { setAddDialogOpen(open); setEditDialogOpen(open ? true : false); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editingPatient ? "Editar Paciente" : "Registrar Nuevo Paciente"}</DialogTitle>
          <DialogDescription>Complete la información del paciente</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="identificacion">Número de Identificación</Label>
            <Input
              id="identificacion"
              placeholder="Ej: 12345678"
              value={formFields.nroIdentificacion}
              onChange={e => setFormFields(f => ({ ...f, nroIdentificacion: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="historiaClinica">Historia Clínica</Label>
            <Input
              id="historiaClinica"
              placeholder="Ej: HC001"
              value={formFields.historiaClinica}
              onChange={e => setFormFields(f => ({ ...f, historiaClinica: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              placeholder="Nombre del paciente"
              value={formFields.nombre}
              onChange={e => setFormFields(f => ({ ...f, nombre: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apellido">Apellido</Label>
            <Input
              id="apellido"
              placeholder="Apellido del paciente"
              value={formFields.apellido}
              onChange={e => setFormFields(f => ({ ...f, apellido: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sexo">Sexo</Label>
            <Select
              value={formFields.sexo}
              onValueChange={val => setFormFields(f => ({ ...f, sexo: val as "M" | "F" }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Masculino</SelectItem>
                <SelectItem value="F">Femenino</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
            <Input
              id="fechaNacimiento"
              type="date"
              value={formFields.fechaNacimiento}
              onChange={e => setFormFields(f => ({ ...f, fechaNacimiento: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              placeholder="555-0123"
              value={formFields.telefono}
              onChange={e => setFormFields(f => ({ ...f, telefono: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="paciente@email.com"
              value={formFields.email}
              onChange={e => setFormFields(f => ({ ...f, email: e.target.value }))}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline"
              onClick={() => { setEditingPatient(null); setFormFields({ nroIdentificacion: "", nombre: "", apellido: "", historiaClinica: "", sexo: "M", fechaNacimiento: "", telefono: "", email: "" }); }}
            >Cancelar</Button>
          </DialogClose>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSavePatient}>
            {editingPatient ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // --- DIALOG DE ELIMINACIÓN (ALERTA) ---
  const DeleteAlert = (
    <AlertDialog open={!!deletingPatient} onOpenChange={open => !open && setDeletingPatient(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar paciente?</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Seguro que desea eliminar a <b>{deletingPatient?.nombre} {deletingPatient?.apellido}</b>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Gestión de Pacientes</h1>
          <p className="text-slate-600">Registro y administración de pacientes</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => { setEditingPatient(null); setAddDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Paciente
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por nombre, apellido, identificación o historia clínica..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes</CardTitle>
          <CardDescription>Total: {filteredPatients.length} pacientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Identificación</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Nombre Completo</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Historia Clínica</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Sexo</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Teléfono</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">{patient.nroIdentificacion}</td>
                    <td className="py-3 px-4">{`${patient.nombre} ${patient.apellido}`}</td>
                    <td className="py-3 px-4">{patient.historiaClinica}</td>
                    <td className="py-3 px-4">{patient.sexo}</td>
                    <td className="py-3 px-4">{patient.telefono}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(patient)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(patient)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPatients.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-slate-500">No se encontraron pacientes.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* DIALOGS */}
      {PatientFormDialog}
      {DeleteAlert}
    </div>
  );
}
