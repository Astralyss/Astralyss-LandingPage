'use client';

import { useState, useEffect } from 'react';
import { Search, Palette, Code, Rocket, CheckCircle, ArrowRight } from 'lucide-react';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      id: 1,
      title: 'Discovery & Análisis',
      description: 'Comprendemos tus necesidades, objetivos de negocio y audiencia objetivo para crear una estrategia digital personalizada.',
      features: [
        'Análisis de competencia',
        'Investigación de usuarios',
        'Definición de objetivos',
        'Arquitectura de información'
      ],
      icon: Search,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Diseño & UX/UI',
      description: 'Creamos diseños únicos y experiencias de usuario excepcionales que reflejan la identidad de tu marca.',
      features: [
        'Wireframes y prototipos',
        'Diseño de interfaces',
        'Experiencia de usuario',
        'Branding y identidad visual'
      ],
      icon: Palette,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Desarrollo & Implementación',
      description: 'Desarrollamos con las mejores tecnologías, asegurando código limpio, escalable y de alto rendimiento.',
      features: [
        'Desarrollo frontend y backend',
        'Optimización de rendimiento',
        'Testing y debugging',
        'Integración de APIs'
      ],
      icon: Code,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Deployment & Optimización',
      description: 'Desplegamos tu proyecto con las mejores prácticas de SEO, seguridad y rendimiento web.',
      features: [
        'Optimización SEO',
        'Configuración de hosting',
        'Monitoreo de rendimiento',
        'Soporte post-lanzamiento'
      ],
      icon: Rocket,
      color: 'from-orange-500 to-red-500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [processSteps.length]);

  return (
    <section id="proceso" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-display">
            <span className="text-white">Nuestro </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Proceso</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto px-4">
            Metodología probada que garantiza resultados excepcionales en cada proyecto
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className={`relative bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-500 ${
                  activeStep === index
                    ? 'shadow-lg shadow-blue-500/20 scale-105'
                    : 'hover:shadow-lg hover:shadow-slate-600/20 hover:scale-102'
                }`}
                onClick={() => setActiveStep(index)}
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.id}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                  {step.description}
                </p>

                {/* Features */}
                {activeStep === index && (
                  <div className="space-y-2 animate-fade-in-up">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="text-xs text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Arrow for connection */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Process Description */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
              ¿Por qué elegir nuestro proceso?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-300">Comunicación constante</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-300">Entregas a tiempo</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-300">Soporte post-lanzamiento</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 