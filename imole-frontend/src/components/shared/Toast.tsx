import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { CheckCircle2, Info, XCircle } from 'lucide-react'

type ToastKind = 'success' | 'error' | 'info'

type Toast = { id: number; kind: ToastKind; message: string }

const ICONS: Record<ToastKind, ReactNode> = {
  success: <CheckCircle2 className="size-5 text-success" />,
  error: <XCircle className="size-5 text-error" />,
  info: <Info className="size-5 text-accent" />,
}

const ToastContext = createContext<{
  toast: (kind: ToastKind, message: string) => void
} | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(0)

  const toast = useCallback((kind: ToastKind, message: string) => {
    const id = nextId.current++
    setToasts((list) => [...list, { id, kind, message }])
    setTimeout(() => {
      setToasts((list) => list.filter((item) => item.id !== id))
    }, 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-sm flex-col gap-2">
        {toasts.map(({ id, kind, message }) => (
          <div
            key={id}
            role="status"
            className="animate-slide-up flex items-center gap-2.5 rounded-2xl border border-border bg-bg-card px-4 py-3 shadow-lg"
          >
            {ICONS[kind]}
            <p className="text-sm font-medium text-text-primary">{message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx.toast
}
