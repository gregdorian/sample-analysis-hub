
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Palette, Moon, SunMedium } from "lucide-react";

const LANGUAGES = [
  { value: "es", label: "Español" },
  { value: "en", label: "Inglés" },
];

const THEMES = [
  { value: "light", label: "Claro", icon: SunMedium },
  { value: "dark", label: "Oscuro", icon: Moon },
  { value: "corporate", label: "Corporativo Azul", icon: Palette },
];

export default function SettingsInterfaceConfig() {
  const [language, setLanguage] = useState("es");
  const [theme, setTheme] = useState("light");
  const { toast } = useToast();

  // Simulación de guardado de cambios
  const handleSave = () => {
    toast({
      title: "Configuración guardada",
      description: `Idioma: ${LANGUAGES.find((l) => l.value === language)?.label} | Tema: ${THEMES.find((t) => t.value === theme)?.label}`,
      variant: "default",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de Interfaces</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Personalice la apariencia de la interfaz, menús rápidos, temas, widgets y accesos directos.
        </p>
        <div className="max-w-md border rounded-lg bg-slate-50 p-4 space-y-6">
          <div>
            <Label>Idioma de la aplicación</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Tema de color</Label>
            <ToggleGroup
              type="single"
              value={theme}
              onValueChange={(val) => val && setTheme(val)}
              className="mt-2"
            >
              {THEMES.map((t) => (
                <ToggleGroupItem
                  key={t.value}
                  value={t.value}
                  aria-label={t.label}
                  variant={theme === t.value ? "outline" : "default"}
                  className={`px-5 py-2 flex items-center gap-2 data-[state=on]:bg-blue-100`}
                >
                  <t.icon className="h-5 w-5" />
                  {t.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave}>
              Guardar configuración
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

