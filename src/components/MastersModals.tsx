import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import SettingsExams from "./SettingsMasters/SettingsExams";
import SettingsDoctors from "./SettingsMasters/SettingsDoctors";
import SettingsInsurers from "./SettingsMasters/SettingsInsurers";
import SettingsAreas from "./SettingsMasters/SettingsAreas";
import SettingsSampleTypes from "./SettingsMasters/SettingsSampleTypes";
import SettingsPriorities from "./SettingsMasters/SettingsPriorities";
import ImportDataModalContent from "./ImportDataModalContent";

// Placeholder de importador, puedes reemplazar por un componente real de importación si existe
function ImportModalContent() {
  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Importar datos</h2>
      <p className="text-muted-foreground">Funcionalidad para importar datos. (Implementa aquí tu lógica real...)</p>
    </div>
  );
}

// Recibe cuál modal está abierto y funciones para cerrar
interface MastersModalsProps {
  open: string | null;
  onClose: () => void;
}

export default function MastersModals({ open, onClose }: MastersModalsProps) {
  return (
    <>
      <Dialog open={open === "masters-exams"} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Exámenes</DialogTitle>
          </DialogHeader>
          <SettingsExams />
          <DialogClose asChild>
            <button className="mt-4 btn btn-outline">Cerrar</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <Dialog open={open === "masters-doctors"} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Médicos</DialogTitle>
          </DialogHeader>
          <SettingsDoctors />
          <DialogClose asChild>
            <button className="mt-4 btn btn-outline">Cerrar</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <Dialog open={open === "masters-insurers"} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Aseguradoras</DialogTitle>
          </DialogHeader>
          <SettingsInsurers />
          <DialogClose asChild>
            <button className="mt-4 btn btn-outline">Cerrar</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <Dialog open={open === "masters-areas"} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Áreas</DialogTitle>
          </DialogHeader>
          <SettingsAreas />
          <DialogClose asChild>
            <button className="mt-4 btn btn-outline">Cerrar</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <Dialog open={open === "masters-sampletypes"} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Tipos de muestra</DialogTitle>
          </DialogHeader>
          <SettingsSampleTypes />
          <DialogClose asChild>
            <button className="mt-4 btn btn-outline">Cerrar</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <Dialog open={open === "masters-priorities"} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Prioridad</DialogTitle>
          </DialogHeader>
          <SettingsPriorities />
          <DialogClose asChild>
            <button className="mt-4 btn btn-outline">Cerrar</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <Dialog open={open === "masters-import"} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Importar datos</DialogTitle>
          </DialogHeader>
          <ImportDataModalContent />
          <DialogClose asChild>
            <button className="mt-4 btn btn-outline">Cerrar</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
