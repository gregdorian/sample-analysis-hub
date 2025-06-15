
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UsersRolesTable from "@/components/UsersRolesTable";

export default function SettingsUsersRoles() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuarios y Roles</CardTitle>
      </CardHeader>
      <CardContent>
        <UsersRolesTable />
      </CardContent>
    </Card>
  );
}
