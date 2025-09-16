export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Astralyss",
    "url": "https://www.astralyss.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.astralyss.com/logo/IconAstralyss-withe.svg",
      "width": 200,
      "height": 200,
      "caption": "Logo Astralyss"
    },
    "description": "Impulsamos el crecimiento de tu marca con innovación, calidad y tecnología de vanguardia. Diseño moderno, desarrollo web optimizado y soluciones digitales de alto impacto.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MX",
      "addressRegion": "Ciudad de México"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+52-55-6419-8670",
        "contactType": "customer service",
        "email": "info@astralyss.com",
        "availableLanguage": "Spanish"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/astralyss",
      "https://www.instagram.com/astralyss",
      "https://www.tiktok.com/@astralyss"
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "Mexico"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios Digitales",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Diseño Web",
            "description": "Diseño de interfaces modernas y atractivas con experiencia de usuario optimizada",
            "category": "Diseño Digital"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desarrollo Web",
            "description": "Desarrollo de sitios web con código limpio y mantenible",
            "category": "Desarrollo Web"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Optimización SEO",
            "description": "Optimización SEO avanzada para mejorar el posicionamiento en buscadores",
            "category": "Marketing Digital"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Consultoría Digital",
            "description": "Asesoramiento estratégico para transformación digital",
            "category": "Consultoría"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "3",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Erick Muñoz"
        },
        "reviewBody": "Estoy muy satisfecho con el trabajo realizado en mi página web. La calidad del diseño es excepcional, todo está hecho a medida y perfectamente adaptado a lo que necesitaba. Este proyecto realmente superó mis expectativas y refleja exactamente lo que estaba buscando. ¡Totalmente recomendado!",
        "datePublished": "2024-01-15"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "David Ruiz"
        },
        "reviewBody": "El trabajo realizado en mi sitio web fue impecable. Desde el diseño hasta la funcionalidad, todo está cuidadosamente elaborado y personalizado según mis necesidades. Refleja exactamente lo que tenía en mente y supera mis expectativas. Estoy muy contento con el resultado, es profesional y de gran calidad. ¡Definitivamente volvería a confiar en este servicio!",
        "datePublished": "2024-02-20"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Maria Rodriguez"
        },
        "reviewBody": "Estoy encantada con el resultado de mi página web. Todo fue diseñado con detalle y personalizado para mis necesidades. La experiencia fue profesional y el trabajo final superó mis expectativas. Sin duda lo recomiendo.",
        "datePublished": "2024-03-10"
      }
    ],
    "knowsAbout": [
      "Desarrollo Web",
      "Diseño Web",
      "SEO",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Marketing Digital"
    ],
    "award": [
      "100% Satisfacción del Cliente",
      "50+ Proyectos Completados",
      "99.9% Tiempo de Actividad"
    ],
    "mainEntityOfPage": [
      {
        "@type": "WebPage",
        "@id": "https://www.astralyss.com",
        "name": "Astralyss - Desarrollo Web y Diseño",
        "description": "Impulsamos el crecimiento de tu marca con innovación, calidad y tecnología de vanguardia."
      },
      {
        "@type": "WebPage",
        "@id": "https://www.astralyss.com/contact",
        "name": "Contacto - Astralyss",
        "description": "Solicita tu propuesta personalizada para desarrollo web, diseño y soluciones digitales."
      }
    ],
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": "https://www.astralyss.com/contact",
        "query-input": "required name=search_term_string"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
} 