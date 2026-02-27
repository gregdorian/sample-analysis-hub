
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FlaskConical } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center text-center px-4 md:px-16 py-12 bg-green-50 dark:bg-slate-900 gap-5">
      <span className="text-2xl md:text-3xl font-bold text-green-900 dark:text-white mb-1">
        🧪 Gestión de Laboratorio Clínico con G-MintLab
      </span>
      <p className="text-lg text-green-800 dark:text-green-200 mb-3 font-semibold">
        Tecnología flexible y sin inversión inicial
      </p>
      <h1 className="text-3xl md:text-5xl font-bold text-green-900 dark:text-white mb-6 leading-tight">
        Transformando el caos en claridad:{" "}
        <span className="text-green-700">
          Tu camino hacia la excelencia en el laboratorio
        </span>
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-3 max-w-3xl mx-auto">
        Nuestra plataforma web para Laboratorios Clínicos automatiza y optimiza todos los procesos críticos, desde el ingreso del paciente y la toma de muestras, hasta el análisis, la validación de resultados y la entrega de informes.
        <br /><br />
        Con <b>G-mint</b>, su laboratorio puede reducir significativamente los tiempos de respuesta, minimizar errores manuales y mejorar la calidad del servicio ofrecido a pacientes y médicos referentes.
        <br /><br />
        La interfaz es intuitiva y personalizable, adaptándose a las necesidades específicas de su laboratorio.
      </p>
      <Button
        size="lg"
        className="bg-green-700 hover:bg-green-800 text-white rounded-full px-10 gap-2"
        onClick={() => navigate("/registro-laboratorio")}
      >
        <FlaskConical className="h-5 w-5" />
        Registrar mi Laboratorio
      </Button>
    </section>
  );
};

export default Hero;
