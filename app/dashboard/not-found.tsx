'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Hammer } from 'lucide-react'

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <Hammer className="h-10 w-10 text-primary" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">Sección en Construcción</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        Estamos trabajando duro para traer esta funcionalidad muy pronto. Por ahora, puedes volver a tu panel principal.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/dashboard/cliente">Ir a Dashboard</Link>
        </Button>
        <Button asChild>
          <Link href="/">Volver al Inicio</Link>
        </Button>
      </div>
    </div>
  )
}
