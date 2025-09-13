import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Verificar que JWT_SECRET esté configurado
if (!process.env.JWT_SECRET) {
  throw new Error('❌ ERROR DE SEGURIDAD: JWT_SECRET debe estar configurado en .env.local');
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Verificar si la ruta es del panel de administración (excluyendo login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Obtener el token de las cookies
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      // Redirigir al login si no hay token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verificar el token JWT
      const { payload } = await jwtVerify(token, JWT_SECRET);
      
      // Verificar que el token sea válido y tenga los permisos correctos
      if (payload.role !== 'admin' || payload.exp < Date.now() / 1000) {
        throw new Error('Token inválido');
      }

      // Token válido, permitir acceso
      return NextResponse.next();
    } catch (error) {
      // Token inválido, redirigir al login
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin-token');
      return response;
    }
  }

  // Si no es una ruta de admin, continuar normalmente
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
