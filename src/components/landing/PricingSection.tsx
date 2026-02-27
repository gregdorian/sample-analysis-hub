
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 px-4 md:px-16 bg-white dark:bg-background">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 dark:text-white mb-2">
        ¿Cuánto cuesta el módulo de laboratorio clínico?
      </h2>
      <p className="text-center max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-200 mb-2">
        En G-MintLab no existe un precio fijo único para el módulo de laboratorio clínico. Nuestro modelo de costos se basa en la personalización:
        <b> solo pagas por los módulos y funcionalidades que realmente necesitas</b>, dentro de una plataforma integral pensada para IPS y consultorios.
      </p>
      <p className="text-center text-gray-700 dark:text-gray-200 font-semibold mb-4">
        No pagas por lo que no usas.
      </p>
      <p className="text-center max-w-2xl mx-auto text-base text-gray-700 dark:text-gray-200 mb-6">
        El módulo de laboratorio clínico se incluye dentro del ecosistema G-MintLab como parte de una solución escalable y adaptada a tu operación.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
        <div className="flex flex-col items-center bg-green-50 dark:bg-background shadow rounded-xl py-8 px-6 w-full max-w-xs min-h-[220px]">
          <span className="text-4xl mb-3">💸</span>
          <b className="text-lg text-green-800 dark:text-green-200 mb-1">Costo inicial: $0</b>
          <p className="text-gray-700 dark:text-gray-300 text-center text-sm">
            Implementar G-MintLab no requiere una inversión inicial. Puedes comenzar sin realizar un pago único obligatorio.
          </p>
        </div>
        <div className="flex flex-col items-center bg-green-50 dark:bg-background shadow rounded-xl py-8 px-6 w-full max-w-xs min-h-[220px]">
          <span className="text-4xl mb-3">📈</span>
          <b className="text-lg text-green-800 dark:text-green-200 mb-1">¿Cómo funciona el pago mensual?</b>
          <p className="text-gray-700 dark:text-gray-300 text-center text-sm">
            El valor mensual se calcula con base en:<br />
            - El número de atenciones o servicios realizados.<br />
            - El uso de funcionalidades activadas.<br />
            - El almacenamiento utilizado en la nube.<br />
            Así como un servicio público, solo pagas por lo que realmente consumes.
          </p>
        </div>
        <div className="flex flex-col items-center bg-green-50 dark:bg-background shadow rounded-xl py-8 px-6 w-full max-w-xs min-h-[220px]">
          <span className="text-4xl mb-3">🧰</span>
          <b className="text-lg text-green-800 dark:text-green-200 mb-1">Personaliza tu solución</b>
          <p className="text-gray-700 dark:text-gray-300 text-center text-sm">
            Para conocer el valor exacto del módulo de laboratorio clínico, puedes usar nuestro cotizador en línea.
            Allí eliges los módulos que necesitas y obtienes una propuesta ajustada al tamaño de tu centro médico y tus requerimientos operativos.
          </p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 text-center mb-3">
          ✅ Beneficios del módulo
        </h3>
        <ul className="grid gap-2 grid-cols-1 sm:grid-cols-2 text-gray-700 dark:text-gray-200 mb-6">
          <li>Integración con otros módulos de historia clínica, agenda y facturación</li>
          <li>Registro y seguimiento de muestras</li>
          <li>Resultados disponibles en línea para médicos y pacientes</li>
          <li>Notificaciones automáticas y trazabilidad</li>
          <li>Almacenamiento seguro en la nube</li>
        </ul>
        <div className="text-center mt-5">
          <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-10" size="lg" onClick={() => navigate("/registro-laboratorio")}>
            Cotizar Ahora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
