
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SettingsLabParameters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parámetros del Laboratorio</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Información general del laboratorio (nombre, dirección, teléfono, encabezados, pie de página, logo, etc).
        </p>
      </CardContent>
    </Card>
  );
}
