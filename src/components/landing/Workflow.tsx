
const steps = [
  {
    step: 1,
    title: "Recepción de muestras",
    desc: "Registra y etiqueta rápidamente las muestras entrantes con nuestra interfaz intuitiva y sistema de códigos de barras.",
  },
  {
    step: 2,
    title: "Procesamiento automatizado",
    desc: "Las muestras se asignan automáticamente al flujo de trabajo adecuado, reduciendo errores manuales y ahorrando tiempo.",
  },
  {
    step: 3,
    title: "Análisis de resultados",
    desc: "Aprovecha nuestras herramientas avanzadas de análisis para interpretar los resultados con precisión y eficiencia.",
  },
  {
    step: 4,
    title: "Reportes seguros",
    desc: "Genera y entrega informes completos y seguros a los proveedores de salud y pacientes.",
  },
];

const Workflow = () => (
  <section className="py-12 px-4 md:px-16 bg-green-50 dark:bg-slate-900">
    <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-white mb-6 text-center">
      ¿Cómo funciona G-mint Lab?
    </h2>
    <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {steps.map((s, i) => (
        <div key={i} className="bg-white dark:bg-background rounded-2xl shadow-md p-6 flex flex-col items-center text-center border-t-4 border-green-300">
          <span className="text-4xl text-green-600 font-bold mb-2">{s.step}</span>
          <b className="mb-2 text-green-800 dark:text-green-100">{s.title}</b>
          <p className="text-gray-700 dark:text-gray-300 text-sm">{s.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Workflow;
