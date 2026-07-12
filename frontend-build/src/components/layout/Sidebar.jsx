import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  UploadCloud,
  Table2,
  SlidersHorizontal,
  BarChart3,
  Sparkles,
  GitCompare,
  FileText,
  History,
  Compass,
  Code,
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/upload', label: 'Upload Dataset', icon: UploadCloud },
  { to: '/data-overview', label: 'Data Overview', icon: Table2 },
  { to: '/preprocessing', label: 'Preprocessing', icon: SlidersHorizontal },
  { to: '/feature-analysis', label: 'Feature Analysis', icon: BarChart3 },
  { to: '/model-recommendations', label: 'Model Recommendations', icon: Sparkles },
  { to: '/model-comparison', label: 'Model Comparison', icon: GitCompare },
  { to: '/pipeline', label: 'Pipeline Code', icon: Code },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/history', label: 'History', icon: History },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r-[0.5px] border-surface-border
          bg-surface-panel transition-transform duration-200 lg:static lg:transform-none lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center gap-2.5 border-b-[0.5px] border-surface-border px-5 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Compass size={18} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-100">ML Compass AI</p>
            <p className="truncate text-[11px] text-slate-500">Your ML Assistant</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-slate-400 hover:bg-accent/50 hover:text-slate-200'
                }`
              }
            >
              <Icon size={17} className="shrink-0" />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>


        <div className="border-t-[0.5px] border-surface-border p-4 text-[11px] text-slate-500">
          ML Compass AI v1.0 &middot; Frontend demo
        </div>
      </aside>
    </>
  )
}
