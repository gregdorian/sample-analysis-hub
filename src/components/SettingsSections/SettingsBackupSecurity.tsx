
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SettingsBackupSecurity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Respaldos y Seguridad</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Configure copias de seguridad automáticas, exportación de datos y políticas de seguridad del sistema.
        </p>
      </CardContent>
    </Card>
  );
}
