export default function Spinner({ label = 'Loading...' }) {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-3 text-slate-500">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-surface-border border-t-brand-purple" />
      <p className="text-sm">{label}</p>
    </div>
  )
}
