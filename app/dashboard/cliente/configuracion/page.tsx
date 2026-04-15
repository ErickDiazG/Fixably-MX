'use client'

import React from 'react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LayoutDashboard, FolderOpen, MessageSquare, Heart, Settings, User, Bell, Shield, CreditCard } from 'lucide-react'

const clientNavItems = [
  { href: '/dashboard/cliente', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/cliente/proyectos', label: 'Mis Proyectos', icon: FolderOpen },
  { href: '/dashboard/cliente/mensajes', label: 'Mensajes', icon: MessageSquare },
  { href: '/dashboard/cliente/favoritos', label: 'Favoritos', icon: Heart },
  { href: '/dashboard/cliente/configuracion', label: 'Configuración', icon: Settings },
]

export default function ClientSettingsPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar items={clientNavItems} title="Mi Panel" />
      
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
            <p className="text-muted-foreground">Administra tu cuenta y preferencias.</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Perfil Personal
                </CardTitle>
                <CardDescription>Actualiza tu información pública y de contacto.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" defaultValue="Carlos M." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="carlos@example.com" disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" defaultValue="+52 55 1234 5678" />
                </div>
                <Button className="mt-2">Guardar cambios</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Seguridad
                </CardTitle>
                <CardDescription>Cambia tu contraseña y protege tu cuenta.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Contraseña actual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nueva contraseña</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button variant="outline" className="mt-2">Actualizar contraseña</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificaciones
                </CardTitle>
                <CardDescription>Decide cómo quieres recibir noticias de tus proyectos.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Próximamente: Configuración detallada de notificaciones por WhatsApp y Email.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
