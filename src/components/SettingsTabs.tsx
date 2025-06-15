
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SettingsUsersRoles from "./SettingsSections/SettingsUsersRoles";
import SettingsGeneralPreferences from "./SettingsSections/SettingsGeneralPreferences";
import SettingsLabParameters from "./SettingsSections/SettingsLabParameters";
import SettingsPrintParameters from "./SettingsSections/SettingsPrintParameters";
import SettingsNotifications from "./SettingsSections/SettingsNotifications";
import SettingsDocumentNumbering from "./SettingsSections/SettingsDocumentNumbering";
import SettingsIntegrations from "./SettingsSections/SettingsIntegrations";
import SettingsBackupSecurity from "./SettingsSections/SettingsBackupSecurity";
import SettingsInterfaceConfig from "./SettingsSections/SettingsInterfaceConfig";
import SettingsDefaultValues from "./SettingsSections/SettingsDefaultValues";

const SETTINGS_CATEGORIES = [
  { key: "users", label: "Usuarios y Roles", component: <SettingsUsersRoles /> },
  { key: "preferences", label: "Preferencias Generales", component: <SettingsGeneralPreferences /> },
  { key: "lab-parameters", label: "Parámetros del Laboratorio", component: <SettingsLabParameters /> },
  { key: "print-parameters", label: "Parámetros de Impresión", component: <SettingsPrintParameters /> },
  { key: "notifications", label: "Notificaciones", component: <SettingsNotifications /> },
  { key: "document-numbering", label: "Numeración de Documentos", component: <SettingsDocumentNumbering /> },
  { key: "integrations", label: "Integraciones", component: <SettingsIntegrations /> },
  { key: "backup-security", label: "Respaldos y Seguridad", component: <SettingsBackupSecurity /> },
  { key: "interface-config", label: "Configuración de Interfaces", component: <SettingsInterfaceConfig /> },
  { key: "default-values", label: "Valores por Defecto", component: <SettingsDefaultValues /> },
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
        {SETTINGS_CATEGORIES.map(({ key, component }) => (
          <TabsContent key={key} value={key}>
            {component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
