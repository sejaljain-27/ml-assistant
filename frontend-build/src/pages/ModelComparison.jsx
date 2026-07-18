import { useDataset } from '../context/DatasetContext.jsx'
import { useNavigate } from 'react-router-dom'
import { Trophy } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import HorizontalBarChart from '../components/charts/HorizontalBarChart.jsx'

const MEDAL_COLORS = ['text-amber-400', 'text-slate-300', 'text-amber-700']

export default function ModelComparison() {
  const navigate = useNavigate()
  const { dataset } = useDataset()

  if (!dataset || !dataset.analysisResult) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center p-6 bg-surface-card rounded-xl border border-surface-border/40">
        <h2 className="text-xl font-normal text-slate-100">No Dataset Active</h2>
        <p className="mt-2 text-sm text-slate-400 max-w-sm">
          Please upload and analyze a CSV dataset first to view model comparison benchmarks.
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
  const isRegression = result.task_detection.task_type === 'Regression'

  const columnsList = isRegression
    ? [
        { key: 'model', label: 'Model' },
        { key: 'r2', label: 'R² Score' },
        { key: 'mae', label: 'MAE' },
        { key: 'rmse', label: 'RMSE' },
        { key: 'timeSeconds', label: 'Time (s)' },
      ]
    : [
        { key: 'model', label: 'Model' },
        { key: 'accuracy', label: 'Accuracy' },
        { key: 'precision', label: 'Precision' },
        { key: 'recall', label: 'Recall' },
        { key: 'f1Score', label: 'F1 Score' },
        { key: 'rocAuc', label: 'ROC AUC' },
        { key: 'timeSeconds', label: 'Time (s)' },
      ]

  const models = (result.model_comparison.ranking || []).map((item) => {
    if (isRegression) {
      return {
        model: item.Model,
        r2: item["R² Score"],
        mae: item.MAE,
        rmse: item.RMSE,
        timeSeconds: item["Prediction Time (s)"]
      }
    } else {
      return {
        model: item.Model,
        accuracy: item.Accuracy,
        precision: item.Precision,
        recall: item.Recall,
        f1Score: item["F1 Score"],
        rocAuc: item["ROC AUC"] || item["F1 Score"],
        timeSeconds: item["Prediction Time (s)"]
      }
    }
  })

  const sorted = [...models].sort((a, b) => {
    return isRegression ? b.r2 - a.r2 : b.accuracy - a.accuracy
  })

  const bestModel = result.model_comparison.best_model
  const bestModelMetricVal = result.model_comparison.comparison[bestModel]
    ? (isRegression ? result.model_comparison.comparison[bestModel]["R² Score"] : result.model_comparison.comparison[bestModel].Accuracy)
    : 0.0
  const bestModelAccuracy = (bestModelMetricVal * 100).toFixed(2)

  const tuning = result.hyperparameter_tuning && result.hyperparameter_tuning.best_params ? {
    bestParameters: result.hyperparameter_tuning.best_params,
    searchSpace: result.hyperparameter_tuning.search_space || {}
  } : null

  const crossValidation = result.cross_validation && result.cross_validation.scores ? {
    folds: result.cross_validation.scores,
    mean: result.cross_validation.mean_score,
    std: result.cross_validation.std_score
  } : null

  const data = {
    bestModel,
    bestModelAccuracy,
    models,
    tuning,
    crossValidation
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card title="Model Comparison" subtitle={isRegression ? "Ranked by R² Score across all trained models" : "Ranked by accuracy across all trained models"}>
            <div className="overflow-x-auto rounded-xl border border-surface-border">
              <table className="w-full min-w-max text-left text-sm">
                <thead>
                  <tr className="border-b border-surface-border bg-surface-panel/60">
                    {columnsList.map((col) => (
                      <th key={col.key} className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((row, idx) => (
                    <tr key={row.model} className="border-b border-surface-border/60 last:border-0 hover:bg-surface-panel/40">
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-200">
                        <span className="flex items-center gap-2">
                          {idx < 3 && <Trophy size={14} className={MEDAL_COLORS[idx]} />}
                          {row.model}
                        </span>
                      </td>
                      {columnsList.slice(1).map((col) => {
                        const val = row[col.key]
                        let valStr = '-'
                        if (typeof val === 'number') {
                          if (col.key === 'accuracy' || col.key === 'r2') {
                            valStr = `${(val * 100).toFixed(2)}%`
                          } else if (col.key === 'timeSeconds') {
                            valStr = `${val.toFixed(3)}s`
                          } else {
                            valStr = val.toFixed(4)
                          }
                        }
                        return (
                          <td key={col.key} className="whitespace-nowrap px-4 py-3 text-slate-300">
                            {valStr}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card title={isRegression ? "R² Score Comparison" : "Accuracy Comparison"} subtitle="Visual rank of model validation scores">
            <div className="flex items-center justify-center min-h-[260px] mt-2">
              <HorizontalBarChart
                data={sorted}
                dataKey={isRegression ? "r2" : "accuracy"}
                nameKey="model"
                color="#8a8578"
                height={280}
                valueFormatter={(v) => `${(v * 100).toFixed(2)}%`}
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Hyperparameter Tuning & Cross-Validation */}
      {data.tuning && data.crossValidation && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Hyperparameter Tuning */}
          <Card title="Hyperparameter Tuning Details" subtitle={`Optimal parameters found for ${data.bestModel}`}>
            <div className="space-y-4 text-xs mt-2">
              {Object.keys(data.tuning.searchSpace).length > 0 && (
                <div>
                  <p className="font-semibold text-slate-400 mb-1">Search Space Configured</p>
                  <div className="grid grid-cols-2 gap-2 bg-surface/30 p-2.5 rounded-lg border-[0.5px] border-surface-border">
                    {Object.entries(data.tuning.searchSpace).map(([param, val]) => (
                      <div key={param} className="flex justify-between py-0.5">
                        <span className="font-mono text-slate-500">{param}:</span>
                        <span className="font-mono text-slate-300 truncate max-w-[150px]">{JSON.stringify(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="font-semibold text-slate-400 mb-1">Optimal Discovered Parameters</p>
                <div className="grid grid-cols-2 gap-2 bg-surface/30 p-2.5 rounded-lg border-[0.5px] border-surface-border">
                  {Object.entries(data.tuning.bestParameters).map(([param, val]) => (
                    <div key={param} className="flex justify-between py-0.5">
                      <span className="font-mono text-slate-500 font-semibold">{param}:</span>
                      <span className="font-mono text-slate-100 font-semibold">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Cross-Validation */}
          <Card title="Cross-Validation Metrics" subtitle="5-Fold validation scores and variance checks">
            <div className="space-y-4 text-xs mt-2">
              <div>
                <p className="font-semibold text-slate-400 mb-2">Individual Fold Scores</p>
                <div className="flex items-center justify-between gap-1.5">
                  {data.crossValidation.folds.map((fold, idx) => (
                    <div key={idx} className="flex-1 text-center bg-surface/30 p-2 rounded-lg border-[0.5px] border-surface-border">
                      <p className="text-[10px] text-slate-500 font-mono">Fold {idx + 1}</p>
                      <p className="mt-1 font-semibold text-slate-100 font-mono">{(fold * 100).toFixed(1)}%</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="bg-surface/30 p-3 rounded-lg border-[0.5px] border-surface-border">
                  <p className="text-slate-500">Mean Score</p>
                  <p className="text-xl font-serif font-normal text-slate-100 mt-1">
                    {(data.crossValidation.mean * 100).toFixed(2)}%
                  </p>
                </div>
                <div className="bg-surface/30 p-3 rounded-lg border-[0.5px] border-surface-border">
                  <p className="text-slate-500">Standard Deviation</p>
                  <p className="text-xl font-serif font-normal text-slate-100 mt-1">
                    &plusmn;{(data.crossValidation.std * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Best Model Highlight (Trophy Card) */}
      <div className="flex items-start gap-3 rounded-xl bg-primary text-primary-foreground p-5 border-[0.5px] border-transparent">
        <Trophy size={18} className="mt-0.5 shrink-0 text-primary-foreground" />
        <div className="text-sm">
          <p className="font-semibold">Spotlight Model</p>
          <p className="mt-0.5 opacity-90">
            <span className="font-semibold">{data.bestModel}</span> is the best performing model with{' '}
            {data.bestModelAccuracy}% {isRegression ? 'R² Score' : 'accuracy'}.
          </p>
        </div>
      </div>
    </div>
  )
}
