import { useEffect, useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutGrid, Target, Info, Eye, ArrowRight, Menu, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useTCompat } from '../../i18n/useTCompat'

const sections = [
  { id: 'gap', icon: Target, labelKey: 'landing.nav.impact' },
  { id: 'showcase', icon: LayoutGrid, labelKey: 'landing.nav.skills' },
  { id: 'context', icon: Info, labelKey: 'landing.nav.about' },
  { id: 'preview', icon: Eye, labelKey: 'landing.nav.preview' },
]

const NAVY = '#002444'
const LIME = '#ff8a00'
const navLanguages = ['en', 'yo', 'ig', 'ha', 'fr', 'pcm'] as const

export function LandingNav() {
  const navigate = useNavigate()
  const { currentProfile } = useApp()
  const { t, setLang: setLanguage, language } = useTCompat()
  const [active, setActive] = useState('')
  const ratios = useRef<Record<string, number>>({})
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleGetStarted = useCallback(() => {
    if (currentProfile) navigate('/app/challenge')
    else navigate('/app/profile')
  }, [currentProfile, navigate])

  const handleSection = useCallback(
    (id: string) => {
      scrollTo(id)
      setMenuOpen(false)
    },
    [scrollTo]
  )

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY ?? 0) > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          ratios.current[e.target.id] = e.intersectionRatio
        }
        const best = Object.entries(ratios.current).reduce<[string, number]>(
          (a, b) => (b[1] > a[1] ? b : a),
          ['', 0]
        )
        if (best[1] > 0) setActive(best[0])
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5], rootMargin: '-64px 0px 0px 0px' }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const activeIdx = sections.findIndex((s) => s.id === active)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: NAVY,
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.18)' : 'none',
      }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Desktop */}
        <div className="hidden h-[4.25rem] items-center px-6 md:flex">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex cursor-pointer items-center gap-2 shrink-0 text-white"
          >
            <div className="flex size-8 items-center justify-center rounded-full bg-white text-xs font-bold text-[#002444]">
              <img src="/icon-512.svg" alt="imole-icon" />
            </div>
            <span className="font-heading text-base font-bold">Ìmólè</span>
          </button>

          <div className="ml-8 flex items-center gap-1">
            {sections.map((s, i) => {
              const Icon = s.icon
              const isActive = i === activeIdx
              return (
                <button
                  key={s.id}
                  onClick={() => handleSection(s.id)}
                  className="group relative flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium text-white/65 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className={`mr-1.5 size-4 ${isActive ? 'text-orange' : 'opacity-70'}`} strokeWidth={isActive ? 2.4 : 1.6} />
                  <span className={isActive ? 'text-white' : ''}>{t(s.labelKey)}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full"
                      style={{ background: LIME }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-0.5 rounded-lg border border-white/20 p-0.5">
              {navLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`cursor-pointer rounded-md px-2 py-1 text-xs font-semibold uppercase transition-colors ${
                    language === lang ? 'bg-white text-[#002444]' : 'text-white/65 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button
              onClick={handleGetStarted}
              className="hidden cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 font-heading text-sm font-semibold text-[#002444] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e7ebf8] lg:inline-flex"
            >
              {t('landing.getStarted')}
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Mobile top row */}
        <div className="flex h-14 items-center justify-between px-3 md:hidden">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex cursor-pointer items-center gap-2 text-white"
          >
            <div className="flex size-7 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#002444]">
              <img src="/icon-512.svg" alt="imole-icon" />
            </div>
            <span className="font-heading text-sm font-bold">Ìmólè</span>
          </button>

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex cursor-pointer size-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
              aria-label={t('common.toggleMenu')}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#002546] md:hidden">
            <div className="px-3 py-2">
              {sections.map((s) => {
                const Icon = s.icon
                const isActive = s.id === active
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSection(s.id)}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors hover:bg-white/10"
                  >
                    <span
                      className={`flex size-8 items-center justify-center rounded-lg ${
                        isActive ? 'bg-orange/20 text-orange' : 'bg-white/10 text-white/70'
                      }`}
                    >
                      <Icon className="size-4" strokeWidth={isActive ? 2.4 : 1.6} />
                    </span>
                    <span className={isActive ? 'text-white' : 'text-white/75'}>{t(s.labelKey)}</span>
                    {isActive && <span className="ml-auto size-1.5 rounded-full" style={{ background: LIME }} />}
                  </button>
                )
              })}
            </div>

            <div className="border-t border-white/10 px-3 py-3">
              <div className="flex items-center gap-1 rounded-lg border border-white/20 p-1">
                {navLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`flex-1 cursor-pointer rounded-md py-1.5 text-[11px] font-semibold uppercase transition-colors ${
                      language === lang ? 'bg-white text-[#002444]' : 'text-white/65 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <button
                onClick={handleGetStarted}
                className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-4 py-3 font-heading text-sm font-semibold text-[#002444]"
              >
                {t('landing.getStarted')}
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}