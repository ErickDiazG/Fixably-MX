import { ShieldCheck, Wallet, Award } from 'lucide-react'

const propositions = [
  {
    icon: ShieldCheck,
    number: '01',
    title: 'Verificación Rigurosa',
    description: 'Cada profesional pasa por validación de credenciales, portafolio y referencias antes de ser aprobado.',
  },
  {
    icon: Wallet,
    number: '02',
    title: 'Presupuestos Claros',
    description: 'Cotizaciones detalladas por partidas con precios transparentes. Sin sorpresas ni costos ocultos.',
  },
  {
    icon: Award,
    number: '03',
    title: 'Garantía de Calidad',
    description: '90 días de garantía en mano de obra certificada. Tu satisfacción es nuestra prioridad.',
  },
]

export function ValuePropositions() {
  return (
    <section className="border-y-4 border-primary bg-card py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-0 md:grid-cols-3 divide-y-4 md:divide-y-0 md:divide-x-4 divide-primary">
          {propositions.map((prop, index) => (
            <div
              key={index}
              className="group flex flex-col items-start p-8 md:p-10 transition-colors hover:bg-primary/5"
            >
              {/* Icon + Number row */}
              <div className="mb-6 flex w-full items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center border-2 border-primary bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] transition-shadow group-hover:shadow-[6px_6px_0px_0px_rgba(234,179,8,1)]">
                  <prop.icon className="h-7 w-7 text-accent" />
                </div>
                <span className="text-5xl font-black text-primary/10 leading-none select-none">
                  {prop.number}
                </span>
              </div>

              {/* Title */}
              <h2 className="mb-3 text-xl font-black uppercase tracking-tight text-foreground">
                {prop.title}
              </h2>

              {/* Accent underline */}
              <div className="mb-4 h-1 w-12 bg-accent" />

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
