import { NextResponse } from 'next/server';
import { verifyCredentials, generateToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Validar datos de entrada
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Verificar credenciales
    const verification = await verifyCredentials(username, password);
    
    if (!verification.success) {
      return NextResponse.json(
        { success: false, message: verification.message },
        { status: 401 }
      );
    }

    // Generar token JWT
    const token = await generateToken(username);

    // Crear respuesta con cookie segura
    const response = NextResponse.json(
      { success: true, message: 'Login exitoso' },
      { status: 200 }
    );

    // Configurar cookie segura
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 horas
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
