import { createContext, useContext, useMemo, useState } from 'react'

const DatasetContext = createContext(null)

export function DatasetProvider({ children }) {
  const [dataset, setDatasetState] = useState(() => {
    try {
      const saved = sessionStorage.getItem('dataset')
      return saved ? JSON.parse(saved) : null
    } catch (e) {
      return null
    }
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const setDataset = (data) => {
    setDatasetState(data)
    if (data) {
      sessionStorage.setItem('dataset', JSON.stringify(data))
    } else {
      sessionStorage.removeItem('dataset')
    }
  }

  const value = useMemo(
    () => ({
      dataset,
      setDataset,
      isAnalyzing,
      setIsAnalyzing,
      hasDataset: Boolean(dataset && dataset.analysisResult),
    }),
    [dataset, isAnalyzing],
  )

  return <DatasetContext.Provider value={value}>{children}</DatasetContext.Provider>
}

export function useDataset() {
  const ctx = useContext(DatasetContext)
  if (!ctx) throw new Error('useDataset must be used within a DatasetProvider')
  return ctx
}
