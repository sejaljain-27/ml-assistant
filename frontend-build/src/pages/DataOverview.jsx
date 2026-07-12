import { useEffect, useState } from 'react'
import Card from '../components/ui/Card.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import RecommendationBox from '../components/ui/RecommendationBox.jsx'
import Badge from '../components/ui/Badge.jsx'
import MissingValuesDonut from '../components/charts/MissingValuesDonut.jsx'
import HorizontalBarChart from '../components/charts/HorizontalBarChart.jsx'
import { datasetService } from '../services/datasetService.js'

export default function DataOverview() {
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true
    datasetService.getMissingValues().then((res) => {
      if (active) setData(res)
    })
    return () => {
      active = false
    }
  }, [])

  if (!data) return <Spinner label="Crunching missing values..." />

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        Data Overview <span className="mx-1 text-slate-700">&rsaquo;</span>{' '}
        <span className="text-slate-300">Missing Values</span>
      </p>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card title="Missing Values Overview">
          <MissingValuesDonut missingPct={data.totalMissingPct} completePct={data.totalCompletePct} />
          <div className="mt-4 flex items-center justify-center gap-6 text-xs">
            <span className="flex items-center gap-2 text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Missing ({data.totalMissingPct}%)
            </span>
            <span className="flex items-center gap-2 text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full bg-pink-500" /> Complete ({data.totalCompletePct}%)
            </span>
          </div>
        </Card>

        <Card title="Missing Values by Column">
          <HorizontalBarChart
            data={[...data.byColumn].sort((a, b) => b.pct - a.pct)}
            dataKey="pct"
            nameKey="column"
            color="#8b5cf6"
            height={300}
            valueFormatter={(v) => `${v}%`}
          />
        </Card>
      </div>

      <RecommendationBox>{data.recommendation}</RecommendationBox>

      {data.challenges && data.challenges.length > 0 && (
        <Card title="Potential Dataset Challenges & Risks" subtitle="Anomalies and leakage risks detected during structural scan">
          <div className="space-y-4 mt-2">
            {data.challenges.map((challenge, idx) => {
              const isHigh = challenge.severity === 'High'
              return (
                <div 
                  key={idx} 
                  className={`flex items-start gap-3 rounded-xl border-[0.5px] p-4 ${
                    isHigh 
                      ? 'bg-[#FAECE7] text-[#4A1B0C] border-[#D85A30]/30' 
                      : 'bg-surface-card border-surface-border text-slate-100'
                  }`}
                >
                  <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    isHigh ? 'bg-[#D85A30]/10 text-[#D85A30]' : 'bg-primary text-primary-foreground'
                  }`}>
                    {challenge.severity[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{challenge.type}</p>
                      <Badge className={isHigh ? 'bg-[#D85A30] text-white' : ''}>
                        {challenge.severity}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs opacity-90">{challenge.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}
