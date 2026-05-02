import Link from 'next/link'
import { ArrowRight, UserPlus, Briefcase } from 'lucide-react'

export function CTASection() {
  return (
    <section className="border-y-4 border-primary py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-0 md:grid-cols-2 border-2 border-primary shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">

          {/* For Professionals — dark card */}
          <div className="relative overflow-hidden bg-primary p-8 md:p-12 border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-primary">
            {/* Brutalist accent stripe */}
            <div className="absolute top-0 left-0 h-1 w-full bg-accent" />

            <div className="relative">
              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center border-2 border-primary-foreground/30 bg-white/10 shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
                <UserPlus className="h-6 w-6 text-accent" />
              </div>

              <p className="mb-2 text-xs font-black uppercase tracking-widest text-accent">
                — Para profesionales
              </p>
              <h3 className="mb-4 text-3xl font-black uppercase tracking-tight text-primary-foreground md:text-4xl">
                ¿Eres<br />profesional?
              </h3>
              <p className="mb-8 text-primary-foreground/70 leading-relaxed">
                Únete y conecta con miles de clientes que buscan
                profesionales certificados como tú. Aumenta tu visibilidad
                y haz crecer tu negocio.
              </p>

              <Link
                href="/registro-profesional"
                className="inline-flex items-center gap-2 border-2 border-accent bg-accent px-6 py-3 text-sm font-black uppercase tracking-widest text-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                Regístrate como Pro
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* For Clients — light card */}
          <div className="relative overflow-hidden bg-card p-8 md:p-12">
            {/* Brutalist accent stripe */}
            <div className="absolute top-0 left-0 h-1 w-full bg-primary" />

            <div className="relative">
              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center border-2 border-primary bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
                <Briefcase className="h-6 w-6 text-accent" />
              </div>

              <p className="mb-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
                — Para clientes
              </p>
              <h3 className="mb-4 text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
                ¿Tienes un<br />proyecto?
              </h3>
              <p className="mb-8 text-muted-foreground leading-relaxed">
                Publica tu proyecto gratis y recibe cotizaciones de
                profesionales verificados en tu zona. Compara precios y
                elige al mejor para tu obra.
              </p>

              <Link
                href="/publicar-proyecto"
                className="inline-flex items-center gap-2 border-2 border-primary bg-accent px-6 py-3 text-sm font-black uppercase tracking-widest text-primary shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                Publicar Proyecto
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
