'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Search, Shield, BadgeCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Category, ServiceZone } from '@/lib/types'
import { useEffect } from 'react'

export function HeroSection() {
  const router = useRouter()
  const [projectType, setProjectType] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  
  // Datos dinámicos de Supabase V2
  const [categories, setCategories] = useState<Category[]>([])
  const [serviceZones, setServiceZones] = useState<ServiceZone[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient()
        const [catRes, zoneRes] = await Promise.all([
          supabase.from('categories').select('*').eq('is_active', true).order('name'),
          supabase.from('service_zones').select('*').eq('is_active', true).order('city')
        ])
        
        if (catRes.data) setCategories(catRes.data)
        if (zoneRes.data) setServiceZones(zoneRes.data)
      } catch (error) {
        console.error('Error loading search data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const availableCities = Array.from(new Set(serviceZones.map(z => z.city)))

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (projectType) params.set('tipo', projectType)
    if (location) params.set('ubicacion', location)
    if (verifiedOnly) params.set('verificado', 'true')
    router.push(`/buscar?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden bg-background border-b-4 border-primary pb-16 pt-16 md:pb-32 md:pt-24">
      {/* Background decoration - Brutalist stripes instead of blur */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #0f172a 25%, transparent 25%, transparent 75%, #0f172a 75%, #0f172a), repeating-linear-gradient(45deg, #0f172a 25%, #f8fafc 25%, #f8fafc 75%, #0f172a 75%, #0f172a)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 border-2 border-primary bg-primary px-4 py-1.5 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
            <BadgeCheck className="h-4 w-4 text-accent" />
            <span>Profesionales Verificados en México</span>
          </div>
          
          <h1 className="mb-8 text-balance text-6xl font-black uppercase tracking-tighter text-foreground md:text-7xl lg:text-8xl leading-none">
            EL PROFESIONAL PERFECTO PARA{' '}
            <span className="bg-accent px-2 text-primary">TU PROYECTO</span>
          </h1>
          
          <p className="mb-12 mx-auto max-w-2xl text-pretty text-lg font-medium text-muted-foreground md:text-2xl">
            Conectamos obras con expertos verificados. 
            Cotizaciones claras, maquinaria pesada y garantía de calidad industrial.
          </p>

          {/* Search Form */}
          <div className="mx-auto max-w-4xl border-4 border-primary bg-card p-6 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] md:p-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="text-left font-bold uppercase tracking-wide">
                <label className="mb-2 block text-sm font-black text-primary">
                  1. REQUERIMIENTO
                </label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger className="h-12" aria-label="Selecciona un tipo de servicio">
                    <SelectValue placeholder={isLoading ? "Cargando..." : "Selecciona un servicio"} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.slug}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="text-left font-bold uppercase tracking-wide">
                <label className="mb-2 block text-sm font-black text-primary">
                  2. UBICACIÓN
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="h-12" aria-label="Selecciona una zona o ubicación">
                    <SelectValue placeholder={isLoading ? "Cargando..." : "Selecciona zona"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col justify-end md:col-span-2 lg:col-span-1">
                <Button size="lg" className="h-12 w-full border-2 border-primary bg-accent text-accent-foreground font-black uppercase tracking-widest hover:bg-accent/90" onClick={handleSearch}>
                  <Search className="mr-2 h-5 w-5" />
                  EJECUTAR BÚSQUEDA
                </Button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Checkbox
                id="verified"
                checked={verifiedOnly}
                onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
              />
              <label
                htmlFor="verified"
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary cursor-pointer"
              >
                <Shield className="h-4 w-4 text-accent" />
                Solo profesionales con licencia verificada
              </label>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-bold uppercase tracking-wide text-foreground">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-primary bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
                <span className="text-lg">500+</span>
              </div>
              <span className="text-left leading-tight">PROS<br/>ACTIVOS</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-primary bg-accent text-primary shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <span className="text-lg">4.8</span>
              </div>
              <span className="text-left leading-tight">MÉTRICA DE<br/>CALIDAD</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-primary bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
                <span className="text-lg">2K+</span>
              </div>
              <span className="text-left leading-tight">OBRAS<br/>CERRADAS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
