// Utilidades para el formulario de contacto

export const PROJECT_TYPES = {
  website: 'Sitio Web Corporativo',
  ecommerce: 'Tienda Online (E-commerce)',
  portfolio: 'Portafolio Personal',
  landing: 'Landing Page',
  app: 'Aplicación Web',
  redesign: 'Rediseño de Sitio'
}

export const BUSINESS_TYPES = {
  retail: 'Tienda / Comercio',
  services: 'Servicios Profesionales',
  restaurant: 'Restaurante / Comida',
  health: 'Salud',
  education: 'Educación',
  tech: 'Tecnología',
  creative: 'Diseño / Agencia',
  other: 'Otro'
}

export const BUDGET_APPROACHES = {
  quality: 'Calidad y excelencia',
  custom: 'Solución personalizada',
  professional: 'Enfoque profesional',
  discuss: 'Necesito asesoría'
}

export const TIMELINES = {
  'asap': 'Lo antes posible',
  '1-month': 'En 1 mes',
  '2-3-months': 'En 2-3 meses',
  '3-plus-months': 'En 3+ meses',
  'flexible': 'Flexible'
}

export const MAIN_GOALS = {
  'more-clients': 'Conseguir más clientes',
  'increase-sales': 'Aumentar ventas',
  'brand-awareness': 'Dar a conocer mi marca',
  'online-presence': 'Tener presencia en línea',
  'automation': 'Automatizar procesos',
  'credibility': 'Generar confianza'
}

export const CONTACT_STATUSES = {
  new: 'Nueva',
  contacted: 'Contactado',
  qualified: 'Calificado',
  proposal_sent: 'Propuesta Enviada',
  closed_won: 'Cerrado Exitosamente',
  closed_lost: 'Perdido'
}

export const FOLLOW_UP_TYPES = {
  system: 'Sistema',
  email: 'Email',
  call: 'Llamada',
  whatsapp: 'WhatsApp',
  meeting: 'Reunión'
}

// Función para formatear los datos del formulario para mostrar
export function formatContactData(submission) {
  return {
    id: submission.id,
    fecha: new Date(submission.createdAt).toLocaleDateString('es-ES'),
    cliente: {
      nombre: submission.name,
      email: submission.email,
      telefono: submission.phone,
      empresa: submission.company
    },
    proyecto: {
      tipo: PROJECT_TYPES[submission.projectType] || submission.projectType,
      tipoNegocio: BUSINESS_TYPES[submission.businessType] || submission.businessType,
      tipoNegocioOtro: submission.otherBusinessType,
      enfoque: BUDGET_APPROACHES[submission.budget] || submission.budget,
      tiempo: TIMELINES[submission.timeline] || submission.timeline,
      sitioActual: submission.currentWebsite
    },
    objetivos: {
      objetivoPrincipal: MAIN_GOALS[submission.mainGoal] || submission.mainGoal,
      publicoObjetivo: submission.targetAudience,
      competidores: submission.competitors,
      requerimientosEspeciales: submission.specialRequirements,
      mensaje: submission.message
    },
    adicional: {
      comoNosConocio: submission.howDidYouHear,
      contactoPreferido: submission.preferredContact
    },
    estado: {
      status: CONTACT_STATUSES[submission.status] || submission.status,
      notas: submission.notes
    }
  }
}

// Función para validar los datos del formulario
export function validateContactForm(formData) {
  const errors = {}

  // Validar campos requeridos
  const requiredFields = ['name', 'email', 'phone', 'company', 'projectType', 'businessType', 'budget', 'timeline', 'mainGoal', 'targetAudience', 'message']
  
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].trim() === '') {
      errors[field] = 'Este campo es requerido'
    }
  })

  // Validar email
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Email inválido'
  }

  // Validar teléfono
  if (formData.phone && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
    errors.phone = 'Teléfono inválido'
  }

  // Validar URL si se proporciona
  if (formData.currentWebsite) {
    try {
      new URL(formData.currentWebsite)
    } catch {
      errors.currentWebsite = 'URL inválida'
    }
  }

  // Validar que si businessType es 'other', se proporcione otherBusinessType
  if (formData.businessType === 'other' && (!formData.otherBusinessType || formData.otherBusinessType.trim() === '')) {
    errors.otherBusinessType = 'Especifica tu tipo de negocio'
  }

  return errors
}
