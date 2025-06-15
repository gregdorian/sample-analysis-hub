
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export interface ExamItem {
  id: string;
  examType: string;
  sampleType: string;
  area: string;
  priority: string;
}

interface ExamItemTableProps {
  items: ExamItem[];
  onEdit: (item: ExamItem) => void;
  onRemove: (id: string) => void;
}

export function ExamItemTable({ items, onEdit, onRemove }: ExamItemTableProps) {
  return (
    <div className="mt-4">
      <table className="w-full border text-sm bg-white rounded shadow">
        <thead>
          <tr className="bg-slate-100">
            <th className="px-2 py-1">#</th>
            <th className="px-2 py-1">Tipo de Examen</th>
            <th className="px-2 py-1">Tipo de Muestra</th>
            <th className="px-2 py-1">Área</th>
            <th className="px-2 py-1">Prioridad</th>
            <th className="px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={6} className="py-2 text-center text-muted-foreground">No hay exámenes agregados</td>
            </tr>
          )}
          {items.map((item, idx) => (
            <tr key={item.id} className="hover:bg-slate-50">
              <td className="px-2 py-1">{idx + 1}</td>
              <td className="px-2 py-1">{item.examType}</td>
              <td className="px-2 py-1">{item.sampleType}</td>
              <td className="px-2 py-1">{item.area}</td>
              <td className="px-2 py-1">{item.priority}</td>
              <td className="px-2 py-1 flex gap-2">
                <Button size="sm" type="button" variant="outline" onClick={() => onEdit(item)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="sm" type="button" variant="destructive" onClick={() => onRemove(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
