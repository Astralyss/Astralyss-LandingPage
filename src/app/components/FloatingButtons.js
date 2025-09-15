'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronUp } from 'lucide-react';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Verificar si es móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verificar al cargar
    checkMobile();

    const toggleVisibility = () => {
      // Solo mostrar en móviles y después de hacer scroll 300px
      if (window.innerWidth <= 768 && window.scrollY > 300) {
        setIsVisible(true);
        // Pequeño delay para animación suave
        setTimeout(() => setShowButtons(true), 100);
      } else {
        setShowButtons(false);
        // Delay para ocultar después de la animación
        setTimeout(() => setIsVisible(false), 300);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Solo mostrar en la ruta principal
  if (pathname !== '/') {
    return null;
  }

  // Solo mostrar en móviles
  if (!isMobile) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:hidden">
          {/* Botón de scroll to top */}
          <button
            onClick={scrollToTop}
            className={`
              w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-500 
              rounded-full shadow-lg hover:shadow-xl 
              flex items-center justify-center
              transition-all duration-300 ease-in-out
              hover:scale-110 active:scale-95
              ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            aria-label="Ir arriba"
          >
            <ChevronUp className="w-6 h-6 text-white" />
          </button>

          {/* Botón de contacto */}
          <Link
            href="/contact"
            className={`
              w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-500 
              rounded-full shadow-lg hover:shadow-xl 
              flex items-center justify-center
              transition-all duration-300 ease-in-out
              hover:scale-110 active:scale-95
              ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            aria-label="Contactar"
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
          </Link>

          {/* Botón de WhatsApp */}
          <a
            href="https://wa.me/525564198670"
            target="_blank"
            rel="noopener noreferrer"
            className={`
              w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 
              rounded-full shadow-lg hover:shadow-xl 
              flex items-center justify-center
              transition-all duration-300 ease-in-out
              hover:scale-110 active:scale-95
              ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            aria-label="Contactar por WhatsApp"
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </a>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;
