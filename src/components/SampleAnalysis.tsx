
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Microscope, FileText, Printer, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SampleAnalysis() {
  const [selectedSample, setSelectedSample] = useState<any>(null);
  const { toast } = useToast();

  const pendingSamples = [
    {
      id: "M001",
      patientName: "María García",
      examType: "Hemograma Completo",
      area: "Hematología",
      priority: "Normal",
      receptionDate: "2024-01-15",
      estimatedCost: 25000
    },
    {
      id: "M003",
      patientName: "Ana Martínez",
      examType: "Perfil Lipídico",
      area: "Bioquímica",
      priority: "Urgente",
      receptionDate: "2024-01-15",
      estimatedCost: 35000
    }
  ];

  const handleStartAnalysis = (sample: any) => {
    setSelectedSample(sample);
  };

  const handleSaveResults = () => {
    toast({
      title: "Resultados guardados",
      description: "Los resultados del análisis han sido guardados exitosamente",
    });
  };

  const handlePrintReport = () => {
    window.print();
    toast({
      title: "Reporte impreso",
      description: "El reporte de resultados ha sido enviado a la impresora",
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
                    />
                  </div>

                  <div>
                    <Label htmlFor="reagents">Reactivos Utilizados</Label>
                    <Input 
                      id="reagents" 
                      placeholder="Ej: Kit hemograma completo, Lote: ABC123"
                    />
                  </div>

                  <div>
                    <Label htmlFor="results">Resultados</Label>
                    <Textarea 
                      id="results"
                      placeholder="Registre los valores obtenidos..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="observations">Observaciones</Label>
                    <Textarea 
                      id="observations"
                      placeholder="Notas adicionales o observaciones..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="cost">Costo Real</Label>
                      <Input 
                        id="cost" 
                        type="number"
                        placeholder="0"
                        defaultValue={selectedSample.estimatedCost}
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duración (min)</Label>
                      <Input 
                        id="duration" 
                        type="number"
                        placeholder="30"
                      />
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
                  <Button 
                    onClick={handlePrintReport}
                    variant="outline"
                    className="flex-1"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimir Reporte
                  </Button>
                </div>
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
