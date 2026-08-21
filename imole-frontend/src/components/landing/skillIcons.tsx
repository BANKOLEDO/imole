import type { SVGProps } from 'react'

export function MentalMathIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="10" y="8" width="60" height="64" rx="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <rect x="16" y="22" width="48" height="1.5" rx="0.75" fill="currentColor" />
      <circle cx="28" cy="32" r="2" fill="currentColor" />
      <circle cx="40" cy="32" r="2" fill="currentColor" />
      <circle cx="52" cy="32" r="2" fill="currentColor" />
      <text x="22" y="52" fontSize="13" fontWeight="700" fill="currentColor" fontFamily="system-ui">+</text>
      <text x="38" y="52" fontSize="13" fontWeight="700" fill="currentColor" fontFamily="system-ui">−</text>
      <text x="22" y="66" fontSize="13" fontWeight="700" fill="currentColor" fontFamily="system-ui">×</text>
      <text x="38" y="66" fontSize="13" fontWeight="700" fill="currentColor" fontFamily="system-ui">÷</text>
    </svg>
  )
}

export function SpeakingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 34C16 20.5 26.5 10 40 10C53.5 10 64 20.5 64 34C64 47.5 53.5 58 40 58H32L20 68V58C16 54.5 16 47.5 16 34Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
      <line x1="30" y1="30" x2="50" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="40" x2="44" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="20" r="2.5" fill="currentColor" />
      <path d="M56 26L66 20V48L56 42" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export function FinanceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="40" cy="42" r="24" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M40 22V26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 58V62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M26 30L30 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 50L54 54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 42H26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M54 42H60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="42" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <text x="36" y="47" fontSize="14" fontWeight="700" fill="currentColor" fontFamily="system-ui">₦</text>
    </svg>
  )
}

export function ProblemSolvingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="40" cy="40" r="24" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M40 22V40L52 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 34L32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 48L32 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="50" y="20" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="56" y1="24" x2="56" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="56" y1="30.5" x2="56" y2="30.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function EmotionalIntelligenceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M40 64C40 64 14 48 14 30C14 20 22 12 32 12C37 12 40 15 40 15C40 15 43 12 48 12C58 12 66 20 66 30C66 48 40 64 40 64Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
      <circle cx="28" cy="30" r="3.5" fill="currentColor" />
      <circle cx="52" cy="30" r="3.5" fill="currentColor" />
      <path d="M34 42C34 42 37 46 40 46C43 46 46 42 46 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 22C20 18 24 14 30 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M62 22C60 18 56 14 50 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

export const skills = [
  { id: 'mental-math', Icon: MentalMathIcon, color: 'text-accent' },
  { id: 'persuasive-speaking', Icon: SpeakingIcon, color: 'text-streak' },
  { id: 'financial-literacy', Icon: FinanceIcon, color: 'text-success' },
  { id: 'creative-problem-solving', Icon: ProblemSolvingIcon, color: 'text-accent' },
  { id: 'emotional-intelligence', Icon: EmotionalIntelligenceIcon, color: 'text-streak' },
]
