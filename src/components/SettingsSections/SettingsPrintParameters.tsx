
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SettingsPrintParameters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parámetros de Impresión</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Ajuste los formatos e impresoras predeterminadas para la impresión de reportes o resultados.
        </p>
      </CardContent>
    </Card>
  );
}
