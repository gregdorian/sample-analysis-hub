
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Patient {
  id: number;
  nroIdentificacion: string;
  nombre: string;
  apellido: string;
}

interface PatientSearchInputProps {
  value: string;
  onPatientSelected: (patient: Patient | null) => void;
}

const PATIENTS: Patient[] = [
  { id: 1, nroIdentificacion: "12345678", nombre: "María", apellido: "García" },
  { id: 2, nroIdentificacion: "87654321", nombre: "Carlos", apellido: "López" },
  { id: 3, nroIdentificacion: "11223344", nombre: "Ana", apellido: "Martínez" },
];

export function PatientSearchInput({ value, onPatientSelected }: PatientSearchInputProps) {
  const [searchValue, setSearchValue] = useState(value);
  const [showModal, setShowModal] = useState(false);
  const [notFoundTerm, setNotFoundTerm] = useState<string | null>(null);

  // Buscar paciente por ID o nombre (case insensitive)
  const matchPatient = (term: string) => {
    return PATIENTS.find(p =>
      p.nroIdentificacion === term ||
      (p.nombre + " " + p.apellido).toLowerCase().includes(term.toLowerCase())
    );
  };

  // Cuando el usuario intenta salir del input o presiona Enter
  const tryToSelectPatient = () => {
    if (!searchValue.trim()) {
      onPatientSelected(null);
      return;
    }
    const found = matchPatient(searchValue.trim());
    if (found) {
      onPatientSelected(found);
      setNotFoundTerm(null);
    } else {
      setShowModal(true);
      setNotFoundTerm(searchValue.trim());
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
          placeholder="ID o nombre del paciente"
          className="pl-10"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onBlur={tryToSelectPatient}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              tryToSelectPatient();
            }
          }}
        />
      </div>

      {/* Modal Registro Paciente Nuevo */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Paciente no encontrado</DialogTitle>
            <DialogDescription>
              ¿Desea registrar el paciente <b>{notFoundTerm}</b>?
            </DialogDescription>
          </DialogHeader>
          {/* Aquí puedes mostrar un formulario de registro o integrar PatientManagement */}
          {/* Ejemplo básico: */}
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
            </DialogClose>
            {/* Aquí podrías reemplazar esto con tu flujo real de registro */}
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
