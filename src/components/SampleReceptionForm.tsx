
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TestTube, Search, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Sample {
  id: string;
  patientName: string;
  patientId: string;
  orderNumber: string;
  examType: string;
  sampleType: string;
  area: string;
  priority: string;
  receptionDate: string;
  status: string;
}

interface SampleReceptionFormProps {
  onAddSample: (sample: Sample) => void;
  samplesCount: number;
}

export function SampleReceptionForm({ onAddSample, samplesCount }: SampleReceptionFormProps) {
  const { toast } = useToast();

  // Estados para los campos del formulario
  const [patientSearch, setPatientSearch] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [examType, setExamType] = useState("");
  const [sampleType, setSampleType] = useState("");
  const [area, setArea] = useState("");
  const [priority, setPriority] = useState("");

  // Validar campos requeridos
  const isFormValid = () => {
    console.log("Validando formulario:", {
      patientSearch: patientSearch.trim(),
      orderNumber: orderNumber.trim(),
      examType: examType.trim(),
      sampleType: sampleType.trim(),
      area: area.trim(),
      priority: priority.trim()
    });

    return (
      patientSearch.trim() !== "" &&
      orderNumber.trim() !== "" &&
      examType.trim() !== "" &&
      sampleType.trim() !== "" &&
      area.trim() !== "" &&
      priority.trim() !== ""
    );
  };

  const handleFormRegisterSample = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Intentando registrar muestra...");
    console.log("Formulario válido:", isFormValid());

    if (!isFormValid()) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, complete todos los campos obligatorios para registrar la muestra.",
        variant: "destructive",
      });
      return;
    }

    const newSample: Sample = {
      id: `M${String(samplesCount + 1).padStart(3, '0')}`,
      patientName: patientSearch,
      patientId: "---",
      orderNumber,
      examType,
      sampleType,
      area,
      priority,
      receptionDate: new Date().toISOString().split('T')[0],
      status: "Recibida",
    };

    console.log("Registrando nueva muestra:", newSample);

    onAddSample(newSample);

    toast({
      title: "Muestra registrada",
      description: `Muestra ${newSample.id} registrada exitosamente.`,
      variant: "default",
    });

    // Limpiar el formulario
    setPatientSearch("");
    setOrderNumber("");
    setExamType("");
    setSampleType("");
    setArea("");
    setPriority("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5 text-blue-600" />
          Formulario de Recepción
        </CardTitle>
        <CardDescription>Complete la información de la muestra recibida</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormRegisterSample}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient-search">Buscar Paciente *</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="patient-search"
                  placeholder="ID o nombre del paciente"
                  className="pl-10"
                  value={patientSearch}
                  onChange={(e) => setPatientSearch(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="order-number">Número de Orden *</Label>
              <Input
                id="order-number"
                placeholder="ORD001"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exam-type">Tipo de Examen *</Label>
              <Select
                value={examType}
                onValueChange={setExamType}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione examen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hemograma Completo">Hemograma Completo</SelectItem>
                  <SelectItem value="Glucosa">Glucosa</SelectItem>
                  <SelectItem value="Perfil Lipídico">Perfil Lipídico</SelectItem>
                  <SelectItem value="Función Renal">Función Renal</SelectItem>
                  <SelectItem value="Función Hepática">Función Hepática</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sample-type">Tipo de Muestra *</Label>
              <Select
                value={sampleType}
                onValueChange={setSampleType}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione muestra" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sangre">Sangre</SelectItem>
                  <SelectItem value="Orina">Orina</SelectItem>
                  <SelectItem value="Heces">Heces</SelectItem>
                  <SelectItem value="Saliva">Saliva</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Área Asignada *</Label>
              <Select
                value={area}
                onValueChange={setArea}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hematología">Hematología</SelectItem>
                  <SelectItem value="Bioquímica">Bioquímica</SelectItem>
                  <SelectItem value="Microbiología">Microbiología</SelectItem>
                  <SelectItem value="Inmunología">Inmunología</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridad *</Label>
              <Select
                value={priority}
                onValueChange={setPriority}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Urgente">Urgente</SelectItem>
                  <SelectItem value="STAT">STAT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button 
              className="bg-blue-600 hover:bg-blue-700" 
              type="submit"
              disabled={!isFormValid()}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Registrar Muestra
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
