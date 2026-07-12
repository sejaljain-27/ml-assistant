const TONE_STYLES = {
  purple: 'from-purple-600 to-indigo-600 dark:from-purple-950/30 dark:to-indigo-950/20 dark:border-[0.5px] dark:border-purple-500/20 text-white',
  blue: 'from-blue-600 to-blue-500 dark:from-blue-950/30 dark:to-indigo-950/20 dark:border-[0.5px] dark:border-blue-500/20 text-white',
  orange: 'from-amber-500 to-orange-500 dark:from-amber-950/30 dark:to-orange-950/20 dark:border-[0.5px] dark:border-orange-500/20 text-white',
  pink: 'from-pink-600 to-rose-500 dark:from-pink-950/30 dark:to-rose-950/20 dark:border-[0.5px] dark:border-pink-500/20 text-white',
  neutral: 'bg-surface-card border-[0.5px] border-surface-border text-slate-100',
}

export default function StatCard({ label, value, sublabel, tone = 'neutral', icon: Icon }) {
  const isGradient = tone !== 'neutral'

  return (
    <div
      className={`rounded-xl p-5 ${
        isGradient ? `bg-gradient-to-br ${TONE_STYLES[tone]}` : TONE_STYLES.neutral
      }`}
    >
      <div className="flex items-center justify-between">
        <p className={`text-xs font-medium ${isGradient ? 'text-white/80 dark:text-slate-300' : 'text-slate-400'}`}>{label}</p>
        {Icon && <Icon size={16} className={isGradient ? 'text-white/70 dark:text-slate-400' : 'text-slate-500'} />}
      </div>
      <p className="mt-3 text-3xl font-bold">{value}</p>
      {sublabel && (
        <p className={`mt-1 text-xs font-medium ${isGradient ? 'text-white/80 dark:text-slate-400' : 'text-slate-500'}`}>{sublabel}</p>
      )}
    </div>
  )
}

