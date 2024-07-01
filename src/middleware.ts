import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export function middleware(request: NextRequest) {
  // Obtener el token de las cookies
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    // Verificar el token en el cliente
    const decoded = jwt.decode(token, { json: true });
    if (!decoded) {
      throw new Error('Invalid token');
    }

    return NextResponse.next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// Configura el middleware para que se aplique a rutas específicas
export const config = {
  matcher: ['/dashboard/:path*', '/user/:path*'], // Ajusta las rutas según tu necesidad
};
