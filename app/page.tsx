import { HeroSection } from '@/components/hero-section'
import { ValuePropositions } from '@/components/value-propositions'
import { FeaturedProfessionals } from '@/components/featured-professionals'
import { TestimonialsSection } from '@/components/testimonials-section'
import { CTASection } from '@/components/cta-section'

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ValuePropositions />
      <FeaturedProfessionals />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}
