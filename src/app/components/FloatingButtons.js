'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronUp } from 'lucide-react';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar botones después de hacer scroll 300px
      if (window.scrollY > 300) {
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
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Solo mostrar en móviles (max-width: 768px)
  if (typeof window !== 'undefined' && window.innerWidth > 768) {
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
        </div>
      )}
    </>
  );
};

export default FloatingButtons;
