import { useState } from "react";
import { SampleReceptionHeader } from "./SampleReceptionHeader";
import { SampleReceptionForm } from "./SampleReceptionForm";
import { SamplesTable } from "./SamplesTable";
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

export function SampleReception() {
  const [samples, setSamples] = useState<Sample[]>([
    {
      id: "M001",
      patientName: "María García",
      patientId: "12345678",
      orderNumber: "ORD001",
      examType: "Hemograma Completo",
      sampleType: "Sangre",
      area: "Hematología",
      priority: "Normal",
      receptionDate: new Date().toISOString().split('T')[0],
      status: "Recibida",
    },
    {
      id: "M002",
      patientName: "Carlos López",
      patientId: "87654321",
      orderNumber: "ORD002",
      examType: "Glucosa",
      sampleType: "Sangre",
      area: "Bioquímica",
      priority: "Normal",
      receptionDate: new Date().toISOString().split('T')[0],
      status: "En proceso",
    }
  ]);

  const { toast } = useToast();

  const handleAddSample = (newSample: Sample) => {
    setSamples([...samples, newSample]);
  };

  return (
    <div className="space-y-6">
      <SampleReceptionHeader />
      <SampleReceptionForm onAddSample={handleAddSample} samplesCount={samples.length} />
      <SamplesTable samples={samples} />
    </div>
  );
}
