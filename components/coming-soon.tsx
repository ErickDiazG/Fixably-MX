'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Hammer, ArrowLeft, Home, Search } from 'lucide-react'

interface ComingSoonProps {
  title: string
  description?: string
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 py-20 text-center">
      {/* Icon with Brutalist border */}
      <div className="mb-8 flex h-24 w-24 items-center justify-center border-4 border-primary bg-accent shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
        <Hammer className="h-12 w-12 text-primary" />
      </div>

      {/* Main Title - Extreme typography */}
      <h1 className="mb-4 text-balance text-5xl font-black uppercase tracking-tighter text-foreground md:text-7xl">
        {title} <span className="bg-primary px-2 text-primary-foreground">PRÓXIMAMENTE</span>
      </h1>

      {/* Description */}
      <p className="mb-10 max-w-xl text-pretty text-lg font-medium text-muted-foreground md:text-xl">
        {description || "Estamos construyendo esta sección para conectar a los mejores profesionales con los proyectos más importantes de México."}
      </p>

      {/* Action Buttons - Brutalist style */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button 
          variant="outline" 
          size="lg" 
          asChild 
          className="h-14 border-4 border-primary font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Volver al Inicio
          </Link>
        </Button>
        <Button 
          size="lg" 
          asChild 
          className="h-14 border-4 border-primary bg-accent text-accent-foreground font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          <Link href="/buscar">
            <Search className="mr-2 h-5 w-5" />
            Buscar Profesionales
          </Link>
        </Button>
      </div>

      {/* Visual decoration */}
      <div className="mt-16 flex items-center gap-4 opacity-20">
        <div className="h-1 w-20 bg-primary" />
        <span className="text-xs font-black uppercase tracking-[0.3em]">Fixably-MX Development Mode</span>
        <div className="h-1 w-20 bg-primary" />
      </div>
    </div>
  )
}
