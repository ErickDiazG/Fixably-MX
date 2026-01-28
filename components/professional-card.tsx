import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  MapPin,
  Star,
  Briefcase,
  FolderOpen,
  Clock,
  BadgeCheck,
  ShieldCheck,
} from 'lucide-react'
import type { Professional } from '@/lib/types'

interface ProfessionalCardProps {
  professional: Professional
  compact?: boolean
}

export function ProfessionalCard({ professional, compact = false }: ProfessionalCardProps) {
  const initials = professional.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-primary/30">
      <CardContent className={compact ? 'p-4' : 'p-6'}>
        <div className="flex gap-4">
          <Avatar className={compact ? 'h-14 w-14' : 'h-16 w-16'}>
            <AvatarImage src={professional.profileImage || "/placeholder.svg"} alt={professional.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground truncate">
                  {professional.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {professional.specialty}
                </p>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {professional.verified && (
                <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary hover:bg-primary/20">
                  <BadgeCheck className="h-3 w-3" />
                  Verificado
                </Badge>
              )}
              {professional.licensed && (
                <Badge variant="secondary" className="gap-1 bg-green-500/10 text-green-700 hover:bg-green-500/20">
                  <ShieldCheck className="h-3 w-3" />
                  Licencia Local
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className={`grid gap-2 text-sm text-muted-foreground ${compact ? 'mt-3 grid-cols-2' : 'mt-4 grid-cols-2 md:grid-cols-4'}`}>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary/70" />
            <span className="truncate">{professional.zones.slice(0, 2).join(', ')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span>
              {professional.rating} ({professional.reviewCount})
            </span>
          </div>
          {!compact && (
            <>
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-primary/70" />
                <span>{professional.experience} años exp.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FolderOpen className="h-4 w-4 text-primary/70" />
                <span>{professional.portfolioCount} proyectos</span>
              </div>
            </>
          )}
        </div>

        {!compact && (
          <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-green-600" />
            <span>Respuesta promedio: {professional.responseTime}</span>
          </div>
        )}

        <div className={`flex gap-2 ${compact ? 'mt-3' : 'mt-4'}`}>
          <Button variant="outline" className="flex-1 bg-transparent" asChild>
            <Link href={`/profesional/${professional.id}`}>Ver Perfil</Link>
          </Button>
          <Button className="flex-1" asChild>
            <Link href={`/contactar/${professional.id}`}>Contactar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
