import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Printer, Plus, Trash2, Cpu } from "lucide-react";

interface PrinterDevice {
  id: string;
  name: string;
  type: "printer" | "analyzer";
  protocol: string;
  port: string;
  status: "active" | "inactive";
}

const PROTOCOLS = [
  { value: "direct", label: "Impresión directa" },
  { value: "hl7", label: "HL7 v2.x" },
  { value: "astm", label: "ASTM E1381" },
  { value: "serial", label: "Serial RS-232" },
  { value: "tcp", label: "TCP/IP Socket" },
];

const initialDevices: PrinterDevice[] = [
  { id: "1", name: "HP LaserJet Pro", type: "printer", protocol: "direct", port: "USB001", status: "active" },
  { id: "2", name: "Analizador Hematología BC-5000", type: "analyzer", protocol: "hl7", port: "COM3", status: "active" },
  { id: "3", name: "Analizador Química Clínica AU480", type: "analyzer", protocol: "astm", port: "192.168.1.50:9100", status: "inactive" },
];

export default function SettingsPrintParameters() {
  const [devices, setDevices] = useState<PrinterDevice[]>(initialDevices);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<"printer" | "analyzer">("printer");
  const [newProtocol, setNewProtocol] = useState("direct");
  const [newPort, setNewPort] = useState("");
  const { toast } = useToast();

  const handleAdd = () => {
    if (!newName || !newPort) {
      toast({ title: "Error", description: "Complete nombre y puerto/dirección.", variant: "destructive" });
      return;
    }
    const device: PrinterDevice = {
      id: Date.now().toString(),
      name: newName,
      type: newType,
      protocol: newProtocol,
      port: newPort,
      status: "active",
    };
    setDevices([...devices, device]);
    setNewName(""); setNewPort(""); setNewProtocol("direct"); setNewType("printer");
    setShowForm(false);
    toast({ title: "Dispositivo agregado", description: `${device.name} configurado con protocolo ${PROTOCOLS.find(p => p.value === device.protocol)?.label}` });
  };

  const handleDelete = (id: string) => {
    setDevices(devices.filter(d => d.id !== id));
    toast({ title: "Dispositivo eliminado" });
  };

  const toggleStatus = (id: string) => {
    setDevices(devices.map(d => d.id === id ? { ...d, status: d.status === "active" ? "inactive" : "active" } : d));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Printer className="h-5 w-5" />
          Parámetros de Impresión y Equipos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">
          Configure impresoras, analizadores y equipos que entregan resultados directamente (HL7, ASTM, Serial, TCP/IP).
        </p>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dispositivo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Protocolo</TableHead>
                <TableHead>Puerto / Dirección</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[80px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map(device => (
                <TableRow key={device.id}>
                  <TableCell className="font-medium">{device.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1">
                      {device.type === "printer" ? <Printer className="h-3 w-3" /> : <Cpu className="h-3 w-3" />}
                      {device.type === "printer" ? "Impresora" : "Analizador"}
                    </Badge>
                  </TableCell>
                  <TableCell>{PROTOCOLS.find(p => p.value === device.protocol)?.label}</TableCell>
                  <TableCell className="font-mono text-sm">{device.port}</TableCell>
                  <TableCell>
                    <Badge
                      className="cursor-pointer"
                      variant={device.status === "active" ? "default" : "secondary"}
                      onClick={() => toggleStatus(device.id)}
                    >
                      {device.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(device.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {devices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No hay dispositivos configurados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {showForm ? (
          <div className="border rounded-lg bg-card p-4 max-w-xl space-y-4">
            <h3 className="font-semibold">Nuevo Dispositivo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nombre del dispositivo</Label>
                <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Ej: Analizador XN-1000" className="mt-1" />
              </div>
              <div>
                <Label>Tipo</Label>
                <Select value={newType} onValueChange={v => setNewType(v as "printer" | "analyzer")}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="printer">Impresora</SelectItem>
                    <SelectItem value="analyzer">Analizador / Equipo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Protocolo de comunicación</Label>
                <Select value={newProtocol} onValueChange={setNewProtocol}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PROTOCOLS.map(p => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Puerto / Dirección IP</Label>
                <Input value={newPort} onChange={e => setNewPort(e.target.value)} placeholder="Ej: COM3 o 192.168.1.50:9100" className="mt-1" />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button onClick={handleAdd}>Agregar Dispositivo</Button>
            </div>
          </div>
        ) : (
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Agregar Dispositivo
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
