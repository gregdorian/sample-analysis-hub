import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

interface GeneralPrefs {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  decimalSeparator: string;
  thousandsSeparator: string;
  currency: string;
}

const STORAGE_KEY = "settings-general-preferences";

const initialPrefs: GeneralPrefs = {
  language: "es",
  timezone: "America/Bogota",
  dateFormat: "DD/MM/YYYY",
  timeFormat: "24h",
  decimalSeparator: ",",
  thousandsSeparator: ".",
  currency: "COP",
};

const LANGUAGES = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
  { value: "pt", label: "Português" },
];

const TIMEZONES = [
  { value: "America/Bogota", label: "Colombia (GMT-5)" },
  { value: "America/Mexico_City", label: "México (GMT-6)" },
  { value: "America/Lima", label: "Perú (GMT-5)" },
  { value: "America/Buenos_Aires", label: "Argentina (GMT-3)" },
  { value: "America/Santiago", label: "Chile (GMT-4)" },
  { value: "America/Caracas", label: "Venezuela (GMT-4)" },
  { value: "America/New_York", label: "USA Este (GMT-5)" },
  { value: "Europe/Madrid", label: "España (GMT+1)" },
];

const DATE_FORMATS = [
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY — 27/03/2026" },
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY — 03/27/2026" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD — 2026-03-27" },
  { value: "DD-MMM-YYYY", label: "DD-MMM-YYYY — 27-Mar-2026" },
];

const CURRENCIES = [
  { value: "COP", label: "Peso colombiano (COP)" },
  { value: "USD", label: "Dólar (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "MXN", label: "Peso mexicano (MXN)" },
  { value: "PEN", label: "Sol peruano (PEN)" },
  { value: "ARS", label: "Peso argentino (ARS)" },
];

export default function SettingsGeneralPreferences() {
  const { toast } = useToast();
  const [prefs, setPrefs] = useState<GeneralPrefs>(initialPrefs);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setPrefs({ ...initialPrefs, ...JSON.parse(raw) }); } catch { /* ignore */ }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    toast({ title: "Preferencias guardadas", description: "Las preferencias generales se han actualizado." });
  };

  const update = (key: keyof GeneralPrefs, val: string) => setPrefs(prev => ({ ...prev, [key]: val }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferencias Generales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Idioma del sistema</Label>
              <Select value={prefs.language} onValueChange={v => update("language", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Zona horaria</Label>
              <Select value={prefs.timezone} onValueChange={v => update("timezone", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TIMEZONES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Formato de fecha</Label>
              <Select value={prefs.dateFormat} onValueChange={v => update("dateFormat", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DATE_FORMATS.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Formato de hora</Label>
              <RadioGroup value={prefs.timeFormat} onValueChange={v => update("timeFormat", v)} className="flex gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="24h" id="tf-24" />
                  <Label htmlFor="tf-24" className="font-normal">24 horas (14:30)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="12h" id="tf-12" />
                  <Label htmlFor="tf-12" className="font-normal">12 horas (2:30 PM)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Separador decimal</Label>
              <RadioGroup value={prefs.decimalSeparator} onValueChange={v => {
                update("decimalSeparator", v);
                update("thousandsSeparator", v === "," ? "." : ",");
              }} className="flex gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="," id="dec-comma" />
                  <Label htmlFor="dec-comma" className="font-normal">Coma (1.234,56)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="." id="dec-dot" />
                  <Label htmlFor="dec-dot" className="font-normal">Punto (1,234.56)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Moneda</Label>
              <Select value={prefs.currency} onValueChange={v => update("currency", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Guardar preferencias
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
