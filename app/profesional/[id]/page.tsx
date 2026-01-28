import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { professionals, reviews } from '@/lib/mock-data'
import {
  MapPin,
  Star,
  Briefcase,
  FolderOpen,
  Clock,
  BadgeCheck,
  ShieldCheck,
  Languages,
  Wrench,
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  DollarSign,
} from 'lucide-react'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return professionals.map((pro) => ({
    id: pro.id,
  }))
}

export default async function ProfessionalProfilePage({ params }: Props) {
  const { id } = await params
  const professional = professionals.find((p) => p.id === id)

  if (!professional) {
    notFound()
  }

  const professionalReviews = reviews.filter((r) => r.professionalId === id)
  const initials = professional.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  const avgRatings = professionalReviews.length > 0
    ? {
        quality: professionalReviews.reduce((acc, r) => acc + r.ratings.quality, 0) / professionalReviews.length,
        timeliness: professionalReviews.reduce((acc, r) => acc + r.ratings.timeliness, 0) / professionalReviews.length,
        cleanliness: professionalReviews.reduce((acc, r) => acc + r.ratings.cleanliness, 0) / professionalReviews.length,
        communication: professionalReviews.reduce((acc, r) => acc + r.ratings.communication, 0) / professionalReviews.length,
      }
    : null

  // Mock portfolio images
  const portfolioItems = [
    { id: '1', title: 'Instalación eléctrica residencial', year: '2024', images: 3 },
    { id: '2', title: 'Remodelación departamento', year: '2024', images: 5 },
    { id: '3', title: 'Sistema de iluminación LED', year: '2023', images: 4 },
    { id: '4', title: 'Instalación industrial', year: '2023', images: 6 },
    { id: '5', title: 'Mantenimiento preventivo', year: '2023', images: 3 },
    { id: '6', title: 'Proyecto comercial', year: '2022', images: 4 },
  ]

  // Mock availability
  const availability = [
    { day: 'Lun', available: true },
    { day: 'Mar', available: true },
    { day: 'Mié', available: false },
    { day: 'Jue', available: true },
    { day: 'Vie', available: true },
    { day: 'Sáb', available: true },
    { day: 'Dom', available: false },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/20">
        {/* Profile Header */}
        <div className="border-b border-border bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                  <AvatarImage src={professional.profileImage || "/placeholder.svg"} alt={professional.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                    {professional.name}
                  </h1>
                  <p className="text-lg text-muted-foreground">{professional.specialty}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {professional.verified && (
                      <Badge className="gap-1 bg-primary/10 text-primary hover:bg-primary/20">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verificado TBCL
                      </Badge>
                    )}
                    {professional.licensed && (
                      <Badge className="gap-1 bg-green-500/10 text-green-700 hover:bg-green-500/20">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Licencia Local
                      </Badge>
                    )}
                    <Badge variant="outline" className="gap-1">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      {professional.rating} ({professional.reviewCount} reseñas)
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" size="lg" asChild>
                  <Link href={`/mensaje/${professional.id}`}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Enviar Mensaje
                  </Link>
                </Button>
                <Button size="lg" asChild>
                  <Link href={`/contactar/${professional.id}`}>
                    Solicitar Cotización
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="info">Información</TabsTrigger>
                  <TabsTrigger value="portfolio">Portafolio</TabsTrigger>
                  <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                  <TabsTrigger value="availability">Disponibilidad</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Acerca de</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {professional.description}
                      </p>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Experiencia</p>
                            <p className="font-medium">{professional.experience} años</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <FolderOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Proyectos</p>
                            <p className="font-medium">{professional.portfolioCount} completados</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Tiempo de respuesta</p>
                            <p className="font-medium">{professional.responseTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <DollarSign className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Tarifa por hora</p>
                            <p className="font-medium">${professional.hourlyRate} MXN</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-3 font-semibold flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          Zonas de cobertura
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {professional.zones.map((zone) => (
                            <Badge key={zone} variant="secondary">
                              {zone}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {professional.languages && (
                        <div>
                          <h4 className="mb-3 font-semibold flex items-center gap-2">
                            <Languages className="h-4 w-4 text-primary" />
                            Idiomas
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {professional.languages.map((lang) => (
                              <Badge key={lang} variant="outline">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {professional.equipment && (
                        <div>
                          <h4 className="mb-3 font-semibold flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-primary" />
                            Equipo y herramientas
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {professional.equipment.map((item) => (
                              <Badge key={item} variant="outline">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="portfolio" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Portafolio de proyectos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {portfolioItems.map((item) => (
                          <div
                            key={item.id}
                            className="group cursor-pointer overflow-hidden rounded-lg border border-border"
                          >
                            <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                              <FolderOpen className="h-12 w-12 text-muted-foreground/50" />
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-foreground line-clamp-1">
                                {item.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {item.year} · {item.images} fotos
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6 space-y-4">
                  {avgRatings && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Calificaciones por categoría</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { label: 'Calidad del trabajo', value: avgRatings.quality },
                          { label: 'Cumplimiento de plazos', value: avgRatings.timeliness },
                          { label: 'Limpieza y orden', value: avgRatings.cleanliness },
                          { label: 'Comunicación', value: avgRatings.communication },
                        ].map((rating) => (
                          <div key={rating.label}>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{rating.label}</span>
                              <span className="font-medium">{rating.value.toFixed(1)}</span>
                            </div>
                            <Progress value={rating.value * 20} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {professionalReviews.length > 0 ? (
                    professionalReviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {review.clientName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-foreground">{review.clientName}</p>
                                  <p className="text-sm text-muted-foreground">{review.projectType}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.round((review.ratings.quality + review.ratings.timeliness + review.ratings.cleanliness + review.ratings.communication) / 4)
                                          ? 'fill-accent text-accent'
                                          : 'text-muted'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="mt-3 text-muted-foreground leading-relaxed">
                                {review.comment}
                              </p>
                              <p className="mt-2 text-xs text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString('es-MX', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">
                          Este profesional aún no tiene reseñas.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="availability" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Disponibilidad esta semana
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-7 gap-2">
                        {availability.map((day) => (
                          <div
                            key={day.day}
                            className={`flex flex-col items-center rounded-lg p-3 ${
                              day.available
                                ? 'bg-green-500/10 text-green-700'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            <span className="text-sm font-medium">{day.day}</span>
                            <span className="mt-1 text-xs">
                              {day.available ? 'Disponible' : 'No disp.'}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">
                        La disponibilidad puede variar. Contacta al profesional para confirmar horarios específicos.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    ¿Interesado en este profesional?
                  </h3>
                  <Button className="w-full mb-3" size="lg" asChild>
                    <Link href={`/contactar/${professional.id}`}>
                      Solicitar Cotización Gratis
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg" asChild>
                    <Link href={`/mensaje/${professional.id}`}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Enviar Mensaje
                    </Link>
                  </Button>
                  <div className="mt-6 space-y-3 border-t border-border pt-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>Teléfono disponible al contratar</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>Email disponible al contratar</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Clock className="h-4 w-4" />
                      <span>Responde en {professional.responseTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
