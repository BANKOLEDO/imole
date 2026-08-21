import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from './Field'

type Props = React.ComponentProps<'input'>

export default function PasswordInput({ className, ...props }: Props) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Input
        {...props}
        type={show ? 'text' : 'password'}
        className={className ? `${className} pr-11` : 'pr-11'}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-text-muted transition-colors hover:text-text-primary"
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  )
}
