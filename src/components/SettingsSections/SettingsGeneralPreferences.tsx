
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SettingsGeneralPreferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferencias Generales</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Configuración de idioma, zona horaria, formato de fecha/hora y otras preferencias generales.
        </p>
      </CardContent>
    </Card>
  );
}
