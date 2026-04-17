import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware de seguridad para Fixably-MX.
 * Implementa la protección contra "Broken Access Control" mediante la redirección
 * de usuarios no autenticados en rutas protegidas.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Definir rutas protegidas
  const isDashboardRoute = pathname.startsWith('/dashboard')

  if (isDashboardRoute) {
    /**
     * NOTA: Actualmente usamos un placeholder de cookie ('fixably-auth').
     * En la fase de integración con Supabase, esto se sustituirá por la sesión real.
     */
    const authToken = request.cookies.get('fixably-auth')

    if (!authToken) {
      // Redirigir al login si no hay token, guardando la ruta de origen
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// Configuración del matcher para aplicar el middleware solo a rutas relevantes
export const config = {
  matcher: [
    /*
     * Coincidir con todas las rutas excepto las que empiezan por:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (assets públicos como logos)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
