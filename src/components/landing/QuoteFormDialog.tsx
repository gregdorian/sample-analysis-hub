import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Send, Users, Building2 } from "lucide-react";

interface QuoteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QuoteFormDialog({ open, onOpenChange }: QuoteFormDialogProps) {
  const [staffCount, setStaffCount] = useState("");
  const [labCount, setLabCount] = useState("1");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactName, setContactName] = useState("");
  const [comments, setComments] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = () => {
    if (!contactEmail || !contactPhone || !staffCount || !contactName) {
      toast({
        title: "Campos obligatorios",
        description: "Complete nombre, email, teléfono y cantidad de personal.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({
        title: "¡Cotización enviada!",
        description: "Su solicitud ha sido enviada al equipo directivo, comercial y de desarrollo. Nos pondremos en contacto pronto.",
      });
      // Reset
      setStaffCount("");
      setLabCount("1");
      setContactEmail("");
      setContactPhone("");
      setContactName("");
      setComments("");
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Building2 className="h-5 w-5 text-primary" />
            Solicitar Cotización
          </DialogTitle>
          <DialogDescription>
            Complete el formulario y nuestro equipo directivo, comercial y de desarrollo recibirá su solicitud.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <Label>Nombre de contacto *</Label>
            <Input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Nombre completo"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Correo electrónico *</Label>
              <Input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="correo@empresa.com"
              />
            </div>
            <div>
              <Label>Teléfono de contacto *</Label>
              <Input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+57 300 000 0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" /> Personal de laboratorio *
              </Label>
              <Select value={staffCount} onValueChange={setStaffCount}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3">1 a 3 personas</SelectItem>
                  <SelectItem value="4-10">4 a 10 personas</SelectItem>
                  <SelectItem value="11-25">11 a 25 personas</SelectItem>
                  <SelectItem value="26-50">26 a 50 personas</SelectItem>
                  <SelectItem value="50+">Más de 50 personas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" /> Cantidad de laboratorios/sedes
              </Label>
              <Select value={labCount} onValueChange={setLabCount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 laboratorio</SelectItem>
                  <SelectItem value="2-3">2 a 3 laboratorios</SelectItem>
                  <SelectItem value="4-10">4 a 10 laboratorios</SelectItem>
                  <SelectItem value="10+">Más de 10 laboratorios</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Comentarios adicionales</Label>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Cuéntenos sobre sus necesidades específicas, módulos de interés, etc."
              rows={3}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={sending}
            className="w-full gap-2"
            size="lg"
          >
            <Send className="h-4 w-4" />
            {sending ? "Enviando cotización..." : "Enviar Cotización"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Su solicitud será recibida por el equipo directivo, comercial y de desarrollo de G-MintLab.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}