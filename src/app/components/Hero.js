'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Play, Eye, CheckCircle, Zap, Shield, Users, Clock, Star } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Generar posiciones aleatorias solo en el cliente
    const elements = [...Array(4)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }));
    setFloatingElements(elements);

    // Animación de contadores
    const animateCounters = () => {
      const targetProjects = 50;
      const targetClients = 30;
      const targetSatisfaction = 98;
      
      let currentProjects = 0;
      let currentClients = 0;
      let currentSatisfaction = 0;
      
      const interval = setInterval(() => {
        if (currentProjects < targetProjects) currentProjects += 1;
        if (currentClients < targetClients) currentClients += 1;
        if (currentSatisfaction < targetSatisfaction) currentSatisfaction += 1;
        
        setCounters({
          projects: currentProjects,
          clients: currentClients,
          satisfaction: currentSatisfaction
        });
        
        if (currentProjects >= targetProjects && currentClients >= targetClients && currentSatisfaction >= targetSatisfaction) {
          clearInterval(interval);
        }
      }, 50);
    };

    // Iniciar animación después de 1 segundo
    setTimeout(animateCounters, 1000);
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Alto Rendimiento",
      description: "Optimización completa para velocidad máxima"
    },
    {
      icon: Shield,
      title: "Seguridad Avanzada",
      description: "Protección de datos de nivel empresarial"
    },
    {
      icon: Users,
      title: "Soporte 24/7",
      description: "Asistencia técnica siempre disponible"
    },
    {
      icon: Clock,
      title: "Entrega Rápida",
      description: "Proyectos entregados en tiempo récord"
    }
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16">
      {/* Background Image */}
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.08),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.08),transparent_50%)]"></div>
      </div>

      {/* Floating Elements - Más sutiles */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/30 rounded-full animate-pulse-slow"
            style={element}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight font-display">
            <span className="text-white">Transforma Tu </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Negocio</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-gray-300 mb-4 sm:mb-6 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4">
            Desarrollamos páginas web y aplicaciones completamente a medida, optimizadas para alto rendimiento 
            y escalabilidad. Cada proyecto es único, diseñado específicamente para las necesidades de tu negocio 
            con las tecnologías más modernas y eficientes del mercado.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <button className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
              <span>Comienza tu Proyecto</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-slate-800/30 backdrop-blur-sm text-white rounded-full font-semibold text-sm sm:text-base hover:bg-slate-700/30 transition-all duration-300 border border-slate-600/30 hover:border-blue-500/50">
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Ver Nuestro Trabajo</span>
            </button>
          </div>

          {/* Statistics Section - Responsive mejorado */}
          <div className="mt-8 sm:mt-12 mb-8 sm:mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
              <div className="text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-all duration-300">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-8 lg:h-8 text-blue-400" />
                </div>
                <div className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-1">
                  +{counters.projects}
                </div>
                <div className="text-xs sm:text-sm md:text-base lg:text-sm text-gray-400">Proyectos Completados</div>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-all duration-300">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-8 lg:h-8 text-green-400" />
                </div>
                <div className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-1">
                  +{counters.clients}
                </div>
                <div className="text-xs sm:text-sm md:text-base lg:text-sm text-gray-400">Clientes Satisfechos</div>
              </div>
              
              <div className="text-center group col-span-2 sm:col-span-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-all duration-300">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-8 lg:h-8 text-yellow-400" />
                </div>
                <div className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-1">
                  {counters.satisfaction}%
                </div>
                <div className="text-xs sm:text-sm md:text-base lg:text-sm text-gray-400">Satisfacción</div>
              </div>
            </div>
          </div>

          {/* Features Section - Responsive mejorado */}
          <div className="mt-8 sm:mt-12">
            <h3 className="text-sm sm:text-base font-semibold text-gray-400 mb-4 sm:mb-6 lg:mb-8">
              ¿Por qué elegirnos?
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto px-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group p-3 sm:p-4 lg:p-5 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-400" />
                    </div>
                    <h4 className="text-xs sm:text-sm lg:text-sm font-semibold text-white mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-xs sm:text-xs lg:text-xs text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full flex justify-center">
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400/70 mt-1 sm:mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
} 