import { useEffect, useState } from 'react'
import { FileText, FileSpreadsheet, Download } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import ProgressRing from '../components/ui/ProgressRing.jsx'
import { datasetService } from '../services/datasetService.js'

const ICONS = { 'file-text': FileText, 'file-spreadsheet': FileSpreadsheet }

export default function Reports() {
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true
    datasetService.getReports().then((res) => {
      if (active) setData(res)
    })
    return () => {
      active = false
    }
  }, [])

  if (!data) return <Spinner label="Assembling report..." />

  // Demo-only download: this is mock data, so we generate a small text file client-side.
  const handleDownload = (report) => {
    const blob = new Blob(
      [`ML Compass AI — ${report.title}\n\nThis is a placeholder export generated from mock data.\n`],
      { type: 'text/plain' },
    )
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${report.id}.${report.format.toLowerCase()}`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card title="Download Reports" subtitle="Download comprehensive analysis reports.">
          <div className="space-y-3">
            {data.available.map((report) => {
              const Icon = ICONS[report.icon] ?? FileText
              return (
                <div
                  key={report.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-surface-border bg-surface-panel p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{report.title}</p>
                      <p className="text-xs text-slate-500">{report.description}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => handleDownload(report)} className="btn-secondary shrink-0">
                    <Download size={14} />
                    {report.format}
                  </button>
                </div>
              )
            })}
          </div>
        </Card>

        <Card title="Report Preview">
          <div className="rounded-xl bg-white p-5 text-slate-900">
            <p className="text-xs font-semibold text-slate-500">ML Compass AI</p>
            <p className="text-sm font-bold">Dataset Analysis Report</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] text-slate-500">Dataset Health Score</p>
                <ProgressRing value={data.preview.healthScore} size={72} strokeWidth={7} label={data.preview.healthScore} />
              </div>
              <div>
                <p className="text-[11px] text-slate-500">Missing Values</p>
                <p className="mt-2 text-lg font-bold">{data.preview.missingPct}%</p>
                <p className="mt-3 text-[11px] text-slate-500">Top 5 Important Features</p>
                <ul className="mt-1 space-y-1 text-[11px] text-slate-600">
                  {data.preview.topFeatures.map((f) => (
                    <li key={f}>&bull; {f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-4 text-sm text-slate-300">
        Reports include data quality, preprocessing steps, feature analysis, model comparison and recommendations.
      </div>
    </div>
  )
}
