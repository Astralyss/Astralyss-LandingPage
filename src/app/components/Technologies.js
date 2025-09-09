'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Zap, Shield, TrendingUp, Database, Globe, Smartphone } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Technologies() {
  const [activeCategory, setActiveCategory] = useState(0);
  const isMobile = useIsMobile();

  const categories = [
    {
      id: 0,
      title: 'Frontend',
      description: 'Tecnologías modernas para interfaces de usuario excepcionales',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      technologies: [
        { name: 'React', icon: '/svg/react.svg' },
        { name: 'Next.js', icon: '/svg/next.svg' },
        { name: 'Vue.js', icon: '/svg/vue.svg' },
        { name: 'TypeScript', icon: '/svg/typeScript.svg' },
        { name: 'Tailwind CSS', icon: '/svg/tailwindcss.svg' },
        { name: 'HTML5', icon: '/svg/HTML5.svg' },
        { name: 'CSS3', icon: '/svg/CSS3.svg' },
        { name: 'JavaScript', icon: '/svg/javaScript.svg' }
      ]
    },
    {
      id: 1,
      title: 'Backend & APIs',
      description: 'Arquitecturas robustas y escalables para el servidor',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      technologies: [
        { name: 'Node.js', icon: '/svg/nodejs.svg' },
        { name: 'Supabase', icon: '/svg/supabase.svg' },
        { name: 'MySQL', icon: '/svg/mysql1.svg' },
        { name: 'PostgreSQL', icon: '/svg/postgresql.svg' },
        { name: 'REST APIs', icon: '/svg/api.svg' },
        { name: 'GraphQL', icon: '/svg/graphql.svg' }
      ]
    },
    {
      id: 2,
      title: 'Herramientas & DevOps',
      description: 'Flujo de trabajo optimizado y despliegue eficiente',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      technologies: [
        { name: 'Git', icon: '/svg/git.svg' },
        { name: 'Bash', icon: '/svg/bash.svg' },
        { name: 'Vercel', icon: '/svg/vercel.svg' },
        { name: 'Docker', icon: '/svg/docker1.svg' },
        { name: 'GitHub', icon: '/svg/github.svg' }
      ]
    }
  ];

  useEffect(() => {
    // Solo activar animación automática en desktop
    if (isMobile) return;
    
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % categories.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [categories.length, isMobile]);

  return (
    <section id="tecnologias" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-display">
            <span className="text-white">Stack </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Tecnológico</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto px-4">
            Utilizamos las tecnologías más modernas y eficientes para crear soluciones de alto rendimiento
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 sm:mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-slate-800/30 text-gray-300 hover:bg-slate-700/30'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm font-medium">{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Technologies Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Technologies List */}
          <div className="space-y-6">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${categories[activeCategory].color} flex items-center justify-center`}>
                  {(() => {
                    const IconComponent = categories[activeCategory].icon;
                    return <IconComponent className="w-5 h-5 text-white" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {categories[activeCategory].title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {categories[activeCategory].description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categories[activeCategory].technologies.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-600/30 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-600/50 rounded-lg flex items-center justify-center">
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          width={20}
                          height={20}
                          className="w-4 h-4 transition-all duration-300 group-hover:scale-110"
                        />
                      </div>
                      <span className="text-sm font-medium text-white">{tech.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">
                ¿Por qué estas tecnologías?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Alto Rendimiento</h4>
                    <p className="text-xs text-gray-300">Optimizadas para velocidad y eficiencia</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Seguridad</h4>
                    <p className="text-xs text-gray-300">Mejores prácticas de seguridad web</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Responsive</h4>
                    <p className="text-xs text-gray-300">Funciona perfectamente en todos los dispositivos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Escalabilidad</h4>
                    <p className="text-xs text-gray-300">Arquitecturas preparadas para el crecimiento</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">99.9%</div>
                <div className="text-xs text-gray-300">Uptime</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">&lt;2s</div>
                <div className="text-xs text-gray-300">Tiempo de carga</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 