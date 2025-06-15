
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsUsersRoles() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuarios y Roles</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Administre los usuarios del sistema y gestione los roles y permisos asignados a cada uno.
        </p>
        <Button variant="default" disabled>
          Añadir Usuario (proximamente)
        </Button>
      </CardContent>
    </Card>
  );
}
