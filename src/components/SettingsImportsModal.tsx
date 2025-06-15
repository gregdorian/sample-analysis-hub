
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import ImportDataModalContent from "./ImportDataModalContent";

interface SettingsImportsModalProps {
  open: boolean;
  onClose: () => void;
  master: keyof typeof MASTER_SCHEMAS;
}

const MASTER_SCHEMAS = {
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

export default function SettingsImportsModal({ open, onClose, master }: SettingsImportsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Importar datos de {MASTER_SCHEMAS[master].label}</DialogTitle>
        </DialogHeader>
        <ImportDataModalContent initialMaster={master} />
        <DialogClose asChild>
          <button className="mt-4 btn btn-outline">Cerrar</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
