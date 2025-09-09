'use client';

import { useState } from 'react';
import { Phone, Mail, Globe, Send, CheckCircle, Facebook, Instagram, ArrowRight, Target, DollarSign, Calendar, Users, Zap, TrendingUp, ShoppingCart, Briefcase, Camera, Palette, Code, BarChart3, Store, Utensils, Heart, BookOpen, Paintbrush, Home } from 'lucide-react';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Información básica
    name: '',
    email: '',
    phone: '',
    company: '',
    
    // Información del proyecto
    projectType: '',
    businessType: '',
    otherBusinessType: '',
    budget: '',
    timeline: '',
    currentWebsite: '',
    
    // Objetivos y necesidades
    mainGoal: '',
    targetAudience: '',
    competitors: '',
    specialRequirements: '',
    
    // Información adicional
    message: '',
    howDidYouHear: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const projectTypes = [
    { value: 'website', label: 'Sitio Web Corporativo', icon: Globe, description: 'Presencia profesional en línea' },
    { value: 'ecommerce', label: 'Tienda Online (E-commerce)', icon: ShoppingCart, description: 'Vende productos en línea' },
    { value: 'portfolio', label: 'Portafolio Personal', icon: Briefcase, description: 'Muestra tu trabajo profesional' },
    { value: 'landing', label: 'Landing Page', icon: Target, description: 'Página de conversión específica' },
    { value: 'app', label: 'Aplicación Web', icon: Code, description: 'Herramienta interactiva' },
    { value: 'redesign', label: 'Rediseño de Sitio', icon: Palette, description: 'Mejora tu sitio actual' }
  ];

  const businessTypes = [
    { value: 'retail', label: 'Tienda / Comercio', icon: Store },
    { value: 'services', label: 'Servicios Profesionales', icon: Briefcase },
    { value: 'restaurant', label: 'Restaurante / Comida', icon: Utensils },
    { value: 'health', label: 'Salud', icon: Heart },
    { value: 'education', label: 'Educación', icon: BookOpen },
    { value: 'tech', label: 'Tecnología', icon: Code },
    { value: 'creative', label: 'Diseño / Agencia', icon: Paintbrush },
    { value: 'other', label: 'Otro', icon: Globe }
  ];

  const projectApproaches = [
    { value: 'quality', label: 'Calidad y excelencia', description: 'Busco la mejor solución posible' },
    { value: 'custom', label: 'Solución personalizada', description: 'Algo único para mi negocio' },
    { value: 'professional', label: 'Enfoque profesional', description: 'Necesito algo serio y confiable' },
    { value: 'discuss', label: 'Necesito asesoría', description: 'Quiero que me guíen en la decisión' }
  ];

  const timelines = [
    { value: 'asap', label: 'Lo antes posible' },
    { value: '1-month', label: 'En 1 mes' },
    { value: '2-3-months', label: 'En 2-3 meses' },
    { value: '3-plus-months', label: 'En 3+ meses' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const mainGoals = [
    { value: 'more-clients', label: 'Conseguir más clientes', icon: Users },
    { value: 'increase-sales', label: 'Aumentar ventas', icon: TrendingUp },
    { value: 'brand-awareness', label: 'Dar a conocer mi marca', icon: Target },
    { value: 'online-presence', label: 'Tener presencia en línea', icon: Globe },
    { value: 'automation', label: 'Automatizar procesos', icon: Zap },
    { value: 'credibility', label: 'Generar confianza', icon: CheckCircle }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Acepta formatos como: +52 55 1234 5678, 5551234567, (555) 123-4567
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateURL = (url) => {
    if (!url) return true; // URL es opcional
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.name) {
          newErrors.name = 'Este campo es requerido';
        } else if (formData.name.trim().length < 2) {
          newErrors.name = 'El nombre debe tener al menos 2 caracteres';
        }
        
        if (!formData.email) {
          newErrors.email = 'Este campo es requerido';
        } else if (!validateEmail(formData.email)) {
          newErrors.email = 'Por favor ingresa un email válido';
        }
        
        if (!formData.phone) {
          newErrors.phone = 'Este campo es requerido';
        } else if (!validatePhone(formData.phone)) {
          newErrors.phone = 'Por favor ingresa un teléfono válido (ej: +52 55 1234 5678)';
        }
        
        if (!formData.company) {
          newErrors.company = 'Este campo es requerido';
        } else if (formData.company.trim().length < 2) {
          newErrors.company = 'El nombre de la empresa debe tener al menos 2 caracteres';
        }
        break;
        
      case 2:
        if (!formData.projectType) newErrors.projectType = 'Este campo es requerido';
        if (!formData.businessType) newErrors.businessType = 'Este campo es requerido';
        if (formData.businessType === 'other' && !formData.otherBusinessType) {
          newErrors.otherBusinessType = 'Este campo es requerido';
        } else if (formData.businessType === 'other' && formData.otherBusinessType.trim().length < 2) {
          newErrors.otherBusinessType = 'Especifica al menos 2 caracteres';
        }
        break;
        
      case 3:
        if (!formData.budget) newErrors.budget = 'Este campo es requerido';
        if (!formData.timeline) newErrors.timeline = 'Este campo es requerido';
        
        // Validar URL del sitio web actual si se proporciona
        if (formData.currentWebsite && !validateURL(formData.currentWebsite)) {
          newErrors.currentWebsite = 'Por favor ingresa una URL válida (ej: https://tusitio.com)';
        }
        break;
        
      case 4:
        if (!formData.mainGoal) newErrors.mainGoal = 'Este campo es requerido';
        
        if (!formData.targetAudience) {
          newErrors.targetAudience = 'Este campo es requerido';
        } else if (formData.targetAudience.trim().length < 5) {
          newErrors.targetAudience = 'Describe tu público objetivo con al menos 5 caracteres';
        }
        
        if (!formData.message) {
          newErrors.message = 'Este campo es requerido';
        } else if (formData.message.trim().length < 10) {
          newErrors.message = 'Cuéntanos más sobre tu proyecto (mínimo 10 caracteres)';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      
      // Scroll hacia arriba del formulario en móviles
      setTimeout(() => {
        const formElement = document.querySelector('form');
        if (formElement) {
          formElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      
      // Scroll hacia arriba del formulario en móviles
      setTimeout(() => {
        const formElement = document.querySelector('form');
        if (formElement) {
          formElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Aquí iría la lógica real de envío
    console.log('Formulario completo enviado:', formData);
    
    setIsSubmitting(false);
    setCurrentStep(5); // Mostrar página de éxito
    
    // Scroll hacia arriba para mostrar la página de éxito
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      icon: FaWhatsapp,
      title: 'WhatsApp',
      value: 'WhatsApp Business',
      href: 'https://wa.me/525564198670?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61574954128266' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/astralyss.web/' },
    { name: 'TikTok', icon: FaTiktok, href: 'https://www.tiktok.com/@astralyss' }
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          ¡Hablemos de tu proyecto! 🚀
        </h2>
        <p className="text-gray-300 text-lg">
          Cuéntanos qué necesitas y te ayudaremos a hacerlo realidad
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
              errors.name 
                ? 'bg-red-900/30 border-2 border-red-500 focus:ring-2 focus:ring-red-500' 
                : 'bg-slate-700/30 focus:ring-2 focus:ring-blue-500'
            }`}
            placeholder="Tu nombre completo"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
              errors.email 
                ? 'bg-red-900/30 border-2 border-red-500 focus:ring-2 focus:ring-red-500' 
                : 'bg-slate-700/30 focus:ring-2 focus:ring-blue-500'
            }`}
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
              errors.phone 
                ? 'bg-red-900/30 border-2 border-red-500 focus:ring-2 focus:ring-red-500' 
                : 'bg-slate-700/30 focus:ring-2 focus:ring-blue-500'
            }`}
            placeholder="+52 55 1234 5678"
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Empresa / Negocio *
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
              errors.company 
                ? 'bg-red-900/30 border-2 border-red-500 focus:ring-2 focus:ring-red-500' 
                : 'bg-slate-700/30 focus:ring-2 focus:ring-blue-500'
            }`}
            placeholder="Nombre de tu empresa"
          />
          {errors.company && (
            <p className="text-red-400 text-sm mt-1">{errors.company}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          ¿Qué tipo de proyecto necesitas?
        </h2>
        <p className="text-gray-300 text-lg">
          Selecciona el tipo de proyecto que mejor describa lo que buscas
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectTypes.map((project) => {
          const IconComponent = project.icon;
          return (
            <label
              key={project.value}
              className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                formData.projectType === project.value
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
              }`}
            >
              <input
                type="radio"
                name="projectType"
                value={project.value}
                checked={formData.projectType === project.value}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{project.label}</h3>
                <p className="text-gray-400 text-xs">{project.description}</p>
              </div>
            </label>
          );
        })}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">
          ¿Qué tipo de negocio tienes? *
        </label>
        <div className="grid md:grid-cols-4 gap-3">
          {businessTypes.map((business) => {
            const IconComponent = business.icon;
            return (
              <label
                key={business.value}
                className={`relative cursor-pointer p-3 rounded-lg border-2 transition-all duration-300 ${
                  formData.businessType === business.value
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                }`}
              >
                <input
                  type="radio"
                  name="businessType"
                  value={business.value}
                  checked={formData.businessType === business.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <IconComponent className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                  <span className="text-white text-xs">{business.label}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Campo adicional para "Otro" */}
      {formData.businessType === 'other' && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Especifica tu tipo de negocio
          </label>
          <input
            type="text"
            name="otherBusinessType"
            value={formData.otherBusinessType}
            onChange={handleChange}
            required={formData.businessType === 'other'}
            className="w-full px-4 py-3 bg-slate-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            placeholder="Ej: Consultoría, Inmobiliaria, Fitness, etc."
          />
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Enfoque y tiempo
        </h2>
        <p className="text-gray-300 text-lg">
          Esto nos ayuda a crear la propuesta perfecta para ti
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">
          ¿Cuál es tu enfoque para este proyecto? *
        </label>
        <p className="text-gray-400 text-sm mb-4">
          Nos ayuda a entender qué valoras más en tu proyecto digital
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {projectApproaches.map((approach) => (
            <label
              key={approach.value}
              className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                formData.budget === approach.value
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
              }`}
            >
              <input
                type="radio"
                name="budget"
                value={approach.value}
                checked={formData.budget === approach.value}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="text-center">
                <h4 className="font-semibold text-white text-sm mb-1">{approach.label}</h4>
                <p className="text-gray-400 text-xs">{approach.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">
          ¿Cuándo necesitas que esté listo? *
        </label>
        <div className="grid md:grid-cols-2 gap-3">
          {timelines.map((timeline) => (
            <label
              key={timeline.value}
              className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                formData.timeline === timeline.value
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
              }`}
            >
              <input
                type="radio"
                name="timeline"
                value={timeline.value}
                checked={formData.timeline === timeline.value}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-300" />
                <span className="text-white">{timeline.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          ¿Tienes un sitio web actual o ejemplo de cómo te gustaría tener el tuyo? (opcional)
        </label>
        <p className="text-gray-400 text-sm mb-3">
          Comparte la URL de tu sitio actual o de algún sitio que te guste como referencia
        </p>
        <input
          type="url"
          name="currentWebsite"
          value={formData.currentWebsite}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
            errors.currentWebsite 
              ? 'bg-red-900/30 border-2 border-red-500 focus:ring-2 focus:ring-red-500' 
              : 'bg-slate-700/30 focus:ring-2 focus:ring-blue-500'
          }`}
          placeholder="https://tusitio.com o https://ejemplo-que-me-gusta.com"
        />
        {errors.currentWebsite && (
          <p className="text-red-400 text-sm mt-1">{errors.currentWebsite}</p>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            ¿Cuál es tu objetivo principal?
          </h2>
          <p className="text-gray-300 text-lg">
            Esto nos ayuda a enfocar el proyecto en lo que realmente necesitas
          </p>
        </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">
          ¿Qué quieres lograr con tu sitio web? *
        </label>
        <div className="grid md:grid-cols-2 gap-4">
          {mainGoals.map((goal) => {
            const IconComponent = goal.icon;
            return (
              <label
                key={goal.value}
                className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                  formData.mainGoal === goal.value
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                }`}
              >
                <input
                  type="radio"
                  name="mainGoal"
                  value={goal.value}
                  checked={formData.mainGoal === goal.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3">
                  <IconComponent className="w-5 h-5 text-gray-300" />
                  <span className="text-white">{goal.label}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          ¿Quién es tu público objetivo? *
        </label>
        <input
          type="text"
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
            errors.targetAudience 
              ? 'bg-red-900/30 border-2 border-red-500 focus:ring-2 focus:ring-red-500' 
              : 'bg-slate-700/30 focus:ring-2 focus:ring-blue-500'
          }`}
          placeholder="Ej: Jóvenes de 25-35 años interesados en fitness"
        />
        {errors.targetAudience && (
          <p className="text-red-400 text-sm mt-1">{errors.targetAudience}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          ¿Tienes competidores que admires? (opcional)
        </label>
        <input
          type="text"
          name="competitors"
          value={formData.competitors}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          placeholder="Ej: Nike, Apple, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          ¿Hay algo específico que necesites? (opcional)
        </label>
        <textarea
          name="specialRequirements"
          value={formData.specialRequirements}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-slate-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 resize-none"
          placeholder="Ej: Integración con sistema de inventario, chat en vivo, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Cuéntanos más sobre tu proyecto *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className={`w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 resize-none ${
            errors.message 
              ? 'bg-red-900/30 border-2 border-red-500 focus:ring-2 focus:ring-red-500' 
              : 'bg-slate-700/30 focus:ring-2 focus:ring-blue-500'
          }`}
          placeholder="Cualquier información adicional que creas importante..."
        />
        {errors.message && (
          <p className="text-red-400 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            ¿Cómo nos conociste?
          </label>
          <select
            name="howDidYouHear"
            value={formData.howDidYouHear}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="" className="bg-slate-800 text-white">Selecciona una opción</option>
            <option value="google" className="bg-slate-800 text-white">Google</option>
            <option value="facebook" className="bg-slate-800 text-white">Facebook</option>
            <option value="instagram" className="bg-slate-800 text-white">Instagram</option>
            <option value="referral" className="bg-slate-800 text-white">Recomendación</option>
            <option value="other" className="bg-slate-800 text-white">Otro</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            ¿Cómo prefieres que te contactemos?
          </label>
          <select
            name="preferredContact"
            value={formData.preferredContact}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="email" className="bg-slate-800 text-white">Email</option>
            <option value="phone" className="bg-slate-800 text-white">Teléfono</option>
            <option value="whatsapp" className="bg-slate-800 text-white">WhatsApp</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">
        ¡Gracias por tu interés! 🎉
      </h2>
      <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
        Hemos recibido tu información y estamos analizando tu proyecto. 
        Te contactaremos en las próximas 24 horas con una propuesta personalizada.
      </p>
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Próximos pasos:</h3>
        <ul className="space-y-2 text-gray-300 text-sm text-left">
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Revisaremos tu proyecto en detalle</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Prepararemos una propuesta personalizada</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Te contactaremos en 24 horas</span>
          </li>
        </ul>
      </div>

      {/* Botón para regresar al inicio */}
      <Link 
        href="/" 
        className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
      >
        <Home className="w-5 h-5" />
        <span>Volver al Inicio</span>
      </Link>
    </div>
  );

  return (
    <main className="min-h-screen">
      <style jsx>{`
        select option {
          background-color: #1e293b !important;
          color: white !important;
          padding: 8px 12px;
        }
        select option:hover {
          background-color: #334155 !important;
        }
        select option:checked {
          background-color: #3b82f6 !important;
        }
      `}</style>
      <Navbar />
      
      <section className="py-16 sm:py-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.08),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.08),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentStep === 5 ? (
            renderSuccess()
          ) : (
            <>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Paso {currentStep} de 4</span>
                  <span className="text-sm text-gray-300">{Math.round((currentStep / 4) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (currentStep === 4) {
                    handleSubmit(e);
                  } else {
                    handleNext(e);
                  }
                }}>
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                  {currentStep === 4 && renderStep4()}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={currentStep === 1}
                      className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    
                    {currentStep === 4 ? (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? 'Enviando...' : 'Enviar Propuesta'}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2"
                      >
                        <span>Siguiente</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Otras formas de contactarnos
            </h2>
            <p className="text-gray-300 text-lg">
              ¿Prefieres hablar directamente? Estamos aquí para ti
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center space-x-4 p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl hover:shadow-lg hover:shadow-slate-600/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{info.title}</h3>
                    <p className="text-gray-300 text-sm">{info.value}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="text-center mt-12">
            <h3 className="text-lg font-semibold text-white mb-6">Síguenos en redes sociales</h3>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-slate-800/30 backdrop-blur-sm rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-slate-600/20 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-6 h-6 text-gray-300 hover:text-white transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
