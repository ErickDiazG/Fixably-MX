'use client'

import Link from 'next/link'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  LayoutDashboard,
  FileText,
  Receipt,
  FolderOpen,
  MessageSquare,
  BarChart3,
  Settings,
  ArrowRight,
  Clock,
  Star,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  TrendingUp,
  Eye,
} from 'lucide-react'

const proNavItems = [
  { href: '/dashboard/profesional', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/profesional/solicitudes', label: 'Solicitudes', icon: FileText },
  { href: '/dashboard/profesional/cotizaciones', label: 'Mis Cotizaciones', icon: Receipt },
  { href: '/dashboard/profesional/portafolio', label: 'Mi Portafolio', icon: FolderOpen },
  { href: '/dashboard/profesional/mensajes', label: 'Mensajes', icon: MessageSquare },
  { href: '/dashboard/profesional/estadisticas', label: 'Estadísticas', icon: BarChart3 },
  { href: '/dashboard/profesional/configuracion', label: 'Configuración Pro', icon: Settings },
]

// Mock data
const newRequests = [
  {
    id: '1',
    title: 'Instalación eléctrica en cocina nueva',
    client: 'Carlos M.',
    location: 'CDMX - Condesa',
    budget: '$10,000 - $25,000 MXN',
    postedAt: '2 horas',
    urgent: false,
  },
  {
    id: '2',
    title: 'Remodelación sistema eléctrico departamento',
    client: 'Ana P.',
    location: 'CDMX - Roma',
    budget: '$25,000 - $50,000 MXN',
    postedAt: '5 horas',
    urgent: true,
  },
  {
    id: '3',
    title: 'Instalación de iluminación LED oficina',
    client: 'Roberto G.',
    location: 'CDMX - Polanco',
    budget: '$5,000 - $10,000 MXN',
    postedAt: '1 día',
    urgent: false,
  },
]

const upcomingAppointments = [
  { id: '1', client: 'María Sánchez', project: 'Revisión instalación', date: 'Hoy, 3:00 PM', location: 'Roma Norte' },
  { id: '2', client: 'Pedro López', project: 'Cotización ampliación', date: 'Mañana, 10:00 AM', location: 'Condesa' },
]

const actionItems = [
  { id: '1', type: 'profile', message: 'Completa tu perfil al 100%', progress: 75 },
  { id: '2', type: 'portfolio', message: 'Sube fotos de al menos 3 proyectos', count: '2/3' },
  { id: '3', type: 'response', message: 'Responde a 2 solicitudes pendientes', count: '2' },
]

export default function ProfessionalDashboardPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar items={proNavItems} title="Panel Pro" />
      
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          {/* Welcome Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                  JC
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground">
                    Bienvenido, Juan Carlos
                  </h1>
                  <Badge className="bg-primary/10 text-primary">Pro Verificado</Badge>
                </div>
                <p className="text-muted-foreground">
                  Electricista Industrial · CDMX
                </p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/profesional/1">
                <Eye className="mr-2 h-4 w-4" />
                Ver mi perfil público
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Solicitudes este mes', value: '12', change: '+3', icon: FileText, color: 'text-blue-600' },
              { label: 'Tasa de respuesta', value: '92%', change: '+5%', icon: TrendingUp, color: 'text-green-600' },
              { label: 'Rating promedio', value: '4.9', change: '', icon: Star, color: 'text-amber-500' },
              { label: 'Proyectos activos', value: '3', change: '', icon: FolderOpen, color: 'text-primary' },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="flex items-center gap-4 pt-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      {stat.change && (
                        <span className="text-xs text-green-600">{stat.change}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* New Requests - Takes 2 columns */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Solicitudes Nuevas</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Proyectos que coinciden con tu perfil
                  </p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/profesional/solicitudes">
                    Ver todas
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {newRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{request.title}</h4>
                        {request.urgent && (
                          <Badge variant="destructive" className="text-xs">Urgente</Badge>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span>{request.client}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {request.location}
                        </span>
                        <span>{request.budget}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {request.postedAt}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Ver detalles</Button>
                      <Button size="sm">Enviar propuesta</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action Required */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  Acción Requerida
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {actionItems.map((item) => (
                  <div key={item.id} className="rounded-lg bg-muted/50 p-3">
                    <p className="text-sm font-medium text-foreground">{item.message}</p>
                    {item.progress && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Progreso</span>
                          <span>{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                      </div>
                    )}
                    {item.count && !item.progress && (
                      <Badge variant="secondary" className="mt-2">
                        {item.count}
                      </Badge>
                    )}
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/dashboard/profesional/configuracion">
                    Completar perfil
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Próximas Citas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center gap-3 rounded-lg border border-border p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{apt.client}</p>
                      <p className="text-sm text-muted-foreground">{apt.project}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{apt.date}</p>
                      <p className="text-xs text-muted-foreground">{apt.location}</p>
                    </div>
                  </div>
                ))}
                {upcomingAppointments.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    No tienes citas programadas
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Resumen de Rendimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">
                      Calificaciones por categoría
                    </h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Calidad de trabajo', value: 4.9 },
                        { label: 'Cumplimiento de plazos', value: 4.7 },
                        { label: 'Limpieza y orden', value: 4.8 },
                        { label: 'Comunicación', value: 5.0 },
                      ].map((rating) => (
                        <div key={rating.label}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">{rating.label}</span>
                            <span className="font-medium flex items-center gap-1">
                              <Star className="h-3 w-3 fill-accent text-accent" />
                              {rating.value}
                            </span>
                          </div>
                          <Progress value={rating.value * 20} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">
                      Estadísticas del mes
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                        <span className="text-sm text-muted-foreground">Vistas de perfil</span>
                        <span className="font-semibold text-foreground">156</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                        <span className="text-sm text-muted-foreground">Cotizaciones enviadas</span>
                        <span className="font-semibold text-foreground">8</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                        <span className="text-sm text-muted-foreground">Tasa de conversión</span>
                        <span className="font-semibold text-foreground">37.5%</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-green-500/10 p-3">
                        <span className="text-sm text-green-700">Ingresos estimados</span>
                        <span className="font-semibold text-green-700">$45,000 MXN</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
