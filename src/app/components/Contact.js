'use client';

import { useState } from 'react';
import { Phone, Mail, Globe, Send, CheckCircle, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Crear mensaje para WhatsApp
    const whatsappMessage = `¡Hola! Me interesa conocer más sobre sus servicios.

📋 *Información de contacto:*
• *Nombre:* ${formData.name}
• *Email:* ${formData.email}
${formData.phone ? `• *Teléfono:* ${formData.phone}` : ''}

💬 *Mensaje:*
${formData.message}

¡Espero su respuesta!`;

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Número de WhatsApp de la empresa
    const whatsappNumber = '525564198670';
    
    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Simular un pequeño delay para la animación
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    // Mostrar mensaje de confirmación
    alert('¡Perfecto! Se abrirá WhatsApp para que puedas enviar tu mensaje.');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      value: '+52 55 6419 8670',
      href: 'tel:+525564198670'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@astralyss.com',
      href: 'mailto:info@astralyss.com'
    },
    {
      icon: Globe,
      title: 'Sitio Web',
      value: 'www.astralyss.com',
      href: 'https://www.astralyss.com'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61574954128266' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/astralyss.web/' },
    { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/525564198670?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios' },
    { name: 'TikTok', icon: FaTiktok, href: 'https://www.tiktok.com/@astralyss' }
  ];

  return (
    <section id="contacto" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.08),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-display">
            <span className="text-white">Contáctanos</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto px-4">
            ¿Listo para transformar tu negocio? Estamos aquí para ayudarte a crear 
            la presencia digital que tu empresa merece.
          </p>
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span>Obtener Propuesta Personalizada</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              Envíanos un mensaje por WhatsApp
            </h3>
            <p className="text-sm text-gray-400 mb-4 sm:mb-6">
              Completa el formulario y se abrirá WhatsApp con tu mensaje listo para enviar
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-300 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-gray-300 mb-2">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                  placeholder="+52 55 1234 5678"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-gray-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{isSubmitting ? 'Preparando...' : 'Enviar por WhatsApp'}</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                Información de contacto
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.href}
                      className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-slate-800/30 backdrop-blur-sm rounded-lg hover:shadow-lg hover:shadow-slate-600/20 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-xs sm:text-sm">{info.title}</h4>
                        <p className="text-gray-300 text-xs sm:text-sm">{info.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                Síguenos
              </h3>
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target={social.name === 'WhatsApp' || social.name === 'TikTok' ? '_blank' : '_self'}
                      rel={social.name === 'WhatsApp' || social.name === 'TikTok' ? 'noopener noreferrer' : ''}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800/30 backdrop-blur-sm rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-slate-600/20 transition-all duration-300"
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 hover:text-white transition-colors duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                ¿Por qué elegirnos?
              </h4>
              <ul className="space-y-2 text-gray-300 text-xs sm:text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>Respuesta rápida en 24 horas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>Consultoría gratuita</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>Soporte técnico continuo</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>Garantía de satisfacción</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 