
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "../ui/table";

interface Doctor {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  registro: string;
}

export default function SettingsDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [form, setForm] = useState<Omit<Doctor, "id">>({ nombre: "", apellido: "", especialidad: "", registro: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.apellido) return;
    if (editingId !== null) {
      setDoctors(docs => docs.map(doc => doc.id === editingId ? { ...doc, ...form } : doc));
      setEditingId(null);
    } else {
      setDoctors(docs => [...docs, { ...form, id: Date.now() }]);
    }
    setForm({ nombre: "", apellido: "", especialidad: "", registro: "" });
  };

  const handleEdit = (id: number) => {
    const doc = doctors.find(d => d.id === id);
    if (doc) setForm({ nombre: doc.nombre, apellido: doc.apellido, especialidad: doc.especialidad, registro: doc.registro });
    setEditingId(id);
  };

  const handleDelete = (id: number) => setDoctors(docs => docs.filter(d => d.id !== id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Médicos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:flex-row md:items-end">
          <Input placeholder="Nombre" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
          <Input placeholder="Apellido" value={form.apellido} onChange={e => setForm(f => ({ ...f, apellido: e.target.value }))} />
          <Input placeholder="Especialidad" value={form.especialidad} onChange={e => setForm(f => ({ ...f, especialidad: e.target.value }))} />
          <Input placeholder="Registro" value={form.registro} onChange={e => setForm(f => ({ ...f, registro: e.target.value }))} />
          <Button type="submit">{editingId !== null ? "Actualizar" : "Agregar"}</Button>
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Especialidad</TableHead>
              <TableHead>Registro</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map(doc => (
              <TableRow key={doc.id}>
                <TableCell>{doc.nombre}</TableCell>
                <TableCell>{doc.apellido}</TableCell>
                <TableCell>{doc.especialidad}</TableCell>
                <TableCell>{doc.registro}</TableCell>
                <TableCell>
                  <Button size="sm" variant="secondary" onClick={() => handleEdit(doc.id)}>Editar</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(doc.id)} className="ml-2">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
