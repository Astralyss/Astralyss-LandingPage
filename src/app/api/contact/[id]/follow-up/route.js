import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()

    // Validar datos requeridos
    if (!body.type || !body.description) {
      return NextResponse.json(
        { error: 'Tipo y descripción son requeridos' },
        { status: 400 }
      )
    }

    // Validar que la consulta existe
    const existingSubmission = await prisma.contactSubmission.findUnique({
      where: { id }
    })

    if (!existingSubmission) {
      return NextResponse.json(
        { error: 'Consulta no encontrada' },
        { status: 404 }
      )
    }

    // Crear el seguimiento
    const followUp = await prisma.contactFollowUp.create({
      data: {
        contactSubmissionId: id,
        type: body.type,
        description: body.description,
        nextAction: body.nextAction || null,
        nextActionDate: body.nextActionDate ? new Date(body.nextActionDate) : null
      }
    })

    // Si se proporciona una próxima acción, actualizar el estado de la consulta
    if (body.nextAction) {
      await prisma.contactSubmission.update({
        where: { id },
        data: {
          status: body.status || existingSubmission.status
        }
      })
    }

    return NextResponse.json(followUp, { status: 201 })

  } catch (error) {
    console.error('Error al crear el seguimiento:', error)
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = await params

    const followUps = await prisma.contactFollowUp.findMany({
      where: { contactSubmissionId: id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(followUps)

  } catch (error) {
    console.error('Error al obtener los seguimientos:', error)
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
