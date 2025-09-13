import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validar datos requeridos
    const requiredFields = ['name', 'email', 'phone', 'company', 'projectType', 'businessType', 'budget', 'timeline', 'mainGoal', 'targetAudience', 'message']
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `El campo ${field} es requerido` },
          { status: 400 }
        )
      }
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Validar teléfono
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
    if (!phoneRegex.test(body.phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Teléfono inválido' },
        { status: 400 }
      )
    }

    // Validar URL si se proporciona
    if (body.currentWebsite) {
      const validateURL = (url) => {
        // Si la URL ya tiene protocolo, validar normalmente
        if (url.startsWith('http://') || url.startsWith('https://')) {
          try {
            new URL(url)
            return true
          } catch {
            return false
          }
        }
        
        // Si no tiene protocolo, agregar https:// y validar
        try {
          new URL(`https://${url}`)
          return true
        } catch {
          return false
        }
      }
      
      if (!validateURL(body.currentWebsite)) {
        return NextResponse.json(
          { error: 'URL del sitio web actual inválida' },
          { status: 400 }
        )
      }
    }

    // Crear el registro en la base de datos
    const contactSubmission = await prisma.contactSubmission.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        company: body.company.trim(),
        projectType: body.projectType,
        businessType: body.businessType,
        otherBusinessType: body.otherBusinessType?.trim() || null,
        budget: body.budget,
        timeline: body.timeline,
        currentWebsite: body.currentWebsite?.trim() || null,
        mainGoal: body.mainGoal,
        targetAudience: body.targetAudience.trim(),
        competitors: body.competitors?.trim() || null,
        specialRequirements: body.specialRequirements?.trim() || null,
        message: body.message.trim(),
        howDidYouHear: body.howDidYouHear || null,
        preferredContact: body.preferredContact || 'email',
        status: 'new'
      }
    })

    // Crear el primer seguimiento automático
    await prisma.contactFollowUp.create({
      data: {
        contactSubmissionId: contactSubmission.id,
        type: 'system',
        description: 'Nueva consulta recibida desde el formulario de contacto',
        nextAction: 'Contactar al cliente en 24 horas',
        nextActionDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas desde ahora
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Consulta enviada exitosamente',
        id: contactSubmission.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error al procesar la consulta:', error)
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 10
    const status = searchParams.get('status')
    
    const skip = (page - 1) * limit
    
    // Construir filtros
    const where = status ? { status } : {}
    
    // Obtener consultas con paginación
    const [submissions, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          followUps: {
            orderBy: { createdAt: 'desc' },
            take: 1 // Solo el último seguimiento
          }
        }
      }),
      prisma.contactSubmission.count({ where })
    ])

    return NextResponse.json({
      submissions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error al obtener consultas:', error)
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
