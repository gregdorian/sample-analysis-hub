
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

      {/* Hero / Detalle */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-16 py-14 bg-green-50 dark:bg-slate-900 gap-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-green-900 dark:text-white mb-6 leading-tight">
            Transformando el caos en claridad: <span className="text-green-700">Tu camino hacia la excelencia en el laboratorio</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
            Nuestra plataforma web para Laboratorios Clínicos automatiza y optimiza todos los procesos críticos, desde el ingreso del paciente y la toma de muestras, hasta el análisis, la validación de resultados y la entrega de informes.
            <br/><br/>
            Con <b>G-mint</b>, su laboratorio puede reducir significativamente los tiempos de respuesta, minimizar errores manuales y mejorar la calidad del servicio ofrecido a pacientes y médicos referentes.
          </p>
          <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
            La interfaz es intuitiva y personalizable, adaptándose a las necesidades específicas de su laboratorio.
          </p>
          <Button
            size="lg"
            className="bg-green-700 hover:bg-green-800 text-white rounded-full mt-2"
          >
            Solicitar cotización personalizada
          </Button>
        </div>
        <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
            alt="plataforma laboratorio"
            className="rounded-3xl shadow-lg max-w-[400px] w-full object-cover border-4 border-green-200"
          />
        </div>
      </section>

      {/* Beneficios Clave */}
      <section className="py-12 px-4 md:px-16 bg-white dark:bg-background">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-white mb-5 text-center">
          Beneficios Clave
        </h2>
        <ul className="max-w-3xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
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

      {/* Pasos de la plataforma */}
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

      {/* Precios */}
      <section className="py-12 px-4 md:px-16 bg-white dark:bg-background">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 dark:text-white mb-6">
          Precios Flexibles para G-mint Lab
        </h2>
        <p className="text-center max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-200 mb-10">
          G-mint Lab ofrece un modelo de precios a medida. El costo se basa en los módulos y funcionalidades que su laboratorio requiera,
          asegurando que solo pague por lo que utiliza.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center bg-green-50 dark:bg-background shadow rounded-xl py-8 px-6 w-full max-w-xs min-h-[220px]">
            <span className="text-4xl mb-3">🚀</span>
            <b className="text-lg text-green-800 dark:text-green-200 mb-1">Costo de Inicio $0</b>
            <p className="text-gray-700 dark:text-gray-300 text-center text-sm">
              Comience a usar G-mint Lab sin ningún pago inicial obligatorio por la implementación del software.
            </p>
          </div>
          <div className="flex flex-col items-center bg-green-50 dark:bg-background shadow rounded-xl py-8 px-6 w-full max-w-xs min-h-[220px]">
            <span className="text-4xl mb-3">📊</span>
            <b className="text-lg text-green-800 dark:text-green-200 mb-1">Tarifa Mensual Basada en Uso</b>
            <p className="text-gray-700 dark:text-gray-300 text-center text-sm">
              Su pago mensual varía según el número de atenciones o servicios realizados y el almacenamiento en la nube consumido, similar a un servicio público.
            </p>
          </div>
          <div className="flex flex-col items-center bg-green-50 dark:bg-background shadow rounded-xl py-8 px-6 w-full max-w-xs min-h-[220px]">
            <span className="text-4xl mb-3">🧩</span>
            <b className="text-lg text-green-800 dark:text-green-200 mb-1">Plan Personalizado</b>
            <p className="text-gray-700 dark:text-gray-300 text-center text-sm">
              Para conocer el valor exacto de G-mint Lab, utilice nuestro cotizador en línea para seleccionar los módulos y funcionalidades específicas.
              Esto genera una propuesta personalizada según su volumen y las características activadas.
            </p>
          </div>
        </div>
        <div className="text-center mt-10">
          <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-10" size="lg">
            Cotizar Ahora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-green-900 text-white text-center mt-8">
        &copy; {new Date().getFullYear()} G-mint Lab. Todos los derechos reservados.
      </footer>
    </div>
  );
}
