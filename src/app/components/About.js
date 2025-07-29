'use client';

import Image from 'next/image';
import { Rocket, Target, Handshake, Lightbulb, Star, TrendingUp, Clock, Shield } from 'lucide-react';

export default function About() {
  const stats = [
    { number: '100%', label: 'Satisfacción del Cliente', icon: Star },
    { number: '50+', label: 'Proyectos Completados', icon: TrendingUp },
    { number: '24/7', label: 'Soporte Técnico', icon: Clock },
    { number: '99.9%', label: 'Tiempo de Actividad', icon: Shield },
  ];

  const values = [
    {
      icon: Rocket,
      title: 'Innovación',
      description: 'Siempre a la vanguardia de las últimas tecnologías y tendencias del mercado.'
    },
    {
      icon: Target,
      title: 'Calidad',
      description: 'Cada proyecto se desarrolla con los más altos estándares de calidad y excelencia.'
    },
    {
      icon: Handshake,
      title: 'Confianza',
      description: 'Construimos relaciones duraderas basadas en la transparencia y resultados.'
    },
    {
      icon: Lightbulb,
      title: 'Creatividad',
      description: 'Soluciones únicas y creativas que destacan tu marca de la competencia.'
    }
  ];

  return (
    <section id="nosotros" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(14,165,233,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-white">¿Quiénes </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">somos?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Somos una compañía emergente comprometida con ofrecer servicios de calidad, 
            innovación y diseño moderno. Nuestro objetivo es potenciar el desarrollo y 
            la imagen de tu empresa, ayudándote a destacar lo que realmente importa.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          {/* Text Content */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              Impulsamos el crecimiento de tu negocio
            </h3>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              En Astralyss, nos especializamos en crear experiencias digitales excepcionales 
              que no solo se ven bien, sino que también funcionan perfectamente. Nuestro equipo 
              de expertos combina creatividad, tecnología y estrategia para ofrecer soluciones 
              que realmente marcan la diferencia.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Nos enfocamos en cada detalle para ofrecerte soluciones de alto impacto que 
              potencien la presencia de tu negocio, atraigan clientes y generen resultados 
              medibles. Más que páginas web, creamos soluciones que destacan y marcan la diferencia.
            </p>
            
            {/* CTA Button */}
            <div className="pt-4 sm:pt-6">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                Conoce Nuestro Trabajo
              </button>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative order-first lg:order-last">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-slate-700/30">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Star className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                  Tecnología de Vanguardia
                </h4>
                <p className="text-gray-300 text-sm sm:text-base">
                  Utilizamos las últimas tecnologías y frameworks para crear experiencias 
                  digitales excepcionales y de alto rendimiento.
                </p>
              </div>
            </div>
            
            {/* Floating Elements - Más sutiles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-blue-500/20 rounded-full animate-pulse-slow"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 bg-cyan-500/20 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/30 hover:border-slate-600/30 transition-all duration-300">
                <div className="flex justify-center mb-2">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-xs sm:text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-slate-700/30 hover:border-slate-600/30 transition-all duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 