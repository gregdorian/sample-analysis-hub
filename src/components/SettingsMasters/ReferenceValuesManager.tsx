
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "../ui/table";

interface ReferenceValue {
  id: number;
  nombre: string;
  valor: string;
  unidad: string;
  notas?: string;
}

export default function ReferenceValuesManager() {
  const [values, setValues] = useState<ReferenceValue[]>([]);
  const [form, setForm] = useState<Omit<ReferenceValue, "id">>({ nombre: "", valor: "", unidad: "", notas: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.valor || !form.unidad) return;
    if (editingId !== null) {
      setValues(items => items.map(i => i.id === editingId ? { ...i, ...form } : i));
      setEditingId(null);
    } else {
      setValues(items => [...items, { ...form, id: Date.now() }]);
    }
    setForm({ nombre: "", valor: "", unidad: "", notas: "" });
  };

  const handleEdit = (id: number) => {
    const item = values.find(i => i.id === id);
    if (item) setForm({ nombre: item.nombre, valor: item.valor, unidad: item.unidad, notas: item.notas || "" });
    setEditingId(id);
  };

  const handleDelete = (id: number) => setValues(items => items.filter(i => i.id !== id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Valores de Referencia y Unidades</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:flex-row md:items-end">
          <Input
            placeholder="Nombre del parámetro"
            value={form.nombre}
            onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
          />
          <Input
            placeholder="Valor de referencia (ej: 4.0 - 10.0)"
            value={form.valor}
            onChange={e => setForm(f => ({ ...f, valor: e.target.value }))}
          />
          <Input
            placeholder="Unidad (ej: mg/dL)"
            value={form.unidad}
            onChange={e => setForm(f => ({ ...f, unidad: e.target.value }))}
          />
          <Input
            placeholder="Notas (opcional)"
            value={form.notas || ""}
            onChange={e => setForm(f => ({ ...f, notas: e.target.value }))}
          />
          <Button type="submit">{editingId !== null ? "Actualizar" : "Agregar"}</Button>
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parámetro</TableHead>
              <TableHead>Valor de Referencia</TableHead>
              <TableHead>Unidad</TableHead>
              <TableHead>Notas</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {values.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.valor}</TableCell>
                <TableCell>{item.unidad}</TableCell>
                <TableCell>{item.notas}</TableCell>
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
