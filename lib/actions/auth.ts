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

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: validated.data.email,
    password: validated.data.password,
  })

  if (error) {
    return { error: error.message }
  }

  // Obtener el rol real del usuario desde la base de datos
  // Esto es mucho más seguro que confiar en el tab de la UI
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single()
    
  if (profileError || !profileData) {
     return { error: 'No se pudo verificar el perfil del usuario' }
  }

  const role = profileData.role

  // Redirigir según el rol real de la DB
  if (role === 'admin' || role === 'super_admin') {
    redirect('/dashboard/admin')
  } else if (role === 'client') {
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
export async function registerProfessionalAction(data: RegistrationFormData) {
  const supabase = await createClient()
  
  // 1. Validar datos
  const validated = registrationSchema.safeParse(data)
  if (!validated.success) {
    return { error: 'Datos de validación inválidos' }
  }

  const { name, email, password, specialty, experience, hourlyRate, selectedZones } = data

  // 2. Crear usuario en Auth
  // El Trigger 'handle_new_user' insertará automáticamente en 'public.profiles'
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'professional',
        full_name: name,
        phone: data.phone
      }
    }
  })

  if (authError) return { error: authError.message }
  if (!authData.user) return { error: 'No se pudo crear el usuario' }

  const userId = authData.user.id

  // 3. Insertar datos complementarios en Professionals
  // Nota: Usamos el ID del usuario recién creado
  const { error: proError } = await supabase
    .from('professionals')
    .insert({
      id: userId,
      experience_years: parseInt(experience),
      hourly_rate: parseFloat(hourlyRate),
      business_name: name // Por ahora usamos el nombre como nombre de negocio
    })

  if (proError) return { error: proError.message }

  // 4. Insertar Relaciones (Categorías y Zonas)
  // Categoría principal
  const { error: catError } = await supabase
    .from('professional_categories')
    .insert({
      professional_id: userId,
      category_id: specialty
    })

  if (catError) return { error: catError.message }

  // Zonas de cobertura
  const zoneInserts = selectedZones.map(zoneId => ({
    professional_id: userId,
    zone_id: zoneId
  }))

  const { error: zoneError } = await supabase
    .from('professional_zones')
    .insert(zoneInserts)

  if (zoneError) return { error: zoneError.message }

  return { success: true }
}
