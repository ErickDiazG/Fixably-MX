/**
 * ========================================================
 * FIXABLY-MX TYPES (Arquitectura Relacional V2)
 * ========================================================
 * Estos tipos reflejan exactamente la estructura de la 
 * base de datos en Supabase para asegurar consistencia.
 */

export type UserRole = 'client' | 'professional' | 'admin' | 'super_admin'

export interface Profile {
  id: string
  role: UserRole
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon_name: string | null
  is_active: boolean
}

export interface ServiceZone {
  id: string
  city: string
  neighborhood: string
  postal_code: string | null
  is_active: boolean
}

export interface Professional {
  id: string
  business_name: string | null
  bio_description: string | null
  experience_years: number
  hourly_rate: number | null
  is_verified: boolean
  verification_status: 'pending' | 'verified' | 'rejected'
  rating: number
  review_count: number
  completed_jobs: number
  ine_url: string | null
  proof_of_address_url: string | null
  created_at: string
  updated_at: string
  
  // Tipos para joins (opcionales al consultar)
  profile?: Profile
  categories?: Category[]
  zones?: ServiceZone[]
}

export type ProjectStatus = 'draft' | 'published' | 'in_progress' | 'completed' | 'cancelled'

export interface Project {
  id: string
  client_id: string
  category_id: string
  zone_id: string
  title: string
  description: string
  budget_range: string | null
  status: ProjectStatus
  created_at: string
  updated_at: string
  
  // Relaciones
  category?: Category
  zone?: ServiceZone
  client?: Profile
}

export type ProposalStatus = 'pending' | 'accepted' | 'rejected'

export interface Proposal {
  id: string
  project_id: string
  professional_id: string
  estimated_price: number
  message: string
  status: ProposalStatus
  created_at: string
  
  // Relaciones
  professional?: Professional & { profile: Profile }
}

export interface Review {
  id: string
  project_id: string
  client_id: string
  professional_id: string
  rating_quality: number
  rating_timing: number
  comment: string | null
  created_at: string
  
  // Relaciones
  client?: Profile
}

/**
 * Tipos auxiliares para el manejo de la UI
 */
export const BUDGET_RANGES = [
  '$5,000 - $10,000 MXN',
  '$10,000 - $25,000 MXN',
  '$25,000 - $50,000 MXN',
  '$50,000+ MXN',
]
