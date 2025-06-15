
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Ampliar el modelo para incluir aseguradora y médico
interface Patient {
  id: number;
  nroIdentificacion: string;
  nombre: string;
  apellido: string;
  aseguradora: string;
  medico: string;
}

interface PatientSearchInputProps {
  value: string;
  onPatientSelected: (patient: Patient | null) => void;
}

// Pacientes de ejemplo ampliados
const PATIENTS: Patient[] = [
  {
    id: 1,
    nroIdentificacion: "12345678",
    nombre: "María",
    apellido: "García",
    aseguradora: "Rimac",
    medico: "Dr. Juan Pérez"
  },
  {
    id: 2,
    nroIdentificacion: "87654321",
    nombre: "Carlos",
    apellido: "López",
    aseguradora: "Pacífico",
    medico: "Dra. Laura Díaz"
  },
  {
    id: 3,
    nroIdentificacion: "11223344",
    nombre: "Ana",
    apellido: "Martínez",
    aseguradora: "Mapfre",
    medico: "Dr. Luis Fernández"
  },
];

export function PatientSearchInput({ value, onPatientSelected }: PatientSearchInputProps) {
  const [searchValue, setSearchValue] = useState(value);
  const [showModal, setShowModal] = useState(false);
  const [notFoundTerm, setNotFoundTerm] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Sincronizar si cambian los props (ej: formulario reiniciado)
  useEffect(() => {
    setSearchValue(value);
    setSelectedPatient(null);
  }, [value]);

  // Buscar paciente por ID o nombre (case insensitive)
  const matchPatient = (term: string): Patient | undefined => {
    return PATIENTS.find(
      p =>
        p.nroIdentificacion === term ||
        (p.nombre + " " + p.apellido).toLowerCase().includes(term.toLowerCase())
    );
  };

  // Cuando el usuario intenta salir del input o presiona Enter
  const tryToSelectPatient = () => {
    if (!searchValue.trim()) {
      setNotFoundTerm(null);
      setSelectedPatient(null);
      onPatientSelected(null);
      return;
    }
    const found = matchPatient(searchValue.trim());
    if (found) {
      setSearchValue(`${found.nombre} ${found.apellido}`);
      setNotFoundTerm(null);
      setSelectedPatient(found);
      onPatientSelected(found);
    } else {
      setShowModal(true);
      setNotFoundTerm(searchValue.trim());
      setSelectedPatient(null);
      onPatientSelected(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSelectedPatient(null);
    if (e.target.value.trim() === "") {
      onPatientSelected(null);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="patient-search">Buscar Paciente *</Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          id="patient-search"
          autoComplete="off"
          placeholder="ID o nombre del paciente"
          className="pl-10"
          value={searchValue}
          onChange={handleInputChange}
          onBlur={tryToSelectPatient}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              tryToSelectPatient();
            }
          }}
        />
      </div>

      {/* Mostrar datos del paciente seleccionado */}
      {selectedPatient && (
        <div className="mt-2 rounded bg-slate-50 border p-3 text-slate-800 space-y-1 shadow-sm">
          <div>
            <span className="font-semibold">Nombre y Apellido:&nbsp;</span>
            {selectedPatient.nombre} {selectedPatient.apellido}
          </div>
          <div>
            <span className="font-semibold">N° Identificación:&nbsp;</span>
            {selectedPatient.nroIdentificacion}
          </div>
          <div>
            <span className="font-semibold">Aseguradora:&nbsp;</span>
            {selectedPatient.aseguradora}
          </div>
          <div>
            <span className="font-semibold">Médico:&nbsp;</span>
            {selectedPatient.medico}
          </div>
        </div>
      )}

      {/* Modal Registro Paciente Nuevo */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Paciente no encontrado</DialogTitle>
            <DialogDescription>
              ¿Desea registrar el paciente <b>{notFoundTerm}</b>?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" className="bg-blue-600 ml-2" onClick={() => setShowModal(false)}>
                Registrar
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

