import { type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

/**
 * Middleware de seguridad para Fixably-MX (Integración Supabase SSR).
 * Delega la validación y refresco de sesión a la utilidad de Supabase.
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request)
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
