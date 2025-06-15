
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "../ui/table";

interface Exam {
  id: number;
  codigo: string;
  nombre: string;
  area: string;
  tipoMuestra: string;
}

export default function SettingsExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [form, setForm] = useState<Omit<Exam, "id">>({ codigo: "", nombre: "", area: "", tipoMuestra: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre) return;
    if (editingId !== null) {
      setExams(items => items.map(i => i.id === editingId ? { ...i, ...form } : i));
      setEditingId(null);
    } else {
      setExams(items => [...items, { ...form, id: Date.now() }]);
    }
    setForm({ codigo: "", nombre: "", area: "", tipoMuestra: "" });
  };

  const handleEdit = (id: number) => {
    const item = exams.find(i => i.id === id);
    if (item) setForm({ codigo: item.codigo, nombre: item.nombre, area: item.area, tipoMuestra: item.tipoMuestra });
    setEditingId(id);
  };

  const handleDelete = (id: number) => setExams(items => items.filter(i => i.id !== id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exámenes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:flex-row md:items-end">
          <Input placeholder="Código" value={form.codigo} onChange={e => setForm(f => ({ ...f, codigo: e.target.value }))} />
          <Input placeholder="Nombre" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
          <Input placeholder="Área" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} />
          <Input placeholder="Tipo de muestra" value={form.tipoMuestra} onChange={e => setForm(f => ({ ...f, tipoMuestra: e.target.value }))} />
          <Button type="submit">{editingId !== null ? "Actualizar" : "Agregar"}</Button>
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Área</TableHead>
              <TableHead>Tipo de muestra</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.codigo}</TableCell>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.area}</TableCell>
                <TableCell>{item.tipoMuestra}</TableCell>
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
