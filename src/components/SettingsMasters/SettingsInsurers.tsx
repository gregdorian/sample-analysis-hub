
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "../ui/table";

interface Insurer {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
}

export default function SettingsInsurers() {
  const [insurers, setInsurers] = useState<Insurer[]>([]);
  const [form, setForm] = useState<Omit<Insurer, "id">>({ nombre: "", telefono: "", email: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre) return;
    if (editingId !== null) {
      setInsurers(ins => ins.map(i => i.id === editingId ? { ...i, ...form } : i));
      setEditingId(null);
    } else {
      setInsurers(ins => [...ins, { ...form, id: Date.now() }]);
    }
    setForm({ nombre: "", telefono: "", email: "" });
  };

  const handleEdit = (id: number) => {
    const ins = insurers.find(i => i.id === id);
    if (ins) setForm({ nombre: ins.nombre, telefono: ins.telefono, email: ins.email });
    setEditingId(id);
  };

  const handleDelete = (id: number) => setInsurers(ins => ins.filter(i => i.id !== id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aseguradoras</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:flex-row md:items-end">
          <Input placeholder="Nombre" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
          <Input placeholder="Teléfono" value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} />
          <Input placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          <Button type="submit">{editingId !== null ? "Actualizar" : "Agregar"}</Button>
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {insurers.map(ins => (
              <TableRow key={ins.id}>
                <TableCell>{ins.nombre}</TableCell>
                <TableCell>{ins.telefono}</TableCell>
                <TableCell>{ins.email}</TableCell>
                <TableCell>
                  <Button size="sm" variant="secondary" onClick={() => handleEdit(ins.id)}>Editar</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(ins.id)} className="ml-2">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
