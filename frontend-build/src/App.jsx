import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import UploadDataset from './pages/UploadDataset.jsx'
import DataOverview from './pages/DataOverview.jsx'
import Preprocessing from './pages/Preprocessing.jsx'
import FeatureAnalysis from './pages/FeatureAnalysis.jsx'
import ModelRecommendations from './pages/ModelRecommendations.jsx'
import ModelComparison from './pages/ModelComparison.jsx'
import Reports from './pages/Reports.jsx'
import HistoryPage from './pages/History.jsx'
import NotFound from './pages/NotFound.jsx'
import NeuralHeroDemo from './components/ui/demo.tsx'
import Pipeline from './pages/Pipeline.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="/demo" element={<NeuralHeroDemo />} />
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadDataset />} />
        <Route path="/data-overview" element={<DataOverview />} />
        <Route path="/preprocessing" element={<Preprocessing />} />
        <Route path="/feature-analysis" element={<FeatureAnalysis />} />
        <Route path="/model-recommendations" element={<ModelRecommendations />} />
        <Route path="/model-comparison" element={<ModelComparison />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

