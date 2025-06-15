
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SettingsNotifications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Configure alertas o notificaciones, canales, y preferencias de envío (correo, SMS, etc).
        </p>
      </CardContent>
    </Card>
  );
}
