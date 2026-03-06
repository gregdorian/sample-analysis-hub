import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plug, Mail, FileText, Shield, Globe, ChevronDown, ChevronUp } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  enabled: boolean;
  fields: { key: string; label: string; placeholder: string; value: string }[];
}

const defaultIntegrations: Integration[] = [
  {
    id: "efactura",
    name: "Facturación Electrónica",
    description: "Conexión con proveedores de facturación electrónica (SUNAT, SII, DIAN, etc.)",
    icon: FileText,
    category: "Fiscal",
    enabled: false,
    fields: [
      { key: "provider", label: "Proveedor", placeholder: "Ej: Nubefact, SII Chile", value: "" },
      { key: "apiKey", label: "API Key", placeholder: "Ingrese su clave API", value: "" },
      { key: "ruc", label: "RUC / NIT Emisor", placeholder: "Ej: 20123456789", value: "" },
      { key: "endpoint", label: "URL del servicio", placeholder: "https://api.proveedor.com/v1", value: "" },
    ],
  },
  {
    id: "mass-email",
    name: "Envío Masivo de Correos",
    description: "Integración con servicios de email transaccional y marketing (SendGrid, Mailgun, SES)",
    icon: Mail,
    category: "Comunicación",
    enabled: false,
    fields: [
      { key: "provider", label: "Proveedor", placeholder: "Ej: SendGrid, Mailgun, AWS SES", value: "" },
      { key: "apiKey", label: "API Key", placeholder: "Ingrese su clave API", value: "" },
      { key: "senderEmail", label: "Email remitente", placeholder: "noreply@laboratorio.com", value: "" },
      { key: "senderName", label: "Nombre remitente", placeholder: "Laboratorio ABC", value: "" },
    ],
  },
  {
    id: "insurers",
    name: "Aseguradoras",
    description: "Conexión con plataformas de aseguradoras para validación de cobertura y facturación",
    icon: Shield,
    category: "Seguros",
    enabled: false,
    fields: [
      { key: "provider", label: "Plataforma", placeholder: "Ej: API de aseguradora", value: "" },
      { key: "apiKey", label: "Credencial / Token", placeholder: "Token de acceso", value: "" },
      { key: "endpoint", label: "URL del servicio", placeholder: "https://api.aseguradora.com", value: "" },
    ],
  },
  {
    id: "custom-api",
    name: "APIs Externas",
    description: "Conexión con APIs personalizadas (LIS, HIS, ERP, sistemas propios)",
    icon: Globe,
    category: "General",
    enabled: false,
    fields: [
      { key: "name", label: "Nombre de la API", placeholder: "Ej: Sistema HIS del hospital", value: "" },
      { key: "method", label: "Método", placeholder: "GET / POST", value: "" },
      { key: "endpoint", label: "URL Endpoint", placeholder: "https://api.hospital.com/v1/results", value: "" },
      { key: "authHeader", label: "Header de autenticación", placeholder: "Bearer <token>", value: "" },
    ],
  },
];

export default function SettingsIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>(defaultIntegrations);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { toast } = useToast();

  const toggleEnabled = (id: string) => {
    setIntegrations(prev =>
      prev.map(i => i.id === id ? { ...i, enabled: !i.enabled } : i)
    );
  };

  const updateField = (integrationId: string, fieldKey: string, value: string) => {
    setIntegrations(prev =>
      prev.map(i =>
        i.id === integrationId
          ? { ...i, fields: i.fields.map(f => f.key === fieldKey ? { ...f, value } : f) }
          : i
      )
    );
  };

  const handleSave = (id: string) => {
    const integration = integrations.find(i => i.id === id);
    if (!integration) return;
    toast({
      title: "Integración guardada",
      description: `${integration.name} configurada correctamente (simulado).`,
    });
  };

  const handleTest = (id: string) => {
    const integration = integrations.find(i => i.id === id);
    if (!integration) return;
    toast({
      title: "Prueba de conexión",
      description: `Conexión con ${integration.name} exitosa (simulado).`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plug className="h-5 w-5" />
          Integraciones
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Configure integraciones externas como facturación electrónica, correos masivos, aseguradoras y APIs.
        </p>

        {integrations.map(integration => {
          const isExpanded = expandedId === integration.id;
          const Icon = integration.icon;
          return (
            <div key={integration.id} className="border rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : integration.id)}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {integration.name}
                      <Badge variant="outline" className="text-xs">{integration.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={integration.enabled}
                    onCheckedChange={() => toggleEnabled(integration.id)}
                    onClick={e => e.stopPropagation()}
                  />
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t p-4 bg-card space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integration.fields.map(field => (
                      <div key={field.key}>
                        <Label>{field.label}</Label>
                        <Input
                          className="mt-1"
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={e => updateField(integration.id, field.key, e.target.value)}
                          type={field.key.toLowerCase().includes("key") || field.key.toLowerCase().includes("auth") ? "password" : "text"}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => handleTest(integration.id)}>
                      Probar Conexión
                    </Button>
                    <Button onClick={() => handleSave(integration.id)}>
                      Guardar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
