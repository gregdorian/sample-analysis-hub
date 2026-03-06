
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
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">ID Muestra</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Paciente</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Orden</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Examen</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Área</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Prioridad</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {samples.map((sample) => (
                <tr key={sample.id} className="border-b border-border hover:bg-muted/40">
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
