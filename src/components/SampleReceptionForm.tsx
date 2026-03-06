import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TestTube, Search, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ExamItemTable, ExamItem } from "./ExamItemTable";
import { PatientSearchInput } from "./PatientSearchInput";

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

const emptyExamForm: Omit<ExamItem, 'id'> = {
  examType: "",
  sampleType: "",
  area: "",
  priority: ""
};

export function SampleReceptionForm({ onAddSample, samplesCount }: SampleReceptionFormProps) {
  const { toast } = useToast();

  // Estado de paciente recibe un objeto Patient o string si es manual
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [patientSearch, setPatientSearch] = useState(""); // Manténlo para compatibilidad con Exam
  // Examenes agregados (detalle)
  const [examItems, setExamItems] = useState<ExamItem[]>([]);
  // Estado para manejar el formulario de un examen
  const [examForm, setExamForm] = useState<Omit<ExamItem, 'id'>>(emptyExamForm);
  const [editingExamId, setEditingExamId] = useState<string | null>(null);

  // Generar número de orden automáticamente
  const orderNumber = `ORD${String(samplesCount + 1).padStart(3, "0")}`;

  // Validaciones
  const canAddExam = examForm.examType && examForm.sampleType && examForm.area && examForm.priority;
  // Actualizamos: Solo considerar exámenes y paciente cuando haya al menos uno en examItems y un paciente seleccionado
  const canRegisterSample = (
    selectedPatient &&
    examItems.length > 0
  );

  // Manejar agregar/examinar un examen detalle
  const handleAddExam = () => {
    if (!canAddExam) {
      toast({
        title: "Campos del examen incompletos",
        description: "Complete todos los campos para agregar el examen.",
        variant: "destructive",
      });
      return;
    }
    if (editingExamId) {
      // Modificando un examen existente
      setExamItems((prev) =>
        prev.map((item) =>
          item.id === editingExamId ? { ...item, ...examForm } : item
        )
      );
      setEditingExamId(null);
      toast({ title: "Examen modificado", variant: "default" });
    } else {
      // Agregando un nuevo examen
      setExamItems((prev) => [
        ...prev,
        { ...examForm, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }
      ]);
      toast({ title: "Examen agregado", variant: "default" });
    }

    setExamForm(emptyExamForm);
  };

  // Editar
  const handleEditExam = (item: ExamItem) => {
    setExamForm({
      examType: item.examType,
      sampleType: item.sampleType,
      area: item.area,
      priority: item.priority,
    });
    setEditingExamId(item.id);
  };

  // Quitar
  const handleRemoveExam = (id: string) => {
    setExamItems((prev) => prev.filter((item) => item.id !== id));
    // Al quitar exam, limpiar edición si estaba editando ese
    if (editingExamId === id) {
      setExamForm(emptyExamForm);
      setEditingExamId(null);
    }
    toast({ title: "Examen eliminado", variant: "destructive" });
  };

  // Registrar muestra
  const handleRegisterSample = (e: React.FormEvent) => {
    e.preventDefault();

    // Si NO hay exámenes, mostrar la validación y NO procesar
    if (examItems.length === 0 || !selectedPatient) {
      toast({
        title: "Formulario incompleto",
        description: "Ingrese paciente y al menos un examen.",
        variant: "destructive",
      });
      return;
    }

    // Procesar registro de MUESTRA(S)
    examItems.forEach((item) => {
      const newSample: Sample = {
        id: `M${String(samplesCount + 1).padStart(3, '0')}`,
        patientName: selectedPatient ? `${selectedPatient.nombre} ${selectedPatient.apellido}` : patientSearch,
        patientId: selectedPatient ? selectedPatient.nroIdentificacion : "---",
        orderNumber,
        examType: item.examType,
        sampleType: item.sampleType,
        area: item.area,
        priority: item.priority,
        receptionDate: new Date().toISOString().split('T')[0],
        status: "Recibida",
      };
      onAddSample(newSample);
    });

    toast({
      title: "Muestra registrada",
      description: `Se registró la muestra con ${examItems.length} examen(es) para el paciente.`,
      variant: "default",
    });

    // Limpiar formulario: esto NO debe disparar ninguna validación de registro
    setPatientSearch("");
    setSelectedPatient(null);
    setExamItems([]);
    setExamForm(emptyExamForm);
    setEditingExamId(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5 text-primary" />
          Formulario de Recepción
        </CardTitle>
        <CardDescription>Complete la información y agregue exámenes a realizar</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegisterSample}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PatientSearchInput
              value={patientSearch}
              onPatientSelected={(p) => {
                setSelectedPatient(p);
                setPatientSearch(p ? `${p.nombre} ${p.apellido}` : ""); // Sync for clarity
              }}
            />
            <div className="space-y-2">
              <Label htmlFor="order-number">Número de Orden *</Label>
              <Input
                id="order-number"
                value={orderNumber}
                readOnly
                className="bg-muted text-muted-foreground"
              />
            </div>
          </div>
...
          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              disabled={!canRegisterSample}
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
