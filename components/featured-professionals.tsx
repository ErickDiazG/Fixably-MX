import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProfessionalCard } from '@/components/professional-card'
import { professionals } from '@/lib/mock-data'
import { ArrowRight } from 'lucide-react'

export function FeaturedProfessionals() {
  const featuredPros = professionals.slice(0, 3)

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Profesionales Destacados
            </h2>
            <p className="mt-2 text-muted-foreground">
              Los mejor calificados por nuestros clientes
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/buscar">
              Ver todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPros.map((pro) => (
            <ProfessionalCard key={pro.id} professional={pro} />
          ))}
        </div>
      </div>
    </section>
  )
}
