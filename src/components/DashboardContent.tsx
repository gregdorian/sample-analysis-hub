
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, TestTube, TrendingUp, Clock, CheckCircle } from "lucide-react";

export function DashboardContent() {
  const stats = [
    {
      title: "Muestras Recibidas Hoy",
      value: "45",
      change: "+12%",
      icon: TestTube,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Análisis Completados",
      value: "38",
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pacientes Atendidos",
      value: "32",
      change: "+15%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Análisis Pendientes",
      value: "7",
      change: "-5%",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const recentSamples = [
    { id: "M001", patient: "María García", exam: "Hemograma Completo", status: "En proceso", time: "09:30" },
    { id: "M002", patient: "Carlos López", exam: "Glucosa", status: "Completado", time: "09:15" },
    { id: "M003", patient: "Ana Martínez", exam: "Perfil Lipídico", status: "En proceso", time: "09:00" },
    { id: "M004", patient: "Luis Rodríguez", exam: "Función Renal", status: "Pendiente", time: "08:45" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-600">Resumen de actividades del laboratorio</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Última actualización</p>
          <p className="text-sm font-medium">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} vs ayer
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Muestras Recientes</CardTitle>
            <CardDescription>Actividad de las últimas horas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSamples.map((sample) => (
                <div key={sample.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">{sample.patient}</p>
                    <p className="text-sm text-slate-600">{sample.exam}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      sample.status === 'Completado' ? 'bg-green-100 text-green-800' :
                      sample.status === 'En proceso' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {sample.status}
                    </span>
                    <p className="text-sm text-slate-500 mt-1">{sample.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad por Área</CardTitle>
            <CardDescription>Distribución de exámenes por departamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { area: "Hematología", count: 15, color: "bg-red-500" },
                { area: "Bioquímica", count: 12, color: "bg-blue-500" },
                { area: "Microbiología", count: 8, color: "bg-green-500" },
                { area: "Inmunología", count: 10, color: "bg-purple-500" },
              ].map((area) => (
                <div key={area.area} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${area.color}`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{area.area}</p>
                  </div>
                  <span className="text-sm font-medium text-slate-600">{area.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
