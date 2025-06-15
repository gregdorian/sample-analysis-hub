
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SettingsDocumentNumbering() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Numeración de Documentos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Gestione la numeración automática de documentos, series, prefijos y formatos de folio.
        </p>
      </CardContent>
    </Card>
  );
}
