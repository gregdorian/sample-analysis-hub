
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function PatientManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const patients = [
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
  ];

  const filteredPatients = patients.filter(patient =>
    patient.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.nroIdentificacion.includes(searchTerm) ||
    patient.historiaClinica.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Gestión de Pacientes</h1>
          <p className="text-slate-600">Registro y administración de pacientes</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Paciente</DialogTitle>
              <DialogDescription>Complete la información del paciente</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="identificacion">Número de Identificación</Label>
                <Input id="identificacion" placeholder="Ej: 12345678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="historiaClinica">Historia Clínica</Label>
                <Input id="historiaClinica" placeholder="Ej: HC001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" placeholder="Nombre del paciente" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input id="apellido" placeholder="Apellido del paciente" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sexo">Sexo</Label>
                <Select>
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
                <Input id="fechaNacimiento" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" placeholder="555-0123" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="paciente@email.com" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Guardar</Button>
            </div>
          </DialogContent>
        </Dialog>
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
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
