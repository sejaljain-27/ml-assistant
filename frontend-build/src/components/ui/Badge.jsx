const VARIANTS = {
  success: 'bg-primary text-primary-foreground border-transparent',
  warning: 'bg-primary text-primary-foreground border-transparent',
  danger: 'bg-primary text-primary-foreground border-transparent',
  info: 'bg-primary text-primary-foreground border-transparent',
  neutral: 'bg-primary text-primary-foreground border-transparent',
  brand: 'bg-primary text-primary-foreground border-transparent',
}

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
