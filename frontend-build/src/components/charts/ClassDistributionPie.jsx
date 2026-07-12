import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

// Editorial-styled color palette matching the near-black and warm slate colors.
const COLORS = ['#1a1a1a', '#8a8578', '#D85A30', '#d4cdc3']

export default function ClassDistributionPie({ data }) {
  if (!data || data.length === 0) return null

  return (
    <div style={{ width: '100%', height: 180 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={65}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, idx) => (
              <Cell 
                key={`cell-${idx}`} 
                fill={COLORS[idx % COLORS.length]} 
                stroke="var(--surface-border)" 
                strokeWidth={0.5} 
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'var(--surface-card)',
              border: '0.5px solid var(--surface-border)',
              borderRadius: 8,
              fontSize: 11,
              color: 'var(--slate-100)',
            }}
            formatter={(value, name, props) => [`${value} rows (${props.payload.pct}%)`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
