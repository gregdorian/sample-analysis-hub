
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { User, Users } from "lucide-react";

type UserRole = {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
};

const initialUsers: UserRole[] = [
  { id: 1, name: "Administrador", email: "admin@lab.com", role: "Admin", active: true },
  { id: 2, name: "Laboratorista Uno", email: "lab1@lab.com", role: "Laboratorista", active: true },
  { id: 3, name: "Recepcionista", email: "recepcion@lab.com", role: "Recepción", active: false },
];

const ROLES = ["Admin", "Laboratorista", "Recepción"];

export default function UsersRolesTable() {
  const [users, setUsers] = useState<UserRole[]>(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<Omit<UserRole, "id">>({
    name: "",
    email: "",
    role: ROLES[0],
    active: true,
  });

  const addUser = () => {
    setUsers([
      ...users,
      {
        ...newUser,
        id: Date.now(),
      },
    ]);
    setNewUser({ name: "", email: "", role: ROLES[0], active: true });
    setModalOpen(false);
  };

  const toggleActive = (id: number) => {
    setUsers(users =>
      users.map(u => u.id === id ? { ...u, active: !u.active } : u)
    );
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Users className="h-6 w-6 text-blue-700" /> Usuarios del sistema
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <User className="mr-2" /> Añadir usuario
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[120px]">Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Activo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Switch checked={user.active} onCheckedChange={() => toggleActive(user.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir usuario</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <Input
                value={newUser.name}
                onChange={e => setNewUser(nu => ({ ...nu, name: e.target.value }))}
                placeholder="Nombre completo"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={newUser.email}
                onChange={e => setNewUser(nu => ({ ...nu, email: e.target.value }))}
                placeholder="usuario@lab.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rol</label>
              <select
                className="border rounded-md px-3 py-2 w-full bg-background"
                value={newUser.role}
                onChange={e => setNewUser(nu => ({ ...nu, role: e.target.value }))}
              >
                {ROLES.map(r => (
                  <option value={r} key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={newUser.active} onCheckedChange={checked => setNewUser(nu => ({ ...nu, active: checked }))} />
              <span className="text-sm">Activo</span>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={addUser} disabled={!newUser.name || !newUser.email}>
              Guardar
            </Button>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
