
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SettingsIntegrations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integraciones</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Configure integraciones externas como facturación electrónica, correos, aseguradoras, APIs, etc.
        </p>
      </CardContent>
    </Card>
  );
}
