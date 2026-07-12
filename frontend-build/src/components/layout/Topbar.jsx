import { Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function Topbar({ title, subtitle, onMenuClick, actions }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b-[0.5px] border-surface-border bg-surface/95 px-5 py-4 backdrop-blur">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-400 hover:bg-surface-card hover:text-slate-200 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-normal font-serif text-slate-100">{title}</h1>
          {subtitle && <p className="truncate text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {actions}
        <button
          type="button"
          onClick={toggleTheme}
          className="hidden h-9 w-9 items-center justify-center rounded-lg border border-surface-border text-slate-400 hover:bg-surface-card sm:flex"
          aria-label="Toggle theme"
          title="Toggle light/dark theme"
        >
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <div className="h-9 w-9 overflow-hidden rounded-full bg-brand-gradient">
          <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-primary-foreground">MC</div>
        </div>
      </div>
    </header>
  )
}
