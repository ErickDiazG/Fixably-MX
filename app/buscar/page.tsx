'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProfessionalCard } from '@/components/professional-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { professionals } from '@/lib/mock-data'
import { LOCATIONS } from '@/lib/types'
import { Search, SlidersHorizontal, X, MapPin } from 'lucide-react'

const SPECIALTIES = [
  'Electricista',
  'Fontanero',
  'Albañil',
  'Pintor',
  'Carpintero',
  'HVAC',
  'Herrero',
  'Drywall',
]

function SearchContent() {
  const searchParams = useSearchParams()
  const initialType = searchParams.get('tipo') || ''
  const initialLocation = searchParams.get('ubicacion') || ''
  const initialVerified = searchParams.get('verificado') === 'true'

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState(initialLocation)
  const [minRating, setMinRating] = useState([4])
  const [verifiedOnly, setVerifiedOnly] = useState(initialVerified)
  const [licensedOnly, setLicensedOnly] = useState(false)
  const [availableThisWeek, setAvailableThisWeek] = useState(false)
  const [sortBy, setSortBy] = useState('rating')

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedSpecialties([])
    setSelectedLocation('')
    setMinRating([4])
    setVerifiedOnly(false)
    setLicensedOnly(false)
    setAvailableThisWeek(false)
  }

  const filteredProfessionals = useMemo(() => {
    let result = [...professionals]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.specialty.toLowerCase().includes(query)
      )
    }

    if (selectedSpecialties.length > 0) {
      result = result.filter((p) =>
        selectedSpecialties.some((s) =>
          p.specialty.toLowerCase().includes(s.toLowerCase())
        )
      )
    }

    if (selectedLocation) {
      result = result.filter((p) =>
        p.zones.some((z) =>
          selectedLocation.toLowerCase().includes(z.toLowerCase())
        )
      )
    }

    if (minRating[0] > 0) {
      result = result.filter((p) => p.rating >= minRating[0])
    }

    if (verifiedOnly) {
      result = result.filter((p) => p.verified)
    }

    if (licensedOnly) {
      result = result.filter((p) => p.licensed)
    }

    // Sort
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => b.reviewCount - a.reviewCount)
    } else if (sortBy === 'experience') {
      result.sort((a, b) => b.experience - a.experience)
    }

    return result
  }, [
    searchQuery,
    selectedSpecialties,
    selectedLocation,
    minRating,
    verifiedOnly,
    licensedOnly,
    sortBy,
  ])

  const activeFiltersCount =
    selectedSpecialties.length +
    (selectedLocation ? 1 : 0) +
    (verifiedOnly ? 1 : 0) +
    (licensedOnly ? 1 : 0) +
    (minRating[0] > 0 ? 1 : 0)

  const FiltersSidebar = () => (
    <div className="space-y-6">
      {/* Specialties */}
      <div>
        <Label className="text-sm font-semibold">Especialidad</Label>
        <div className="mt-3 space-y-2">
          {SPECIALTIES.map((specialty) => (
            <div key={specialty} className="flex items-center gap-2">
              <Checkbox
                id={specialty}
                checked={selectedSpecialties.includes(specialty)}
                onCheckedChange={() => toggleSpecialty(specialty)}
              />
              <label
                htmlFor={specialty}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {specialty}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <Label className="text-sm font-semibold">Ubicación</Label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Todas las zonas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las zonas</SelectItem>
            {LOCATIONS.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Min Rating */}
      <div>
        <Label className="text-sm font-semibold">
          Calificación mínima: {minRating[0]}+
        </Label>
        <Slider
          value={minRating}
          onValueChange={setMinRating}
          max={5}
          min={0}
          step={0.5}
          className="mt-3"
        />
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="verified"
            checked={verifiedOnly}
            onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
          />
          <label htmlFor="verified" className="text-sm text-muted-foreground cursor-pointer">
            Solo verificados
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="licensed"
            checked={licensedOnly}
            onCheckedChange={(checked) => setLicensedOnly(checked as boolean)}
          />
          <label htmlFor="licensed" className="text-sm text-muted-foreground cursor-pointer">
            Con licencia local
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="available"
            checked={availableThisWeek}
            onCheckedChange={(checked) => setAvailableThisWeek(checked as boolean)}
          />
          <label htmlFor="available" className="text-sm text-muted-foreground cursor-pointer">
            Disponible esta semana
          </label>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full bg-transparent">
          <X className="mr-2 h-4 w-4" />
          Limpiar filtros
        </Button>
      )}
    </div>
  )

  return (
    <main className="flex-1 bg-secondary/20">
        {/* Search Header */}
        <div className="border-b border-border bg-background py-6">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Buscar Profesionales
            </h1>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o especialidad..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Mejor calificación</SelectItem>
                    <SelectItem value="reviews">Más reseñas</SelectItem>
                    <SelectItem value="experience">Más experiencia</SelectItem>
                  </SelectContent>
                </Select>

                {/* Mobile Filters */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden bg-transparent">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filtros
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FiltersSidebar />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Active filters badges */}
            {activeFiltersCount > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedSpecialties.map((s) => (
                  <Badge key={s} variant="secondary" className="gap-1">
                    {s}
                    <button onClick={() => toggleSpecialty(s)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedLocation && (
                  <Badge variant="secondary" className="gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedLocation}
                    <button onClick={() => setSelectedLocation('')}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {verifiedOnly && (
                  <Badge variant="secondary" className="gap-1">
                    Verificados
                    <button onClick={() => setVerifiedOnly(false)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {licensedOnly && (
                  <Badge variant="secondary" className="gap-1">
                    Con licencia
                    <button onClick={() => setLicensedOnly(false)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 shrink-0 md:block">
              <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
                <h2 className="mb-4 font-semibold text-foreground">Filtros</h2>
                <FiltersSidebar />
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredProfessionals.length} profesionales encontrados
                </p>
              </div>

              {filteredProfessionals.length > 0 ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  {filteredProfessionals.map((pro) => (
                    <ProfessionalCard key={pro.id} professional={pro} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-card p-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    No se encontraron profesionales
                  </h3>
                  <p className="text-muted-foreground">
                    Intenta ajustar los filtros o busca con otros términos.
                  </p>
                  <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                    Limpiar filtros
                  </Button>
                </div>
              )}

              {/* Pagination placeholder */}
              {filteredProfessionals.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
  )
}

export default function BuscarPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Cargando...</div>}>
      <SearchContent />
    </Suspense>
  )
}

// loading.tsx
// export default function Loading() {
//   return null
// }
