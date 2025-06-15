
const benefits = [
  {
    icon: "⚡",
    title: "Flujo de Trabajo Optimizado:",
    desc: "Agiliza la gestión de muestras, órdenes y resultados.",
  },
  {
    icon: "🔗",
    title: "Trazabilidad Completa:",
    desc: "Seguimiento detallado de cada muestra.",
  },
  {
    icon: "🧬",
    title: "Integración con Equipos:",
    desc: "Conectividad con autoanalizadores para captura automática de resultados.",
  },
  {
    icon: "🛡️",
    title: "Control de Calidad Riguroso:",
    desc: "Módulos para gestión de CC internos y externos.",
  },
  {
    icon: "🌐",
    title: "Portal de Resultados Web:",
    desc: "Acceso seguro para pacientes y médicos.",
  },
  {
    icon: "📦",
    title: "Gestión de Inventario:",
    desc: "Control eficiente de reactivos e insumos.",
  },
  {
    icon: "💳",
    title: "Facturación Simplificada:",
    desc: "Módulo de facturación integrado.",
  },
  {
    icon: "📊",
    title: "Reportes Estadísticos Avanzados:",
    desc: "Informes personalizables para toma de decisiones.",
  },
  {
    icon: "📃",
    title: "Cumplimiento Normativo:",
    desc: "Ayuda a cumplir con normativas y estándares de calidad.",
  },
  {
    icon: "🔒",
    title: "Seguridad y Confidencialidad:",
    desc: "Protección de datos robusta.",
  },
];

const KeyBenefits = () => (
  <section className="py-12 px-4 md:px-16 bg-white dark:bg-background">
    <h2 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-white mb-6 text-center">
      Beneficios Clave
    </h2>
    <ul className="max-w-3xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2">
      {benefits.map((b, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-green-700 text-2xl mt-0.5">{b.icon}</span>
          <span>
            <b>{b.title}</b> {b.desc}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default KeyBenefits;
