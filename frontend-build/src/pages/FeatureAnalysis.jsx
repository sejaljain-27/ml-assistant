import { useDataset } from '../context/DatasetContext.jsx'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card.jsx'
import RecommendationBox from '../components/ui/RecommendationBox.jsx'
import HorizontalBarChart from '../components/charts/HorizontalBarChart.jsx'
import CorrelationHeatmap from '../components/charts/CorrelationHeatmap.jsx'

export default function FeatureAnalysis() {
  const navigate = useNavigate()
  const { dataset } = useDataset()

  if (!dataset || !dataset.analysisResult) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center p-6 bg-surface-card rounded-xl border border-surface-border/40">
        <h2 className="text-xl font-normal text-slate-100">No Dataset Active</h2>
        <p className="mt-2 text-sm text-slate-400 max-w-sm">
          Please upload and analyze a CSV dataset first to view feature analysis.
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
  const topFeatures = (result.feature_selection.top_features || []).slice(0, 5).map(f => ({
    rank: f.rank,
    name: f.feature,
    score: f.importance
  }))

  const mutualInformation = (result.feature_selection.top_features || []).map(f => ({
    name: f.feature,
    score: f.importance
  }))

  const correlations = result.correlation_detection.features && result.correlation_detection.features.length > 0
    ? {
        features: result.correlation_detection.features,
        matrix: result.correlation_detection.matrix
      }
    : null

  const data = {
    topFeatures,
    mutualInformation,
    insight: result.feature_selection.reason || 'Mutual Information ranking computed.',
    correlations
  }

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
