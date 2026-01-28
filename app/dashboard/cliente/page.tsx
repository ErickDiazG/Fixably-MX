'use client'

import Link from 'next/link'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ProfessionalCard } from '@/components/professional-card'
import { professionals } from '@/lib/mock-data'
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  Heart,
  Settings,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Star,
  BadgeCheck,
} from 'lucide-react'

const clientNavItems = [
  { href: '/dashboard/cliente', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/cliente/proyectos', label: 'Mis Proyectos', icon: FolderOpen },
  { href: '/dashboard/cliente/mensajes', label: 'Mensajes', icon: MessageSquare },
  { href: '/dashboard/cliente/favoritos', label: 'Favoritos', icon: Heart },
  { href: '/dashboard/cliente/configuracion', label: 'Configuración', icon: Settings },
]

// Mock data for client dashboard
const activeProjects = [
  {
    id: '1',
    title: 'Instalación eléctrica en cocina nueva',
    status: 'receiving_proposals',
    proposalsCount: 3,
    createdAt: '2024-01-20',
  },
  {
    id: '2',
    title: 'Reparación de fuga en baño',
    status: 'in_progress',
    professional: 'Roberto Díaz',
    createdAt: '2024-01-15',
  },
]

const contactedProfessionals = [
  { id: '1', name: 'Juan Carlos Hernández', specialty: 'Electricista', status: 'quoted', rating: 4.9 },
  { id: '3', name: 'Roberto Díaz Moreno', specialty: 'Fontanero', status: 'responded', rating: 4.7 },
  { id: '2', name: 'María González López', specialty: 'Albañil', status: 'pending', rating: 4.8 },
]

const recentMessages = [
  { id: '1', from: 'Juan Carlos H.', preview: 'Te envío la cotización detallada...', time: '2 horas' },
  { id: '2', from: 'Roberto Díaz', preview: 'Perfecto, nos vemos mañana a las 10am', time: '5 horas' },
  { id: '3', from: 'María González', preview: 'Gracias por tu interés, te contacto...', time: '1 día' },
]

export default function ClientDashboardPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'receiving_proposals':
        return <Badge className="gap-1 bg-blue-500/10 text-blue-700"><Clock className="h-3 w-3" /> Recibiendo propuestas</Badge>
      case 'in_progress':
        return <Badge className="gap-1 bg-green-500/10 text-green-700"><CheckCircle2 className="h-3 w-3" /> En progreso</Badge>
      case 'pending':
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" /> Pendiente</Badge>
      case 'responded':
        return <Badge className="gap-1 bg-blue-500/10 text-blue-700"><MessageSquare className="h-3 w-3" /> Respondió</Badge>
      case 'quoted':
        return <Badge className="gap-1 bg-green-500/10 text-green-700"><CheckCircle2 className="h-3 w-3" /> Cotizado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar items={clientNavItems} title="Mi Panel" />
      
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          {/* Welcome Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Bienvenido, Carlos
              </h1>
              <p className="text-muted-foreground">
                Aquí está el resumen de tus proyectos y contactos.
              </p>
            </div>
            <Button asChild>
              <Link href="/publicar-proyecto">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Proyecto
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Proyectos activos', value: '2', icon: FolderOpen, color: 'text-blue-600' },
              { label: 'Propuestas recibidas', value: '5', icon: MessageSquare, color: 'text-green-600' },
              { label: 'Profesionales favoritos', value: '8', icon: Heart, color: 'text-red-500' },
              { label: 'Proyectos completados', value: '3', icon: CheckCircle2, color: 'text-primary' },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="flex items-center gap-4 pt-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Active Projects */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Proyectos Activos</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/cliente/proyectos">
                    Ver todos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{project.title}</h4>
                      <div className="mt-1 flex items-center gap-2">
                        {getStatusBadge(project.status)}
                        {project.proposalsCount && (
                          <span className="text-sm text-muted-foreground">
                            {project.proposalsCount} propuestas
                          </span>
                        )}
                        {project.professional && (
                          <span className="text-sm text-muted-foreground">
                            con {project.professional}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/cliente/proyectos/${project.id}`}>
                        Ver detalles
                      </Link>
                    </Button>
                  </div>
                ))}
                {activeProjects.length === 0 && (
                  <div className="py-8 text-center">
                    <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-2 text-muted-foreground">No tienes proyectos activos</p>
                    <Button className="mt-4" asChild>
                      <Link href="/publicar-proyecto">Crear proyecto</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contacted Professionals */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profesionales Contactados</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/buscar">
                    Buscar más
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {contactedProfessionals.map((pro) => (
                  <div
                    key={pro.id}
                    className="flex items-center gap-3 rounded-lg border border-border p-3"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {pro.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground truncate">{pro.name}</p>
                        <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground">{pro.specialty}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(pro.status)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mensajes Recientes</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/cliente/mensajes">
                    Ver todos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentMessages.map((msg) => (
                  <Link
                    key={msg.id}
                    href={`/dashboard/cliente/mensajes/${msg.id}`}
                    className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {msg.from.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{msg.from}</p>
                      <p className="text-sm text-muted-foreground truncate">{msg.preview}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{msg.time}</span>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones para ti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {professionals.slice(3, 5).map((pro) => (
                  <div
                    key={pro.id}
                    className="flex items-center gap-3 rounded-lg border border-border p-3"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={pro.profileImage || "/placeholder.svg"} alt={pro.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {pro.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground truncate">{pro.name}</p>
                        {pro.verified && <BadgeCheck className="h-4 w-4 text-primary shrink-0" />}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{pro.specialty}</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-accent text-accent" />
                          {pro.rating}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/profesional/${pro.id}`}>Ver perfil</Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
