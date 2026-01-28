export interface Professional {
  id: string
  name: string
  specialty: string
  rating: number
  reviewCount: number
  experience: number
  verified: boolean
  licensed: boolean
  zones: string[]
  responseTime: string
  profileImage: string
  portfolioCount: number
  description?: string
  email?: string
  phone?: string
  languages?: string[]
  equipment?: string[]
  availability?: Record<string, boolean>
  hourlyRate?: number
}

export interface Review {
  id: string
  professionalId: string
  clientId: string
  clientName: string
  clientImage?: string
  projectType: string
  ratings: {
    quality: number
    timeliness: number
    cleanliness: number
    communication: number
  }
  comment: string
  photos?: string[]
  createdAt: string
}

export interface Project {
  id: string
  clientId: string
  title: string
  description: string
  type: string
  photos?: string[]
  budgetRange: string
  location: string
  startDate?: string
  status: 'draft' | 'published' | 'receiving_proposals' | 'in_progress' | 'completed' | 'cancelled'
  professionalsApplied?: string[]
  createdAt: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  projectId?: string
  timestamp: string
  read: boolean
}

export interface User {
  id: string
  email: string
  phone?: string
  role: 'client' | 'professional' | 'admin'
  name: string
  createdAt: string
}

export type ProjectType = 
  | 'Remodelación residencial'
  | 'Reparación estructural'
  | 'Ampliación'
  | 'Instalación eléctrica'
  | 'Fontanería y drenaje'
  | 'HVAC (Climatización)'
  | 'Drywall y plafones'
  | 'Herrería y soldadura'
  | 'Carpintería de obra'
  | 'Pintura profesional'

export type Location = 
  | 'CDMX - Polanco'
  | 'CDMX - Condesa'
  | 'CDMX - Roma'
  | 'CDMX - Coyoacán'
  | 'CDMX - Santa Fe'
  | 'Guadalajara - Centro'
  | 'Guadalajara - Zapopan'
  | 'Monterrey - San Pedro'
  | 'Monterrey - Centro'

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'needs_info'

export const PROJECT_TYPES: ProjectType[] = [
  'Remodelación residencial',
  'Reparación estructural',
  'Ampliación',
  'Instalación eléctrica',
  'Fontanería y drenaje',
  'HVAC (Climatización)',
  'Drywall y plafones',
  'Herrería y soldadura',
  'Carpintería de obra',
  'Pintura profesional',
]

export const LOCATIONS: Location[] = [
  'CDMX - Polanco',
  'CDMX - Condesa',
  'CDMX - Roma',
  'CDMX - Coyoacán',
  'CDMX - Santa Fe',
  'Guadalajara - Centro',
  'Guadalajara - Zapopan',
  'Monterrey - San Pedro',
  'Monterrey - Centro',
]

export const BUDGET_RANGES = [
  '$5,000 - $10,000 MXN',
  '$10,000 - $25,000 MXN',
  '$25,000 - $50,000 MXN',
  '$50,000+ MXN',
]
