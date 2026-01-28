import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, UserPlus, Briefcase } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2">
          {/* For Professionals */}
          <div className="relative overflow-hidden rounded-2xl bg-primary p-8 md:p-10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5" />
            
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <UserPlus className="h-6 w-6 text-primary-foreground" />
              </div>
              
              <h3 className="mb-3 text-2xl font-bold text-primary-foreground">
                ¿Eres profesional?
              </h3>
              <p className="mb-6 text-primary-foreground/80 leading-relaxed">
                Únete a la lista azul y conecta con miles de clientes que buscan 
                profesionales certificados como tú. Aumenta tu visibilidad y haz 
                crecer tu negocio.
              </p>
              
              <Button variant="secondary" size="lg" asChild>
                <Link href="/registro-profesional">
                  Regístrate como Pro
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* For Clients */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent/10" />
            
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                ¿Tienes un proyecto?
              </h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Publica tu proyecto gratis y recibe cotizaciones de profesionales 
                verificados en tu zona. Compara precios y elige al mejor para tu obra.
              </p>
              
              <Button size="lg" asChild>
                <Link href="/publicar-proyecto">
                  Publicar Proyecto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
