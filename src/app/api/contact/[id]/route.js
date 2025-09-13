import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { id } = await params

    const submission = await prisma.contactSubmission.findUnique({
      where: { id },
      include: {
        followUps: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!submission) {
      return NextResponse.json(
        { error: 'Consulta no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(submission)

  } catch (error) {
    console.error('Error al obtener la consulta:', error)
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()

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

    // Actualizar la consulta
    const updatedSubmission = await prisma.contactSubmission.update({
      where: { id },
      data: {
        status: body.status,
        notes: body.notes,
        isRead: body.isRead !== undefined ? body.isRead : existingSubmission.isRead
      }
    })

    return NextResponse.json(updatedSubmission)

  } catch (error) {
    console.error('Error al actualizar la consulta:', error)
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params

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

    // Eliminar la consulta (esto también eliminará los seguimientos por CASCADE)
    await prisma.contactSubmission.delete({
      where: { id }
    })

    return NextResponse.json(
      { success: true, message: 'Consulta eliminada exitosamente' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error al eliminar la consulta:', error)
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
