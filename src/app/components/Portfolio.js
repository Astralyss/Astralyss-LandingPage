'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Eye, Star, TrendingUp, Users, Zap } from 'lucide-react';

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Premium',
      category: 'ecommerce',
      description: 'Plataforma de comercio electrónico completa con gestión de inventario, pasarelas de pago y panel administrativo avanzado.',
      image: '/images/project1.jpg',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'Supabase'],
      features: [
        'Carrito de compras avanzado',
        'Sistema de pagos seguro',
        'Panel administrativo completo',
        'Optimización SEO'
      ],
      stats: {
        performance: 98,
        users: '10K+',
        conversion: '15%'
      },
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      id: 2,
      title: 'Dashboard Empresarial',
      category: 'dashboard',
      description: 'Dashboard interactivo para análisis de datos empresariales con gráficos dinámicos y reportes en tiempo real.',
      image: '/images/project2.jpg',
      technologies: ['React', 'D3.js', 'Node.js', 'MongoDB'],
      features: [
        'Gráficos interactivos',
        'Datos en tiempo real',
        'Reportes personalizados',
        'Exportación de datos'
      ],
      stats: {
        performance: 95,
        users: '5K+',
        conversion: '25%'
      },
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      id: 3,
      title: 'App Móvil Híbrida',
      category: 'mobile',
      description: 'Aplicación móvil híbrida para gestión de tareas con sincronización en la nube y notificaciones push.',
      image: '/images/project3.jpg',
      technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
      features: [
        'Sincronización offline',
        'Notificaciones push',
        'Autenticación segura',
        'Multiplataforma'
      ],
      stats: {
        performance: 92,
        users: '20K+',
        conversion: '30%'
      },
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      id: 4,
      title: 'Landing Page Corporativa',
      category: 'web',
      description: 'Sitio web corporativo optimizado para conversión con diseño moderno y experiencia de usuario excepcional.',
      image: '/images/project4.jpg',
      technologies: ['Vue.js', 'Tailwind CSS', 'Vite', 'Netlify'],
      features: [
        'Diseño responsive',
        'Optimización SEO',
        'Analytics integrado',
        'Formularios inteligentes'
      ],
      stats: {
        performance: 99,
        users: '50K+',
        conversion: '12%'
      },
      links: {
        live: '#',
        github: '#'
      }
    }
  ];

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'web', label: 'Web' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'mobile', label: 'Móvil' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % filteredProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [filteredProjects.length]);

  return (
    <section id="portafolio" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-display">
            <span className="text-white">Casos de </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Éxito</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto px-4">
            Proyectos que demuestran nuestra capacidad para crear soluciones digitales excepcionales
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 sm:mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-800/30 text-gray-300 hover:bg-slate-700/30'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Featured Project */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Project Image */}
              <div className="relative h-64 lg:h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-300 text-sm">Vista previa del proyecto</p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {filteredProjects[activeProject].title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                      <ExternalLink className="w-4 h-4 text-gray-300" />
                    </button>
                    <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                      <Github className="w-4 h-4 text-gray-300" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {filteredProjects[activeProject].description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3">Tecnologías utilizadas</h4>
                  <div className="flex flex-wrap gap-2">
                    {filteredProjects[activeProject].technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3">Características principales</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {filteredProjects[activeProject].features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-blue-500 flex-shrink-0" />
                        <span className="text-xs text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400 mb-1">
                      {filteredProjects[activeProject].stats.performance}%
                    </div>
                    <div className="text-xs text-gray-400">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400 mb-1">
                      {filteredProjects[activeProject].stats.users}
                    </div>
                    <div className="text-xs text-gray-400">Usuarios</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-400 mb-1">
                      {filteredProjects[activeProject].stats.conversion}
                    </div>
                    <div className="text-xs text-gray-400">Conversión</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.slice(1).map((project, index) => (
            <div
              key={project.id}
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 hover:shadow-lg hover:shadow-slate-600/20 transition-all duration-300 cursor-pointer"
              onClick={() => setActiveProject(index + 1)}
            >
              {/* Project Image */}
              <div className="relative h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-300 text-xs">Vista previa</p>
                </div>
              </div>

              {/* Project Info */}
              <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-gray-300 mb-4 line-clamp-2">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-slate-700/50 text-gray-300 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-slate-700/50 text-gray-300 rounded-full text-xs">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-gray-300">{project.stats.performance}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-blue-400" />
                  <span className="text-gray-300">{project.stats.users}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-purple-400" />
                  <span className="text-gray-300">{project.stats.conversion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
              ¿Listo para tu próximo proyecto?
            </h3>
            <p className="text-gray-300 mb-6">
              Transforma tu idea en una solución digital excepcional con nuestro equipo experto
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
              Comenzar Proyecto
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 