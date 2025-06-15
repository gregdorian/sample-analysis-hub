
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SettingsDoctors from "./SettingsMasters/SettingsDoctors";
import SettingsInsurers from "./SettingsMasters/SettingsInsurers";
import SettingsExams from "./SettingsMasters/SettingsExams";
import SettingsAreas from "./SettingsMasters/SettingsAreas";
import SettingsSampleTypes from "./SettingsMasters/SettingsSampleTypes";
import SettingsPriorities from "./SettingsMasters/SettingsPriorities";
import SettingsImportsModal from "./SettingsImportsModal";
import { Button } from "./ui/button";
import { Import } from "lucide-react";

// Relación de cada value/tab con la clave esperada en las importaciones
const keys = {
  exams: "exams",
  doctors: "doctors",
  insurers: "insurers",
  areas: "areas",
  sampletypes: "sampletypes",
  priorities: "priorities"
} as const;

export function SettingsImportModule() {
  const [importModal, setImportModal] = useState<{ open: boolean; master: keyof typeof keys } | null>(null);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="exams" className="w-full">
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="exams">Exámenes</TabsTrigger>
          <TabsTrigger value="doctors">Médicos</TabsTrigger>
          <TabsTrigger value="insurers">Aseguradoras</TabsTrigger>
          <TabsTrigger value="areas">Áreas</TabsTrigger>
          <TabsTrigger value="sampletypes">Tipos de muestra</TabsTrigger>
          <TabsTrigger value="priorities">Prioridad</TabsTrigger>
        </TabsList>

        <TabsContent value="exams">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium text-lg">Exámenes</span>
            <Button variant="secondary" onClick={() => setImportModal({ open: true, master: "exams" })} size="sm">
              <Import className="h-4 w-4 mr-2" /> Importar
            </Button>
          </div>
          <SettingsExams />
        </TabsContent>

        <TabsContent value="doctors">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium text-lg">Médicos</span>
            <Button variant="secondary" onClick={() => setImportModal({ open: true, master: "doctors" })} size="sm">
              <Import className="h-4 w-4 mr-2" /> Importar
            </Button>
          </div>
          <SettingsDoctors />
        </TabsContent>

        <TabsContent value="insurers">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium text-lg">Aseguradoras</span>
            <Button variant="secondary" onClick={() => setImportModal({ open: true, master: "insurers" })} size="sm">
              <Import className="h-4 w-4 mr-2" /> Importar
            </Button>
          </div>
          <SettingsInsurers />
        </TabsContent>

        <TabsContent value="areas">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium text-lg">Áreas</span>
            <Button variant="secondary" onClick={() => setImportModal({ open: true, master: "areas" })} size="sm">
              <Import className="h-4 w-4 mr-2" /> Importar
            </Button>
          </div>
          <SettingsAreas />
        </TabsContent>

        <TabsContent value="sampletypes">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium text-lg">Tipos de muestra</span>
            <Button variant="secondary" onClick={() => setImportModal({ open: true, master: "sampletypes" })} size="sm">
              <Import className="h-4 w-4 mr-2" /> Importar
            </Button>
          </div>
          <SettingsSampleTypes />
        </TabsContent>

        <TabsContent value="priorities">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium text-lg">Prioridad</span>
            <Button variant="secondary" onClick={() => setImportModal({ open: true, master: "priorities" })} size="sm">
              <Import className="h-4 w-4 mr-2" /> Importar
            </Button>
          </div>
          <SettingsPriorities />
        </TabsContent>
      </Tabs>

      {importModal?.open && (
        <SettingsImportsModal
          open={importModal.open}
          onClose={() => setImportModal(null)}
          master={importModal.master}
        />
      )}
    </div>
  );
}
