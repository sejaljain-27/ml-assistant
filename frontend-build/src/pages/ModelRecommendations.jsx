import { useDataset } from '../context/DatasetContext.jsx'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import RecommendationBox from '../components/ui/RecommendationBox.jsx'

const MODEL_DETAILS = {
  'Logistic Regression': {
    fitScore: 80,
    reason: 'Standard baseline classification model. Highly interpretable, extremely fast to train, and excellent for feature coefficient analysis.',
    tags: ['Baseline', 'Interpretable', 'Fast']
  },
  'Random Forest': {
    fitScore: 92,
    reason: 'Powerful bagging ensemble of decision trees. Robust to missing values, handles non-linear interactions automatically, and requires minimal hyperparameter tuning.',
    tags: ['Robust', 'Bagging', 'Low tuning']
  },
  'XGBoost': {
    fitScore: 95,
    reason: 'State-of-the-art gradient boosting framework. Optimized for accuracy and speed on tabular datasets, handles sparse inputs, but requires hyperparameter tuning to avoid overfitting.',
    tags: ['High Accuracy', 'Boosting', 'Needs tuning']
  },
  'CatBoost': {
    fitScore: 94,
    reason: 'Advanced gradient boosting optimized for categorical features. Prevents target leakage automatically and trains highly accurate models with minimal preprocessing.',
    tags: ['Categorical', 'Boosting', 'Robust']
  },
  'SVM': {
    fitScore: 78,
    reason: 'Effective in high-dimensional spaces. Relies on kernel trick for complex boundaries, but scales poorly to datasets with a large number of rows.',
    tags: ['High Dimension', 'Kernel', 'Slow']
  },
  'LightGBM': {
    fitScore: 93,
    reason: 'Highly efficient gradient booster. Uses leaf-wise tree growth for faster training and lower memory usage, ideal for large-scale datasets.',
    tags: ['Fast', 'Low memory', 'Boosting']
  },
  'Linear Regression': {
    fitScore: 82,
    reason: 'Fundamental baseline regression model. Finds linear coefficients between features and targets, very fast, but struggles with complex non-linear trends.',
    tags: ['Baseline', 'Interpretable', 'Fast']
  },
  'Random Forest Regressor': {
    fitScore: 90,
    reason: 'Ensemble regressor combining multiple decision trees. Handles non-linear target patterns and feature interactions, robust to outliers.',
    tags: ['Robust', 'Non-linear', 'Bagging']
  },
  'XGBoost Regressor': {
    fitScore: 94,
    reason: 'Gradient boosted trees optimized for continuous regression targets. Achieves outstanding accuracy but needs careful regularization.',
    tags: ['High Accuracy', 'Boosting', 'Needs tuning']
  },
  'SVR': {
    fitScore: 80,
    reason: 'Support Vector Regression, finds a hyper-tube that fits predictions. Good for non-linear regression but memory intensive.',
    tags: ['Kernel', 'Non-linear', 'Slow']
  },
  'Gradient Boosting Regressor': {
    fitScore: 89,
    reason: 'Standard gradient boosting tree regressor from scikit-learn. Robust baseline model that builds trees sequentially.',
    tags: ['Sequential', 'Robust']
  },
  'LightGBM Regressor': {
    fitScore: 93,
    reason: 'Fast, distributed gradient boosting framework for regression targets, designed for rapid iteration on massive tables.',
    tags: ['Fast', 'Boosting', 'Large scale']
  },
  'CatBoost Regressor': {
    fitScore: 92,
    reason: 'Optimized gradient boosting regressor focusing on high performance with categorical indicators without explicit encoding.',
    tags: ['Categorical', 'Robust']
  }
}

export default function ModelRecommendations() {
  const navigate = useNavigate()
  const { dataset } = useDataset()

  if (!dataset || !dataset.analysisResult) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center p-6 bg-surface-card rounded-xl border border-surface-border/40">
        <h2 className="text-xl font-normal text-slate-100">No Dataset Active</h2>
        <p className="mt-2 text-sm text-slate-400 max-w-sm">
          Please upload and analyze a CSV dataset first to view model recommendations.
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
  const suggested = (result.suggested_models.recommended_models || []).map((name) => {
    const details = MODEL_DETAILS[name] || {
      fitScore: 85,
      reason: 'Model suggested by the ML pipeline based on dataset dimensions and features.',
      tags: ['Recommended']
    }
    return { name, ...details }
  })

  const recommendedMetric = result.recommended_metric.metrics
    ? result.recommended_metric.metrics.join(', ')
    : (result.recommended_metric.metric ? result.recommended_metric.metric.join(', ') : 'N/A')

  const data = {
    problemType: result.task_detection.task_type,
    suggested,
    recommendedMetric,
    metricReason: result.recommended_metric.reason || 'Optimal evaluation metrics selected.'
  }

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
