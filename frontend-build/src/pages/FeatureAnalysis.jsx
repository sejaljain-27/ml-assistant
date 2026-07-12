import { useEffect, useState } from 'react'
import Card from '../components/ui/Card.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import RecommendationBox from '../components/ui/RecommendationBox.jsx'
import HorizontalBarChart from '../components/charts/HorizontalBarChart.jsx'
import CorrelationHeatmap from '../components/charts/CorrelationHeatmap.jsx'
import { datasetService } from '../services/datasetService.js'

export default function FeatureAnalysis() {
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true
    datasetService.getFeatureImportance().then((res) => {
      if (active) setData(res)
    })
    return () => {
      active = false
    }
  }, [])

  if (!data) return <Spinner label="Ranking feature importance..." />

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        Feature Analysis <span className="mx-1 text-slate-700">&rsaquo;</span>{' '}
        <span className="text-slate-300">Feature Importance</span>
      </p>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card title="Top Important Features">
          <ul className="space-y-3">
            {data.topFeatures.map((feature) => (
              <li key={feature.name} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-xs font-semibold text-violet-300">
                  {feature.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-200">{feature.name}</span>
                    <span className="text-slate-400">{feature.score.toFixed(4)}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-border">
                    <div
                      className="h-full rounded-full bg-brand-gradient"
                      style={{ width: `${(feature.score / data.topFeatures[0].score) * 100}%` }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Feature Importance (Mutual Information)">
          <HorizontalBarChart
            data={[...data.mutualInformation].sort((a, b) => b.score - a.score)}
            dataKey="score"
            nameKey="name"
            color="#8b5cf6"
            height={300}
          />
        </Card>
      </div>

      {data.correlations && (
        <Card title="Feature Correlation Matrix" subtitle="Pearson correlation coefficients between numerical variables">
          <CorrelationHeatmap 
            features={data.correlations.features} 
            matrix={data.correlations.matrix} 
          />
        </Card>
      )}

      <RecommendationBox title="Insight">{data.insight}</RecommendationBox>
    </div>
  )
}
