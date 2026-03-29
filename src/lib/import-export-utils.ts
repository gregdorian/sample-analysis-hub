import * as XLSX from "xlsx";
import type { DataSchema } from "./import-export-schemas";

// ---------- PARSE (CSV / XLSX) ----------

export function parseFile(file: File, schema: DataSchema): Promise<Record<string, string>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const isCsv = file.name.toLowerCase().endsWith(".csv");

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        let rows: Record<string, string>[];

        if (isCsv) {
          rows = parseCsvText(data as string, schema);
        } else {
          const wb = XLSX.read(data, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const json: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
          rows = mapRowsToSchema(json, schema);
        }
        resolve(rows);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject(new Error("Error leyendo archivo"));
    if (isCsv) reader.readAsText(file);
    else reader.readAsArrayBuffer(file);
  });
}

function parseCsvText(text: string, schema: DataSchema): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(/[,;]/).map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(/[,;]/);
    const row: Record<string, string> = {};
    schema.columns.forEach((col, i) => {
      row[col.field] = values[i]?.trim() || "";
    });
    return row;
  });
}

function mapRowsToSchema(json: string[][], schema: DataSchema): Record<string, string>[] {
  if (json.length < 2) return [];
  return json.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    schema.columns.forEach((col, i) => {
      obj[col.field] = String(row[i] ?? "").trim();
    });
    return obj;
  });
}

// ---------- EXPORT ----------

export function exportToCsv(data: Record<string, string>[], schema: DataSchema): void {
  const header = schema.columns.map((c) => c.label).join(",");
  const rows = data.map((row) =>
    schema.columns.map((c) => `"${(row[c.field] ?? "").replace(/"/g, '""')}"`).join(",")
  );
  const csv = [header, ...rows].join("\n");
  downloadBlob(csv, `${schema.label}.csv`, "text/csv;charset=utf-8;");
}

export function exportToExcel(data: Record<string, string>[], schema: DataSchema): void {
  const headers = schema.columns.map((c) => c.label);
  const rows = data.map((row) => schema.columns.map((c) => row[c.field] ?? ""));
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

  // Auto-width
  ws["!cols"] = headers.map((h) => ({ wch: Math.max(h.length + 2, 15) }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, schema.label);
  XLSX.writeFile(wb, `${schema.label}.xlsx`);
}

export function downloadTemplate(schema: DataSchema, format: "csv" | "xlsx"): void {
  if (format === "csv") {
    const csv = schema.columns.map((c) => c.label).join(",");
    downloadBlob(csv, `plantilla_${schema.key}.csv`, "text/csv;charset=utf-8;");
  } else {
    const headers = schema.columns.map((c) => c.label);
    const ws = XLSX.utils.aoa_to_sheet([headers]);
    ws["!cols"] = headers.map((h) => ({ wch: Math.max(h.length + 2, 15) }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, schema.label);
    XLSX.writeFile(wb, `plantilla_${schema.key}.xlsx`);
  }
}

function downloadBlob(content: string, filename: string, type: string) {
  const blob = new Blob(["\uFEFF" + content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------- STORAGE ----------

export function loadFromStorage(storageKey: string): Record<string, string>[] {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToStorage(storageKey: string, data: Record<string, string>[]): void {
  localStorage.setItem(storageKey, JSON.stringify(data));
}
