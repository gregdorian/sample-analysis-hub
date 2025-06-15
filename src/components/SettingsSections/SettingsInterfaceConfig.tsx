
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SettingsInterfaceConfig() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de Interfaces</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Personalice la apariencia de la interfaz, menús rápidos, temas, widgets y accesos directos.
        </p>
      </CardContent>
    </Card>
  );
}
