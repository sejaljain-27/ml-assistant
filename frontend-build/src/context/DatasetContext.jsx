import { createContext, useContext, useMemo, useState } from 'react'

const DatasetContext = createContext(null)

export function DatasetProvider({ children }) {
  const [dataset, setDataset] = useState(null) // { fileName, targetColumn } | null
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const value = useMemo(
    () => ({
      dataset,
      setDataset,
      isAnalyzing,
      setIsAnalyzing,
      hasDataset: Boolean(dataset),
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
