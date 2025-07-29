'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Play, Eye } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const technologies = [
    { name: 'Astro', icon: '/svg/astro.svg' },
    { name: 'Vue', icon: '/svg/vue.svg' },
    { name: 'React', icon: '/svg/react.svg' },
    { name: 'TypeScript', icon: '/svg/typeScript.svg' },
    { name: 'Tailwind CSS', icon: '/svg/tailwindcss.svg' },
    { name: 'Next.js', icon: '/svg/next.svg' },
    { name: 'Node.js', icon: '/svg/nodejs.svg' },
    { name: 'HTML5', icon: '/svg/HTML5.svg' },
    { name: 'CSS3', icon: '/svg/CSS3.svg' },
    { name: 'JavaScript', icon: '/svg/javaScript.svg' },
    { name: 'Git', icon: '/svg/git.svg' },
    { name: 'Supabase', icon: '/svg/supabase.svg' },
    { name: 'MySQL', icon: '/svg/mysql.svg' },
    { name: 'Bash', icon: '/svg/bash.svg' },
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.08),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.08),transparent_50%)]"></div>
      </div>

      {/* Floating Elements - Más sutiles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/30 rounded-full animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-white">Transforma Tu </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Negocio</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4">
            En Astralyss, impulsamos el crecimiento de tu marca con innovación, 
            calidad y tecnología de vanguardia. Nos enfocamos en cada detalle para ofrecerte 
            soluciones de alto impacto que marquen la diferencia.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <button className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
              <span>Comienza tu Proyecto</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-slate-800/30 backdrop-blur-sm text-white rounded-full font-semibold text-base sm:text-lg hover:bg-slate-700/30 transition-all duration-300 border border-slate-600/30 hover:border-blue-500/50">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Ver Nuestro Trabajo</span>
            </button>
          </div>

          {/* Technology Stack */}
          <div className="mt-12 sm:mt-16">
            <h3 className="text-base sm:text-lg font-semibold text-gray-400 mb-4 sm:mb-6">
              Tecnologías que utilizamos
            </h3>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto px-4">
              {technologies.map((tech, index) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center space-y-1 sm:space-y-2 group"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-slate-800/30 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-slate-700/30 transition-all duration-300 group-hover:scale-110 border border-slate-700/30">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={32}
                      height={32}
                      className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-all duration-300 group-hover:filter group-hover:brightness-110"
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors duration-300 text-center">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-400/50 rounded-full flex justify-center">
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400/70 mt-1 sm:mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
} 