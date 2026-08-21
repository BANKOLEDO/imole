import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function LandingScene() {
  return (
    <div className="bg-landing-hero min-h-screen text-white">
      <header className="mx-auto flex max-w-5xl items-center justify-between p-5">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Imole logo" className="size-9" />
          <span className="font-heading text-lg font-bold">Imole</span>
        </div>
        <Link to="/dashboard" className="cta-pill cta-pill--light text-sm">
          Get Started
          <ArrowRight className="size-4" />
        </Link>
      </header>

      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pt-14 pb-24 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-orange">
          AI life-skills coach
        </p>
        <h1 className="display-mega text-5xl sm:text-7xl">
          Be the <span className="text-stroke-cream">Light</span>
        </h1>
        <p className="max-w-xl text-balance text-white/70">
          Daily challenges, safe chat and voice — for Nigerian children aged 8-16,
          in 6 languages.
        </p>
        <Link to="/dashboard" className="cta-pill text-sm">
          <span className="cta-pill__dot" />
          Start learning
          <ArrowRight className="size-4" />
        </Link>
        <img
          src="/hero-illustration.svg"
          alt=""
          className="mt-8 w-full max-w-lg rounded-3xl"
        />
      </section>
    </div>
  )
}
