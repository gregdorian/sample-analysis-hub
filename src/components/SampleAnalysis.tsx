
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Microscope, FileText, Printer, Save, Calculator, Receipt } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalysisData {
  equipment: string;
  reagents: string;
  results: string;
  observations: string;
  actualCost: number;
  duration: number;
  equipmentCost: number;
  reagentCost: number;
  laborCost: number;
}

export function SampleAnalysis() {
  const [selectedSample, setSelectedSample] = useState<any>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    equipment: "",
    reagents: "",
    results: "",
    observations: "",
    actualCost: 0,
    duration: 0,
    equipmentCost: 0,
    reagentCost: 0,
    laborCost: 0
  });
  const [showBillingPreview, setShowBillingPreview] = useState(false);
  const { toast } = useToast();

  const pendingSamples = [
    {
      id: "M001",
      patientName: "María García",
      examType: "Hemograma Completo",
      area: "Hematología",
      priority: "Normal",
      receptionDate: "2024-01-15",
      estimatedCost: 25000,
      patientId: "12345678",
      patientAge: 38,
      patientSex: "F",
      doctorName: "Dr. Juan Pérez"
    },
    {
      id: "M003",
      patientName: "Ana Martínez",
      examType: "Perfil Lipídico",
      area: "Bioquímica",
      priority: "Urgente",
      receptionDate: "2024-01-15",
      estimatedCost: 35000,
      patientId: "87654321",
      patientAge: 45,
      patientSex: "F",
      doctorName: "Dra. Ana Silva"
    }
  ];

  const handleStartAnalysis = (sample: any) => {
    setSelectedSample(sample);
    setAnalysisData({
      equipment: "",
      reagents: "",
      results: "",
      observations: "",
      actualCost: sample.estimatedCost,
      duration: 0,
      equipmentCost: Math.round(sample.estimatedCost * 0.3),
      reagentCost: Math.round(sample.estimatedCost * 0.4),
      laborCost: Math.round(sample.estimatedCost * 0.3)
    });
    setShowBillingPreview(false);
  };

  const handleInputChange = (field: keyof AnalysisData, value: string | number) => {
    setAnalysisData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotalCost = () => {
    return analysisData.equipmentCost + analysisData.reagentCost + analysisData.laborCost;
  };

  const handleSaveResults = () => {
    if (!analysisData.results.trim()) {
      toast({
        title: "Error",
        description: "Debe ingresar los resultados del análisis",
        variant: "destructive"
      });
      return;
    }

    const totalCost = calculateTotalCost();
    setAnalysisData(prev => ({ ...prev, actualCost: totalCost }));
    setShowBillingPreview(true);
    
    toast({
      title: "Resultados guardados",
      description: "Los resultados del análisis han sido guardados exitosamente",
    });
  };

  const handlePrintReport = () => {
    if (!selectedSample || !analysisData.results.trim()) {
      toast({
        title: "Error",
        description: "Complete el análisis antes de imprimir el reporte",
        variant: "destructive"
      });
      return;
    }

    // Create print content
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
          <h1 style="color: #333; margin: 0;">LABORATORIO CLÍNICO</h1>
          <h2 style="color: #666; margin: 5px 0;">Sistema de Gestión de Análisis</h2>
          <p style="margin: 0; color: #888;">Reporte de Resultados</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
          <div>
            <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">DATOS DEL PACIENTE</h3>
            <p><strong>Nombre:</strong> ${selectedSample.patientName}</p>
            <p><strong>ID:</strong> ${selectedSample.patientId}</p>
            <p><strong>Edad:</strong> ${selectedSample.patientAge} años</p>
            <p><strong>Sexo:</strong> ${selectedSample.patientSex === 'F' ? 'Femenino' : 'Masculino'}</p>
          </div>
          <div>
            <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">DATOS DEL ANÁLISIS</h3>
            <p><strong>Muestra ID:</strong> ${selectedSample.id}</p>
            <p><strong>Examen:</strong> ${selectedSample.examType}</p>
            <p><strong>Área:</strong> ${selectedSample.area}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Médico solicitante:</strong> ${selectedSample.doctorName}</p>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">EQUIPOS Y REACTIVOS UTILIZADOS</h3>
          <p><strong>Equipos:</strong> ${analysisData.equipment}</p>
          <p><strong>Reactivos:</strong> ${analysisData.reagents}</p>
          <p><strong>Duración del análisis:</strong> ${analysisData.duration} minutos</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">RESULTADOS</h3>
          <div style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${analysisData.results}
          </div>
        </div>

        ${analysisData.observations ? `
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">OBSERVACIONES</h3>
          <p>${analysisData.observations}</p>
        </div>
        ` : ''}

        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">ANÁLISIS DE COSTOS</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div style="background: #f0f8ff; padding: 10px; border-radius: 5px;">
              <p style="margin: 0; font-weight: bold;">Equipos</p>
              <p style="margin: 0; font-size: 18px;">$${analysisData.equipmentCost.toLocaleString()}</p>
            </div>
            <div style="background: #f0f8ff; padding: 10px; border-radius: 5px;">
              <p style="margin: 0; font-weight: bold;">Reactivos</p>
              <p style="margin: 0; font-size: 18px;">$${analysisData.reagentCost.toLocaleString()}</p>
            </div>
            <div style="background: #f0f8ff; padding: 10px; border-radius: 5px;">
              <p style="margin: 0; font-weight: bold;">Mano de Obra</p>
              <p style="margin: 0; font-size: 18px;">$${analysisData.laborCost.toLocaleString()}</p>
            </div>
          </div>
          <div style="text-align: right; border-top: 2px solid #333; padding-top: 10px;">
            <p style="margin: 0; font-size: 20px; font-weight: bold;">COSTO TOTAL: $${calculateTotalCost().toLocaleString()}</p>
          </div>
        </div>

        <div style="text-align: right; margin-top: 50px;">
          <p style="border-top: 1px solid #333; width: 200px; margin-left: auto; padding-top: 5px;">Laboratorista</p>
          <p style="margin: 0;">Fecha: ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
    `;

    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }

    toast({
      title: "Reporte generado",
      description: "El reporte de resultados ha sido enviado a impresión",
    });
  };

  const handleGenerateBilling = () => {
    if (!selectedSample || !analysisData.results.trim()) {
      toast({
        title: "Error",
        description: "Complete el análisis antes de generar la facturación",
        variant: "destructive"
      });
      return;
    }

    const totalCost = calculateTotalCost();
    
    toast({
      title: "Facturación generada",
      description: `Factura creada por $${totalCost.toLocaleString()} para ${selectedSample.patientName}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Análisis de Muestras</h1>
          <p className="text-slate-600">Procesamiento y registro de resultados</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Samples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="h-5 w-5 text-blue-600" />
              Muestras Pendientes
            </CardTitle>
            <CardDescription>Muestras asignadas para análisis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingSamples.map((sample) => (
                <div key={sample.id} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-slate-800">{sample.patientName}</p>
                      <p className="text-sm text-slate-600">{sample.examType}</p>
                      <p className="text-sm text-slate-500">ID: {sample.id}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{sample.area}</Badge>
                        <Badge variant={sample.priority === 'Urgente' ? 'destructive' : 'default'}>
                          {sample.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">
                        Costo estimado: ${sample.estimatedCost.toLocaleString()}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleStartAnalysis(sample)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Iniciar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              Registro de Resultados
            </CardTitle>
            <CardDescription>
              {selectedSample ? `Análisis: ${selectedSample.examType}` : "Seleccione una muestra para comenzar"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedSample ? (
              <div className="space-y-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium">Paciente: {selectedSample.patientName}</p>
                  <p className="text-sm text-slate-600">Muestra: {selectedSample.id}</p>
                  <p className="text-sm text-slate-600">Examen: {selectedSample.examType}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="equipment">Equipos Utilizados</Label>
                    <Input 
                      id="equipment" 
                      placeholder="Ej: Analizador hematológico XN-1000"
                      value={analysisData.equipment}
                      onChange={(e) => handleInputChange('equipment', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="reagents">Reactivos Utilizados</Label>
                    <Input 
                      id="reagents" 
                      placeholder="Ej: Kit hemograma completo, Lote: ABC123"
                      value={analysisData.reagents}
                      onChange={(e) => handleInputChange('reagents', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="results">Resultados *</Label>
                    <Textarea 
                      id="results"
                      placeholder="Registre los valores obtenidos..."
                      className="min-h-[100px]"
                      value={analysisData.results}
                      onChange={(e) => handleInputChange('results', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="observations">Observaciones</Label>
                    <Textarea 
                      id="observations"
                      placeholder="Notas adicionales o observaciones..."
                      value={analysisData.observations}
                      onChange={(e) => handleInputChange('observations', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="duration">Duración (min)</Label>
                      <Input 
                        id="duration" 
                        type="number"
                        placeholder="30"
                        value={analysisData.duration}
                        onChange={(e) => handleInputChange('duration', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalCost">Costo Total</Label>
                      <Input 
                        id="totalCost" 
                        type="number"
                        value={calculateTotalCost()}
                        readOnly
                        className="bg-slate-100"
                      />
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Label className="text-sm font-medium text-blue-800">Desglose de Costos</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div>
                        <Label htmlFor="equipmentCost" className="text-xs">Equipos</Label>
                        <Input 
                          id="equipmentCost"
                          type="number"
                          size="sm"
                          value={analysisData.equipmentCost}
                          onChange={(e) => handleInputChange('equipmentCost', Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="reagentCost" className="text-xs">Reactivos</Label>
                        <Input 
                          id="reagentCost"
                          type="number"
                          size="sm"
                          value={analysisData.reagentCost}
                          onChange={(e) => handleInputChange('reagentCost', Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="laborCost" className="text-xs">M. Obra</Label>
                        <Input 
                          id="laborCost"
                          type="number"
                          size="sm"
                          value={analysisData.laborCost}
                          onChange={(e) => handleInputChange('laborCost', Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={handleSaveResults}
                    className="bg-blue-600 hover:bg-blue-700 flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Resultados
                  </Button>
                </div>

                {showBillingPreview && (
                  <div className="flex gap-2">
                    <Button 
                      onClick={handlePrintReport}
                      variant="outline"
                      className="flex-1"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Imprimir Reporte
                    </Button>
                    <Button 
                      onClick={handleGenerateBilling}
                      className="bg-green-600 hover:bg-green-700 flex-1"
                    >
                      <Receipt className="h-4 w-4 mr-2" />
                      Generar Factura
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Microscope className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                <p>Seleccione una muestra de la lista para comenzar el análisis</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
