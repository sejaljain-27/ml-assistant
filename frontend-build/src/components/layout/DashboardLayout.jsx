import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import NeuralBackground from '@/components/ui/flow-field-background'

const PAGE_META = {
  '/': { title: 'Dashboard Overview', subtitle: "Here's a quick summary of your dataset." },
  '/upload': { title: 'Upload Dataset', subtitle: 'Analyze your dataset. Get insights. Build better models.' },
  '/data-overview': { title: 'Data Overview', subtitle: 'Missing values, duplicates, and column-level quality.' },
  '/preprocessing': { title: 'Preprocessing', subtitle: 'Recommended cleaning and transformation steps.' },
  '/feature-analysis': { title: 'Feature Analysis', subtitle: 'Feature importance and correlations.' },
  '/model-recommendations': { title: 'Model Recommendations', subtitle: 'Suggested models for your problem type.' },
  '/model-comparison': { title: 'Model Comparison', subtitle: 'Benchmark results across trained models.' },
  '/reports': { title: 'Reports', subtitle: 'Download comprehensive analysis reports.' },
  '/history': { title: 'History', subtitle: 'Your previous dataset analyses.' },
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const meta = PAGE_META[pathname] ?? { title: 'ML Compass AI', subtitle: '' }

  return (
    <div className="relative flex min-h-screen bg-surface overflow-hidden flex-col">
      {/* Top Accent Stripe (Coral) */}
      <div className="h-0.5 w-full bg-[#D85A30] z-50 shrink-0" />

      <NeuralBackground 
        className="fixed inset-0 z-0 opacity-[0.12] pointer-events-none" 
        color="var(--primary)" 
        particleCount={150} 
        speed={0.4} 
      />

      <div className="relative z-10 flex flex-1 w-full">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex flex-1 flex-col lg:pl-0 min-w-0">
          <Topbar title={meta.title} subtitle={meta.subtitle} onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 px-5 py-6">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

