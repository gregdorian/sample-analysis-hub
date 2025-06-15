
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, FileText, Send } from "lucide-react";

export function Billing() {
  const invoices = [
    {
      id: "FAC001",
      patientName: "María García",
      examType: "Hemograma Completo",
      amount: 25000,
      insurance: "EPS Sanitas",
      status: "Pagada",
      date: "2024-01-15",
      equipmentCost: 5000,
      reagentCost: 8000,
      laborCost: 12000
    },
    {
      id: "FAC002",
      patientName: "Carlos López", 
      examType: "Glucosa",
      amount: 15000,
      insurance: "Nueva EPS",
      status: "Pendiente",
      date: "2024-01-15",
      equipmentCost: 3000,
      reagentCost: 4000,
      laborCost: 8000
    },
    {
      id: "FAC003",
      patientName: "Ana Martínez",
      examType: "Perfil Lipídico", 
      amount: 35000,
      insurance: "Sura EPS",
      status: "Enviada",
      date: "2024-01-14",
      equipmentCost: 8000,
      reagentCost: 12000,
      laborCost: 15000
    }
  ];

  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === 'Pagada').length;
  const pendingInvoices = invoices.filter(inv => inv.status === 'Pendiente').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Facturación</h1>
          <p className="text-slate-600">Gestión de facturación y costos</p>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Ingresos Totales</p>
                <p className="text-2xl font-bold text-slate-800">${totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+8% vs mes anterior</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Facturas Pagadas</p>
                <p className="text-2xl font-bold text-slate-800">{paidInvoices}</p>
                <p className="text-sm text-blue-600">De {invoices.length} totales</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Facturas Pendientes</p>
                <p className="text-2xl font-bold text-slate-800">{pendingInvoices}</p>
                <p className="text-sm text-orange-600">Requieren seguimiento</p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-blue-600" />
            Facturas Generadas
          </CardTitle>
          <CardDescription>Lista de facturas y análisis de costos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Factura</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Paciente</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Examen</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Aseguradora</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Monto</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">{invoice.id}</td>
                    <td className="py-3 px-4">{invoice.patientName}</td>
                    <td className="py-3 px-4">{invoice.examType}</td>
                    <td className="py-3 px-4">{invoice.insurance}</td>
                    <td className="py-3 px-4 font-medium">${invoice.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        invoice.status === 'Pagada' ? 'default' :
                        invoice.status === 'Enviada' ? 'secondary' : 'destructive'
                      }>
                        {invoice.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        {invoice.status === 'Pendiente' && (
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Análisis de Costos por Examen</CardTitle>
          <CardDescription>Desglose detallado de costos operativos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-slate-800">{invoice.examType}</h4>
                  <span className="text-lg font-bold text-slate-800">${invoice.amount.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600">Equipos</p>
                    <p className="font-medium">${invoice.equipmentCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Reactivos</p>
                    <p className="font-medium">${invoice.reagentCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Mano de Obra</p>
                    <p className="font-medium">${invoice.laborCost.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Margen de utilidad:</span>
                    <span className="font-medium text-green-600">
                      ${(invoice.amount - invoice.equipmentCost - invoice.reagentCost - invoice.laborCost).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
