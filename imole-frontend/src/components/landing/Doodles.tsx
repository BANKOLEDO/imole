import type { SVGProps } from 'react'

/* Real assets from Material Symbols (Iconify) - all use currentColor for theme support */

const DOTS = Array.from({ length: 40 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: 1 + Math.random() * 2.5,
  o: 0.08 + Math.random() * 0.12,
}))

export function ScatteredPattern({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none overflow-hidden ${className ?? ''}`} aria-hidden>
      <svg width="100%" height="100%" className="h-full w-full" preserveAspectRatio="none">
        {DOTS.map((d, i) => (
          <circle key={i} cx={`${d.x}%`} cy={`${d.y}%`} r={d.r} fill="currentColor" opacity={d.o} className="text-accent" />
        ))}
      </svg>
    </div>
  )
}

/* Single icons — small, clean, professional */

export function TorchKid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M6 14q0 1.3.525 2.463t1.5 2.037Q8 18.375 8 18.275v-.225q0-.8.3-1.5t.875-1.275L12 12.5l2.825 2.775q.575.575.875 1.275t.3 1.5v.225q0 .1-.025.225q.975-.875 1.5-2.037T18 14q0-1.25-.462-2.363T16.2 9.65q-.5.325-1.05.488t-1.125.162q-1.55 0-2.688-1.025T10.026 6.75Q9.05 7.575 8.3 8.463t-1.263 1.8t-.774 1.862T6 14m6 1.3l-1.425 1.4q-.275.275-.425.625t-.15.725q0 .8.587 1.375T12 20t1.412-.575T14 18.05q0-.4-.15-.737t-.425-.613zM12 3v3.3q0 .85.588 1.425t1.437.575q.45 0 .838-.187t.687-.563L16 7q1.85 1.05 2.925 2.925T20 14q0 3.35-2.325 5.675T12 22t-5.675-2.325T4 14q0-3.225 2.162-6.125T12 3" opacity="0.5" />
    </svg>
  )
}

export function PiggyNaira(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M16.713 10.713Q17 10.425 17 10t-.288-.712T16 9t-.712.288T15 10t.288.713T16 11t.713-.288M8 9h5V7H8zM4.5 21q-.85-2.85-1.675-5.687T2 9.5q0-2.3 1.6-3.9T7.5 4h5q.725-.95 1.763-1.475T16.5 2q.625 0 1.063.438T18 3.5q0 .15-.038.3t-.087.275q-.1.275-.187.563t-.138.587L19.825 7.5H22v6.975l-2.825.925L17.5 21H12v-2h-2v2zM6 19h2v-2h6v2h2l1.55-5.15l2.45-.825V9.5h-1L15.5 6q0-.5.063-.962t.187-.938q-.725.2-1.275.688T13.675 6H7.5Q6.05 6 5.025 7.025T4 9.5q0 2.45.675 4.788T6 19" opacity="0.5" />
    </svg>
  )
}

export function BulbSeed(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M10.588 21.413Q10 20.825 10 20h4q0 .825-.587 1.413T12 22t-1.412-.587M8 19v-2h8v2zm.25-3q-1.725-1.025-2.738-2.75T4.5 9.5q0-3.125 2.188-5.312T12 2t5.313 2.188T19.5 9.5q0 2.025-1.012 3.75T15.75 16zm.6-2h6.3q1.125-.8 1.738-1.975T17.5 9.5q0-2.3-1.6-3.9T12 4T8.1 5.6T6.5 9.5q0 1.35.613 2.525T8.85 14M12 14" opacity="0.5" />
    </svg>
  )
}

export function TalkMic(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M19.95 15.95L18.4 14.4q1.1-1.025 1.725-2.425T20.75 9t-.625-2.95t-1.725-2.4l1.55-1.6q1.4 1.325 2.225 3.125T23 9t-.825 3.825t-2.225 3.125m-3.2-3.2l-1.6-1.6q.45-.425.725-.962T16.15 9t-.275-1.187t-.725-.963l1.6-1.6q.8.725 1.25 1.688T18.45 9T18 11.063t-1.25 1.687M9 13q-1.65 0-2.825-1.175T5 9t1.175-2.825T9 5t2.825 1.175T13 9t-1.175 2.825T9 13m-8 8v-2.8q0-.825.425-1.55t1.175-1.1q1.275-.65 2.875-1.1T9 14t3.525.45t2.875 1.1q.75.375 1.175 1.1T17 18.2V21zm2-2h12v-.8q0-.275-.137-.5t-.363-.35q-.9-.45-2.312-.9T9 16t-3.187.45t-2.313.9q-.225.125-.363.35T3 18.2zm7.413-8.587Q11 9.825 11 9t-.587-1.412T9 7t-1.412.588T7 9t.588 1.413T9 11t1.413-.587M9 19" opacity="0.5" />
    </svg>
  )
}

export function BrainGears(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M6 22v-4.3q-1.425-1.3-2.212-3.037T3 11q0-3.75 2.625-6.375T12 2q3.125 0 5.538 1.838t3.137 4.787l1.3 5.125q.125.475-.175.863T21 15h-2v3q0 .825-.587 1.413T17 20h-2v2h-2v-4h4v-5h2.7l-.95-3.875q-.575-2.275-2.45-3.7T12 4Q9.1 4 7.05 6.025T5 10.95q0 1.5.613 2.85t1.737 2.4l.65.6V22zm5-7h2l.15-1.25q.2-.075.363-.175t.287-.225l1.15.5l1-1.7l-1-.75q.05-.2.05-.4t-.05-.4l1-.75l-1-1.7l-1.15.5q-.125-.125-.288-.225t-.362-.175L13 7h-2l-.15 1.25q-.2.075-.363.175t-.287.225l-1.15-.5l-1 1.7l1 .75Q9 10.8 9 11t.05.4l-1 .75l1 1.7l1.15-.5q.125.125.288.225t.362.175zm-.062-2.937Q10.5 11.625 10.5 11t.438-1.062T12 9.5t1.063.438T13.5 11t-.437 1.063T12 12.5t-1.062-.437" opacity="0.5" />
    </svg>
  )
}

export function MirrorHeart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3" opacity="0.5" />
    </svg>
  )
}

export function BookStairs(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M12 20q-1.2-.95-2.6-1.475T6.5 18q-1.05 0-2.062.275T2.5 19.05q-.525.275-1.012-.025T1 18.15V6.1q0-.275.138-.525T1.55 5.2q1.15-.6 2.4-.9T6.5 4q1.45 0 2.838.375T12 5.5v12.1q1.275-.8 2.675-1.2T17.5 16q.9 0 1.763.15T21 16.6v-12q.375.125.738.263t.712.337q.275.125.413.375T23 6.1v12.05q0 .575-.487.875t-1.013.025q-.925-.5-1.937-.775T17.5 18q-1.5 0-2.9.525T12 20" opacity="0.5" />
    </svg>
  )
}

export function SunSmile(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M11 4V1h2v3zm0 19v-3h2v3zm9-10v-2h3v2zM1 13v-2h3v2zm17.7-6.3l-1.4-1.4l1.75-1.8l1.45 1.45zM4.95 20.5L3.5 19.05l1.8-1.75l1.4 1.4zm14.1 0l-1.75-1.8l1.4-1.4l1.8 1.75zM5.3 6.7L3.5 4.95L4.95 3.5L6.7 5.3zm2.45 9.55Q6 14.5 6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18t-4.25-1.75m7.088-1.412Q16 13.675 16 12t-1.162-2.838T12 8T9.162 9.163T8 12t1.163 2.838T12 16t2.838-1.162M12 12" opacity="0.5" />
    </svg>
  )
}

export function HighFive(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M11.875 20q.1 0 .2-.05t.15-.1l8.2-8.2q.3-.3.438-.675t.137-.75q0-.4-.137-.763t-.438-.637l-4.25-4.25q-.275-.3-.638-.437T14.776 4q-.375 0-.75.138t-.675.437l-.275.275l1.85 1.875q.375.35.55.8t.175.95q0 1.05-.712 1.763t-1.763.712q-.5 0-.962-.175t-.813-.525L9.525 8.4L5.15 12.775q-.075.075-.112.163T5 13.125q0 .2.15.363t.35.162q.1 0 .2-.05t.15-.1l3.4-3.4l1.4 1.4l-3.375 3.4q-.075.075-.112.163t-.038.187q0 .2.15.35t.35.15q.1 0 .2-.05t.15-.1l3.4-3.375l1.4 1.4l-3.375 3.4q-.075.05-.112.15t-.038.2q0 .2.15.35t.35.15q.1 0 .188-.038t.162-.112l3.4-3.375l1.4 1.4l-3.4 3.4q-.075.075-.112.162t-.038.188q0 .2.163.35t.362.15m-.025 2q-.925 0-1.637-.612t-.838-1.538q-.85-.125-1.425-.7t-.7-1.425q-.85-.125-1.412-.712T5.15 15.6q-.95-.125-1.55-.825t-.6-1.65q0-.5.188-.962t.537-.813l5.8-5.775L12.8 8.85q.05.075.15.113t.2.037q.225 0 .375-.137t.15-.363q0-.1-.038-.2t-.112-.15L9.95 4.575q-.275-.3-.637-.437T8.55 4q-.375 0-.75.138t-.675.437L3.6 8.125q-.225.225-.375.525t-.2.6t0 .613t.2.587l-1.45 1.45q-.425-.575-.625-1.262T1 9.25t.35-1.362t.825-1.188L5.7 3.175Q6.3 2.6 7.038 2.3T8.55 2t1.513.3t1.312.875l.275.275l.275-.275q.6-.575 1.338-.875t1.512-.3t1.513.3t1.312.875L21.825 7.4q.575.575.875 1.325t.3 1.525t-.3 1.513t-.875 1.312l-8.2 8.175q-.35.35-.812.55t-.963.2" opacity="0.5" />
    </svg>
  )
}

export function BrokenChain(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="m19.25 16.45l-1.5-1.55q1-.275 1.625-1.063T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.463T22 12q0 1.425-.737 2.625T19.25 16.45M15.85 13l-2-2H16v2zm3.95 9.6L1.4 4.2l1.4-1.4l18.4 18.4zM11 17H7q-2.075 0-3.537-1.463T2 12q0-1.725 1.05-3.075t2.7-1.775L7.6 9H7q-1.25 0-2.125.875T4 12t.875 2.125T7 15h4zm-3-4v-2h1.625l1.975 2z" opacity="0.5" />
    </svg>
  )
}

export function SparkleDots(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M2 22L7 8l9 9zm3.3-3.3l7.05-2.5l-4.55-4.55zm9.25-6.15L13.5 11.5l5.6-5.6q.8-.8 1.925-.8t1.925.8l.6.6l-1.05 1.05l-.6-.6q-.35-.35-.875-.35t-.875.35zm-4-4L9.5 7.5l.6-.6q.35-.35.35-.85t-.35-.85l-.65-.65L10.5 3.5l.65.65q.8.8.8 1.9t-.8 1.9zm2 2L11.5 9.5l3.6-3.6q.35-.35.35-.875t-.35-.875l-1.6-1.6l1.05-1.05l1.6 1.6q.8.8.8 1.925t-.8 1.925zm4 4L15.5 13.5l1.6-1.6q.8-.8 1.925-.8t1.925.8l1.6 1.6l-1.05 1.05l-1.6-1.6q-.35-.35-.875-.35t-.875.35z" opacity="0.5" />
    </svg>
  )
}

export function ConnectionNodes(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M3.875 22.125Q3 21.25 3 20t.875-2.125T6 17q.35 0 .65.075t.575.2L8.65 15.5q-.7-.775-.975-1.75T7.55 11.8l-2.025-.675q-.425.625-1.075 1T3 12.5q-1.25 0-2.125-.875T0 9.5t.875-2.125T3 6.5t2.125.875T6 9.5v.2l2.025.7q.5-.9 1.338-1.525t1.887-.8V5.9q-.975-.275-1.612-1.063T9 3q0-1.25.875-2.125T12 0t2.125.875T15 3q0 1.05-.65 1.838T12.75 5.9v2.175q1.05.175 1.888.8t1.337 1.525L18 9.7v-.2q0-1.25.875-2.125T21 6.5t2.125.875T24 9.5t-.875 2.125T21 12.5q-.8 0-1.463-.375t-1.062-1l-2.025.675q.15.975-.125 1.938T15.35 15.5l1.425 1.75q.275-.125.575-.187T18 17q1.25 0 2.125.875T21 20t-.875 2.125T18 23t-2.125-.875T15 20q0-.5.163-.962t.437-.838l-1.425-1.775Q13.15 17 11.988 17T9.8 16.425L8.4 18.2q.275.375.438.838T9 20q0 1.25-.875 2.125T6 23t-2.125-.875" opacity="0.5" />
    </svg>
  )
}

export const LightBurst = TorchKid
export const StarCluster = BulbSeed
export const BrainWave = BrainGears
