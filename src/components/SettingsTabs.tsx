
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const SETTINGS_CATEGORIES = [
  { key: "users", label: "Usuarios y Roles" },
  { key: "preferences", label: "Preferencias Generales" },
  { key: "lab-parameters", label: "Parámetros del Laboratorio" },
  { key: "print-parameters", label: "Parámetros de Impresión" },
  { key: "notifications", label: "Notificaciones" },
  { key: "document-numbering", label: "Numeración de Documentos" },
  { key: "integrations", label: "Integraciones" },
  { key: "backup-security", label: "Respaldos y Seguridad" },
  { key: "interface-config", label: "Configuración de Interfaces" },
  { key: "default-values", label: "Valores por Defecto" },
];

export default function SettingsTabs() {
  const [tab, setTab] = useState("users");
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Configuración</h1>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="flex flex-wrap gap-2 mb-4">
          {SETTINGS_CATEGORIES.map(({ key, label }) => (
            <TabsTrigger key={key} value={key}>{label}</TabsTrigger>
          ))}
        </TabsList>
        {SETTINGS_CATEGORIES.map(({ key, label }) => (
          <TabsContent key={key} value={key}>
            <div className="bg-muted rounded-lg p-6 text-center text-muted-foreground min-h-[200px] flex items-center justify-center">
              <span>
                <b>{label}</b>: Configuración aún no implementada.
              </span>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
