import { z } from 'zod'

/**
 * Esquema de validación para el registro de profesionales en Fixably-MX.
 * Implementa reglas estrictas para asegurar la calidad de la información
 * y prevenir ataques de inyección de datos.
 */
export const registrationSchema = z.object({
  // Paso 1: Información Básica
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  email: z
    .string()
    .email('Introduce un correo electrónico válido'),
  countryCode: z
    .string()
    .regex(/^\+(1|52)$/, 'Selecciona un código de país válido'),
  phone: z
    .string()
    .length(10, 'El teléfono debe tener exactamente 10 dígitos'),
  specialty: z
    .string({ required_error: 'Selecciona una especialidad' })
    .min(1, 'La especialidad es obligatoria'),
  experience: z
    .string({ required_error: 'Selecciona tu rango de experiencia' })
    .min(1, 'La experiencia es obligatoria'),

  // Paso 2: Verificación (Simulando uploads por ahora)
  ineUploaded: z
    .boolean()
    .refine(val => val === true, 'Debes subir tu INE para verificar tu identidad'),
  addressProofUploaded: z
    .boolean()
    .refine(val => val === true, 'Debes subir un comprobante de domicilio'),
  licenseUploaded: z.boolean().optional(),
  insuranceUploaded: z.boolean().optional(),

  // Paso 3: Portafolio
  projectCount: z
    .number()
    .min(3, 'Se requieren al menos 3 proyectos anteriores para validación'),
  instagramLink: z
    .string()
    .url('Introduce una URL de Instagram válida')
    .or(z.literal(''))
    .optional(),
  facebookLink: z
    .string()
    .url('Introduce una URL de Facebook válida')
    .or(z.literal(''))
    .optional(),

  // Paso 4: Zonas y Disponibilidad
  city: z
    .string({ required_error: 'Selecciona tu ciudad principal' })
    .min(1, 'La ciudad es obligatoria'),
  selectedZones: z
    .array(z.string())
    .min(1, 'Selecciona al menos una zona de cobertura'),
  hourlyRate: z
    .string()
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, 'La tarifa debe ser un número positivo'),
  availability: z
    .array(z.string())
    .min(1, 'Selecciona al menos un día disponible'),

  // Paso 5: Revisión y Términos
  acceptTerms: z
    .boolean()
    .refine(val => val === true, 'Debes aceptar los términos y condiciones de Fixably-MX'),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
