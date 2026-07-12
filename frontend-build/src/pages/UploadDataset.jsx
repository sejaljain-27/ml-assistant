import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadCloud, Compass, FileCheck2 } from 'lucide-react'
import { useDataset } from '../context/DatasetContext.jsx'
import { datasetService } from '../services/datasetService.js'

const MOCK_COLUMNS = ['Survived', 'Pclass', 'Sex', 'Age', 'Fare', 'Embarked', 'SibSp', 'Parch']

export default function UploadDataset() {
  const navigate = useNavigate()
  const { setDataset, setIsAnalyzing } = useDataset()
  const inputRef = useRef(null)

  const [file, setFile] = useState(null)
  const [targetColumn, setTargetColumn] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleFile = (selected) => {
    if (!selected) return
    setFile(selected)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    handleFile(dropped)
  }

  const handleAnalyze = async () => {
    if (!file || !targetColumn) return
    setSubmitting(true)
    setIsAnalyzing(true)
    try {
      await datasetService.uploadDataset(file, targetColumn)
      setDataset({ fileName: file.name, targetColumn })
      navigate('/')
    } finally {
      setSubmitting(false)
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="relative flex min-h-[75vh] flex-col items-center justify-center px-4 py-10 text-center rounded-xl overflow-hidden border-[0.5px] border-surface-border/40 bg-surface-card/10 backdrop-blur-[2px]">
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Compass size={26} />
        </div>
      <p className="text-sm font-medium text-slate-400">Welcome to</p>
      <h1 className="mt-1 text-4xl font-normal font-serif text-slate-100">
        ML Compass AI
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-400">
        Analyze your dataset. Get insights. Build better models.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`mt-8 flex w-full max-w-md flex-col items-center gap-4 rounded-xl border-[0.5px] border-dashed p-10 transition-colors
          ${isDragging ? 'border-[#D85A30] bg-[#FAECE7]/30' : 'border-surface-border bg-surface-card'}`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground border-[0.5px] border-surface-border">
          {file ? <FileCheck2 size={22} /> : <UploadCloud size={22} />}
        </div>

        {file ? (
          <div>
            <p className="text-sm font-medium text-slate-200">{file.name}</p>
            <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium text-slate-300">Drag &amp; Drop your CSV file here</p>
            <p className="text-xs text-slate-500">or</p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <button type="button" onClick={() => inputRef.current?.click()} className="btn-primary">
          Choose CSV File
        </button>
        <p className="text-xs text-slate-500">{file ? 'File ready to analyze' : 'No file chosen'}</p>
      </div>

      <div className="mt-6 w-full max-w-md text-left">
        <label htmlFor="target-column" className="mb-2 block text-xs font-medium text-slate-400">
          Select Target Column
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            id="target-column"
            value={targetColumn}
            onChange={(e) => setTargetColumn(e.target.value)}
            className="input-field sm:flex-1"
          >
            <option value="">Select target column</option>
            {MOCK_COLUMNS.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={!file || !targetColumn || submitting}
            onClick={handleAnalyze}
            className="btn-primary whitespace-nowrap"
          >
            {submitting ? 'Analyzing...' : 'Analyze Dataset'}
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}
