import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Palette, Moon, SunMedium, Image as ImageIcon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const LANGUAGES = [
  { value: "es", label: "Español" },
  { value: "en", label: "Inglés" },
];

const THEMES = [
  { value: "light", label: "Claro", icon: SunMedium },
  { value: "dark", label: "Oscuro", icon: Moon },
  { value: "corporate", label: "Corporativo Azul", icon: Palette },
];

function loadInterfaceConfig() {
  try {
    const raw = localStorage.getItem("interface-config");
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

export default function SettingsInterfaceConfig() {
  const saved = loadInterfaceConfig();
  const [language, setLanguage] = useState(saved?.language || "es");
  const [labName, setLabName] = useState(saved?.labName || "LabClínico");
  const [logo, setLogo] = useState<string | null>(saved?.logo || null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLogo(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const config = { labName, logo, language, theme };
    localStorage.setItem("interface-config", JSON.stringify(config));
    toast({
      title: "Configuración guardada",
      description: `Nombre: ${labName} | Idioma: ${LANGUAGES.find((l) => l.value === language)?.label} | Tema: ${THEMES.find((t) => t.value === theme)?.label}` + (logo ? " | Logo actualizado" : ""),
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
        <div className="max-w-md border rounded-lg bg-card text-card-foreground p-4 space-y-6">
          <div>
            <Label htmlFor="lab-name">Nombre o razón social del laboratorio</Label>
            <Input
              id="lab-name"
              value={labName}
              onChange={e => setLabName(e.target.value)}
              maxLength={50}
              className="mt-1"
              placeholder="Ej: Laboratorio ABC"
            />
          </div>
          <div>
            <Label>Logo o imagen del laboratorio</Label>
            <div className="flex items-center gap-4 mt-1">
              <div>
                {logo ? (
                  <img
                    src={logo}
                    alt="Logo del laboratorio"
                    className="w-16 h-16 object-contain rounded border"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center rounded border bg-muted text-muted-foreground">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => logoInputRef.current?.click()}
                className="ml-2"
              >
                Subir logo
              </Button>
              <Input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
              {logo && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Quitar logo"
                  onClick={() => setLogo(null)}
                >
                  ✕
                </Button>
              )}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Formatos permitidos: PNG, JPG, JPEG. Tamaño sugerido: 128x128px</div>
          </div>
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
              onValueChange={val => val && setTheme(val as "light" | "dark" | "corporate")}
              className="mt-2"
            >
              {THEMES.map((t) => (
                <ToggleGroupItem
                  key={t.value}
                  value={t.value}
                  aria-label={t.label}
                  variant={theme === t.value ? "outline" : "default"}
                  className={`px-5 py-2 flex items-center gap-2 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground`}
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
