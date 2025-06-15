
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Printer } from "lucide-react";

export function Reports() {
  const reports = [
    {
      id: "RPT001",
      patientName: "María García",
      examType: "Hemograma Completo",
      date: "2024-01-15",
      status: "Completado",
      laboratorist: "Dr. Juan Pérez"
    },
    {
      id: "RPT002", 
      patientName: "Carlos López",
      examType: "Glucosa",
      date: "2024-01-15",
      status: "Completado",
      laboratorist: "Dra. Ana Silva"
    },
    {
      id: "RPT003",
      patientName: "Ana Martínez", 
      examType: "Perfil Lipídico",
      date: "2024-01-14",
      status: "En revisión",
      laboratorist: "Dr. Luis García"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Reportes de Resultados</h1>
          <p className="text-slate-600">Generación y gestión de reportes de laboratorio</p>
        </div>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Reportes Disponibles
          </CardTitle>
          <CardDescription>Resultados de análisis completados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">ID Reporte</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Paciente</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Examen</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Fecha</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Laboratorista</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">{report.id}</td>
                    <td className="py-3 px-4">{report.patientName}</td>
                    <td className="py-3 px-4">{report.examType}</td>
                    <td className="py-3 px-4">{report.date}</td>
                    <td className="py-3 px-4">{report.laboratorist}</td>
                    <td className="py-3 px-4">
                      <Badge variant={report.status === 'Completado' ? 'default' : 'secondary'}>
                        {report.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Sample Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Vista Previa del Reporte</CardTitle>
          <CardDescription>Formato estándar de reporte de laboratorio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-6 border border-slate-200 rounded-lg print:shadow-none">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">LABORATORIO CLÍNICO</h2>
              <p className="text-slate-600">Sistema de Gestión de Análisis</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">DATOS DEL PACIENTE</h3>
                <p><strong>Nombre:</strong> María García</p>
                <p><strong>ID:</strong> 12345678</p>
                <p><strong>Historia:</strong> HC001</p>
                <p><strong>Edad:</strong> 38 años</p>
                <p><strong>Sexo:</strong> Femenino</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">DATOS DEL ANÁLISIS</h3>
                <p><strong>Examen:</strong> Hemograma Completo</p>
                <p><strong>Fecha muestra:</strong> 15/01/2024</p>
                <p><strong>Fecha resultado:</strong> 15/01/2024</p>
                <p><strong>Laboratorista:</strong> Dr. Juan Pérez</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-slate-800 mb-3">RESULTADOS</h3>
              <table className="w-full border border-slate-300">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border border-slate-300 px-3 py-2 text-left">Parámetro</th>
                    <th className="border border-slate-300 px-3 py-2 text-left">Resultado</th>
                    <th className="border border-slate-300 px-3 py-2 text-left">Valores Ref.</th>
                    <th className="border border-slate-300 px-3 py-2 text-left">Unidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-3 py-2">Hemoglobina</td>
                    <td className="border border-slate-300 px-3 py-2">14.2</td>
                    <td className="border border-slate-300 px-3 py-2">12.0 - 16.0</td>
                    <td className="border border-slate-300 px-3 py-2">g/dL</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-3 py-2">Hematocrito</td>
                    <td className="border border-slate-300 px-3 py-2">42.5</td>
                    <td className="border border-slate-300 px-3 py-2">36.0 - 46.0</td>
                    <td className="border border-slate-300 px-3 py-2">%</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-3 py-2">Leucocitos</td>
                    <td className="border border-slate-300 px-3 py-2">7,200</td>
                    <td className="border border-slate-300 px-3 py-2">4,000 - 11,000</td>
                    <td className="border border-slate-300 px-3 py-2">/μL</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-slate-800 mb-2">OBSERVACIONES</h3>
              <p className="text-slate-700">Hemograma dentro de parámetros normales.</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-600">____________________</p>
              <p className="text-sm text-slate-600">Dr. Juan Pérez</p>
              <p className="text-sm text-slate-600">Laboratorista Clínico</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
