import { useDataset } from '../context/DatasetContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Download, FileCode, Check } from 'lucide-react'
import Card from '../components/ui/Card.jsx'

const generatePythonCode = (dataset) => {
  const result = dataset.analysisResult
  const isRegression = result.task_detection.task_type === 'Regression'
  const target = dataset.targetColumn
  const fileName = dataset.fileName || 'dataset.csv'

  const columns = result.preview.columns.filter((c) => c !== target)
  const firstRow = result.preview.rows[0] || {}
  const numericFeatures = []
  const categoricalFeatures = []

  columns.forEach((col) => {
    const val = firstRow[col]
    if (typeof val === 'number') {
      numericFeatures.push(col)
    } else {
      categoricalFeatures.push(col)
    }
  })

  const bestModel = result.model_comparison.best_model
  const bestParams = result.hyperparameter_tuning.best_params || {}

  let importsStr = ''
  let modelInstantiation = ''

  if (isRegression) {
    if (bestModel.includes('Linear') || bestModel === 'Linear Regression') {
      importsStr = 'from sklearn.linear_model import LinearRegression'
      modelInstantiation = 'LinearRegression()'
    } else if (bestModel.includes('Forest') || bestModel === 'Random Forest Regressor') {
      importsStr = 'from sklearn.ensemble import RandomForestRegressor'
      modelInstantiation = `RandomForestRegressor(${Object.entries(bestParams).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(', ') || 'n_estimators=100, random_state=42'})`
    } else if (bestModel.includes('XGB') || bestModel === 'XGBoost Regressor') {
      importsStr = 'from xgboost import XGBRegressor'
      modelInstantiation = `XGBRegressor(${Object.entries(bestParams).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(', ') || 'random_state=42'})`
    } else {
      importsStr = 'from sklearn.tree import DecisionTreeRegressor'
      modelInstantiation = `DecisionTreeRegressor(${Object.entries(bestParams).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(', ') || 'random_state=42'})`
    }
  } else {
    if (bestModel === 'Logistic Regression') {
      importsStr = 'from sklearn.linear_model import LogisticRegression'
      modelInstantiation = `LogisticRegression(${Object.entries(bestParams).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(', ') || 'max_iter=1000, random_state=42'})`
    } else if (bestModel === 'Random Forest') {
      importsStr = 'from sklearn.ensemble import RandomForestClassifier'
      modelInstantiation = `RandomForestClassifier(${Object.entries(bestParams).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(', ') || 'n_estimators=100, random_state=42'})`
    } else if (bestModel === 'XGBoost') {
      importsStr = 'from xgboost import XGBClassifier'
      modelInstantiation = `XGBClassifier(${Object.entries(bestParams).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(', ') || 'random_state=42'})`
    } else {
      importsStr = 'from sklearn.tree import DecisionTreeClassifier'
      modelInstantiation = `DecisionTreeClassifier(${Object.entries(bestParams).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(', ') || 'random_state=42'})`
    }
  }

  return `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
${importsStr}

# 1. Load data
df = pd.read_csv("${fileName}")
X = df.drop(columns=["${target}"])
y = df["${target}"]

# 2. Define preprocessing steps
numeric_features = ${JSON.stringify(numericFeatures)}
categorical_features = ${JSON.stringify(categoricalFeatures)}

numeric_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

categorical_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore"))
])

preprocessor = ColumnTransformer(transformers=[
    ("num", numeric_transformer, numeric_features),
    ("cat", categorical_transformer, categorical_features)
])

# 3. Create full ML Pipeline
pipeline = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("model", ${modelInstantiation})
])

# 4. Train/Test split & training
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
pipeline.fit(X_train, y_train)
print(f"Model trained! score: {pipeline.score(X_test, y_test):.4f}")
`
}

export default function Pipeline() {
  const navigate = useNavigate()
  const { dataset } = useDataset()
  const [copied, setCopied] = useState(false)

  if (!dataset || !dataset.analysisResult) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center p-6 bg-surface-card rounded-xl border border-surface-border/40">
        <h2 className="text-xl font-normal text-slate-100">No Dataset Active</h2>
        <p className="mt-2 text-sm text-slate-400 max-w-sm">
          Please upload and analyze a CSV dataset first to generate pipeline code.
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

  const code = generatePythonCode(dataset)
  const data = { code }

  const handleDownload = () => {
    if (!data?.code) return
    const blob = new Blob([data.code], { type: 'text/x-python' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pipeline.py'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopy = () => {
    if (!data?.code) return
    navigator.clipboard.writeText(data.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        Pipeline Export <span className="mx-1 text-slate-700">&rsaquo;</span>{' '}
        <span className="text-slate-300">Code Generator</span>
      </p>

      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-slate-400">Scikit-Learn ML Pipeline</h2>
          <p className="text-xs text-slate-500 mt-0.5">Fully structured training pipeline generated by the backend modules.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="btn-secondary py-2 px-3 text-xs"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <FileCode size={14} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="btn-primary py-2 px-3 text-xs"
          >
            <Download size={14} />
            Download pipeline.py
          </button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="bg-[#1c1b1a] p-4 text-xs font-mono text-slate-300 overflow-x-auto select-all max-h-[60vh]">
          <pre>{data.code}</pre>
        </div>
      </Card>
    </div>
  )
}
