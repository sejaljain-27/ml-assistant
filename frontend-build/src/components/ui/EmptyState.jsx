import { useNavigate } from 'react-router-dom'
import { UploadCloud } from 'lucide-react'

export default function EmptyState({
  title = 'No dataset uploaded yet',
  description = 'Upload a CSV file to unlock this section of the analysis.',
}) {
  const navigate = useNavigate()

  return (
    <div className="panel flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
        <UploadCloud size={24} />
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-100">{title}</h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      </div>
      <button type="button" onClick={() => navigate('/upload')} className="btn-primary">
        Upload Dataset
      </button>
    </div>
  )
}
