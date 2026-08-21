import { useState } from 'react'
import { motion } from 'motion/react'
import { PlayCircle, X } from 'lucide-react'
import Button from '../../../components/shared/Button'

function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname === 'youtube.com' || u.hostname.endsWith('.youtube.com')) {
      const id = u.searchParams.get('v') ?? u.pathname.split('/').filter(Boolean).pop()
      return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1` : null
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.split('/').filter(Boolean)[0]
      return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1` : null
    }
    if (/\.(mp4|webm)$/i.test(u.pathname)) return url
  } catch {
    return null
  }
  return null
}

type Props = { title?: string; url: string }

export default function VideoModal({ title, url }: Props) {
  const [open, setOpen] = useState(false)
  const embed = toEmbedUrl(url)
  if (!embed) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="block">
        <Button variant="outline" className="w-full">
          <PlayCircle className="size-4" />
          {title ?? 'Learn more'}
        </Button>
      </a>
    )
  }

  return (
    <>
      <Button variant="outline" className="w-full" onClick={() => setOpen(true)}>
        <PlayCircle className="size-4" />
        {title ?? 'Watch video'}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-dark/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-navy-dark shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <p className="truncate font-heading text-sm font-bold text-white">
                {title ?? 'Imole'}
              </p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close video"
                className="cursor-pointer rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={embed}
                title={title ?? 'Suggested video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
