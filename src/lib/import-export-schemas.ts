export interface DataSchema {
  key: string;
  label: string;
  columns: { field: string; label: string; required?: boolean }[];
  storageKey: string;
}

export const DATA_SCHEMAS: DataSchema[] = [
  {
    key: "patients",
    label: "Pacientes",
    storageKey: "lab-patients",
    columns: [
      { field: "nroIdentificacion", label: "Nro Identificación", required: true },
      { field: "nombre", label: "Nombre", required: true },
      { field: "apellido", label: "Apellido", required: true },
      { field: "historiaClinica", label: "Historia Clínica" },
      { field: "sexo", label: "Sexo (M/F)" },
      { field: "fechaNacimiento", label: "Fecha Nacimiento" },
      { field: "telefono", label: "Teléfono" },
      { field: "email", label: "Email" },
    ],
  },
  {
    key: "doctors",
    label: "Médicos",
    storageKey: "lab-doctors",
    columns: [
      { field: "nombre", label: "Nombre", required: true },
      { field: "apellido", label: "Apellido", required: true },
      { field: "especialidad", label: "Especialidad" },
      { field: "registro", label: "Registro Médico" },
      { field: "telefono", label: "Teléfono" },
      { field: "email", label: "Email" },
    ],
  },
  {
    key: "exams",
    label: "Exámenes",
    storageKey: "lab-exams",
    columns: [
      { field: "codigo", label: "Código", required: true },
      { field: "nombre", label: "Nombre", required: true },
      { field: "area", label: "Área" },
      { field: "tipoMuestra", label: "Tipo de Muestra" },
      { field: "precio", label: "Precio" },
    ],
  },
  {
    key: "cups",
    label: "CUPS",
    storageKey: "lab-cups",
    columns: [
      { field: "codigo", label: "Código CUPS", required: true },
      { field: "descripcion", label: "Descripción", required: true },
      { field: "seccion", label: "Sección" },
      { field: "valor", label: "Valor" },
    ],
  },
  {
    key: "results",
    label: "Resultados",
    storageKey: "lab-results",
    columns: [
      { field: "ordenId", label: "ID Orden", required: true },
      { field: "pacienteId", label: "Nro Identificación Paciente", required: true },
      { field: "examen", label: "Examen", required: true },
      { field: "resultado", label: "Resultado", required: true },
      { field: "unidad", label: "Unidad" },
      { field: "valorReferencia", label: "Valor Referencia" },
      { field: "estado", label: "Estado" },
      { field: "fecha", label: "Fecha" },
    ],
  },
  {
    key: "insurers",
    label: "Aseguradoras",
    storageKey: "lab-insurers",
    columns: [
      { field: "nombre", label: "Nombre", required: true },
      { field: "telefono", label: "Teléfono" },
      { field: "email", label: "Email" },
    ],
  },
  {
    key: "areas",
    label: "Áreas",
    storageKey: "lab-areas",
    columns: [
      { field: "nombre", label: "Nombre", required: true },
    ],
  },
  {
    key: "sampletypes",
    label: "Tipos de Muestra",
    storageKey: "lab-sampletypes",
    columns: [
      { field: "nombre", label: "Nombre", required: true },
    ],
  },
  {
    key: "priorities",
    label: "Prioridades",
    storageKey: "lab-priorities",
    columns: [
      { field: "nombre", label: "Nombre", required: true },
    ],
  },
  {
    key: "reagents",
    label: "Reactivos",
    storageKey: "lab-reagents",
    columns: [
      { field: "nombre", label: "Nombre", required: true },
      { field: "lote", label: "Lote" },
      { field: "fechaVencimiento", label: "Fecha Vencimiento" },
      { field: "proveedor", label: "Proveedor" },
    ],
  },
  {
    key: "equipments",
    label: "Equipos",
    storageKey: "lab-equipments",
    columns: [
      { field: "nombre", label: "Nombre", required: true },
      { field: "marca", label: "Marca" },
      { field: "modelo", label: "Modelo" },
      { field: "serial", label: "Serial" },
    ],
  },
];

export function getSchemaByKey(key: string): DataSchema | undefined {
  return DATA_SCHEMAS.find((s) => s.key === key);
}
