'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Eye, Star, TrendingUp, Users, Zap, ArrowRight, Target, Rocket, BarChart3, ShoppingCart, Globe, Smartphone } from 'lucide-react';

export default function Portfolio() {
  const [activeCase, setActiveCase] = useState(0);
  const [activeFilter, setActiveFilter] = useState('web');

  const transformationCases = [
    {
      id: 1,
      title: 'Negocio Local a Página Web Profesional',
      category: 'web',
      businessType: 'Negocio Local',
      description: 'Transformamos un negocio sin presencia digital en una página web profesional que genera leads y ventas.',
      before: {
        sales: '10K/mes',
        reach: 'Solo local',
        customers: '30 clientes',
        operations: 'Sin presencia digital'
      },
      after: {
        sales: '35K/mes',
        reach: 'Toda la ciudad',
        customers: '150+ clientes',
        operations: 'Digital'
      },
      technologies: ['Next.js', 'Tailwind CSS', 'Vercel', 'SEO'],
      benefits: [
        'Presencia digital profesional',
        'Más clientes online',
        'Credibilidad mejorada',
        'SEO optimizado'
      ],
      features: [
        'Diseño responsive moderno',
        'Optimización SEO completa',
        'Formularios de contacto',
        'Analytics integrado'
      ],
      transformation: {
        growth: '250%',
        efficiency: '60%',
        reach: 'Metropolitano'
      }
    },
    {
      id: 2,
      title: 'De Tienda Local a E-commerce Nacional',
      category: 'ecommerce',
      businessType: 'Tienda de Ropa',
      description: 'Transformamos una pequeña tienda de ropa local en una plataforma de e-commerce que vende a todo el país.',
      before: {
        sales: '5K/mes',
        reach: 'Solo local',
        customers: '50 clientes',
        operations: 'Manual'
      },
      after: {
        sales: '50K/mes',
        reach: 'Todo México',
        customers: '500+ clientes',
        operations: 'Automatizado'
      },
      technologies: ['Next.js', 'Stripe', 'Supabase', 'Vercel'],
      benefits: [
        'Ventas 24/7',
        'Alcance nacional',
        'Reducción de costos',
        'Escalabilidad automática'
      ],
      features: [
        'Catálogo digital completo',
        'Sistema de pagos seguro',
        'Gestión de inventario automática',
        'Marketing digital integrado'
      ],
      transformation: {
        growth: '900%',
        efficiency: '80%',
        reach: 'Nacional'
      }
    },
    {
      id: 3,
      title: 'Procesos Manuales a Sistema Web',
      category: 'app',
      businessType: 'Empresa de Servicios',
      description: 'Convertimos procesos manuales y Excel en un sistema web automatizado que optimiza operaciones.',
      before: {
        sales: '25K/mes',
        reach: 'Solo presencial',
        customers: '20 clientes',
        operations: 'Manual con Excel'
      },
      after: {
        sales: '80K/mes',
        reach: 'Toda la región',
        customers: '100+ clientes',
        operations: 'Automatizado'
      },
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      benefits: [
        'Procesos automatizados',
        'Mejor control de datos',
        'Reducción de errores',
        'Escalabilidad'
      ],
      features: [
        'Dashboard administrativo',
        'Gestión de clientes',
        'Reportes automáticos',
        'Sistema de usuarios'
      ],
      transformation: {
        growth: '220%',
        efficiency: '85%',
        reach: 'Regional'
      }
    },
    {
      id: 4,
      title: 'Restaurante a Plataforma de Delivery',
      category: 'mobile',
      businessType: 'Restaurante Familiar',
      description: 'Convertimos un restaurante tradicional en una plataforma de delivery con app móvil y gestión inteligente.',
      before: {
        sales: '15K/mes',
        reach: 'Solo presencial',
        customers: '100 clientes',
        operations: 'Manual'
      },
      after: {
        sales: '80K/mes',
        reach: 'Toda la ciudad',
        customers: '1000+ clientes',
        operations: 'Digital'
      },
      technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
      benefits: [
        'Más órdenes diarias',
        'Clientes recurrentes',
        'Optimización de rutas',
        'Gestión eficiente'
      ],
      features: [
        'App móvil para clientes',
        'Panel de gestión para cocina',
        'Sistema de delivery tracking',
        'Análisis de ventas en tiempo real'
      ],
      transformation: {
        growth: '433%',
        efficiency: '70%',
        reach: 'Metropolitano'
      }
    }
  ];

  const filters = [
    { id: 'web', label: 'Páginas Web' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'app', label: 'Aplicaciones Web' },
    { id: 'mobile', label: 'Apps Móviles' }
  ];

  const filteredCases = transformationCases.filter(case_ => case_.category === activeFilter);

  // Reset activeCase when filter changes
  useEffect(() => {
    setActiveCase(0);
  }, [activeFilter]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCase((prev) => (prev + 1) % filteredCases.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [filteredCases.length]);

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
            <span className="text-white">Transforma tu </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Negocio</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto px-4">
            Casos reales de cómo la tecnología puede llevar tu negocio al siguiente nivel
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

        {/* Featured Transformation Case */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
                                            {/* Before/After Comparison */}
               <div className="relative h-48 lg:h-80 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center pt-4 lg:pt-8">
                 <Image
                   src={`/images/${activeFilter === 'web' ? 'web-page' : 
                          activeFilter === 'ecommerce' ? 'e-comerce' :
                          activeFilter === 'app' ? 'web-app' : 'mobil-app'}.jpg`}
                   alt="Transformación Digital"
                   fill
                   className="object-cover"
                   priority
                 />
               </div>

              {/* Case Details */}
              <div className="p-6 sm:p-8">
                                 <div className="flex items-center justify-between mb-4">
                   <div>
                     <h3 className="text-xl sm:text-2xl font-bold text-white">
                       {filteredCases[activeCase]?.title || 'Cargando...'}
                     </h3>
                     <p className="text-blue-400 text-sm font-medium">
                       {filteredCases[activeCase]?.businessType || ''}
                     </p>
                   </div>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                </div>

                                 <p className="text-gray-300 mb-6 leading-relaxed">
                   {filteredCases[activeCase]?.description || ''}
                 </p>

                {/* Before/After Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Before */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <h4 className="text-red-400 font-semibold text-sm mb-3 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      ANTES
                    </h4>
                    <div className="space-y-2">
                                             <div className="flex justify-between text-xs">
                         <span className="text-gray-300">Ventas:</span>
                         <span className="text-red-300 font-medium">{filteredCases[activeCase]?.before?.sales || '-'}</span>
                       </div>
                       <div className="flex justify-between text-xs">
                         <span className="text-gray-300">Alcance:</span>
                         <span className="text-red-300 font-medium">{filteredCases[activeCase]?.before?.reach || '-'}</span>
                       </div>
                       <div className="flex justify-between text-xs">
                         <span className="text-gray-300">Clientes:</span>
                         <span className="text-red-300 font-medium">{filteredCases[activeCase]?.before?.customers || '-'}</span>
                       </div>
                    </div>
                  </div>

                  {/* After */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold text-sm mb-3 flex items-center">
                      <Rocket className="w-4 h-4 mr-2" />
                      DESPUÉS
                    </h4>
                    <div className="space-y-2">
                                             <div className="flex justify-between text-xs">
                         <span className="text-gray-300">Ventas:</span>
                         <span className="text-green-300 font-medium">{filteredCases[activeCase]?.after?.sales || '-'}</span>
                       </div>
                       <div className="flex justify-between text-xs">
                         <span className="text-gray-300">Alcance:</span>
                         <span className="text-green-300 font-medium">{filteredCases[activeCase]?.after?.reach || '-'}</span>
                       </div>
                       <div className="flex justify-between text-xs">
                         <span className="text-gray-300">Clientes:</span>
                         <span className="text-green-300 font-medium">{filteredCases[activeCase]?.after?.customers || '-'}</span>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Business Benefits */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3">✨ Lo que lograron</h4>
                                     <div className="flex flex-wrap gap-2">
                     {filteredCases[activeCase]?.benefits?.map((benefit) => (
                       <span
                         key={benefit}
                         className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium"
                       >
                         {benefit}
                       </span>
                     )) || []}
                   </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3">Soluciones implementadas</h4>
                                     <div className="grid grid-cols-2 gap-2">
                     {filteredCases[activeCase]?.features?.map((feature, index) => (
                       <div key={index} className="flex items-center space-x-2">
                         <Star className="w-3 h-3 text-blue-500 flex-shrink-0" />
                         <span className="text-xs text-gray-300">{feature}</span>
                       </div>
                     )) || []}
                   </div>
                </div>

                {/* Transformation Stats */}
                <div className="grid grid-cols-3 gap-4">
                                     <div className="text-center">
                     <div className="text-lg font-bold text-green-400 mb-1">
                       {filteredCases[activeCase]?.transformation?.growth || '-'}
                     </div>
                     <div className="text-xs text-gray-400">Crecimiento</div>
                   </div>
                   <div className="text-center">
                     <div className="text-lg font-bold text-blue-400 mb-1">
                       {filteredCases[activeCase]?.transformation?.efficiency || '-'}
                     </div>
                     <div className="text-xs text-gray-400">Eficiencia</div>
                   </div>
                   <div className="text-center">
                     <div className="text-lg font-bold text-purple-400 mb-1">
                       {filteredCases[activeCase]?.transformation?.reach || '-'}
                     </div>
                     <div className="text-xs text-gray-400">Alcance</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transformation Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCases.slice(1).map((case_, index) => (
            <div
              key={case_.id}
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 hover:shadow-lg hover:shadow-slate-600/20 transition-all duration-300 cursor-pointer"
              onClick={() => setActiveCase(index + 1)}
            >
              {/* Case Icon */}
              <div className="relative h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                                     <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2">
                     {case_.category === 'ecommerce' && <ShoppingCart className="w-6 h-6 text-white" />}
                     {case_.category === 'mobile' && <Smartphone className="w-6 h-6 text-white" />}
                     {case_.category === 'app' && <BarChart3 className="w-6 h-6 text-white" />}
                     {case_.category === 'web' && <Globe className="w-6 h-6 text-white" />}
                   </div>
                  <p className="text-gray-300 text-xs">{case_.businessType}</p>
                </div>
              </div>

              {/* Case Info */}
              <h3 className="text-lg font-semibold text-white mb-2">{case_.title}</h3>
              <p className="text-sm text-gray-300 mb-4 line-clamp-2">{case_.description}</p>

              {/* Before/After Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-red-500/10 rounded-lg p-3">
                  <div className="text-xs text-red-400 font-medium mb-1">ANTES</div>
                  <div className="text-xs text-gray-300">{case_.before.sales}</div>
                </div>
                <div className="bg-green-500/10 rounded-lg p-3">
                  <div className="text-xs text-green-400 font-medium mb-1">DESPUÉS</div>
                  <div className="text-xs text-gray-300">{case_.after.sales}</div>
                </div>
              </div>

              {/* Business Benefits */}
              <div className="flex flex-wrap gap-2 mb-4">
                {case_.benefits.slice(0, 3).map((benefit) => (
                  <span
                    key={benefit}
                    className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs"
                  >
                    {benefit}
                  </span>
                ))}
                {case_.benefits.length > 3 && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                    +{case_.benefits.length - 3}
                  </span>
                )}
              </div>

              {/* Growth Stats */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-gray-300">{case_.transformation.growth}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-blue-400" />
                  <span className="text-gray-300">{case_.transformation.efficiency}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-purple-400" />
                  <span className="text-gray-300">{case_.transformation.reach}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
              ¿Listo para transformar tu negocio?
            </h3>
            <p className="text-gray-300 mb-6">
              Lleva tu empresa al siguiente nivel con soluciones tecnológicas que escalan tu crecimiento
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
              Transformar mi Negocio
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 