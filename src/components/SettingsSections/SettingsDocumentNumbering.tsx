import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ListRestart, RotateCcw } from "lucide-react";

export default function SettingsDocumentNumbering() {
  // Estado local simulado (en una app real este valor vendría del servidor)
  const [currentNumber, setCurrentNumber] = useState<number>(10001);
  const [formValue, setFormValue] = useState<string>("");
  const { toast } = useToast();

  // Restablecer el contador
  const handleReset = () => {
    setCurrentNumber(1);
    setFormValue("");
    toast({
      title: "Numeración restablecida",
      description: "El contador de documentos fue restablecido a 1.",
      variant: "default"
    });
  };

  // Iniciar desde un número específico
  const handleSetInitial = (e: React.FormEvent) => {
    e.preventDefault();
    const newNumber = parseInt(formValue, 10);
    if (isNaN(newNumber) || newNumber < 1) {
      toast({
        title: "Error",
        description: "Ingrese un número válido, mayor o igual a 1.",
        variant: "destructive"
      });
      return;
    }
    setCurrentNumber(newNumber);
    setFormValue("");
    toast({
      title: "Nuevo inicio establecido",
      description: `La numeración de documentos ahora empezará desde ${newNumber}`,
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Numeración de Documentos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Gestione la numeración automática de documentos, series, prefijos y formatos de folio.
        </p>
        <div className="max-w-md border rounded-lg bg-slate-50 p-4 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="block text-xs text-muted-foreground">Número actual</span>
              <div className="font-mono text-lg font-semibold">{currentNumber}</div>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleReset}
              aria-label="Restablecer numeración"
              className="gap-2"
            >
              <ListRestart className="h-4 w-4" />
              Restablecer a 1
            </Button>
          </div>
          <form onSubmit={handleSetInitial} className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="doc-init">Iniciar desde un número específico</Label>
              <Input
                id="doc-init"
                type="number"
                min={1}
                placeholder="Ej: 5000"
                value={formValue}
                onChange={e => setFormValue(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Establecer
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
