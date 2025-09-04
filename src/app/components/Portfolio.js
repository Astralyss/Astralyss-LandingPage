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
      businessType: 'Restaurante Local',
      description: 'Transformamos un restaurante sin presencia digital en una página web profesional que genera leads y ventas consistentes.',
      before: {
        sales: '8K/mes',
        reach: 'Solo presencial',
        customers: '25 clientes/mes',
        operations: 'Sin presencia digital'
      },
      after: {
        sales: '18K/mes',
        reach: 'Toda la zona',
        customers: '80+ clientes/mes',
        operations: 'Digital + Presencial'
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
        'Formularios de contacto',
        'Optimización SEO completa',
        'Analytics integrado'
      ],
      transformation: {
        growth: '125%',
        efficiency: '40%',
        reach: 'Metropolitano'
      }
    },
    {
      id: 2,
      title: 'De Tienda Local a E-commerce Regional',
      category: 'ecommerce',
      businessType: 'Tienda de Ropa',
      description: 'Transformamos una pequeña tienda de ropa local en una plataforma de e-commerce que vende en toda la región.',
      before: {
        sales: '6K/mes',
        reach: 'Solo local',
        customers: '40 clientes/mes',
        operations: 'Manual'
      },
      after: {
        sales: '22K/mes',
        reach: 'Toda la región',
        customers: '180+ clientes/mes',
        operations: 'Automatizado'
      },
      technologies: ['Next.js', 'Stripe', 'Supabase', 'Vercel'],
      benefits: [
        'Ventas 24/7',
        'Alcance regional',
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
        growth: '267%',
        efficiency: '65%',
        reach: 'Regional'
      }
    },
    {
      id: 3,
      title: 'Procesos Manuales a Sistema Web',
      category: 'app',
      businessType: 'Empresa de Servicios',
      description: 'Convertimos procesos manuales y Excel en un sistema web automatizado que optimiza operaciones diarias.',
      before: {
        sales: '20K/mes',
        reach: 'Solo presencial',
        customers: '15 clientes/mes',
        operations: 'Manual con Excel'
      },
      after: {
        sales: '45K/mes',
        reach: 'Toda la ciudad',
        customers: '35+ clientes/mes',
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
        growth: '125%',
        efficiency: '70%',
        reach: 'Metropolitano'
      }
    },
    {
      id: 4,
      title: 'Restaurante a Plataforma de Delivery',
      category: 'mobile',
      businessType: 'Restaurante Familiar',
      description: 'Convertimos un restaurante tradicional en una plataforma de delivery con app móvil y gestión inteligente.',
      before: {
        sales: '12K/mes',
        reach: 'Solo presencial',
        customers: '80 clientes/mes',
        operations: 'Manual'
      },
      after: {
        sales: '35K/mes',
        reach: 'Toda la ciudad',
        customers: '300+ clientes/mes',
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
        growth: '192%',
        efficiency: '60%',
        reach: 'Metropolitano'
      }
    }
  ];

  const filters = [
    { id: 'web', label: 'Páginas Web', icon: Globe },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
    { id: 'app', label: 'Aplicaciones Web', icon: BarChart3 },
    { id: 'mobile', label: 'Apps Móviles', icon: Smartphone }
  ];

  const filteredCases = transformationCases.filter(case_ => case_.category === activeFilter);

  // Reset activeCase when filter changes
  useEffect(() => {
    setActiveCase(0);
  }, [activeFilter]);

  // Escuchar eventos para activar filtros desde el navbar
  useEffect(() => {
    const handleFilterActivation = (event) => {
      const { category } = event.detail;
      setActiveFilter(category);
      setActiveCase(0);
    };

    window.addEventListener('activatePortfolioFilter', handleFilterActivation);
    return () => window.removeEventListener('activatePortfolioFilter', handleFilterActivation);
  }, []);

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
         <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2">
           {filters.map((filter) => {
             const IconComponent = filter.icon;
             return (
               <button
                 key={filter.id}
                 onClick={() => setActiveFilter(filter.id)}
                 className={`relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ease-out flex items-center gap-2 ${
                   activeFilter === filter.id
                     ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                     : 'bg-transparent text-gray-300 hover:text-white border border-slate-600/30 hover:border-slate-500/50'
                 }`}
               >
                 {/* Icon */}
                 <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                 
                 {/* Button content */}
                 <span className="relative z-10">
                   {filter.label}
                 </span>
                 
                 {/* Subtle hover effect */}
                 <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                   activeFilter === filter.id
                     ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                     : 'bg-gradient-to-r from-blue-500/0 to-cyan-500/0 hover:from-blue-500/5 hover:to-cyan-500/5'
                 }`}></div>
               </button>
             );
           })}
         </div>

                 {/* Featured Transformation Case */}
         <div className="mb-12 sm:mb-16">
           <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden">
             <div className="grid lg:grid-cols-2 gap-0">
               {/* Before/After Comparison */}
               <div className="relative h-48 lg:h-90 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl mt-8 lg:mt-24 sm:rounded-2xl overflow-hidden">
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
               <div className="p-4 sm:p-6 lg:p-8">
                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                   <div className="flex-1">
                     <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
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

                 <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                   {filteredCases[activeCase]?.description || ''}
                 </p>

                 {/* Before/After Stats - Optimizado para móviles */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                   {/* Before */}
                   <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-xl p-3 sm:p-4">
                     <h4 className="text-white font-bold text-sm mb-3 sm:mb-4 flex items-center">
                       <Target className="w-4 h-4 mr-2 text-white" />
                       ANTES
                     </h4>
                     <div className="space-y-2">
                       <div className="flex justify-between text-xs">
                         <span className="text-white">Ventas:</span>
                         <span className="text-white font-medium">{filteredCases[activeCase]?.before?.sales || '-'}</span>
                       </div>
                       <div className="flex justify-between text-xs">
                         <span className="text-white">Alcance:</span>
                         <span className="text-white font-medium">{filteredCases[activeCase]?.before?.reach || '-'}</span>
                       </div>
                       <div className="flex justify-between text-xs">
                         <span className="text-white">Clientes:</span>
                         <span className="text-white font-medium">{filteredCases[activeCase]?.before?.customers || '-'}</span>
                       </div>
                     </div>
                   </div>

                   {/* After */}
                   <div className="bg-gradient-to-br from-teal-600/20 to-teal-800/20 border border-teal-500/30 rounded-xl p-3 sm:p-4">
                     <h4 className="text-white font-bold text-sm mb-3 sm:mb-4 flex items-center">
                       <Rocket className="w-4 h-4 mr-2 text-white" />
                       DESPUÉS
                     </h4>
                     <div className="space-y-2">
                       <div className="flex justify-between text-xs">
                         <span className="text-white">Ventas:</span>
                         <span className="text-white font-medium">{filteredCases[activeCase]?.after?.sales || '-'}</span>
                       </div>
                       <div className="flex justify-between text-xs">
                         <span className="text-white">Alcance:</span>
                         <span className="text-white font-medium">{filteredCases[activeCase]?.after?.reach || '-'}</span>
                       </div>
                       <div className="flex justify-between text-xs">
                         <span className="text-white">Clientes:</span>
                         <span className="text-white font-medium">{filteredCases[activeCase]?.after?.customers || '-'}</span>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Business Benefits - Optimizado para móviles */}
                 <div className="mb-6">
                   <h4 className="text-white font-bold text-sm mb-3 sm:mb-4 flex items-center">
                     <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></div>
                     Lo que lograron
                   </h4>
                   <div className="flex flex-wrap gap-2">
                     {filteredCases[activeCase]?.benefits?.map((benefit) => (
                       <span
                         key={benefit}
                         className="px-2 sm:px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs font-medium border border-green-500/30"
                       >
                         {benefit}
                       </span>
                     )) || []}
                   </div>
                 </div>

                                   {/* Features - Optimizado para móviles y desktop */}
                  <div className="mb-6">
                    <h4 className="text-white font-bold text-sm mb-3 sm:mb-4">Soluciones implementadas</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {filteredCases[activeCase]?.features?.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></div>
                          <span className="text-xs text-white">{feature}</span>
                        </div>
                      )) || []}
                    </div>
                  </div>

                 {/* Transformation Stats - Optimizado para móviles */}
                 <div className="grid grid-cols-3 gap-2 sm:gap-4">
                   <div className="text-center">
                     <div className="text-base sm:text-lg font-bold text-green-400 mb-1">
                       {filteredCases[activeCase]?.transformation?.growth || '-'}
                     </div>
                     <div className="text-xs text-gray-400">Crecimiento</div>
                   </div>
                   <div className="text-center">
                     <div className="text-base sm:text-lg font-bold text-blue-400 mb-1">
                       {filteredCases[activeCase]?.transformation?.efficiency || '-'}
                     </div>
                     <div className="text-xs text-gray-400">Eficiencia</div>
                   </div>
                   <div className="text-center">
                     <div className="text-base sm:text-lg font-bold text-purple-400 mb-1">
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
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
           {filteredCases.slice(1).map((case_, index) => (
             <div
               key={case_.id}
               className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg hover:shadow-slate-600/20 transition-all duration-300 cursor-pointer"
               onClick={() => setActiveCase(index + 1)}
             >
               {/* Case Icon */}
               <div className="relative h-32 sm:h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-3 sm:mb-4 flex items-center justify-center">
                 <div className="text-center">
                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2">
                     {case_.category === 'ecommerce' && <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                     {case_.category === 'mobile' && <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                     {case_.category === 'app' && <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                     {case_.category === 'web' && <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                   </div>
                   <p className="text-gray-300 text-xs">{case_.businessType}</p>
                 </div>
               </div>

               {/* Case Info */}
               <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{case_.title}</h3>
               <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-2">{case_.description}</p>

               {/* Before/After Quick Stats */}
               <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                 <div className="bg-red-500/10 rounded-lg p-2 sm:p-3">
                   <div className="text-xs text-red-400 font-medium mb-1">ANTES</div>
                   <div className="text-xs text-gray-300">{case_.before.sales}</div>
                 </div>
                 <div className="bg-green-500/10 rounded-lg p-2 sm:p-3">
                   <div className="text-xs text-green-400 font-medium mb-1">DESPUÉS</div>
                   <div className="text-xs text-gray-300">{case_.after.sales}</div>
                 </div>
               </div>

               {/* Business Benefits */}
               <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
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
           <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
             <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-3 sm:mb-4">
               ¿Listo para transformar tu negocio?
             </h3>
             <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
               Lleva tu empresa al siguiente nivel con soluciones tecnológicas que escalan tu crecimiento
             </p>
             <a 
               href="/contact" 
               className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 inline-flex items-center text-sm sm:text-base"
             >
               Transformar mi Negocio
               <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
             </a>
           </div>
         </div>
      </div>
    </section>
  );
} 