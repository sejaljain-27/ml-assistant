import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'

export default function HorizontalBarChart({ data, dataKey, nameKey, color = '#8b5cf6', height = 260, valueFormatter }) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 4 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey={nameKey}
            width={90}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: 'rgba(128, 128, 128, 0.06)' }}
            contentStyle={{
              background: 'var(--surface-card)',
              border: '1px solid var(--surface-border)',
              borderRadius: 8,
              fontSize: 12,
              color: 'var(--slate-100)',
            }}
            labelStyle={{ color: 'var(--slate-300)' }}
            formatter={(value) => (valueFormatter ? valueFormatter(value) : value)}
          />
          <Bar dataKey={dataKey} radius={[0, 6, 6, 0]} barSize={16}>
            {data.map((entry) => (
              <Cell key={entry[nameKey]} fill={color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
