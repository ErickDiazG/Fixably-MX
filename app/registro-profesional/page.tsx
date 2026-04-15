'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LOCATIONS } from '@/lib/types'
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Check,
  User,
  FileCheck,
  FolderOpen,
  MapPin,
  ClipboardCheck,
  CheckCircle2,
  Shield,
  BadgeCheck,
  Clock,
  AlertCircle,
} from 'lucide-react'

type Step = 1 | 2 | 3 | 4 | 5

const SPECIALTIES = [
  'Electricista',
  'Fontanero / Plomero',
  'Albañil / Obra Civil',
  'Pintor',
  'Carpintero',
  'HVAC / Climatización',
  'Herrero / Soldador',
  'Drywall / Plafones',
]

const EXPERIENCE_RANGES = [
  '1-3 años',
  '3-5 años',
  '5-10 años',
  '10-15 años',
  '15+ años',
]

const ZONES_BY_CITY = {
  CDMX: ['Polanco', 'Condesa', 'Roma', 'Coyoacán', 'Santa Fe', 'Del Valle', 'Nápoles', 'Centro'],
  Guadalajara: ['Zapopan', 'Centro', 'Tlaquepaque', 'Providencia', 'Chapalita'],
  Monterrey: ['San Pedro', 'Centro', 'Cumbres', 'Contry', 'Valle'],
}

interface FormData {
  // Step 1 - Basic Info
  name: string
  email: string
  phone: string
  specialty: string
  experience: string
  
  // Step 2 - Verification
  ineUploaded: boolean
  addressProofUploaded: boolean
  licenseUploaded: boolean
  insuranceUploaded: boolean
  
  // Step 3 - Portfolio
  projectCount: number
  instagramLink: string
  facebookLink: string
  
  // Step 4 - Zones & Availability
  city: string
  selectedZones: string[]
  hourlyRate: string
  availability: string[]
  
  // Terms
  acceptTerms: boolean
}

export default function RegistroProfesionalPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    experience: '',
    ineUploaded: false,
    addressProofUploaded: false,
    licenseUploaded: false,
    insuranceUploaded: false,
    projectCount: 0,
    instagramLink: '',
    facebookLink: '',
    city: '',
    selectedZones: [],
    hourlyRate: '',
    availability: [],
    acceptTerms: false,
  })

  const updateForm = (field: keyof FormData, value: FormData[keyof FormData]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleZone = (zone: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedZones: prev.selectedZones.includes(zone)
        ? prev.selectedZones.filter((z) => z !== zone)
        : [...prev.selectedZones, zone],
    }))
  }

  const toggleAvailability = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }))
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone && formData.specialty && formData.experience
      case 2:
        return formData.ineUploaded && formData.addressProofUploaded
      case 3:
        return formData.projectCount >= 3
      case 4:
        return formData.city && formData.selectedZones.length > 0 && formData.hourlyRate
      default:
        return true
    }
  }

  const handleNext = () => {
    if (step < 5) {
      setStep((prev) => (prev + 1) as Step)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step)
    }
  }

  const handleSubmit = async () => {
    if (!formData.acceptTerms) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsComplete(true)
  }

  const steps = [
    { num: 1, label: 'Información', icon: User },
    { num: 2, label: 'Verificación', icon: FileCheck },
    { num: 3, label: 'Portafolio', icon: FolderOpen },
    { num: 4, label: 'Zonas', icon: MapPin },
    { num: 5, label: 'Revisión', icon: ClipboardCheck },
  ]

  if (isComplete) {
    return (
      <main className="flex flex-1 items-center justify-center bg-secondary/20 px-4">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-12 pb-8">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                ¡Registro recibido!
              </h2>
              <p className="mb-6 text-muted-foreground">
                Tu perfil será revisado por nuestro equipo en 24-48 horas. 
                Te notificaremos por email cuando esté activo.
              </p>
              
              <div className="mb-8 rounded-lg bg-muted/50 p-4 text-left">
                <h4 className="font-medium text-foreground mb-2">Mientras tanto puedes:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Revisar nuestros recursos para profesionales
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Completar tutoriales de uso de la plataforma
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Preparar más fotos de tus proyectos
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link href="/recursos">Ver recursos</Link>
                </Button>
                <Button variant="outline" onClick={() => router.push('/')}>
                  Volver al inicio
                </Button>
              </div>
            </CardContent>
          </Card>
      </main>
    )
  }

  return (
      <main className="flex-1 bg-secondary/20 py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                Únete a FixablyMX
              </h1>
              <p className="mt-2 text-muted-foreground">
                Completa tu registro para comenzar a recibir proyectos
              </p>
            </div>

            {/* Progress */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex items-center justify-between min-w-[500px]">
                {steps.map((s, index) => (
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
                    {index < steps.length - 1 && (
                      <div
                        className={`mx-2 h-0.5 w-12 transition-colors ${
                          step > s.num ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Basic Info */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Información Básica</CardTitle>
                  <CardDescription>
                    Cuéntanos sobre ti y tu experiencia profesional.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre como aparece en tu identificación"
                      value={formData.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
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
                  </div>

                  <div>
                    <Label htmlFor="specialty">Especialidad principal *</Label>
                    <Select
                      value={formData.specialty}
                      onValueChange={(value) => updateForm('specialty', value)}
                    >
                      <SelectTrigger id="specialty" className="mt-2">
                        <SelectValue placeholder="Selecciona tu especialidad" />
                      </SelectTrigger>
                      <SelectContent>
                        {SPECIALTIES.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="experience">Años de experiencia *</Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => updateForm('experience', value)}
                    >
                      <SelectTrigger id="experience" className="mt-2">
                        <SelectValue placeholder="Selecciona rango" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXPERIENCE_RANGES.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Verification */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Verificación de Documentos</CardTitle>
                  <CardDescription>
                    Sube los documentos requeridos para verificar tu identidad y credenciales.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Tu información está segura</p>
                        <p className="text-sm text-muted-foreground">
                          Tus documentos son revisados únicamente para verificación y nunca se comparten con terceros.
                        </p>
                      </div>
                    </div>
                  </div>

                  {[
                    { key: 'ineUploaded' as const, label: 'INE (frente y reverso)', required: true, description: 'Identificación oficial vigente' },
                    { key: 'addressProofUploaded' as const, label: 'Comprobante de domicilio', required: true, description: 'No mayor a 3 meses' },
                    { key: 'licenseUploaded' as const, label: 'Licencia profesional', required: false, description: 'Si aplica para tu especialidad' },
                    { key: 'insuranceUploaded' as const, label: 'Seguro de responsabilidad civil', required: false, description: 'Recomendado para mayor confianza' },
                  ].map((doc) => (
                    <div key={doc.key} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          formData[doc.key] ? 'bg-green-500/10' : 'bg-muted'
                        }`}>
                          {formData[doc.key] ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Upload className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {doc.label}
                            {doc.required && <span className="text-destructive ml-1">*</span>}
                          </p>
                          <p className="text-sm text-muted-foreground">{doc.description}</p>
                        </div>
                      </div>
                      <Button
                        variant={formData[doc.key] ? 'outline' : 'default'}
                        size="sm"
                        onClick={() => updateForm(doc.key, !formData[doc.key])}
                      >
                        {formData[doc.key] ? 'Cambiar' : 'Subir'}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Step 3: Portfolio */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Tu Portafolio</CardTitle>
                  <CardDescription>
                    Muestra tu trabajo. Necesitas al menos 3 proyectos con fotos antes/después.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border-2 border-dashed border-muted p-8 text-center">
                    <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 font-medium text-foreground">
                      Sube fotos de tus proyectos
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Mínimo 3 fotos por proyecto (antes, durante, después)
                    </p>
                    <Button className="mt-4" onClick={() => updateForm('projectCount', formData.projectCount + 1)}>
                      <Upload className="mr-2 h-4 w-4" />
                      Agregar proyecto
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                    <span className="text-sm text-muted-foreground">Proyectos agregados:</span>
                    <span className={`font-semibold ${formData.projectCount >= 3 ? 'text-green-600' : 'text-foreground'}`}>
                      {formData.projectCount} / 3 mínimo
                    </span>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h4 className="font-medium text-foreground mb-4">
                      Redes sociales profesionales (opcional)
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="instagram">Instagram profesional</Label>
                        <Input
                          id="instagram"
                          placeholder="@tuusuario"
                          value={formData.instagramLink}
                          onChange={(e) => updateForm('instagramLink', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="facebook">Facebook profesional</Label>
                        <Input
                          id="facebook"
                          placeholder="URL de tu página"
                          value={formData.facebookLink}
                          onChange={(e) => updateForm('facebookLink', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Zones & Availability */}
            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Zonas y Disponibilidad</CardTitle>
                  <CardDescription>
                    Define dónde trabajas y cuándo estás disponible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="city">Ciudad principal *</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => {
                        updateForm('city', value)
                        updateForm('selectedZones', [])
                      }}
                    >
                      <SelectTrigger id="city" className="mt-2">
                        <SelectValue placeholder="Selecciona tu ciudad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CDMX">CDMX</SelectItem>
                        <SelectItem value="Guadalajara">Guadalajara</SelectItem>
                        <SelectItem value="Monterrey">Monterrey</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.city && (
                    <div>
                      <Label>Zonas de cobertura *</Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Selecciona las zonas donde puedes trabajar
                      </p>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {ZONES_BY_CITY[formData.city as keyof typeof ZONES_BY_CITY]?.map((zone) => (
                          <div
                            key={zone}
                            onClick={() => toggleZone(zone)}
                            className={`cursor-pointer rounded-lg border p-3 text-center text-sm transition-colors ${
                              formData.selectedZones.includes(zone)
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            {zone}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="hourlyRate">Tarifa por hora aproximada (MXN) *</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      placeholder="350"
                      value={formData.hourlyRate}
                      onChange={(e) => updateForm('hourlyRate', e.target.value)}
                      className="mt-2"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Puedes ajustar esto después según el proyecto
                    </p>
                  </div>

                  <div>
                    <Label>Disponibilidad general</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Selecciona los días que normalmente trabajas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
                        <div
                          key={day}
                          onClick={() => toggleAvailability(day)}
                          className={`cursor-pointer rounded-lg border px-4 py-2 text-sm transition-colors ${
                            formData.availability.includes(day)
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle>Revisión Final</CardTitle>
                  <CardDescription>
                    Revisa tu información antes de enviar tu solicitud.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted/50 p-4">
                      <h4 className="font-medium text-foreground mb-2">Información Personal</h4>
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Nombre:</span>
                          <span className="font-medium">{formData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-medium">{formData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Especialidad:</span>
                          <span className="font-medium">{formData.specialty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Experiencia:</span>
                          <span className="font-medium">{formData.experience}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                      <h4 className="font-medium text-foreground mb-2">Documentos</h4>
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">INE:</span>
                          {formData.ineUploaded ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Comprobante domicilio:</span>
                          {formData.addressProofUploaded ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Licencia profesional:</span>
                          {formData.licenseUploaded ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <span className="text-xs text-muted-foreground">No subida</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                      <h4 className="font-medium text-foreground mb-2">Cobertura</h4>
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Ciudad:</span>
                          <span className="font-medium">{formData.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Zonas:</span>
                          <span className="font-medium">{formData.selectedZones.join(', ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tarifa/hora:</span>
                          <span className="font-medium">${formData.hourlyRate} MXN</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-start gap-3">
                      <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Proceso de verificación</p>
                        <p className="text-sm text-muted-foreground">
                          Tu perfil será revisado en 24-48 horas. Te notificaremos por email 
                          cuando esté activo y puedas comenzar a recibir proyectos.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => updateForm('acceptTerms', checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      Acepto los <Link href="/terminos" className="text-primary hover:underline">Términos de Servicio</Link> y 
                      la <Link href="/privacidad" className="text-primary hover:underline">Política de Privacidad</Link> de FixablyMX.
                    </label>
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

              {step < 5 ? (
                <Button onClick={handleNext} disabled={!canProceed()}>
                  Siguiente
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.acceptTerms || isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
  )
}
