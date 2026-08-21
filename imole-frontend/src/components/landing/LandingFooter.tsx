import { useNavigate } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { useTCompat } from '../../i18n/useTCompat'

const navLanguages = ['en', 'yo', 'ig', 'ha', 'fr', 'pcm'] as const

export function LandingFooter() {
  const navigate = useNavigate()
  const { t, setLang: setLanguage, language } = useTCompat()

  return (
    <footer className="bg-[#002444] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex cursor-pointer items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-white text-xs font-bold text-[#002444]">
                <img src="/icon-512.svg" alt="imole-icon" />
              </div>
              <span className="font-heading text-base font-bold">Ìmólè</span>
            </button>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              {t('landing.hero.tagline')}
              <br />
              {t('landing.footer.description')}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{t('landing.footer.quickLinks')}</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {[
                { l: t('nav.challenge'), to: '/app/challenge' },
                { l: t('nav.leaderboard'), to: '/app/leaderboard' },
                { l: t('ask.title'), to: '/ask' },
              ].map(({ l, to }) => (
                <button
                  key={l}
                  onClick={() => navigate(to)}
                  className="cursor-pointer text-left text-sm text-white/70 transition-colors hover:text-white"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{t('landing.footer.settings')}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-0.5 rounded-lg border border-white/20 p-0.5">
                {navLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`cursor-pointer rounded-md px-2.5 py-1.5 text-xs font-semibold uppercase transition-colors ${
                      language === lang ? 'bg-white text-[#002444]' : 'text-white/65 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 md:flex-row">
          <p className="text-xs text-white/55">
            &copy; {new Date().getFullYear()} {t('landing.footer.copyright')}
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center gap-1 text-xs text-white/55 transition-colors hover:text-white"
          >
            <ExternalLink className="size-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}