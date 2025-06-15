
const faqs = [
  {
    q: "¿Existe un valor fijo para el laboratorio clínico?",
    a: "No, el precio depende del plan personalizado y las funcionalidades seleccionadas.",
  },
  {
    q: "¿Hay costos adicionales por activar este módulo?",
    a: "No hay cobros ocultos. El costo se ajusta a lo que usas y necesitas.",
  },
  {
    q: "¿El sistema se adapta al tamaño de mi centro médico?",
    a: "Sí, el precio varía según el volumen de atenciones. Es ideal tanto para pequeños consultorios como para grandes IPS.",
  },
  {
    q: "¿Incluye integración con otras áreas del sistema?",
    a: "Sí, el módulo de laboratorio se integra completamente con otros componentes de G-MintLab.",
  },
];

const FAQ = () => (
  <section className="py-12 px-4 md:px-16 bg-green-50 dark:bg-slate-900">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-green-900 dark:text-green-100 mb-7">
      📌 Preguntas frecuentes
    </h2>
    <div className="max-w-3xl mx-auto space-y-7">
      {faqs.map((faq, idx) => (
        <div key={idx}>
          <h4 className="font-bold text-green-800 dark:text-green-200">{faq.q}</h4>
          <p className="text-gray-800 dark:text-gray-100">{faq.a}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FAQ;
