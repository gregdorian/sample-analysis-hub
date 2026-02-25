
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileDown, FileText, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MockResult {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  exams: { name: string; result: string; unit: string; refRange: string; status: "Normal" | "Alto" | "Bajo" }[];
}

const mockResults: MockResult[] = [
  {
    id: "RES-001",
    patientName: "María García",
    patientId: "12345678",
    date: "20/02/2026",
    exams: [
      { name: "Glucosa en Ayunas", result: "92", unit: "mg/dL", refRange: "70-100", status: "Normal" },
      { name: "Hemoglobina", result: "14.2", unit: "g/dL", refRange: "12-16", status: "Normal" },
      { name: "Colesterol Total", result: "245", unit: "mg/dL", refRange: "< 200", status: "Alto" },
    ],
  },
  {
    id: "RES-002",
    patientName: "Carlos Rodríguez",
    patientId: "87654321",
    date: "18/02/2026",
    exams: [
      { name: "TSH", result: "2.5", unit: "mUI/L", refRange: "0.4-4.0", status: "Normal" },
      { name: "Creatinina", result: "0.9", unit: "mg/dL", refRange: "0.7-1.3", status: "Normal" },
    ],
  },
];

const statusColors: Record<string, string> = {
  Normal: "bg-green-100 text-green-800 border-green-300",
  Alto: "bg-red-100 text-red-800 border-red-300",
  Bajo: "bg-yellow-100 text-yellow-800 border-yellow-300",
};

export default function LabResultsLookup() {
  const [docId, setDocId] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<MockResult[]>([]);

  const handleSearch = () => {
    const trimmed = docId.trim();
    if (!trimmed) {
      toast({ title: "Ingrese su número de identificación", variant: "destructive" });
      return;
    }
    const found = mockResults.filter((r) => r.patientId === trimmed);
    setResults(found);
    setSearched(true);
  };

  const handleDownload = (result: MockResult) => {
    // Simulate PDF download
    const content = [
      `RESULTADOS DE LABORATORIO`,
      `Orden: ${result.id}`,
      `Paciente: ${result.patientName}`,
      `Documento: ${result.patientId}`,
      `Fecha: ${result.date}`,
      ``,
      `EXÁMENES:`,
      ...result.exams.map(
        (e) => `  ${e.name}: ${e.result} ${e.unit} (Ref: ${e.refRange}) - ${e.status}`
      ),
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resultado-${result.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Resultado descargado", description: `Archivo resultado-${result.id}.txt` });
  };

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Número de identificación"
            className="pl-9"
          />
        </div>
        <Button onClick={handleSearch} className="gap-2">
          <Search className="h-4 w-4" />
          Consultar
        </Button>
      </div>

      {/* Results */}
      {searched && results.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium">No se encontraron resultados</p>
          <p className="text-sm">Verifique su número de identificación e intente nuevamente.</p>
        </div>
      )}

      {results.map((result) => (
        <Card key={result.id} className="border-primary/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-bold text-foreground text-lg">{result.id}</span>
                  <span className="text-sm text-muted-foreground">— {result.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Paciente: {result.patientName} · Doc: {result.patientId}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 shrink-0"
                onClick={() => handleDownload(result)}
              >
                <FileDown className="h-4 w-4" />
                Descargar
              </Button>
            </div>

            {/* Exam table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-medium text-muted-foreground">Examen</th>
                    <th className="text-center py-2 font-medium text-muted-foreground">Resultado</th>
                    <th className="text-center py-2 font-medium text-muted-foreground">Unidad</th>
                    <th className="text-center py-2 font-medium text-muted-foreground">Ref.</th>
                    <th className="text-center py-2 font-medium text-muted-foreground">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {result.exams.map((exam) => (
                    <tr key={exam.name} className="border-b border-border/50">
                      <td className="py-2 text-foreground font-medium">{exam.name}</td>
                      <td className="py-2 text-center text-foreground">{exam.result}</td>
                      <td className="py-2 text-center text-muted-foreground">{exam.unit}</td>
                      <td className="py-2 text-center text-muted-foreground">{exam.refRange}</td>
                      <td className="py-2 text-center">
                        <Badge className={statusColors[exam.status]}>{exam.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
