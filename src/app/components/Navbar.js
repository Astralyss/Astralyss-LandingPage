'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Settings, Users, Star, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Detectar preferencia de tema del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Cerrar submenú cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeSubmenu && !event.target.closest('.group')) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeSubmenu]);

  const navItems = [
    { name: 'Inicio', href: '#inicio', icon: Home },
    { 
      name: 'Servicios', 
      href: '#servicios', 
      icon: Settings,
      submenu: [
        { name: 'Desarrollo Web', href: '#portafolio', category: 'web' },
        { name: 'E-commerce', href: '#portafolio', category: 'ecommerce' },
        { name: 'Aplicaciones Web', href: '#portafolio', category: 'app' },
        { name: 'Aplicaciones Móviles', href: '#portafolio', category: 'mobile' }
      ]
    },
    { name: 'Nosotros', href: '#nosotros', icon: Users },
    { name: 'Reseñas', href: '#reseñas', icon: Star },
  ];

  const handleServiceClick = (category) => {
    // Cerrar el submenú
    setActiveSubmenu(null);
    setIsMobileMenuOpen(false);
    
    // Si estamos en la página principal, navegar directamente a la sección
    if (pathname === '/') {
      const portfolioSection = document.getElementById('portafolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
        
        // Esperar un poco para que la navegación termine y luego activar el filtro
        setTimeout(() => {
          // Disparar un evento personalizado para activar el filtro
          const filterEvent = new CustomEvent('activatePortfolioFilter', {
            detail: { category }
          });
          window.dispatchEvent(filterEvent);
        }, 500);
      }
    } else {
      // Si estamos en otra página, redirigir a la página principal con la sección
      window.location.href = `/#portafolio`;
    }
  };

  const handleNavClick = (href) => {
    // Cerrar el menú móvil si está abierto
    setIsMobileMenuOpen(false);
    
    // Si estamos en la página principal, navegar directamente a la sección
    if (pathname === '/') {
      const section = document.getElementById(href.replace('#', ''));
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si estamos en otra página, redirigir a la página principal con la sección
      window.location.href = `/${href}`;
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/60 backdrop-blur-xl shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <Image
              src={isDarkMode ? "/logo/IconAstralyss-withe.svg" : "/logo/iconoAstralyss-dark.svg"}
              alt="Astralyss"
              width={40}
              height={40}
              className="w-8 h-8 lg:w-10 lg:h-10 transition-all duration-300"
            />
            <span className="text-base lg:text-lg xl:text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-display">
              Astralyss
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <button
                      onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 font-medium relative"
                    >
                      <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-sm">{item.name}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 font-medium relative group"
                    >
                      <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-sm">{item.name}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  )}
                  
                                     {/* Submenu */}
                   {item.submenu && activeSubmenu === item.name && (
                     <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 z-50">
                       <div className="p-2">
                         {item.submenu.map((subItem) => (
                           <button
                             key={subItem.name}
                             onClick={() => handleServiceClick(subItem.category)}
                             className="w-full text-left flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 text-sm"
                           >
                             <span>{subItem.name}</span>
                           </button>
                         ))}
                       </div>
                     </div>
                   )}
                </div>
              );
            })}
            <Link
              href="/contact"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">Contáctanos</span>
            </Link>
          </div>

          {/* Tablet Navigation - Simplified */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            {navItems.slice(0, 2).map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <button
                      onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                      className="flex items-center space-x-1 text-gray-300 hover:text-white transition-all duration-300 font-medium"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm">{item.name}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="flex items-center space-x-1 text-gray-300 hover:text-white transition-all duration-300 font-medium"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm">{item.name}</span>
                    </button>
                  )}
                  
                                     {/* Submenu for tablet */}
                   {item.submenu && activeSubmenu === item.name && (
                     <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 z-50">
                       <div className="p-2">
                         {item.submenu.map((subItem) => (
                           <button
                             key={subItem.name}
                             onClick={() => handleServiceClick(subItem.category)}
                             className="w-full text-left flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 text-xs"
                           >
                             <span>{subItem.name}</span>
                           </button>
                         ))}
                       </div>
                     </div>
                   )}
                </div>
              );
            })}
            <Link
              href="/contact"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Contacto
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-800/30 hover:bg-slate-700/50 transition-all duration-300 backdrop-blur-sm"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900/90 backdrop-blur-xl rounded-xl mt-2 mb-4 p-6 animate-fade-in-up shadow-2xl">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.name}>
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                          className="flex items-center justify-between w-full text-gray-300 hover:text-white transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-slate-800/50"
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="w-5 h-5" />
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <span className="text-xs">▼</span>
                        </button>
                                                 {activeSubmenu === item.name && (
                           <div className="ml-8 mt-2 space-y-2">
                             {item.submenu.map((subItem) => (
                               <button
                                 key={subItem.name}
                                 onClick={() => handleServiceClick(subItem.category)}
                                 className="w-full text-left flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-slate-800/50 text-sm"
                               >
                                 <span>•</span>
                                 <span>{subItem.name}</span>
                               </button>
                             ))}
                           </div>
                         )}
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          handleNavClick(item.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-slate-800/50 w-full text-left"
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="text-sm">{item.name}</span>
                      </button>
                    )}
                  </div>
                );
              })}
              <div className="pt-2">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 w-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">Contáctanos</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 