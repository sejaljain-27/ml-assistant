import { Lightbulb } from 'lucide-react'

export default function RecommendationBox({ title = 'Recommendation', children }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-300">
        <Lightbulb size={14} />
      </div>
      <div>
        <p className="text-sm font-semibold text-violet-200">{title}</p>
        <p className="mt-0.5 text-sm text-slate-300">{children}</p>
      </div>
    </div>
  )
}
