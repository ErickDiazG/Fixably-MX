'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '@/lib/mock-data'

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="bg-secondary/30 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-2 text-muted-foreground">
            Historias reales de proyectos exitosos
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="relative overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <Quote className="absolute right-8 top-8 h-16 w-16 text-primary/10" />
              
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-16 w-16 mb-4">
                  <AvatarImage src={testimonials[current].image || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {testimonials[current].name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[current].rating
                          ? 'fill-accent text-accent'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="mb-6 text-lg text-foreground md:text-xl leading-relaxed">
                  "{testimonials[current].comment}"
                </blockquote>

                <div>
                  <p className="font-semibold text-foreground">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].project}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-1">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
                  aria-label={`Ir a testimonio ${i + 1}`}
                  aria-current={i === current ? 'true' : undefined}
                >
                  <span
                    className={`block h-2 w-2 rounded-full transition-colors ${
                      i === current ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
