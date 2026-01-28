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
import { PROJECT_TYPES, LOCATIONS } from '@/lib/types'

export function HeroSection() {
  const router = useRouter()
  const [projectType, setProjectType] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (projectType) params.set('tipo', projectType)
    if (location) params.set('ubicacion', location)
    if (verifiedOnly) params.set('verificado', 'true')
    router.push(`/buscar?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background pb-16 pt-12 md:pb-24 md:pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <BadgeCheck className="h-4 w-4" />
            <span>Profesionales Verificados en México</span>
          </div>
          
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Encuentra al profesional perfecto para{' '}
            <span className="text-primary">TU proyecto</span> de construcción
          </h1>
          
          <p className="mb-10 text-pretty text-lg text-muted-foreground md:text-xl">
            Conectamos clientes con profesionales verificados del sector construcción 
            y oficios especializados. Cotizaciones claras, garantía de calidad.
          </p>

          {/* Search Form */}
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-4 shadow-lg md:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="text-left">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Tipo de Proyecto
                </label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="text-left">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Ubicación
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecciona zona" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col justify-end md:col-span-2 lg:col-span-1">
                <Button size="lg" className="h-12 w-full" onClick={handleSearch}>
                  <Search className="mr-2 h-5 w-5" />
                  Buscar Profesionales
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
                className="flex items-center gap-1.5 text-sm text-muted-foreground cursor-pointer"
              >
                <Shield className="h-4 w-4 text-primary" />
                Solo profesionales con licencia verificada
              </label>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="font-bold text-primary">500+</span>
              </div>
              <span>Profesionales activos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
                <span className="font-bold text-accent-foreground">4.8</span>
              </div>
              <span>Calificación promedio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="font-bold text-primary">2k+</span>
              </div>
              <span>Proyectos completados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
