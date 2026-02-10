import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Image as ImageIcon, Camera, Trash2 } from "lucide-react";

const LEASE_OPTIONS = [
  { value: "1", label: "1 mes" },
  { value: "3", label: "3 meses" },
  { value: "6", label: "6 meses" },
  { value: "12", label: "12 meses (1 año)" },
  { value: "24", label: "24 meses (2 años)" },
];

const STORAGE_KEY = "saas-config";

interface SaasConfig {
  logo: string | null;
  leaseDuration: string;
}

const DEFAULT_CONFIG: SaasConfig = { logo: null, leaseDuration: "12" };

interface SaasConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SaasConfigDialog({ open, onOpenChange }: SaasConfigDialogProps) {
  const [config, setConfig] = useState<SaasConfig>(DEFAULT_CONFIG);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch {}
    }
  }, [open]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "Archivo muy grande", description: "Máximo 2MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setConfig((prev) => ({ ...prev, logo: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    toast({ title: "Configuración guardada", description: `Arrendamiento: ${LEASE_OPTIONS.find((o) => o.value === config.leaseDuration)?.label}` });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Configuración del SaaS</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Logo */}
          <div>
            <Label>Logotipo de la empresa</Label>
            <div className="flex items-center gap-4 mt-2">
              <div
                className="relative group cursor-pointer w-24 h-24 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden bg-muted/30 hover:border-primary/50 transition-colors"
                onClick={() => fileRef.current?.click()}
              >
                {config.logo ? (
                  <>
                    <img src={config.logo} alt="Logo" className="w-full h-full object-contain p-1" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-muted-foreground">
                    <ImageIcon className="h-8 w-8" />
                    <span className="text-[10px]">Subir logo</span>
                  </div>
                )}
              </div>
              {config.logo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfig((prev) => ({ ...prev, logo: null }))}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Quitar
                </Button>
              )}
              <Input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                className="hidden"
                onChange={handleLogoChange}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG o SVG. Máximo 2MB.</p>
          </div>

          {/* Tiempo de arrendamiento */}
          <div>
            <Label htmlFor="lease-duration">Tiempo de arrendamiento del software</Label>
            <Select
              value={config.leaseDuration}
              onValueChange={(val) => setConfig((prev) => ({ ...prev, leaseDuration: val }))}
            >
              <SelectTrigger className="w-full mt-1" id="lease-duration">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LEASE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Seleccione el periodo de uso contratado para el software.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-green-700 hover:bg-green-800 text-white">
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
