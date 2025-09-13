import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Clave secreta para JWT (en producción debería estar en variables de entorno)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'tu-clave-secreta-super-segura-para-astralyss-2024');

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
