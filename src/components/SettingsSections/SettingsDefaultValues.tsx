import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const PRIORITIES = ["Normal", "Urgente", "STAT"];
const SAMPLE_TYPES = ["Sangre", "Orina", "Heces", "Saliva", "Líquido cefalorraquídeo", "Esputo"];
const AREAS = ["Hematología", "Bioquímica", "Microbiología", "Inmunología", "Parasitología", "Uroanálisis"];
const EXAM_TYPES = ["Hemograma Completo", "Glucosa", "Perfil Lipídico", "Función Renal", "Función Hepática"];
const STATUSES = ["Recibida", "En proceso", "Completada"];

interface DefaultValues {
  priority: string;
  sampleType: string;
  area: string;
  examType: string;
  status: string;
  resultsPerPage: string;
}

const STORAGE_KEY = "settings-default-values";

const initialDefaults: DefaultValues = {
  priority: "Normal",
  sampleType: "Sangre",
  area: "Hematología",
  examType: "",
  status: "Recibida",
  resultsPerPage: "20",
};

export default function SettingsDefaultValues() {
  const { toast } = useToast();
  const [values, setValues] = useState<DefaultValues>(initialDefaults);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setValues({ ...initialDefaults, ...JSON.parse(raw) }); } catch { /* ignore */ }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    toast({ title: "Valores por defecto guardados", description: "Se aplicarán en nuevos registros." });
  };

  const update = (key: keyof DefaultValues, val: string) => setValues(prev => ({ ...prev, [key]: val }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Valores por Defecto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Estos valores se precargarán automáticamente en los formularios de recepción de muestras y otros módulos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Prioridad predeterminada</Label>
              <Select value={values.priority} onValueChange={v => update("priority", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de muestra predeterminado</Label>
              <Select value={values.sampleType} onValueChange={v => update("sampleType", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SAMPLE_TYPES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Área predeterminada</Label>
              <Select value={values.area} onValueChange={v => update("area", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {AREAS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Examen predeterminado</Label>
              <Select value={values.examType || "none"} onValueChange={v => update("examType", v === "none" ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="Ninguno" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ninguno</SelectItem>
                  {EXAM_TYPES.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Estado inicial de muestra</Label>
              <Select value={values.status} onValueChange={v => update("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Resultados por página</Label>
              <Select value={values.resultsPerPage} onValueChange={v => update("resultsPerPage", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["10", "20", "50", "100"].map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Guardar valores por defecto
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
