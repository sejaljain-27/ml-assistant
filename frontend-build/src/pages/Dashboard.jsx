import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Rows3, Columns3, TriangleAlert, Copy, Plus } from 'lucide-react'
import StatCard from '../components/ui/StatCard.jsx'
import Card from '../components/ui/Card.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import Badge from '../components/ui/Badge.jsx'
import ClassDistributionPie from '../components/charts/ClassDistributionPie.jsx'
import { datasetService } from '../services/datasetService.js'

export default function Dashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true
    datasetService.getOverview().then((res) => {
      if (active) setData(res)
    })
    return () => {
      active = false
    }
  }, [])

  if (!data) return <Spinner label="Loading dataset overview..." />

  const { healthScore, healthLabel, rows, columns, missingValuesPct, missingValuesLabel, duplicateRows, duplicateRowsLabel, quickSummary, preview } = data

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <button type="button" onClick={() => navigate('/upload')} className="btn-primary">
          <Plus size={16} />
          New Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-primary p-5 text-primary-foreground border-[0.5px] border-transparent">
          <p className="text-xs font-medium opacity-85">Dataset Health Score</p>
          <p className="mt-3 text-3xl font-serif font-normal">
            {healthScore} <span className="text-base font-sans font-medium opacity-70">/ 100</span>
          </p>
          <p className="mt-1 text-xs font-medium opacity-85">{healthLabel}</p>
        </div>
        <StatCard label="Rows" value={rows.toLocaleString()} tone="neutral" icon={Rows3} />
        <StatCard label="Columns" value={columns} tone="neutral" icon={Columns3} />
        <StatCard label="Duplicate Rows" value={duplicateRows} sublabel={duplicateRowsLabel} tone="neutral" icon={Copy} />
      </div>

      {/* Attention Banners */}
      {(missingValuesPct > 0 || duplicateRows > 0) && (
        <div className="space-y-3">
          {missingValuesPct > 0 && (
            <div className="flex items-start gap-3 rounded-xl border-[0.5px] border-[#D85A30]/30 bg-[#FAECE7] p-4 text-[#4A1B0C]">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D85A30]/10 text-[#D85A30]">
                <TriangleAlert size={14} />
              </div>
              <div>
                <p className="text-sm font-semibold">Missing Values Alert</p>
                <p className="mt-0.5 text-sm opacity-95">
                  Your dataset contains <strong className="font-semibold">{missingValuesPct}% missing values</strong> ({missingValuesLabel}). We recommend performing data imputation or dropping empty columns before training models.
                </p>
              </div>
            </div>
          )}

          {duplicateRows > 0 && (
            <div className="flex items-start gap-3 rounded-xl border-[0.5px] border-[#D85A30]/30 bg-[#FAECE7] p-4 text-[#4A1B0C]">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D85A30]/10 text-[#D85A30]">
                <Copy size={14} />
              </div>
              <div>
                <p className="text-sm font-semibold">Duplicate Rows Detected</p>
                <p className="mt-0.5 text-sm opacity-95">
                  We detected <strong className="font-semibold">{duplicateRows} duplicate rows</strong> ({duplicateRowsLabel}). Consider cleaning them to avoid validation leaks and overfitting.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title="Quick Summary" className="lg:col-span-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <dl className="space-y-4">
              <div>
                <dt className="text-xs text-slate-500">Problem Type</dt>
                <dd className="mt-1">
                  <Badge variant="brand">{quickSummary.problemType}</Badge>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Target Column</dt>
                <dd className="mt-1 text-sm font-semibold text-[#D85A30]">{quickSummary.targetColumn}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Unique Classes</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-200">{quickSummary.uniqueClasses}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Class Imbalance</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-200">{quickSummary.classImbalance}</dd>
              </div>
            </dl>

            {data.classDistribution && (
              <div className="flex flex-col items-center justify-center">
                <p className="text-xs font-medium text-slate-500 mb-1">Class Distribution</p>
                <ClassDistributionPie data={data.classDistribution} />
              </div>
            )}
          </div>
        </Card>

        <Card title="Dataset Preview" className="lg:col-span-2 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max text-left text-xs">
              <thead>
                <tr className="border-b border-surface-border text-slate-500">
                  {preview.columns.map((col) => (
                    <th key={col} className="whitespace-nowrap px-3 py-2 font-semibold uppercase tracking-wide">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.rows.map((row) => (
                  <tr key={row.PassengerId} className="border-b border-surface-border/60 last:border-0">
                    {preview.columns.map((col) => (
                      <td key={col} className="whitespace-nowrap px-3 py-2.5 text-slate-300">
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
