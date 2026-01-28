'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PROJECT_TYPES, LOCATIONS, BUDGET_RANGES } from '@/lib/types'
import { professionals } from '@/lib/mock-data'
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Check,
  FileText,
  User,
  Users,
  Star,
  BadgeCheck,
  CheckCircle2,
  X,
} from 'lucide-react'

type Step = 1 | 2 | 3 | 4

interface FormData {
  projectType: string
  description: string
  photos: File[]
  budgetRange: string
  startDate: string
  name: string
  email: string
  phone: string
  location: string
  selectedProfessionals: string[]
}

export default function PublicarProyectoPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    projectType: '',
    description: '',
    photos: [],
    budgetRange: '',
    startDate: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    selectedProfessionals: [],
  })

  const updateForm = (field: keyof FormData, value: FormData[keyof FormData]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleProfessional = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedProfessionals: prev.selectedProfessionals.includes(id)
        ? prev.selectedProfessionals.filter((p) => p !== id)
        : [...prev.selectedProfessionals, id],
    }))
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.projectType && formData.description.length >= 20 && formData.budgetRange
      case 2:
        return formData.name && formData.email && formData.phone && formData.location
      case 3:
        return formData.selectedProfessionals.length > 0
      default:
        return false
    }
  }

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as Step)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsComplete(true)
  }

  const recommendedPros = professionals.slice(0, 4)

  if (isComplete) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center bg-secondary/20 px-4">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-12 pb-8">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                ¡Solicitud enviada!
              </h2>
              <p className="mb-6 text-muted-foreground">
                Tu proyecto ha sido enviado a {formData.selectedProfessionals.length} profesionales.
                Recibirás respuestas en 24-48 horas.
              </p>
              <p className="mb-8 text-sm text-muted-foreground">
                Revisa tu email ({formData.email}) para confirmación y actualizaciones.
              </p>
              <div className="flex flex-col gap-2">
                <Button onClick={() => router.push('/dashboard/cliente')}>
                  Ir a mi panel
                </Button>
                <Button variant="outline" onClick={() => router.push('/')}>
                  Volver al inicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/20 py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[
                  { num: 1, label: 'Detalles', icon: FileText },
                  { num: 2, label: 'Contacto', icon: User },
                  { num: 3, label: 'Profesionales', icon: Users },
                ].map((s, index) => (
                  <div key={s.num} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                          step >= s.num
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-muted bg-background text-muted-foreground'
                        }`}
                      >
                        {step > s.num ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <s.icon className="h-5 w-5" />
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs font-medium ${
                          step >= s.num ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {index < 2 && (
                      <div
                        className={`mx-4 h-0.5 w-16 transition-colors sm:w-24 ${
                          step > s.num ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Project Details */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Detalles del proyecto</CardTitle>
                  <CardDescription>
                    Describe tu proyecto para que los profesionales puedan enviarte cotizaciones precisas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="projectType">Tipo de proyecto *</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => updateForm('projectType', value)}
                    >
                      <SelectTrigger id="projectType" className="mt-2">
                        <SelectValue placeholder="Selecciona el tipo de trabajo" />
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

                  <div>
                    <Label htmlFor="description">Descripción del proyecto *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe tu proyecto en detalle: qué necesitas, dimensiones aproximadas, materiales preferidos, etc."
                      value={formData.description}
                      onChange={(e) => updateForm('description', e.target.value)}
                      className="mt-2 min-h-[120px]"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formData.description.length}/500 caracteres (mínimo 20)
                    </p>
                  </div>

                  <div>
                    <Label>Fotos del proyecto (opcional)</Label>
                    <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-muted p-8">
                      <div className="text-center">
                        <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Arrastra fotos aquí o haz clic para seleccionar
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Hasta 5 fotos, máximo 5MB cada una
                        </p>
                        <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                          Seleccionar fotos
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="budget">Presupuesto aproximado *</Label>
                      <Select
                        value={formData.budgetRange}
                        onValueChange={(value) => updateForm('budgetRange', value)}
                      >
                        <SelectTrigger id="budget" className="mt-2">
                          <SelectValue placeholder="Selecciona rango" />
                        </SelectTrigger>
                        <SelectContent>
                          {BUDGET_RANGES.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="startDate">Fecha de inicio deseada</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateForm('startDate', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Contact Info */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Información de contacto</CardTitle>
                  <CardDescription>
                    Los profesionales necesitan esta información para contactarte.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+52 55 1234 5678"
                      value={formData.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Ubicación (colonia aproximada) *</Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => updateForm('location', value)}
                    >
                      <SelectTrigger id="location" className="mt-2">
                        <SelectValue placeholder="Selecciona tu zona" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATIONS.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="mt-1 text-xs text-muted-foreground">
                      No compartiremos tu dirección exacta sin tu autorización.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Select Professionals */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selecciona profesionales</CardTitle>
                  <CardDescription>
                    Te recomendamos estos profesionales basados en tu proyecto. Selecciona a quiénes quieres enviar tu solicitud.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendedPros.map((pro) => {
                    const isSelected = formData.selectedProfessionals.includes(pro.id)
                    return (
                      <div
                        key={pro.id}
                        onClick={() => toggleProfessional(pro.id)}
                        className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleProfessional(pro.id)}
                        />
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={pro.profileImage || "/placeholder.svg"} alt={pro.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {pro.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground">{pro.name}</h4>
                            {pro.verified && (
                              <BadgeCheck className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{pro.specialty}</p>
                          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-accent text-accent" />
                              {pro.rating}
                            </span>
                            <span>{pro.reviewCount} reseñas</span>
                            <span>{pro.experience} años exp.</span>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                            <Check className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    )
                  })}

                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Nota:</strong> Tu solicitud será enviada a los {formData.selectedProfessionals.length} profesionales seleccionados. 
                      Cada uno podrá responderte con una cotización personalizada.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Atrás
              </Button>

              {step < 3 ? (
                <Button onClick={handleNext} disabled={!canProceed()}>
                  Siguiente
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      Enviar solicitud a {formData.selectedProfessionals.length} profesionales
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
