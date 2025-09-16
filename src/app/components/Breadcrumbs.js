'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Solo mostrar breadcrumbs en páginas específicas, no en la home
  if (pathname === '/') return null;

  const breadcrumbs = [
    {
      name: 'Inicio',
      href: '/',
      current: pathname === '/'
    }
  ];

  // Agregar breadcrumbs específicos según la ruta
  if (pathname === '/contact') {
    breadcrumbs.push({
      name: 'Contacto',
      href: '/contact',
      current: true
    });
  } else if (pathname.startsWith('/admin')) {
    breadcrumbs.push({
      name: 'Panel Administrativo',
      href: '/admin',
      current: pathname === '/admin'
    });
    
    if (pathname === '/admin/contactos') {
      breadcrumbs.push({
        name: 'Consultas',
        href: '/admin/contactos',
        current: true
      });
    } else if (pathname === '/admin/analytics') {
      breadcrumbs.push({
        name: 'Análisis',
        href: '/admin/analytics',
        current: true
      });
    } else if (pathname === '/admin/settings') {
      breadcrumbs.push({
        name: 'Configuración',
        href: '/admin/settings',
        current: true
      });
    }
  }

  return (
    <nav className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 py-3">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Volver al inicio"
          >
            <Home className="w-4 h-4" />
          </Link>
          
          {breadcrumbs.map((item, index) => (
            <div key={item.href} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-gray-500" />
              {item.current ? (
                <span className="text-sm font-medium text-white" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
