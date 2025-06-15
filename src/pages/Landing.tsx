
import React from "react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="bg-white dark:bg-background min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-10 py-5 shadow bg-white dark:bg-background sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-3xl lg:text-4xl font-extrabold text-green-700 tracking-tight">
            G-mint Lab
          </span>
        </div>
        <div>
          <Button
            size="sm"
            className="bg-green-700 hover:bg-green-800 text-white rounded-full"
          >
            Probar demo
          </Button>
        </div>
      </header>

      {/* Presentación principal */}
      <section className="flex flex-col items-center text-center px-4 md:px-16 py-12 bg-green-50 dark:bg-slate-900 gap-5">
        <span className="text-2xl md:text-3xl font-bold text-green-900 dark:text-white mb-1">🧪 Gestión de Laboratorio Clínico con G-MintLab</span>
        <p className="text-lg text-green-800 dark:text-green-200 mb-3 font-semibold">Tecnología flexible y sin inversión inicial</p>
        <h1 className="text-3xl md:text-5xl font-bold text-green-900 dark:text-white mb-6 leading-tight">
          Transformando el caos en claridad: <span className="text-green-700">Tu camino hacia la excelencia en el laboratorio</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-3 max-w-3xl mx-auto">
          Nuestra plataforma web para Laboratorios Clínicos automatiza y optimiza todos los procesos críticos, desde el ingreso del paciente y la toma de muestras, hasta el análisis, la validación de resultados y la entrega de informes. <br/><br/>
          Con <b>G-mint</b>, su laboratorio puede reducir significativamente los tiempos de respuesta, minimizar errores manuales y mejorar la calidad del servicio ofrecido a pacientes y médicos referentes. <br/><br/>
          La interfaz es intuitiva y personalizable, adaptándose a las necesidades específicas de su laboratorio.
        </p>
      </section>

      {/* Beneficios Clave */}
      <section className="py-12 px-4 md:px-16 bg-white dark:bg-background">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-white mb-6 text-center">
          Beneficios Clave
        </h2>
        <ul className="max-w-3xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2">
          <li className="flex items-start gap-3">
            <span className="text-green-700 text-2xl mt-0.5">⚡</span>
            <span>
              <b>Flujo de Trabajo Optimizado:</b> Agiliza la gestión de muestras, órdenes y resultados.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-700 text-2xl mt-0.5">🔗</span>
            <span>
              <b>Trazabilidad Completa:</b> Seguimiento detallado de cada muestra.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-700 text-2xl mt-0.5">🧬</span>
            <span>
              <b>Integración con Equipos:</b> Conectividad con autoanalizadores para captura automática de resultados.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-700 text-2xl mt-0.5">🛡️</span>
            <span>
              <b>Control de Calidad Riguroso:</b> Módulos para gestión de CC internos y externos.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-700 text-2xl mt-0.5">🌐</span>
            <span>
              <b>Portal de Resultados Web:</b> Acceso seguro para pacientes y médicos.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-700 text-2xl mt-0.5">📦</span>
            <span>
              <b>Gestión de Inventario:</b> Control eficiente de reactivos e insumos.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-700 text-2xl mt-0.5">💳</span>
            <span>
              <b>Facturación Simplificada:</b> Módulo de facturación integrado.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-700 text-2xl mt-0.5">📊</span>
            <span>
              <b>Reportes Estadísticos Avanzados:</b> Informes personalizables para toma de decisiones.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-700 text-2xl mt-0.5">📃</span>
            <span>
              <b>Cumplimiento Normativo:</b> Ayuda a cumplir con normativas y estándares de calidad.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-700 text-2xl mt-0.5">🔒</span>
            <span>
              <b>Seguridad y Confidencialidad:</b> Protección de datos robusta.
            </span>
          </li>
        </ul>
      </section>

      {/* Workflow / Pasos */}
      <section className="py-12 px-4 md:px-16 bg-green-50 dark:bg-slate-900">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-white mb-6 text-center">
          ¿Cómo funciona G-mint Lab?
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-background rounded-2xl shadow-md p-6 flex flex-col items-center text-center border-t-4 border-green-300">
            <span className="text-4xl text-green-600 font-bold mb-2">1</span>
            <b className="mb-2 text-green-800 dark:text-green-100">Recepción de muestras</b>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Registra y etiqueta rápidamente las muestras entrantes con nuestra interfaz intuitiva y sistema de códigos de barras.
            </p>
          </div>
          <div className="bg-white dark:bg-background rounded-2xl shadow-md p-6 flex flex-col items-center text-center border-t-4 border-green-300">
            <span className="text-4xl text-green-600 font-bold mb-2">2</span>
            <b className="mb-2 text-green-800 dark:text-green-100">Procesamiento automatizado</b>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Las muestras se asignan automáticamente al flujo de trabajo adecuado, reduciendo errores manuales y ahorrando tiempo.
            </p>
          </div>
          <div className="bg-white dark:bg-background rounded-2xl shadow-md p-6 flex flex-col items-center text-center border-t-4 border-green-300">
            <span className="text-4xl text-green-600 font-bold mb-2">3</span>
            <b className="mb-2 text-green-800 dark:text-green-100">Análisis de resultados</b>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Aprovecha nuestras herramientas avanzadas de análisis para interpretar los resultados con precisión y eficiencia.
            </p>
          </div>
          <div className="bg-white dark:bg-background rounded-2xl shadow-md p-6 flex flex-col items-center text-center border-t-4 border-green-300">
            <span className="text-4xl text-green-600 font-bold mb-2">4</span>
            <b className="mb-2 text-green-800 dark:text-green-100">Reportes seguros</b>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Genera y entrega informes completos y seguros a los proveedores de salud y pacientes.
            </p>
          </div>
        </div>
      </section>

      {/* Precios ajustados y personalizados */}
      <section className="py-12 px-4 md:px-16 bg-white dark:bg-background">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 dark:text-white mb-2">
          ¿Cuánto cuesta el módulo de laboratorio clínico?
        </h2>
        <p className="text-center max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-200 mb-2">
          En G-MintLab no existe un precio fijo único para el módulo de laboratorio clínico. Nuestro modelo de costos se basa en la personalización:
          <b> solo pagas por los módulos y funcionalidades que realmente necesitas</b>, dentro de una plataforma integral pensada para IPS y consultorios.
        </p>
        <p className="text-center text-gray-700 dark:text-gray-200 font-semibold mb-4">No pagas por lo que no usas.</p>
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
          <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 text-center mb-3">✅ Beneficios del módulo</h3>
          <ul className="grid gap-2 grid-cols-1 sm:grid-cols-2 text-gray-700 dark:text-gray-200 mb-6">
            <li>Integración con otros módulos de historia clínica, agenda y facturación</li>
            <li>Registro y seguimiento de muestras</li>
            <li>Resultados disponibles en línea para médicos y pacientes</li>
            <li>Notificaciones automáticas y trazabilidad</li>
            <li>Almacenamiento seguro en la nube</li>
          </ul>
          <div className="text-center mt-5">
            <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-10" size="lg">
              Cotizar Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="py-12 px-4 md:px-16 bg-green-50 dark:bg-slate-900">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-900 dark:text-green-100 mb-7">
          📌 Preguntas frecuentes
        </h2>
        <div className="max-w-3xl mx-auto space-y-7">
          <div>
            <h4 className="font-bold text-green-800 dark:text-green-200">¿Existe un valor fijo para el laboratorio clínico?</h4>
            <p className="text-gray-800 dark:text-gray-100">No, el precio depende del plan personalizado y las funcionalidades seleccionadas.</p>
          </div>
          <div>
            <h4 className="font-bold text-green-800 dark:text-green-200">¿Hay costos adicionales por activar este módulo?</h4>
            <p className="text-gray-800 dark:text-gray-100">No hay cobros ocultos. El costo se ajusta a lo que usas y necesitas.</p>
          </div>
          <div>
            <h4 className="font-bold text-green-800 dark:text-green-200">¿El sistema se adapta al tamaño de mi centro médico?</h4>
            <p className="text-gray-800 dark:text-gray-100">Sí, el precio varía según el volumen de atenciones. Es ideal tanto para pequeños consultorios como para grandes IPS.</p>
          </div>
          <div>
            <h4 className="font-bold text-green-800 dark:text-green-200">¿Incluye integración con otras áreas del sistema?</h4>
            <p className="text-gray-800 dark:text-gray-100">Sí, el módulo de laboratorio se integra completamente con otros componentes de G-MintLab.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-green-900 text-white text-center mt-8">
        &copy; {new Date().getFullYear()} G-mint Lab. Todos los derechos reservados.
      </footer>
    </div>
  );
}
