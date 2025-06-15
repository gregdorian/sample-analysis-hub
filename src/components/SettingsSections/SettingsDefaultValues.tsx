
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SettingsDefaultValues() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Valores por Defecto</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Defina valores predeterminados para prioridades, tipos de muestra, áreas, y más.
        </p>
      </CardContent>
    </Card>
  );
}
