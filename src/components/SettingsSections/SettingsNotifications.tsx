
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const CHANNELS = [
  { value: "sms", label: "SMS" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Correo Electrónico" }
];

const TYPES = [
  { value: "result", label: "Resultado de Análisis" },
  { value: "appointment", label: "Cita de Laboratorio" }
];

export default function SettingsNotifications() {
  const [type, setType] = useState("result");
  const [channel, setChannel] = useState("sms");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    if (!recipient || !message) {
      toast({
        title: "Error",
        description: "Ingrese destinatario y mensaje.",
        variant: "destructive"
      });
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({
        title: "Notificación simulada",
        description: `Se ha simulado el envío de un "${TYPES.find(t => t.value === type)?.label}" vía ${CHANNELS.find(c => c.value === channel)?.label} a: ${recipient}`,
      });
      setMessage("");
      setRecipient("");
    }, 1200);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Configure alertas o notificaciones, canales, y preferencias de envío (correo, SMS, etc).
        </p>
        {/* Formulario simulado de notificiación */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-w-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <Label>Tipo de Notificación</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPES.map(opt => (
                    <SelectItem value={opt.value} key={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Canal de Envío</Label>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CHANNELS.map(opt => (
                    <SelectItem value={opt.value} key={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-4">
            <Label>
              {channel === "email"
                ? "Correo del destinatario"
                : channel === "whatsapp"
                  ? "Número de WhatsApp (+569...)"
                  : "Número de teléfono (+56...)"}
            </Label>
            <Input
              type={channel === "email" ? "email" : "tel"}
              placeholder={
                channel === "email"
                  ? "ej: paciente@gmail.com"
                  : "+56912345678"
              }
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="mb-4">
            <Label>Mensaje</Label>
            <Textarea
              placeholder={
                type === "result"
                  ? "Ej: Estimado paciente, sus resultados están listos..."
                  : "Ej: Le recordamos su cita en el laboratorio..."
              }
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="mt-1 min-h-[80px]"
            />
          </div>

          <Button
            type="button"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSend}
            disabled={sending}
          >
            <Send className="mr-2 h-4 w-4" />
            {sending ? "Enviando..." : "Simular Envío"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

