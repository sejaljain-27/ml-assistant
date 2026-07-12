import { useEffect, useState } from 'react'
import Card from '../components/ui/Card.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import Badge from '../components/ui/Badge.jsx'
import { datasetService } from '../services/datasetService.js'

const PRIORITY_VARIANT = { High: 'danger', Medium: 'warning', Low: 'info' }

export default function Preprocessing() {
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true
    datasetService.getPreprocessingRecommendations().then((res) => {
      if (active) setData(res)
    })
    return () => {
      active = false
    }
  }, [])

  if (!data) return <Spinner label="Preparing preprocessing plan..." />

  return (
    <div className="space-y-6">
      <Card title="Recommended Steps" subtitle="Suggested cleaning and transformation actions for this dataset">
        <ul className="divide-y divide-surface-border">
          {data.steps.map((step) => (
            <li key={step.id} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-semibold text-slate-100">{step.title}</p>
                <p className="mt-1 text-sm text-slate-500">{step.description}</p>
                <p className="mt-2 text-xs text-slate-600">Column(s): {step.column}</p>
              </div>
              <Badge variant={PRIORITY_VARIANT[step.priority]} className="shrink-0">
                {step.priority}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Detected Outliers" subtitle="Values flagged using the IQR method">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.outliers.map((outlier) => (
            <div key={outlier.column} className="rounded-xl border border-surface-border bg-surface-panel p-4">
              <p className="text-xs text-slate-500">{outlier.column}</p>
              <p className="mt-1 text-2xl font-bold text-slate-100">{outlier.count}</p>
              <p className="mt-1 text-xs text-slate-500">outliers detected &middot; {outlier.method}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
