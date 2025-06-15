
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const MASTER_SCHEMAS: Record<string, { label: string; columns: string[] }> = {
  "exams": {
    label: "Exámenes",
    columns: ["Codigo", "Nombre", "Área", "Tipo de muestra"]
  },
  "doctors": {
    label: "Médicos",
    columns: ["Nombre", "Apellido", "Especialidad", "Registro"]
  },
  "insurers": {
    label: "Aseguradoras",
    columns: ["Nombre", "Teléfono", "Email"]
  },
  "areas": {
    label: "Áreas",
    columns: ["Nombre"]
  },
  "sampletypes": {
    label: "Tipos de muestra",
    columns: ["Nombre"]
  },
  "priorities": {
    label: "Prioridad",
    columns: ["Nombre"]
  }
};

interface ImportDataModalContentProps {
  initialMaster?: keyof typeof MASTER_SCHEMAS;
}

export default function ImportDataModalContent({ initialMaster = "exams" }: ImportDataModalContentProps) {
  const [master, setMaster] = useState<keyof typeof MASTER_SCHEMAS>(initialMaster);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Funcionalidad de importación simulada para: " + MASTER_SCHEMAS[master].label);
  };

  const schema = MASTER_SCHEMAS[master];

  return (
    <Card>
      <CardContent className="space-y-4 p-0">
        <form onSubmit={handleImport} className="flex flex-col gap-4">
          <div>
            <Label id="master-select-label" htmlFor="master-select">Selecciona el maestro</Label>
            <select
              id="master-select"
              className="w-full border rounded p-2 mt-1"
              value={master}
              onChange={(e) => setMaster(e.target.value as keyof typeof MASTER_SCHEMAS)}
            >
              {Object.entries(MASTER_SCHEMAS).map(([key, info]) => (
                <option value={key} key={key}>{info.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="import-file">Archivo de datos</Label>
            <Input 
              type="file" 
              id="import-file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleFileChange}
            />
            {selectedFile &&
              <p className="text-xs text-muted-foreground mt-1">{selectedFile.name}</p>
            }
          </div>
          
          <div>
            <Label>Estructura esperada</Label>
            <div className="mt-1 rounded bg-slate-50 border text-sm p-3">
              <div className="font-medium mb-1">{schema.label}</div>
              <ul className="list-disc list-inside pl-2">
                {schema.columns.map(col => (
                  <li key={col}>{col}</li>
                ))}
              </ul>
              <div className="mt-1 text-xs text-muted-foreground">
                (El archivo debe tener las columnas mencionadas en el mismo orden).
              </div>
            </div>
          </div>

          <Button type="submit" disabled={!selectedFile}>Importar datos</Button>
        </form>
      </CardContent>
    </Card>
  );
}
