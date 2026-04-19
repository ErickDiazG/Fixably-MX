'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Check, Upload, User, FileCheck, MapPin, FolderOpen, ClipboardCheck, AlertCircle, Shield, CheckCircle2, Clock, BadgeCheck, Lock } from 'lucide-react'
import { registrationSchema, type RegistrationFormData } from '@/lib/validations'
import { registerProfessionalAction } from '@/lib/actions/auth'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
  countryCode: string
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

  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      countryCode: '+52',
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
      password: '',
    },
  })

  const formData = watch()

  const handleNext = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = []
    
    if (step === 1) {
      fieldsToValidate = ['name', 'email', 'countryCode', 'phone', 'specialty', 'experience', 'password']
    } else if (step === 2) {
      fieldsToValidate = ['ineUploaded', 'addressProofUploaded']
    } else if (step === 3) {
      fieldsToValidate = ['projectCount']
    } else if (step === 4) {
      fieldsToValidate = ['city', 'selectedZones', 'hourlyRate', 'availability']
    }

    const isStepValid = await trigger(fieldsToValidate)
    if (isStepValid && step < 5) {
      setStep((prev) => (prev + 1) as Step)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step)
    }
  }

  const onFinalSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    try {
      const result = await registerProfessionalAction(data)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('¡Registro exitoso! Iniciando revisión...')
        setIsComplete(true)
      }
    } catch (error) {
      toast.error('Ocurrió un error inesperado al registrarte.')
    } finally {
      setIsSubmitting(false)
    }
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
                    <Label htmlFor="name" className={errors.name ? 'text-destructive' : ''}>Nombre completo *</Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre como aparece en tu identificación"
                      {...register('name')}
                      className={`mt-2 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="email" className={errors.email ? 'text-destructive' : ''}>Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        {...register('email')}
                        className={`mt-2 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone" className={errors.phone || errors.countryCode ? 'text-destructive' : ''}>Teléfono *</Label>
                      <div className="mt-2 flex gap-2">
                        <div className="w-[110px]">
                          <Controller
                            name="countryCode"
                            control={control}
                            render={({ field }) => (
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className={errors.countryCode ? 'border-destructive' : ''}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="+52">🇲🇽 +52</SelectItem>
                                  <SelectItem value="+1">🇺🇸 +1</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="5512345678"
                          {...register('phone')}
                          className={`flex-1 ${errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        />
                      </div>
                      {(errors.phone || errors.countryCode) && (
                        <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.phone?.message || errors.countryCode?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialty" className={errors.specialty ? 'text-destructive' : ''}>Especialidad principal *</Label>
                    <Controller
                      name="specialty"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="specialty" className={`mt-2 ${errors.specialty ? 'border-destructive' : ''}`}>
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
                      )}
                    />
                    {errors.specialty && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.specialty.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="experience" className={errors.experience ? 'text-destructive' : ''}>Años de experiencia *</Label>
                    <Controller
                      name="experience"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="experience" className={`mt-2 ${errors.experience ? 'border-destructive' : ''}`}>
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
                      )}
                    />
                    {errors.experience && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.experience.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password" className={errors.password ? 'text-destructive' : ''}>Contraseña de acceso *</Label>
                    <div className="relative group mt-2">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Mínimo 8 caracteres, una mayúscula y un número"
                        {...register('password')}
                        className={`pl-10 h-11 bg-muted/20 border-border focus-visible:ring-primary ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.password.message}
                      </p>
                    )}
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
                    <div key={doc.key} className="space-y-1">
                      <div className={`flex items-center justify-between rounded-lg border p-4 ${errors[doc.key] ? 'border-destructive' : 'border-border'}`}>
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
                            <p className={`font-medium ${errors[doc.key] ? 'text-destructive' : 'text-foreground'}`}>
                              {doc.label}
                              {doc.required && <span className="text-destructive ml-1">*</span>}
                            </p>
                            <p className="text-sm text-muted-foreground">{doc.description}</p>
                          </div>
                        </div>
                        <Button
                          variant={formData[doc.key] ? 'outline' : 'default'}
                          size="sm"
                          type="button"
                          onClick={() => setValue(doc.key, !formData[doc.key], { shouldValidate: true })}
                        >
                          {formData[doc.key] ? 'Cambiar' : 'Subir'}
                        </Button>
                      </div>
                      {errors[doc.key] && (
                        <p className="px-1 text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors[doc.key]?.message}
                        </p>
                      )}
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
                  <div className={`rounded-lg border-2 border-dashed p-8 text-center ${errors.projectCount ? 'border-destructive bg-destructive/5' : 'border-muted'}`}>
                    <FolderOpen className={`mx-auto h-12 w-12 ${errors.projectCount ? 'text-destructive' : 'text-muted-foreground'}`} />
                    <p className="mt-4 font-medium text-foreground">
                      Sube fotos de tus proyectos
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Mínimo 3 fotos por proyecto (antes, durante, después)
                    </p>
                    <Button 
                      type="button"
                      className="mt-4" 
                      onClick={() => setValue('projectCount', formData.projectCount + 1, { shouldValidate: true })}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Agregar proyecto
                    </Button>
                    {errors.projectCount && (
                      <p className="mt-2 text-xs text-destructive flex items-center justify-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.projectCount.message}
                      </p>
                    )}
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
                        <Label htmlFor="instagram" className={errors.instagramLink ? 'text-destructive' : ''}>Instagram profesional</Label>
                        <Input
                          id="instagram"
                          placeholder="https://instagram.com/tuusuario"
                          {...register('instagramLink')}
                          className={`mt-2 ${errors.instagramLink ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        />
                        {errors.instagramLink && (
                          <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.instagramLink.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="facebook" className={errors.facebookLink ? 'text-destructive' : ''}>Facebook profesional</Label>
                        <Input
                          id="facebook"
                          placeholder="https://facebook.com/tupagina"
                          {...register('facebookLink')}
                          className={`mt-2 ${errors.facebookLink ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        />
                        {errors.facebookLink && (
                          <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.facebookLink.message}
                          </p>
                        )}
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
                    <Label htmlFor="city" className={errors.city ? 'text-destructive' : ''}>Ciudad principal *</Label>
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={(val) => {
                            field.onChange(val)
                            setValue('selectedZones', [], { shouldValidate: true })
                          }}
                        >
                          <SelectTrigger id="city" className={`mt-2 ${errors.city ? 'border-destructive' : ''}`}>
                            <SelectValue placeholder="Selecciona tu ciudad" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CDMX">CDMX</SelectItem>
                            <SelectItem value="Guadalajara">Guadalajara</SelectItem>
                            <SelectItem value="Monterrey">Monterrey</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.city.message}
                      </p>
                    )}
                  </div>

                  {formData.city && (
                    <div>
                      <Label className={errors.selectedZones ? 'text-destructive' : ''}>Zonas de cobertura *</Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Selecciona las zonas donde puedes trabajar
                      </p>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {ZONES_BY_CITY[formData.city as keyof typeof ZONES_BY_CITY]?.map((zone) => {
                          const isSelected = formData.selectedZones.includes(zone)
                          return (
                            <div
                              key={zone}
                              onClick={() => {
                                const newZones = isSelected
                                  ? formData.selectedZones.filter((z) => z !== zone)
                                  : [...formData.selectedZones, zone]
                                setValue('selectedZones', newZones, { shouldValidate: true })
                              }}
                              className={`cursor-pointer rounded-lg border p-3 text-center text-sm transition-colors ${
                                isSelected
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-border hover:border-primary/50'
                              } ${errors.selectedZones ? 'border-destructive' : ''}`}
                            >
                              {zone}
                            </div>
                          )
                        })}
                      </div>
                      {errors.selectedZones && (
                        <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.selectedZones.message}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <Label htmlFor="hourlyRate" className={errors.hourlyRate ? 'text-destructive' : ''}>Tarifa por hora aproximada (MXN) *</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      placeholder="350"
                      {...register('hourlyRate')}
                      className={`mt-2 ${errors.hourlyRate ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Puedes ajustar esto después según el proyecto
                    </p>
                    {errors.hourlyRate && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.hourlyRate.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className={errors.availability ? 'text-destructive' : ''}>Disponibilidad general</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Selecciona los días que normalmente trabajas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => {
                        const isAvailable = formData.availability.includes(day)
                        return (
                          <div
                            key={day}
                            onClick={() => {
                              const newAvailability = isAvailable
                                ? formData.availability.filter((d) => d !== day)
                                : [...formData.availability, day]
                              setValue('availability', newAvailability, { shouldValidate: true })
                            }}
                            className={`cursor-pointer rounded-lg border px-4 py-2 text-sm transition-colors ${
                              isAvailable
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border hover:border-primary/50'
                            } ${errors.availability ? 'border-destructive' : ''}`}
                          >
                            {day}
                          </div>
                        )
                      })}
                    </div>
                    {errors.availability && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.availability.message}
                      </p>
                    )}
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
                          <span className="text-muted-foreground">Teléfono:</span>
                          <span className="font-medium">{formData.countryCode} {formData.phone}</span>
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
                    <Controller
                      name="acceptTerms"
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-col gap-1">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="terms"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className={errors.acceptTerms ? 'border-destructive' : ''}
                            />
                            <label htmlFor="terms" className={`text-sm cursor-pointer ${errors.acceptTerms ? 'text-destructive' : 'text-muted-foreground'}`}>
                              Acepto los <Link href="/terminos" className="text-primary hover:underline">Términos de Servicio</Link> y 
                              la <Link href="/privacidad" className="text-primary hover:underline">Política de Privacidad</Link> de FixablyMX.
                            </label>
                          </div>
                          {errors.acceptTerms && (
                            <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> {errors.acceptTerms.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={handleBack}
                disabled={step === 1 || isSubmitting}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Atrás
              </Button>

              {step < 5 ? (
                <Button type="button" onClick={handleNext}>
                  Siguiente
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit(onFinalSubmit)}
                  disabled={isSubmitting}
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
