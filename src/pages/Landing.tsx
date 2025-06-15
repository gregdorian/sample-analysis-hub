
import React from "react";
import { Button } from "@/components/ui/button";

const heroImage =
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1280&q=80";

const services = [
  {
    title: "Análisis Clínicos",
    desc: "Resultados precisos y confiables para el bienestar de tus pacientes.",
    icon: (
      <span className="text-green-600 text-3xl font-bold">🧪</span>
    ),
  },
  {
    title: "Biología Molecular",
    desc: "Tecnología de punta para estudiar y diagnosticar enfermedades.",
    icon: (
      <span className="text-green-600 text-3xl font-bold">🧬</span>
    ),
  },
  {
    title: "Atención Personalizada",
    desc: "Equipo humano dispuesto para asesoría y acompañamiento.",
    icon: (
      <span className="text-green-600 text-3xl font-bold">🤝</span>
    ),
  },
];

export default function Landing() {
  return (
    <div className="bg-white dark:bg-background min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-10 py-5 shadow-sm bg-opacity-90 bg-white dark:bg-background sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-3xl lg:text-4xl font-extrabold text-green-700 tracking-tight">
            G-MintLab
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-base">
          <a href="#servicios" className="hover:text-green-700 transition font-medium">Servicios</a>
          <a href="#quienes" className="hover:text-green-700 transition font-medium">¿Quiénes somos?</a>
          <a href="#contacto" className="hover:text-green-700 transition font-medium">Contacto</a>
        </nav>
        <div className="hidden md:block">
          <Button size="sm" className="bg-green-700 hover:bg-green-800 text-white rounded-full">Agendar cita</Button>
        </div>
      </header>
      {/* Hero */}
      <section className="flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-14 bg-green-50 dark:bg-slate-900">
        <div className="max-w-xl mb-8 md:mb-0 md:mr-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-900 dark:text-white mb-6 leading-tight">
            Laboratorio Clínico <br />
            Innovador y Preciso
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-8">
            Confía en <strong>G-MintLab</strong> para el diagnóstico oportuno y apoyo a profesionales de la salud en toda Colombia.
          </p>
          <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white rounded-full">
            Solicitar Examen
          </Button>
        </div>
        <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
          <img
            src={heroImage}
            alt="Laboratorio G-MintLab"
            className="rounded-3xl shadow-lg max-w-[400px] w-full object-cover border-4 border-green-200"
          />
        </div>
      </section>
      {/* Servicios */}
      <section id="servicios" className="py-16 px-4 md:px-16 bg-white dark:bg-background">
        <h2 className="text-3xl font-bold text-center text-green-800 dark:text-white mb-5">Nuestros servicios</h2>
        <div className="flex flex-col md:flex-row gap-8 mt-8 justify-center max-w-4xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex-1 bg-green-50 dark:bg-slate-800 rounded-2xl p-8 flex flex-col items-center shadow-md hover:scale-105 transition-transform"
            >
              {service.icon}
              <h3 className="mt-4 text-xl font-semibold text-green-900 dark:text-white">{service.title}</h3>
              <p className="mt-2 text-base text-gray-700 dark:text-gray-300 text-center">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Quienes somos */}
      <section id="quienes" className="py-16 px-4 md:px-16 bg-green-100 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-white mb-6">¿Quiénes somos?</h2>
          <p className="text-lg text-gray-700 dark:text-gray-200">
            En <b>G-MintLab</b> nos apasiona la innovación y la calidad en la atención. Ofrecemos servicios de laboratorio clínico con altos estándares, tecnología de punta y calidez humana.
          </p>
        </div>
      </section>
      {/* Contacto / CTA */}
      <section id="contacto" className="py-16 px-4 md:px-16 bg-white dark:bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-900 dark:text-white">¿Listo para agendar tu examen?</h2>
          <p className="text-gray-700 dark:text-gray-200 mb-8">
            Contáctanos para recibir asesoría personalizada y atención prioritaria.
          </p>
          <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-10" size="lg">
            Agenda tu cita
          </Button>
          <div className="mt-6 text-sm text-gray-700 dark:text-gray-300">
            Teléfono: <a href="tel:+573001234567" className="text-green-800">+57 300 123 4567</a> <br />
            Email: <a href="mailto:info@gmintlab.com" className="text-green-800">info@gmintlab.com</a>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-6 bg-green-900 text-white text-center">
        &copy; {new Date().getFullYear()} G-MintLab. Todos los derechos reservados.
      </footer>
    </div>
  );
}
