import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#3b82f6', '#ec4899']

export default function MissingValuesDonut({ missingPct, completePct }) {
  const data = [
    { name: 'Missing', value: missingPct },
    { name: 'Complete', value: completePct },
  ]

  return (
    <div className="relative mx-auto h-56 w-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius="72%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-100">{missingPct.toFixed(2)}%</span>
        <span className="text-xs text-slate-500">Total Missing</span>
      </div>
    </div>
  )
}
