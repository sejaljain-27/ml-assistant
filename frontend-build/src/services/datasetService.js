import { apiClient, USE_MOCK_DATA } from './apiClient'
import { dashboardOverview } from './mockData/dashboardOverview'
import { missingValues } from './mockData/missingValues'
import { featureImportance } from './mockData/featureImportance'
import { modelComparison } from './mockData/modelComparison'
import { preprocessing } from './mockData/preprocessing'
import { modelRecommendations } from './mockData/modelRecommendations'
import { reports } from './mockData/reports'
import { history } from './mockData/history'
import { pipelineCode } from './mockData/pipeline'

// Small helper so the mock path "feels" like a real network call.
// Makes it easy to swap for `apiClient.get(...)` later without touching callers.
const mockResolve = (data, delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay))

/**
 * Every function below returns a Promise that resolves to the same shape
 * the FastAPI backend is expected to return. Once the backend endpoint is
 * ready, replace the mock branch with the real `apiClient` call — no other
 * file in the app needs to change.
 */
export const datasetService = {
  uploadDataset: async (file, targetColumn) => {
    if (USE_MOCK_DATA) {
      return mockResolve({ success: true, fileName: file?.name ?? 'dataset.csv', targetColumn }, 900)
    }
    const formData = new FormData()
    formData.append('file', file)
    formData.append('target_column', targetColumn)
    const { data } = await apiClient.post('/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  getOverview: async () => {
    if (USE_MOCK_DATA) return mockResolve(dashboardOverview)
    const { data } = await apiClient.get('/dataset/overview')
    return data
  },

  getMissingValues: async () => {
    if (USE_MOCK_DATA) return mockResolve(missingValues)
    const { data } = await apiClient.get('/dataset/missing-values')
    return data
  },

  getFeatureImportance: async () => {
    if (USE_MOCK_DATA) return mockResolve(featureImportance)
    const { data } = await apiClient.get('/features/importance')
    return data
  },

  getPreprocessingRecommendations: async () => {
    if (USE_MOCK_DATA) return mockResolve(preprocessing)
    const { data } = await apiClient.get('/preprocessing/recommendations')
    return data
  },

  getModelRecommendations: async () => {
    if (USE_MOCK_DATA) return mockResolve(modelRecommendations)
    const { data } = await apiClient.get('/models/recommendations')
    return data
  },

  getModelComparison: async () => {
    if (USE_MOCK_DATA) return mockResolve(modelComparison)
    const { data } = await apiClient.get('/models/comparison')
    return data
  },

  getReports: async () => {
    if (USE_MOCK_DATA) return mockResolve(reports)
    const { data } = await apiClient.get('/reports')
    return data
  },

  getHistory: async () => {
    if (USE_MOCK_DATA) return mockResolve(history)
    const { data } = await apiClient.get('/history')
    return data
  },

  getPipelineCode: async () => {
    if (USE_MOCK_DATA) return mockResolve({ code: pipelineCode })
    const { data } = await apiClient.get('/pipeline/code')
    return data
  },
}
