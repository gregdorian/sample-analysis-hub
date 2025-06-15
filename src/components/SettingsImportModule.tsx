
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database, Import } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Patient {
  id: number;
  nroIdentificacion: string;
  nombre: string;
  apellido: string;
  historiaClinica: string;
  sexo: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
}

export function SettingsImportModule() {
  const { toast } = useToast();
  const [selectedMaster, setSelectedMaster] = useState<"patients" | "doctors" | "insurers" | "">("");
  const [csvError, setCsvError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [importedCount, setImportedCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Simular almacenamiento temporal
  const [resultPreview, setResultPreview] = useState<string>("");

  // --- Utilidades CSV ---
  function parsePatientsCsv(text: string): Patient[] {
    const lines = text.trim().split("\n");
    if (lines.length < 2) return [];
    const headers = lines[0].split(",");
    let nextId = Date.now();
    return lines.slice(1).map(line => {
      const values = line.split(",");
      const p: any = {};
      headers.forEach((h, i) => p[h.trim()] = values[i]?.trim() || '');
      return {
        ...p,
        id: nextId++,
        sexo: p.sexo === "F" ? "F" : "M"
      } as Patient;
    });
  }

  const handleCsvFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCsvError(null);
    setImporting(true);
    setResultPreview("");
    const file = e.target.files?.[0];
    if (!file) {
      setImporting(false);
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      const text = ev.target?.result as string;
      try {
        let count = 0;
        if (selectedMaster === "patients") {
          const imported = parsePatientsCsv(text);
          count = imported.length;
          setResultPreview(JSON.stringify(imported.slice(0, 2), null, 2) + (imported.length > 2 ? "...": ""));
        } // Otros maestros aquí (`doctors`, `insurers`)
        toast({ title: "Importación Exitosa", description: `Importados ${count} registros.` });
        setImportedCount(count);
      } catch (err) {
        setCsvError("Error al parsear CSV. Revise el formato.");
        setImportedCount(0);
        setResultPreview("");
      } finally {
        setImporting(false);
      }
    };
    reader.readAsText(file);
  };

  // Importar por API (simulada)
  const handleImportAPI = () => {
    setImporting(true);
    setTimeout(() => {
      let imported: any[] = [];
      if (selectedMaster === "patients") {
        imported = [
          {
            id: Date.now() + 1,
            nroIdentificacion: "000001",
            nombre: "Paciente",
            apellido: "API",
            historiaClinica: "HCAPI",
            sexo: "M",
            fechaNacimiento: "2000-01-01",
            telefono: "555-1111",
            email: "api@api.com"
          }
        ];
      }
      setResultPreview(JSON.stringify(imported, null, 2));
      setImportedCount(imported.length);
      toast({ title: "Importación por API exitosa", description: `Importados ${imported.length} registros.` });
      setImporting(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Importar Datos Maestros</CardTitle>
          <CardDescription>
            Seleccione el maestro que desea importar y elija origen: archivo CSV o API.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4 items-center">
            <Label>Importar maestro:</Label>
            <select
              className="border px-3 py-2 rounded text-gray-800"
              value={selectedMaster}
              onChange={e => { setSelectedMaster(e.target.value as any); setResultPreview(""); setImportedCount(0); setCsvError(null); }}
            >
              <option value="">Seleccione...</option>
              <option value="patients">Pacientes</option>
              <option value="doctors" disabled>Médicos (pronto)</option>
              <option value="insurers" disabled>Aseguradoras (pronto)</option>
            </select>
          </div>
          {selectedMaster && (
            <>
              <div>
                <Label>Importar archivo CSV:</Label>
                <Input
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  disabled={importing}
                  onChange={handleCsvFile}
                  className="mt-1"
                />
                {csvError && <div className="text-destructive text-sm mt-1">{csvError}</div>}
                {selectedMaster === "patients" && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Encabezados válidos: nroIdentificacion,nombre,apellido,historiaClinica,sexo,fechaNacimiento,telefono,email
                  </p>
                )}
              </div>
              <div>
                <Label>Importar desde API (simulado):</Label>
                <Button disabled={importing} className="mt-1" onClick={handleImportAPI}>
                  <Database className="h-4 w-4 mr-2" />
                  {importing ? "Importando..." : "Importar desde API"}
                </Button>
              </div>
              {importedCount > 0 && (
                <div className="bg-slate-50 rounded border p-2 mt-3">
                  <span className="font-bold text-green-700">Importados: {importedCount}</span>
                  <pre className="text-xs text-slate-700 mt-1 overflow-x-auto">{resultPreview}</pre>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
