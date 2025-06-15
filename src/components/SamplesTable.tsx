
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Sample {
  id: string;
  patientName: string;
  patientId: string;
  orderNumber: string;
  examType: string;
  sampleType: string;
  area: string;
  priority: string;
  receptionDate: string;
  status: string;
}

interface SamplesTableProps {
  samples: Sample[];
}

export function SamplesTable({ samples }: SamplesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Muestras Recibidas Hoy</CardTitle>
        <CardDescription>Total: {samples.length} muestras</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-600">ID Muestra</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Paciente</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Orden</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Examen</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Área</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Prioridad</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {samples.map((sample) => (
                <tr key={sample.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium">{sample.id}</td>
                  <td className="py-3 px-4">{sample.patientName}</td>
                  <td className="py-3 px-4">{sample.orderNumber}</td>
                  <td className="py-3 px-4">{sample.examType}</td>
                  <td className="py-3 px-4">{sample.area}</td>
                  <td className="py-3 px-4">{sample.priority}</td>
                  <td className="py-3 px-4">
                    <Badge variant={sample.status === 'Recibida' ? 'default' : 'secondary'}>
                      {sample.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">{sample.receptionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
