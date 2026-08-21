import { LandingNav } from './LandingNav'
import { HeroSection } from './HeroSection'
import { OrangeStrip } from './OrangeStrip'
import { GapSection } from './GapSection'
import { QuoteSection } from './QuoteSection'
import { ContextSection } from './ContextSection'
import { PreviewSection } from './PreviewSection'
import { FinalCTA } from './FinalCTA'
import { LandingFooter } from './LandingFooter'
import { ShowcaseSection } from './ShowcaseSection'
import { CursorFx } from './CursorFx'

export function LandingScene() {
  return (
    <main className="force-light relative min-h-dvh">
      <CursorFx />
      <LandingNav />
      <HeroSection />
      <OrangeStrip />
      <GapSection />
      <QuoteSection />
      <ShowcaseSection />
      <ContextSection />
      <PreviewSection />
      <FinalCTA />
      <LandingFooter />
    </main>
  )
}