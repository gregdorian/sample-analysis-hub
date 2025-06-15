import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SampleReceptionHeaderProps {
  // Quitamos onQuickRegister
}

export function SampleReceptionHeader({}: SampleReceptionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Recepción de Muestras</h1>
        <p className="text-slate-600">Registro y recepción de muestras para análisis</p>
      </div>
      {/* Quitamos el botón verde */}
    </div>
  );
}
