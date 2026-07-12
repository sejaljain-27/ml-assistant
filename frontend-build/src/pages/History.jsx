import { useEffect, useState } from 'react'
import { FileClock } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import Badge from '../components/ui/Badge.jsx'
import { datasetService } from '../services/datasetService.js'

export default function HistoryPage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true
    datasetService.getHistory().then((res) => {
      if (active) setData(res)
    })
    return () => {
      active = false
    }
  }, [])

  if (!data) return <Spinner label="Loading past analyses..." />

  return (
    <div className="space-y-4">
      {data.map((run) => (
        <Card key={run.id}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                <FileClock size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100">{run.fileName}</p>
                <p className="text-xs text-slate-500">
                  {new Date(run.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}{' '}
                  &middot; {run.rows.toLocaleString()} rows &middot; {run.columns} columns
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <Badge variant="brand">{run.problemType}</Badge>
              <div className="text-right">
                <p className="text-xs text-slate-500">Health Score</p>
                <p className="text-sm font-semibold text-slate-200">{run.healthScore}/100</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Best Model</p>
                <p className="text-sm font-semibold text-slate-200">{run.bestModel}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Accuracy</p>
                <p className="text-sm font-semibold text-emerald-400">{run.bestAccuracy}%</p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
