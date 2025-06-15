
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TestTube, Plus, Search, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SampleReception() {
  const [samples, setSamples] = useState([
    {
      id: "M001",
      patientName: "María García",
      patientId: "12345678",
      orderNumber: "ORD001",
      examType: "Hemograma Completo",
      receptionDate: new Date().toISOString().split('T')[0],
      status: "Recibida",
      area: "Hematología"
    },
    {
      id: "M002",
      patientName: "Carlos López",
      patientId: "87654321", 
      orderNumber: "ORD002",
      examType: "Glucosa",
      receptionDate: new Date().toISOString().split('T')[0],
      status: "En proceso",
      area: "Bioquímica"
    }
  ]);

  const { toast } = useToast();

  const handleRegisterSample = () => {
    const newSample = {
      id: `M${String(samples.length + 1).padStart(3, '0')}`,
      patientName: "Nuevo Paciente",
      patientId: "00000000",
      orderNumber: `ORD${String(samples.length + 1).padStart(3, '0')}`,
      examType: "Examen Pendiente",
      receptionDate: new Date().toISOString().split('T')[0],
      status: "Recibida",
      area: "Pendiente"
    };

    setSamples([...samples, newSample]);
    toast({
      title: "Muestra registrada",
      description: `Muestra ${newSample.id} registrada exitosamente`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Recepción de Muestras</h1>
          <p className="text-slate-600">Registro y recepción de muestras para análisis</p>
        </div>
        <Button onClick={handleRegisterSample} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Registrar Muestra
        </Button>
      </div>

      {/* Registration Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-blue-600" />
            Formulario de Recepción
          </CardTitle>
          <CardDescription>Complete la información de la muestra recibida</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient-search">Buscar Paciente</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="patient-search"
                  placeholder="ID o nombre del paciente"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="order-number">Número de Orden</Label>
              <Input id="order-number" placeholder="ORD001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exam-type">Tipo de Examen</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione examen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hemograma">Hemograma Completo</SelectItem>
                  <SelectItem value="glucosa">Glucosa</SelectItem>
                  <SelectItem value="perfil-lipidico">Perfil Lipídico</SelectItem>
                  <SelectItem value="funcion-renal">Función Renal</SelectItem>
                  <SelectItem value="funcion-hepatica">Función Hepática</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sample-type">Tipo de Muestra</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione muestra" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sangre">Sangre</SelectItem>
                  <SelectItem value="orina">Orina</SelectItem>
                  <SelectItem value="heces">Heces</SelectItem>
                  <SelectItem value="saliva">Saliva</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Área Asignada</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hematologia">Hematología</SelectItem>
                  <SelectItem value="bioquimica">Bioquímica</SelectItem>
                  <SelectItem value="microbiologia">Microbiología</SelectItem>
                  <SelectItem value="inmunologia">Inmunología</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridad</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                  <SelectItem value="stat">STAT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Registrar Muestra
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Samples List */}
      <Card>
        <CardHeader>
          <CardTitle>Muestras Recibidas Hoy</CardTitle>
          <CardDescription>Total: {samples.length} muestras</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">ID Muestra</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Paciente</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Orden</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Examen</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Área</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {samples.map((sample) => (
                  <tr key={sample.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">{sample.id}</td>
                    <td className="py-3 px-4">{sample.patientName}</td>
                    <td className="py-3 px-4">{sample.orderNumber}</td>
                    <td className="py-3 px-4">{sample.examType}</td>
                    <td className="py-3 px-4">{sample.area}</td>
                    <td className="py-3 px-4">
                      <Badge variant={sample.status === 'Recibida' ? 'default' : 'secondary'}>
                        {sample.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{sample.receptionDate}</td>
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
