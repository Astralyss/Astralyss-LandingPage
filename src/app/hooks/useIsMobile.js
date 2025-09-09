'use client';

import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Verificar si es un dispositivo móvil basado en el ancho de pantalla
      const isMobileWidth = window.innerWidth < 768; // md breakpoint de Tailwind
      setIsMobile(isMobileWidth);
    };

    // Verificar al cargar
    checkIsMobile();

    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
}
