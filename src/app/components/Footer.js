'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, MessageCircle, ChevronUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navegacion: [
      { name: 'Inicio', href: '#inicio' },
      { name: 'Soluciones', href: '#soluciones' },
      { name: 'Acerca de Nosotros', href: '#nosotros' },
      { name: 'Contacto', href: '#contacto' }
    ],
    servicios: [
      { name: 'Diseño Web', href: '#soluciones' },
      { name: 'Desarrollo Web', href: '#soluciones' },
      { name: 'Optimización SEO', href: '#soluciones' },
      { name: 'Consultoría Digital', href: '#soluciones' }
    ],
    contacto: [
      { name: '+52 55 6419 8670', href: 'tel:+525564198670' },
      { name: 'info@astralyss.com', href: 'mailto:info@astralyss.com' },
      { name: 'www.astralyss.com', href: 'https://www.astralyss.com' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'TikTok', icon: MessageCircle, href: '#' }
  ];

  return (
    <footer className="relative bg-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <Image
                src="/logo/IconAstralyss-withe.svg"
                alt="Astralyss"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-display">
                Astralyss
              </span>
            </div>
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">
              Impulsamos el crecimiento de tu marca con innovación, 
              calidad y tecnología de vanguardia.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-800/30 backdrop-blur-sm rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-slate-600/20 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 hover:text-white transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">Navegación</h3>
            <ul className="space-y-1 sm:space-y-2">
              {footerLinks.navegacion.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">Servicios</h3>
            <ul className="space-y-1 sm:space-y-2">
              {footerLinks.servicios.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">Contacto</h3>
            <ul className="space-y-1 sm:space-y-2">
              {footerLinks.contacto.map((contact, index) => (
                <li key={index}>
                  <a
                    href={contact.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {contact.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © {currentYear} Astralyss. Todos los derechos reservados.
            </div>
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Política de Privacidad
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Términos de Servicio
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-slate-800/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-slate-600/20 transition-all duration-300 z-50"
        aria-label="Volver arriba"
      >
        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 hover:text-white transition-colors duration-300" />
      </button>
    </footer>
  );
} 