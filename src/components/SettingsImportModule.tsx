
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SettingsDoctors from "./SettingsMasters/SettingsDoctors";
import SettingsInsurers from "./SettingsMasters/SettingsInsurers";
import SettingsExams from "./SettingsMasters/SettingsExams";
import SettingsAreas from "./SettingsMasters/SettingsAreas";
import SettingsSampleTypes from "./SettingsMasters/SettingsSampleTypes";
import SettingsPriorities from "./SettingsMasters/SettingsPriorities";

// Importador queda como tab separado si se requiere
export function SettingsImportModule() {
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
          <SettingsExams />
        </TabsContent>
        <TabsContent value="doctors">
          <SettingsDoctors />
        </TabsContent>
        <TabsContent value="insurers">
          <SettingsInsurers />
        </TabsContent>
        <TabsContent value="areas">
          <SettingsAreas />
        </TabsContent>
        <TabsContent value="sampletypes">
          <SettingsSampleTypes />
        </TabsContent>
        <TabsContent value="priorities">
          <SettingsPriorities />
        </TabsContent>
      </Tabs>
    </div>
  );
}
