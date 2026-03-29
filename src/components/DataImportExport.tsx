import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, FileSpreadsheet, FileText, Trash2, Eye, ChevronDown } from "lucide-react";
import { DATA_SCHEMAS, type DataSchema } from "@/lib/import-export-schemas";
import {
  parseFile,
  exportToCsv,
  exportToExcel,
  downloadTemplate,
  loadFromStorage,
  saveToStorage,
} from "@/lib/import-export-utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DataImportExport() {
  const { toast } = useToast();
  const [selectedKey, setSelectedKey] = useState(DATA_SCHEMAS[0].key);
  const [previewData, setPreviewData] = useState<Record<string, string>[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const schema = DATA_SCHEMAS.find((s) => s.key === selectedKey)!;
  const storedData = loadFromStorage(schema.storageKey);

  // --- Import ---
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const rows = await parseFile(file, schema);
      if (rows.length === 0) {
        toast({ title: "Archivo vacío", description: "No se encontraron datos para importar.", variant: "destructive" });
        setImporting(false);
        return;
      }
      // Validate required fields
      const requiredFields = schema.columns.filter((c) => c.required).map((c) => c.field);
      const invalid = rows.filter((r) => requiredFields.some((f) => !r[f]));
      if (invalid.length > 0) {
        toast({
          title: "Datos incompletos",
          description: `${invalid.length} fila(s) tienen campos obligatorios vacíos. Se importarán solo las válidas.`,
          variant: "destructive",
        });
      }
      const validRows = rows.filter((r) => requiredFields.every((f) => r[f]));
      const existing = loadFromStorage(schema.storageKey);
      const merged = [...existing, ...validRows];
      saveToStorage(schema.storageKey, merged);
      toast({ title: "Importación exitosa", description: `${validRows.length} registros importados en ${schema.label}.` });
    } catch (err) {
      toast({ title: "Error al importar", description: String(err), variant: "destructive" });
    }
    setImporting(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  // --- Export ---
  const handleExport = (format: "csv" | "xlsx") => {
    const data = loadFromStorage(schema.storageKey);
    if (data.length === 0) {
      toast({ title: "Sin datos", description: `No hay datos de ${schema.label} para exportar.`, variant: "destructive" });
      return;
    }
    if (format === "csv") exportToCsv(data, schema);
    else exportToExcel(data, schema);
    toast({ title: "Exportación completada", description: `${data.length} registros exportados.` });
  };

  // --- Preview ---
  const handlePreview = () => {
    const data = loadFromStorage(schema.storageKey);
    setPreviewData(data);
    setPreviewOpen(true);
  };

  // --- Clear ---
  const handleClear = () => {
    saveToStorage(schema.storageKey, []);
    toast({ title: "Datos eliminados", description: `Se eliminaron todos los registros de ${schema.label}.` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Importar / Exportar Datos</h2>
        <p className="text-muted-foreground text-sm">Gestione la carga y descarga masiva de datos del laboratorio en CSV o Excel.</p>
      </div>

      {/* Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label>Módulo de datos</Label>
              <Select value={selectedKey} onValueChange={setSelectedKey}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DATA_SCHEMAS.map((s) => (
                    <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {storedData.length} registros almacenados
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Structure Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Estructura de columnas — {schema.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {schema.columns.map((col) => (
              <Badge key={col.field} variant={col.required ? "default" : "outline"} className="text-xs">
                {col.label} {col.required && "*"}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">* Campos obligatorios. El archivo debe contener las columnas en este orden.</p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Import Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Upload className="h-4 w-4" /> Importar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              onClick={() => fileRef.current?.click()}
              disabled={importing}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {importing ? "Importando..." : "Seleccionar archivo CSV / Excel"}
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => downloadTemplate(schema, "csv")} className="flex-1">
                <FileText className="h-3 w-3 mr-1" /> Plantilla CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadTemplate(schema, "xlsx")} className="flex-1">
                <FileSpreadsheet className="h-3 w-3 mr-1" /> Plantilla Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Export Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Download className="h-4 w-4" /> Exportar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full" disabled={storedData.length === 0}>
                  <Download className="h-4 w-4 mr-2" /> Exportar datos
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("csv")}>
                  <FileText className="h-4 w-4 mr-2" /> Exportar como CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("xlsx")}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" /> Exportar como Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePreview} className="flex-1" disabled={storedData.length === 0}>
                <Eye className="h-3 w-3 mr-1" /> Vista previa
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear} className="flex-1 text-destructive hover:text-destructive" disabled={storedData.length === 0}>
                <Trash2 className="h-3 w-3 mr-1" /> Limpiar datos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Vista previa — {schema.label} ({previewData.length} registros)</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  {schema.columns.map((col) => (
                    <TableHead key={col.field}>{col.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.slice(0, 100).map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                    {schema.columns.map((col) => (
                      <TableCell key={col.field}>{row[col.field] || "—"}</TableCell>
                    ))}
                  </TableRow>
                ))}
                {previewData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={schema.columns.length + 1} className="text-center text-muted-foreground py-8">
                      Sin datos almacenados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {previewData.length > 100 && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Mostrando 100 de {previewData.length} registros.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
