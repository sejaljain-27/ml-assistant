import { useEffect, useState } from 'react'
import Card from '../components/ui/Card.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import Badge from '../components/ui/Badge.jsx'
import RecommendationBox from '../components/ui/RecommendationBox.jsx'
import { datasetService } from '../services/datasetService.js'

export default function ModelRecommendations() {
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true
    datasetService.getModelRecommendations().then((res) => {
      if (active) setData(res)
    })
    return () => {
      active = false
    }
  }, [])

  if (!data) return <Spinner label="Matching models to your dataset..." />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Problem Type: <Badge variant="brand">{data.problemType}</Badge>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {data.suggested.map((model, idx) => (
          <Card key={model.name}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500">{idx === 0 ? 'Best Match' : `Rank #${idx + 1}`}</p>
                <h3 className="mt-1 text-base font-bold text-slate-100">{model.name}</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-violet-500/30 text-xs font-bold text-violet-300">
                {model.fitScore}
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-500">{model.reason}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {model.tags.map((tag) => (
                <Badge key={tag} variant="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <RecommendationBox title={`Recommended Metric: ${data.recommendedMetric}`}>
        {data.metricReason}
      </RecommendationBox>
    </div>
  )
}
