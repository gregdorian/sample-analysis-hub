
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "../ui/table";

interface Priority {
  id: number;
  nombre: string;
}

export default function SettingsPriorities() {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [form, setForm] = useState<Omit<Priority, "id">>({ nombre: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre) return;
    if (editingId !== null) {
      setPriorities(items => items.map(i => i.id === editingId ? { ...i, ...form } : i));
      setEditingId(null);
    } else {
      setPriorities(items => [...items, { ...form, id: Date.now() }]);
    }
    setForm({ nombre: "" });
  };

  const handleEdit = (id: number) => {
    const item = priorities.find(i => i.id === id);
    if (item) setForm({ nombre: item.nombre });
    setEditingId(id);
  };

  const handleDelete = (id: number) => setPriorities(items => items.filter(i => i.id !== id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prioridad</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:flex-row md:items-end">
          <Input placeholder="Nombre" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
          <Button type="submit">{editingId !== null ? "Actualizar" : "Agregar"}</Button>
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {priorities.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>
                  <Button size="sm" variant="secondary" onClick={() => handleEdit(item.id)}>Editar</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)} className="ml-2">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
