import { Link } from 'react-router-dom'

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <img src="/empty-state.svg" alt="" className="w-36" />
      <h1 className="font-heading text-2xl font-bold text-text-primary">{title}</h1>
      <p className="text-sm text-text-muted">This feature is on its way.</p>
      <Link to="/" className="cta-pill text-sm">
        Back home
      </Link>
    </div>
  )
}
