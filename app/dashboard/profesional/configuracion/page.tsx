'use client'

import React from 'react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  LayoutDashboard, 
  FileText, 
  Receipt, 
  FolderOpen, 
  MessageSquare, 
  BarChart3, 
  Settings,
  User,
  Tool,
  MapPin,
  Shield
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

export default function ProfessionalSettingsPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar items={proNavItems} title="Panel Pro" />
      
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Configuración Profesional</h1>
            <p className="text-muted-foreground">Administra tu perfil público y preferencias comerciales.</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Perfil de Profesional
                </CardTitle>
                <CardDescription>Esta información es visible para clientes potenciales.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Comercial</Label>
                    <Input id="name" defaultValue="Juan Carlos Hernández" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidad Principal</Label>
                    <Input id="specialty" defaultValue="Electricista Industrial" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Descripción Profesional</Label>
                  <Textarea 
                    id="bio" 
                    defaultValue="Especialista en instalaciones eléctricas residenciales e industriales con más de 10 años de experiencia..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación / Cobertura</Label>
                  <div className="flex gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <Input id="location" defaultValue="CDMX, Estado de México" />
                  </div>
                </div>
                <Button className="mt-2 text-white bg-primary hover:bg-primary/90">Guardar Perfil</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Verificación y Documentos
                </CardTitle>
                <CardDescription>Mantén tu estatus de "Pro Verificado".</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <p className="text-sm font-medium text-primary">Status: Verificado</p>
                  <p className="text-xs text-muted-foreground mt-1">Tus documentos han sido validados por nuestro equipo de seguridad.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
