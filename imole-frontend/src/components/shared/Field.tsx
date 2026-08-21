import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

const FIELD =
  'w-full rounded-xl border border-border bg-bg-input px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-ring/30 disabled:opacity-50'

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${FIELD} ${className}`} {...props} />
}

export function Textarea({ className = '', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${FIELD} resize-none ${className}`} {...props} />
}
