import { CheckCircle2, Circle } from 'lucide-react'

type Props = {
  answers: Array<{ id: string; text: string }>
  selected: string | null
  onSelect: (id: string) => void
  disabled?: boolean
  correctAnswerId?: string
}

export default function QuizOptions({ answers, selected, onSelect, disabled, correctAnswerId }: Props) {
  return (
    <div className="grid gap-2.5">
      {answers.map((answer, index) => {
        const isSelected = selected === answer.id
        const isCorrect = correctAnswerId === answer.id
        return (
          <button
            key={answer.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(answer.id)}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
              isCorrect
                ? 'border-success bg-success/10'
                : isSelected
                  ? 'border-accent bg-accent-soft shadow-sm'
                  : 'border-border bg-bg-card hover:border-accent/40 hover:bg-bg-surface'
            } ${disabled ? 'cursor-default opacity-90' : ''}`}
          >
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                isCorrect
                  ? 'bg-success text-white'
                  : isSelected
                    ? 'bg-accent text-accent-text'
                    : 'bg-bg-surface text-text-muted'
              }`}
            >
              {String.fromCharCode(65 + index)}
            </span>
            <span className="flex-1 text-sm font-semibold text-text-primary">{answer.text}</span>
            {isCorrect ? (
              <CheckCircle2 className="size-5 shrink-0 text-success" />
            ) : (
              <Circle className={`size-5 shrink-0 ${isSelected ? 'text-accent' : 'text-border'}`} />
            )}
          </button>
        )
      })}
    </div>
  )
}
