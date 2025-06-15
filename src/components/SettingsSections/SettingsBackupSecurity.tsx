
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function SettingsBackupSecurity() {
  const [autoBackup, setAutoBackup] = useState(false);
  const [retention, setRetention] = useState(30);
  const { toast } = useToast();

  const handleExport = () => {
    // Simula exportación descargando un archivo JSON ficticio
    const blob = new Blob(
      [JSON.stringify({ mensaje: "Backup simulado. No contiene datos reales." }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "labclinico-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Exportación realizada",
      description: "Se descargó una copia de seguridad simulada.",
    });
  };

  const handleAutoBackupChange = (checked: boolean) => {
    setAutoBackup(checked);
    toast({
      title: checked ? "Respaldo automático activado" : "Respaldo automático desactivado",
      description: checked
        ? "El sistema simulará respaldos automáticos cada 24 horas."
        : "Los respaldos automáticos se han desactivado.",
    });
  };

  const handleRetentionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value));
    setRetention(value);
  };

  const handleRetentionSave = () => {
    toast({
      title: "Política de retención actualizada",
      description: `Los respaldos se conservarán durante ${retention} días.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Respaldos y Seguridad</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Configure copias de seguridad automáticas, exportación de datos y políticas de seguridad del sistema.
        </p>
        <div className="space-y-6 max-w-md border rounded-lg bg-slate-50 p-4">
          <div>
            <Label>Respaldo automático</Label>
            <div className="flex items-center gap-4 mt-1">
              <Switch
                id="auto-backup"
                checked={autoBackup}
                onCheckedChange={handleAutoBackupChange}
              />
              <span className="text-sm text-muted-foreground">
                {autoBackup ? "Activado" : "Desactivado"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Simula que el sistema realiza un respaldo automático cada 24 horas.
            </p>
          </div>
          <div>
            <Label>Política de retención de respaldos</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                type="number"
                min={1}
                max={365}
                value={retention}
                onChange={handleRetentionChange}
                className="w-24"
              />
              <span className="text-sm">días</span>
              <Button variant="outline" type="button" onClick={handleRetentionSave}>
                Guardar
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Define cuántos días se conservan los respaldos antes de ser eliminados.
            </div>
          </div>
          <div>
            <Button type="button" onClick={handleExport}>
              Exportar datos
            </Button>
            <span className="block text-xs text-muted-foreground mt-1">
              Descarga inmediata de un respaldo simulado (JSON).
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
