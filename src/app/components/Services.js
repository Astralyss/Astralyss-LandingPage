'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Palette, Shield, Zap, CheckCircle, Smartphone, Zap as Lightning } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);
  const isMobile = useIsMobile();

  const services = [
    {
      id: 0,
      title: 'Diseño',
      description: 'No solo creamos interfaces, diseñamos experiencias digitales que combinan arte, tecnología y funcionalidad. Cada proyecto es único, visualmente impactante y estratégicamente diseñado para potenciar la presencia de tu negocio, atraer clientes y generar resultados.',
      features: [
        'Interfaces modernas y atractivas',
        'Experiencia de usuario optimizada',
        'Diseño responsivo para todos los dispositivos',
        'Branding y identidad visual'
      ],
      image: '/images/desing.svg',
      color: 'from-purple-500 to-pink-500',
      icon: Palette
    },
    {
      id: 1,
      title: 'Calidad',
      description: 'Cada uno de nuestros productos y servicios está diseñado con los más altos estándares de calidad, optimización y rendimiento. Nos enfocamos en cada detalle para ofrecer experiencias fluidas, intuitivas y visualmente impactantes.',
      features: [
        'Código limpio y mantenible',
        'Testing y debugging exhaustivo',
        'Optimización de rendimiento',
        'Estándares de calidad web'
      ],
      image: '/images/optimization.svg',
      color: 'from-blue-500 to-cyan-500',
      icon: Shield
    },
    {
      id: 2,
      title: 'Innovación y Optimización',
      description: 'Desarrollamos sitios web de alto rendimiento, optimizados para SEO, combinando tecnología de vanguardia y un diseño optimizado para garantizar velocidad, eficiencia y calidad.',
      features: [
        'Optimización SEO avanzada',
        'Velocidad de carga optimizada',
        'Tecnología de vanguardia',
        'Escalabilidad y crecimiento'
      ],
      image: '/images/dashboard.svg',
      color: 'from-green-500 to-emerald-500',
      icon: Zap
    }
  ];

  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 8000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Solo activar animación automática en desktop
    if (isMobile) return;
    
    if (!isHovering) {
      startInterval();
    } else {
      stopInterval();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, services.length, isMobile]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <section id="soluciones" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-display">
            <span className="text-white">Nuestras </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Soluciones</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto px-4">
            Más que páginas web, creamos soluciones que destacan y marcan la diferencia
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Service Content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className={`bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-500 ${
                    activeService === index
                      ? 'shadow-lg shadow-blue-500/20'
                      : 'hover:shadow-lg hover:shadow-slate-600/20'
                  }`}
                  onClick={() => setActiveService(index)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={handleMouseEnter}
                  onTouchEnd={handleMouseLeave}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                        {service.description}
                      </p>
                      {activeService === index && (
                        <div className="mt-4 space-y-2 animate-fade-in-up">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                              <span className="text-xs text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Service Image */}
          <div className="relative order-first lg:order-last">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div> */}
              <div className="relative z-10">
                <Image
                  src={services[activeService].image}
                  alt={services[activeService].title}
                  width={400}
                  height={400}
                  className="w-full h-auto transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>
            
            {/* Floating Elements - Más sutiles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-blue-500/20 rounded-full animate-pulse-slow"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 bg-cyan-500/20 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-16 sm:mt-20 grid md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:shadow-slate-600/20 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Lightning className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">Diseño Funcional</h3>
            </div>
            <p className="text-gray-300 mb-4 text-xs sm:text-sm">
              Interfaces diseñadas para una carga rápida y un rendimiento óptimo.
            </p>
            <div className="flex items-center space-x-2 text-blue-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs">Optimización de velocidad</span>
            </div>
          </div>
          
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:shadow-slate-600/20 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">First Mobile</h3>
            </div>
            <p className="text-gray-300 mb-4 text-xs sm:text-sm">
              Optimizado para dispositivos móviles desde el primer momento.
            </p>
            <div className="flex items-center space-x-2 text-blue-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs">Responsive design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 