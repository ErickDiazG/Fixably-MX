import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { ValuePropositions } from '@/components/value-propositions'
import { FeaturedProfessionals } from '@/components/featured-professionals'
import { TestimonialsSection } from '@/components/testimonials-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ValuePropositions />
        <FeaturedProfessionals />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
