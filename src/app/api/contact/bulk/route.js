import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(request) {
  try {
    const body = await request.json()
    const { ids, action } = body

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Se requiere un array de IDs' },
        { status: 400 }
      )
    }

    if (!action || !['markRead', 'markUnread', 'delete'].includes(action)) {
      return NextResponse.json(
        { error: 'Acción no válida. Use: markRead, markUnread, o delete' },
        { status: 400 }
      )
    }

    let result

    switch (action) {
      case 'markRead':
        result = await prisma.contactSubmission.updateMany({
          where: { id: { in: ids } },
          data: { isRead: true }
        })
        break

      case 'markUnread':
        result = await prisma.contactSubmission.updateMany({
          where: { id: { in: ids } },
          data: { isRead: false }
        })
        break

      case 'delete':
        // Eliminar las consultas (esto también eliminará los seguimientos por CASCADE)
        result = await prisma.contactSubmission.deleteMany({
          where: { id: { in: ids } }
        })
        break

      default:
        return NextResponse.json(
          { error: 'Acción no soportada' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      message: `Operación completada exitosamente`,
      count: result.count
    })

  } catch (error) {
    console.error('Error en operación masiva:', error)
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
