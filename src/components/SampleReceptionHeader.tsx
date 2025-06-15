
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SampleReceptionHeaderProps {
  onQuickRegister: () => void;
}

export function SampleReceptionHeader({ onQuickRegister }: SampleReceptionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Recepción de Muestras</h1>
        <p className="text-slate-600">Registro y recepción de muestras para análisis</p>
      </div>
      <Button onClick={onQuickRegister} className="bg-green-600 hover:bg-green-700">
        <Plus className="h-4 w-4 mr-2" />
        Registrar Muestra
      </Button>
    </div>
  );
}
