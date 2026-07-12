import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold text-slate-100">404</h1>
      <p className="text-sm text-slate-500">This page doesn't exist.</p>
      <button type="button" onClick={() => navigate('/')} className="btn-primary">
        Back to Dashboard
      </button>
    </div>
  )
}
