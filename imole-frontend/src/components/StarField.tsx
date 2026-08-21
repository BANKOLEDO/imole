const STARS = [
  { left: '6%', top: '14%', size: 2, delay: '0s' },
  { left: '18%', top: '68%', size: 3, delay: '0.6s' },
  { left: '27%', top: '22%', size: 2, delay: '1.2s' },
  { left: '38%', top: '82%', size: 2, delay: '0.3s' },
  { left: '47%', top: '9%', size: 3, delay: '1.8s' },
  { left: '58%', top: '58%', size: 2, delay: '0.9s' },
  { left: '66%', top: '28%', size: 2, delay: '2.1s' },
  { left: '74%', top: '74%', size: 3, delay: '1.5s' },
  { left: '83%', top: '16%', size: 2, delay: '0.4s' },
  { left: '91%', top: '48%', size: 2, delay: '1.1s' },
  { left: '12%', top: '42%', size: 2, delay: '2.4s' },
  { left: '52%', top: '90%', size: 2, delay: '0.7s' },
]

export default function StarField() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-periwinkle/40"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  )
}
