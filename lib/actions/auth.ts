'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { registrationSchema } from '@/lib/validations'
import { z } from 'zod'

/**
 * Esquema simplificado para login
 */
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role: z.enum(['cliente', 'profesional'])
})

/**
 * Server Action para iniciar sesión
 */
export async function loginAction(formData: z.infer<typeof loginSchema>) {
  // Validación de seguridad estricta en el servidor
  const validated = loginSchema.safeParse(formData)
  if (!validated.success) {
    return { error: 'Datos de acceso inválidos o manipulados' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: validated.data.email,
    password: validated.data.password,
  })

  if (error) {
    return { error: error.message }
  }

  // Redirigir según el rol
  if (validated.data.role === 'cliente') {
    redirect('/dashboard/cliente')
  } else {
    redirect('/dashboard/profesional')
  }
}

/**
 * Server Action para cerrar sesión
 */
export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

/**
 * Server Action para registrar un nuevo profesional
 * Involucra crear el usuario en Auth y poblar las tablas profiles/professionals
 */
export async function registerProfessionalAction(data: any) {
  const supabase = await createClient()
  
  // 1. Validar datos con Zod en el servidor (Seguridad Pro)
  const validated = registrationSchema.safeParse(data)
  if (!validated.success) {
    return { error: 'Datos de validación inválidos' }
  }

  const { name, email, password } = data

  // 2. Crear usuario en Auth (El Trigger en Postgres hará el resto atómicamente)
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: password,
    options: {
      data: {
        role: 'professional',
        first_name: name.split(' ')[0],
        last_name: name.split(' ').slice(1).join(' '),
        phone: data.phone,
        specialty: data.specialty,
        experience_range: data.experience,
        city: data.city,
        selected_zones: data.selectedZones,
        hourly_rate: data.hourlyRate,
        availability: data.availability,
        instagram_link: data.instagramLink,
        facebook_link: data.facebookLink
      }
    }
  })

  if (authError) return { error: authError.message }
  if (!authData.user) return { error: 'No se pudo crear el usuario' }

  return { success: true }
}
