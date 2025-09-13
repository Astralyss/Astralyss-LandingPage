import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No hay token de autenticación' },
        { status: 401 }
      );
    }

    const verification = await verifyToken(token);
    
    if (!verification.success) {
      return NextResponse.json(
        { success: false, message: 'Token inválido' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Token válido',
        user: verification.payload 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en verificación:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
