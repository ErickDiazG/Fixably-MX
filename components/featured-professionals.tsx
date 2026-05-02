import Link from 'next/link'
import { ProfessionalCard } from '@/components/professional-card'
import { professionals } from '@/lib/mock-data'
import { ArrowRight } from 'lucide-react'

export function FeaturedProfessionals() {
  const featuredPros = professionals.slice(0, 3)

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-widest text-accent">
              — Directorio
            </p>
            <h2 className="text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              Profesionales<br />Destacados
            </h2>
            <p className="mt-3 text-muted-foreground font-medium">
              Los mejor calificados por nuestros clientes
            </p>
          </div>

          {/* Brutalist "Ver todos" button */}
          <Link
            href="/buscar"
            className="inline-flex items-center gap-2 border-2 border-primary bg-background px-5 py-3 text-sm font-black uppercase tracking-widest text-primary shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPros.map((pro) => (
            <ProfessionalCard key={pro.id} professional={pro} />
          ))}
        </div>
      </div>
    </section>
  )
}
