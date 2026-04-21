import { ShieldCheck, Wallet, Award } from 'lucide-react'

const propositions = [
  {
    icon: ShieldCheck,
    title: 'Verificación Rigurosa',
    description: 'Cada profesional pasa por validación de credenciales, portafolio y referencias antes de ser aprobado.',
  },
  {
    icon: Wallet,
    title: 'Presupuestos Claros',
    description: 'Cotizaciones detalladas por partidas con precios transparentes. Sin sorpresas ni costos ocultos.',
  },
  {
    icon: Award,
    title: 'Garantía de Calidad',
    description: '90 días de garantía en mano de obra certificada. Tu satisfacción es nuestra prioridad.',
  },
]

export function ValuePropositions() {
  return (
    <section className="border-y border-border bg-card py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {propositions.map((prop, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <prop.icon className="h-7 w-7 text-primary" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                {prop.title}
              </h2>
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
