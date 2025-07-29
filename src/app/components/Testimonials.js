'use client';

import { useState, useEffect } from 'react';
import { Quote, Star, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Erick Muñoz',
      role: 'Cliente Satisfecho',
      content: 'Estoy muy satisfecho con el trabajo realizado en mi página web. La calidad del diseño es excepcional, todo está hecho a medida y perfectamente adaptado a lo que necesitaba. Este proyecto realmente superó mis expectativas y refleja exactamente lo que estaba buscando. ¡Totalmente recomendado!',
      rating: 5
    },
    {
      name: 'David Ruiz',
      role: 'Cliente Satisfecho',
      content: 'El trabajo realizado en mi sitio web fue impecable. Desde el diseño hasta la funcionalidad, todo está cuidadosamente elaborado y personalizado según mis necesidades. Refleja exactamente lo que tenía en mente y supera mis expectativas. Estoy muy contento con el resultado, es profesional y de gran calidad. ¡Definitivamente volvería a confiar en este servicio!',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Cliente Satisfecho',
      content: 'Estoy encantada con el resultado de mi página web. Todo fue diseñado con detalle y personalizado para mis necesidades. La experiencia fue profesional y el trabajo final superó mis expectativas. Sin duda lo recomiendo.',
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
    ));
  };

  return (
    <section id="reseñas" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Lo que dicen </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">nuestros clientes</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Descubre por qué nuestros clientes confían en nosotros para transformar su presencia digital
          </p>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden border border-slate-700/30">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
            <div className="relative z-10">
              {/* Quote Icon */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500/20" />
              </div>
              
              {/* Testimonial Content */}
              <div className="mb-6 sm:mb-8">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed italic text-center">
                  {testimonials[currentTestimonial].content}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-lg">
                      {testimonials[currentTestimonial].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-white">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-400 text-sm sm:text-base">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex space-x-1">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index
                    ? 'bg-blue-500 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/30 hover:border-slate-600/30 transition-all duration-300">
            <div className="flex justify-center mb-2">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1 sm:mb-2">100%</div>
            <div className="text-gray-300 text-sm sm:text-base">Clientes Satisfechos</div>
          </div>
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/30 hover:border-slate-600/30 transition-all duration-300">
            <div className="flex justify-center mb-2">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1 sm:mb-2">5.0</div>
            <div className="text-gray-300 text-sm sm:text-base">Calificación Promedio</div>
          </div>
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/30 hover:border-slate-600/30 transition-all duration-300">
            <div className="flex justify-center mb-2">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1 sm:mb-2">50+</div>
            <div className="text-gray-300 text-sm sm:text-base">Proyectos Exitosos</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
            ¿Listo para transformar tu presencia digital?
          </p>
          <button className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
            <span>Comienza tu Proyecto</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
} 