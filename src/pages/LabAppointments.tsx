
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PatientAppointmentModule from "@/components/landing/PatientAppointmentModule";

export default function LabAppointments() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-3 px-4 md:px-10 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-primary-foreground hover:bg-primary-foreground/10 gap-1.5"
          onClick={() => navigate("/laboratorio")}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al portal
        </Button>
      </div>

      {/* Appointment module */}
      <PatientAppointmentModule />
    </div>
  );
}
