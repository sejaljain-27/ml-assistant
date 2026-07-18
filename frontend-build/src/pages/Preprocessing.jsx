import { useDataset } from '../context/DatasetContext.jsx'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'

const PRIORITY_VARIANT = { High: 'danger', Medium: 'warning', Low: 'info' }

export default function Preprocessing() {
  const navigate = useNavigate()
  const { dataset } = useDataset()

  if (!dataset || !dataset.analysisResult) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center p-6 bg-surface-card rounded-xl border border-surface-border/40">
        <h2 className="text-xl font-normal text-slate-100">No Dataset Active</h2>
        <p className="mt-2 text-sm text-slate-400 max-w-sm">
          Please upload and analyze a CSV dataset first to view preprocessing steps.
        </p>
        <button
          type="button"
          onClick={() => navigate('/upload')}
          className="mt-6 btn-primary"
        >
          Go to Upload
        </button>
      </div>
    )
  }

  const result = dataset.analysisResult
  const steps = (result.recommended_preprocessing || []).map((step, idx) => ({
    id: `step-${idx}`,
    title: step.recommendation,
    description: step.action,
    priority: step.severity,
    column: step.reason
  }))

  const outliers = (result.outlier_detection.details || []).map(d => ({
    column: d.column,
    count: d.count,
    method: 'IQR'
  }))

  const data = { steps, outliers }

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
